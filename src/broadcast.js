import config from '../config.json';

/**
 * Subscribe a channel to a trigger event
 *
 * @param {string} event - (message, presence, status)
 * @param {string|[string]} channel
 * @param {function} callback to execute.
 */
function subscribeChannel(event, channel, callback) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      event[ch] = callback;
    });
  } else {
    event[channel] = callback;
  }
}

/**
 * Unsubscribe a channel of a trigger event
 *
 * @param {string} event - (message, presence, status)
 * @param {string|[string]} channel
 */
function unsubscribeChannel(event, channel) {
  if (Array.isArray(channel)) {
    channel.forEach((ch) => {
      if (event[ch]) delete event[ch];
    });
  } else if (event[channel]) delete event[channel];
}

export class Broadcast {
  constructor() {
    config.subscribe_listener_events_to_broadcast.forEach((eventName) => {
      let event = `_${eventName}`;

      this[event] = {};

      /**
       * Subscribe a channel with its callback to an event
       *
       * @param {string} channel
       * @param {function} callback
       */
      this[eventName] = function (channel, callback) {
        subscribeChannel(this[event], channel, callback);
      };
    });
  }

  /**
   * Emit a message to a channel through an event
   *
   * @param {string} event - (message, presence, status)
   * @param {string} channel
   * @param {object} args
   */
  emit(event, channel, args) {
    let subscriber = `_${event}`;

    if (this[subscriber] && this[subscriber][channel]) {
      this[subscriber][channel].call(null, args);
    }
  }

  /**
   * Subscribe or unsubscribe for catching errors from trigger events
   *
   * @param {function|null} callback
   */
  error(callback) {
    this._error = callback;
  }

  /**
   * Emit an error to the callback subscribed
   *
   * @param {object} args
   */
  emitError(args) {
    if (this._error) {
      this._error.call(null, args);
    }
  }

  /**
   * Unsubscribe a channel of all events
   *
   * @param {string} channel
   */
  unsubscribe(channel) {
    config.subscribe_listener_events_to_broadcast.forEach((event) => {
      let subscriber = `_${event}`;

      unsubscribeChannel(this[subscriber], channel);
    });
  }
}
