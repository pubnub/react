import update from 'immutability-helper';

let _listener;

export function getMessage(component, callback) {
  if (!component.state) {
    component.state = { pubnub: { messages: [], status: {}, presence: {} } };
  } else if (!component.state.pubnub) {
    component.setState({ pubnub: { messages: [], status: {}, presence: {} } })
  }

  if (!_listener) {
    _listener = this.addListener({
      message: (m) => {
        component.setState((prevState, props) => ({
          pubnub: update(prevState.pubnub, { messages: { $push: [m] } })
        }));

        callback(m);
      }
    });
  }
}
