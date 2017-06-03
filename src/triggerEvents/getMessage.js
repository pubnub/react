import update from 'immutability-helper';

let _listener;

export function getMessage(channel, callback) {
  this._component.setState((prevState, props) => ({
    pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
  }));

  if (!_listener) {
    _listener = this.addListener({
      message: (m) => {
        this._component.setState((prevState) => ({
          pn_messages: update(prevState.pn_messages, { [channel]: { $push: [m] } })
        }));

        callback(m);
      }
    });
  }
}
