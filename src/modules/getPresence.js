import update from 'immutability-helper';

/**
 * Add a channel to the state pn_presence
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @returns {boolean}
 */
function init(instance, channel) {
  if (instance._component.state.pn_presence[channel]) {
    return false;
  }

  instance._component.setState(prevState => ({
    pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
  }));

  return true;
}

/**
 * Emit a presence information through a callback and update the state
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @param {object} presence
 */
function emit(instance, channel, presence) {
  instance._component.setState(prevState => ({
    pn_presence: update(prevState.pn_presence, { [channel]: { $set: presence } })
  }));

  instance._broadcast.emit('presence', presence.channel, presence);
}


/**
 * Get to receive presence information from a channel through a callback
 *
 * @param {string} channel
 * @param {function} callback
 * @returns {object}
 */
export function getPresence(channel, callback) {
  this._broadcast.presence(channel, callback);

  init(this, channel);

  if (!this._listener.presence) {
    this._listener.presence = (ps) => {
      if (ps.subscription && this._broadcast.isSubscribe('presence', ps.subscription)) {
        emit(this, ps.subscription, ps);
      }

      if (ps.channel && this._broadcast.isSubscribe('presence', ps.channel)) {
        emit(this, ps.channel, ps);
      }
    };
  }

  if (this._component.state && this._component.state.pn_presence) {
    return this._component.state.pn_presence[channel];
  } else {
    return {};
  }
}
