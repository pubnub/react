import update from 'immutability-helper';

function releaseStates(instance, channel) {
  if (instance._broadcast.isSubscribe('message', channel)) {
    let pn_messages = instance._component.state.pn_messages;

    delete pn_messages[channel];

    instance._component.setState({ pn_messages });
  }

  if (instance._broadcast.isSubscribe('presence', channel)) {
    let pn_presence = instance._component.state.pn_presence;

    delete pn_presence[channel];

    instance._component.setState({ pn_presence });
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