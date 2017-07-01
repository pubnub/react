import update from 'immutability-helper';

/**
 * Add a channel to the state pn_messages
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @returns {boolean}
 */
function init(instance, channel) {
  if (instance._component.state.pn_messages[channel]) {
    return false;
  } else {
    instance._component.setState(prevState => ({
      pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
    }));

    return true;
  }
}

/**
 * Emit a message through a callback and update the state
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @param {object} message
 */
function emit(instance, channel, message) {
  instance._component.setState(prevState => ({
    pn_messages: update(prevState.pn_messages, { [channel]: { $push: [message] } })
  }));

  instance._broadcast.emit('message', channel, message);
}

/**
 * Get to receive messages from a channel through a callback
 *
 * @param {string} channel
 * @param {function} callback
 * @returns {[]}
 */
export function getMessage(channel, callback) {
  this._broadcast.message(channel, callback);

  if (init(this, channel)) {
    this._autoload.getHistory(channel, callback);
  }

  if (!this._listener.message) {
    this._listener.message = (message) => {
      if (message.subscription && this._broadcast.isSubscribe('message', message.subscription)) {
        emit(this, message.subscription, message);
      }

      if (message.channel && this._broadcast.isSubscribe('message', message.channel)) {
        emit(this, message.channel, message);
      }
    };
  }

  if (this._component.state && this._component.state.pn_messages) {
    return this._component.state.pn_messages[channel];
  } else {
    return [];
  }
}
