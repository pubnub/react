import update from 'immutability-helper';

let _listener;

export function getPresence(channel, callback) {
  this._broadcast.presence(channel, callback);

  this._component.setState(prevState => ({
    pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
  }));

  if (!this._listener.presence) {
    this._listener.presence = (ps) => {
      this._component.setState(prevState => ({
        pn_presence: update(prevState.pn_presence, { [channel]: { $set: ps } })
      }));

      this._broadcast.emit('presence', ps.channel, ps);
    }
  }
}
