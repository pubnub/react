import update from 'immutability-helper';

let _listener;

export function getMessage(component, channel, callback) {
  component.setState((prevState, props) => ({
    pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
  }));

  if (!_listener) {
    _listener = this.addListener({
      message: (m) => {
        component.setState((prevState) => ({
          pn_messages: update(prevState.pn_messages, { [channel]: { $push: [m] } })
        }));

        callback(m);
      }
    });
  }
}
