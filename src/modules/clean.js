import update from 'immutability-helper';

function cleanStates(instance, channel) {
  if (instance._broadcast.isSubscribe('message', channel)) {
    instance._component.setState(prevState => ({
      pn_messages: update(prevState.pn_messages, { $set: { [channel]: [] } })
    }));
  }

  if (instance._broadcast.isSubscribe('presence', channel)) {
    instance._component.setState(prevState => ({
      pn_presence: update(prevState.pn_presence, { $set: { [channel]: {} } })
    }));
  }
}

/**
 * Clean the stack of messages for a channel or a set of channels
 *
 * @param {string|[string]} channel
 */
export function clean(channel) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      cleanStates(this, ch);
    });
  } else {
    cleanStates(this, channel);
  }
}
