import update from 'immutability-helper';

export function getPresence(channel, callback) {
  this._broadcast.presence(channel, callback);

  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      this._component.setState(prevState => ({
        pn_presence: update(prevState.pn_presence, { $merge: { [ch]: {} } })
      }));
    });
  } else {
    this._component.setState(prevState => ({
      pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
    }));
  }

  if (!this._listener.presence) {
    this._listener.presence = (ps) => {
      if (!this._broadcast.isSubscribe('presence', ps.channel)) {
        return true;
      }

      this._component.setState(prevState => ({
        pn_presence: update(prevState.pn_presence, { [channel]: { $set: ps } })
      }));

      this._broadcast.emit('presence', ps.channel, ps);
    };
  }
}
