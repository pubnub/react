import update from 'immutability-helper';

function init(instance, channel) {
  if (instance._component.state.pn_presence[channel]) {
    return false;
  }

  instance._component.setState(prevState => ({
    pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
  }));

  return true;
}

function emit(instance, channel, ps) {
  instance._component.setState(prevState => ({
    pn_presence: update(prevState.pn_presence, { [channel]: { $set: ps } })
  }));

  instance._broadcast.emit('presence', ps.channel, ps);
}

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
