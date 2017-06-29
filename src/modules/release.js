/**
 * Release the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function release(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    let pnMessages = this._component.state.pn_messages;

    delete pnMessages[channel];

    this._component.setState({ pn_messages: pnMessages });
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    let pnPresence = this._component.state.pn_presence;

    delete pnPresence[channel];

    this._component.setState({ pn_presence: pnPresence });
  }

  this._broadcast.unsubscribe(channel);
}
