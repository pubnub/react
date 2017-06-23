import update from 'immutability-helper';

export function getStatus(callback) {
  this._broadcast.status(callback);

  if (!this._listener.status) {
    this._listener.status = (st) => {
      if (!this._broadcast.isSubscribe('status')) {
        return true;
      }

      this._component.setState(prevState => ({
        pn_status: update(prevState.pn_status, { $set: st })
      }));

      this._broadcast.emitStatus(st);
    };
  }
}
