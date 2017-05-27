import update from 'immutability-helper';

let _listener;

export function getStatus(component, callback) {
  if (!component.state) {
    component.state = { pubnub: { messages: [], status: {}, presence: {} } };
  } else if (!component.state.pubnub) {
    component.setState({ pubnub: { messages: [], status: {}, presence: {} } })
  }

  if (!_listener) {
    _listener = this.addListener({
      status: (st) => {
        component.setState((prevState, props) => ({
          pubnub: update(prevState.pubnub, { status: { $set: st } })
        }));

        callback(st);
      }
    });
  }
}
