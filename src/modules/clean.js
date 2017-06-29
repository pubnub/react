import update from 'immutability-helper';

/**
 * Clean the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function clean(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    this._component.setState(prevState => ({
      pn_messages: update(prevState.pn_messages, { [channel]: { $set: [] } })
    }));
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    this._component.setState(prevState => ({
      pn_presence: update(prevState.pn_presence, { [channel]: { $set: [] } })
    }));
  }
}
