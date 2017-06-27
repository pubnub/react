function releaseStates(instance, channel) {
  if (instance._broadcast.isSubscribe('message', channel)) {
    let pnMessages = instance._component.state.pn_messages;

    delete pnMessages[channel];

    instance._component.setState({ pn_messages: pnMessages });
  }

  if (instance._broadcast.isSubscribe('presence', channel)) {
    let pnPresence = instance._component.state.pn_presence;

    delete pnPresence[channel];

    instance._component.setState({ pn_presence: pnPresence });
  }

  instance._broadcast.unsubscribe(channel);
}

/**
 * Release the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function release(channel) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      releaseStates(this, ch);
    });
  } else {
    releaseStates(this, channel);
  }
}
