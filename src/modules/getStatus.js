import update from 'immutability-helper';

let _listener;

export function getStatus(component, callback) {
  if (!_listener) {
    _listener = this.addListener({
      status: (st) => {
        component.setState((prevState, props) => ({
          pn_status: update(prevState.pn_status, { $set: st })
        }));

        callback(st);
      }
    });
  }
}
