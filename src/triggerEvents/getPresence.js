import update from 'immutability-helper';

let _listener;

export function getPresence(component, channel, callback) {
  component.setState((prevState, props) => ({
    pn_presence: update(prevState.pn_presence, { $merge: { [channel]: {} } })
  }));

  if (!_listener) {
    _listener = this.addListener({
      presence: (ps) => {
        component.setState((prevState) => ({
          pn_presence: update(prevState.pn_presence, { [channel]: { $set: ps } })
        }));
        callback(ps);
      }
    });
  }
}
