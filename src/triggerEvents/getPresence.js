import update from 'immutability-helper';

let _listener;

export function getPresence(channel, callback) {
  this._component.setState((prevState, props) => ({
    pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
  }));

  if (!_listener) {
    _listener = this.addListener({
      presence: (ps) => {
        this._component.setState((prevState) => ({
          pn_presence: update(prevState.pn_presence, { [channel]: { $set: ps } })
        }));
        callback(ps);
      }
    });
  }
}
