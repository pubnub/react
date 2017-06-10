import update from 'immutability-helper';

//let _statusListener;

export function getStatus(callback) {
  if (!this._listener.status) {
    this._listener.status = (st) => {
      this._component.setState(prevState => ({
        pn_status: update(prevState.pn_status, { $set: st })
      }));

      callback(st);
    }
  }
}
