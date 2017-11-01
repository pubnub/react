import update from 'immutability-helper';

/**
 * Add a channel to the state pn_messages
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @returns {boolean}
 */
function init(component, channel) {
  if (component.state.pn_messages[channel]) {
    return false;
  } else {
    component.setState(prevState => ({
      pn_messages: update(prevState.pn_messages, { $merge: { [channel]: [] } })
    }));

    return true;
  }
}

/**
 * Emit a message through a callback and update the state
 *
 * @param {PubNubReact} instance
 * @param {string} channel
 * @param {object} message
 */
function emit(instance, channel, message) {
  let messages = instance._component.state.pn_messages[channel];
  let keepMessages = instance._keepMessages[channel];

  messages.push(message);

  if (keepMessages && messages.length > keepMessages) {
    messages = messages.slice(messages.length - keepMessages);
  }

  instance._component.setState(prevState => ({
    pn_messages: update(prevState.pn_messages, { [channel]: { $set: messages } })
  }));

  instance._broadcast.emit('message', channel, message);
}

/**
 * Get to receive messages from a channel through a callback
 *
 * @param {string} channel
 * @param {function} callback
 * @returns {[]}
 */
export function getMessage(channel) {
  let component = this._component;
  let callback;
  let keepMessages = 100;

  if (arguments.length === 2 && typeof arguments[1] === 'function') {
    callback = arguments[1];
  } else if (arguments.length === 2 && typeof arguments[1] === 'number') {
    keepMessages = arguments[1];
  } else if (arguments.length === 3) {
    callback = arguments[1];
    keepMessages = arguments[2];
  }

  if (init(component, channel)) {
    this._keepMessages[channel] = keepMessages;
    this._autoload.getHistory(channel, callback);
  }

  this._broadcast.message(channel, callback);

  if (!this._listener.message) {
    this._listener.message = (message) => {
      if (message.subscription && this._broadcast.isSubscribe('message', message.subscription)) {
        emit(this, message.subscription, message);
      }

      if (message.channel && this._broadcast.isSubscribe('message', message.channel)) {
        emit(this, message.channel, message);
      }
    };
  }

  if (component.state && component.state.pn_messages && component.state.pn_messages[channel]) {
    return component.state.pn_messages[channel];
  } else {
    return [];
  }
}
