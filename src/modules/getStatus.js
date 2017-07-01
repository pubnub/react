import update from 'immutability-helper';

/**
 * Get to receive status information from a channel through a callback
 *
 * @param {function} callback
 * @returns {object}
 */
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

  if (this._component.state && this._component.state.pn_status) {
    return this._component.state.pn_status;
  } else {
    return {};
  }
}
