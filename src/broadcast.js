import config from '../config.json';

/**
 * Subscribe a channel to a trigger event
 *
 * @param {string} event - (message, presence, status)
 * @param {string|[string]} channel
 * @param {function} callback to execute.
 */
function subscribeChannel(event, channel, callback) {
  if (!event[channel]) {
    event[channel] = callback || {};
  } else if (event[channel] === {} && callback) {
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
  if (event[channel]) {
    delete event[channel];
  }
}

export class Broadcast {
  constructor() {
    this._message = {};
    this._presence = {};
    this._status = null;
  }

  /**
   * Subscribe a callback to a channel through the message event
   *
   * @param {string} channel
   * @param {function} callback
   */
  message(channel, callback) {
    subscribeChannel(this._message, channel, callback);
  }

  /**
   * Subscribe a callback to a channel through the presence event
   *
   * @param {string} channel
   * @param {function} callback
   */
  presence(channel, callback) {
    subscribeChannel(this._presence, channel, callback);
  }

  /**
   * Subscribe a callback through the status event
   *
   * @param callback
   */
  status(callback) {
    if (!this._status) {
      this._status = callback || {};
    } else if (this._status === {} && callback) {
      this._status = callback;
    }
  }

  /**
   * Validate if a channel is subscribe to an event
   *
   * @param {string} event
   * @param {string} channel
   * @returns {boolean}
   */
  isSubscribe(event, channel) {
    let subscriber = `_${event}`;

    if (subscriber === '_status') {
      return this[subscriber];
    } else {
      return (this[subscriber] && this[subscriber][channel]);
    }
  }

  /**
   * Emit a message to a channel through an event
   *
   * @param {string} event - (message, presence)
   * @param {string} channel
   * @param {object} args
   */
  emit(event, channel, args) {
    let subscriber = `_${event}`;

    if (this[subscriber] && this[subscriber][channel] && typeof this[subscriber][channel] === 'function') {
      this[subscriber][channel].call(null, args);
    }
  }

  /**
   * Emit the status event through the callback subscribed
   *
   * @param {object} args
   */
  emitStatus(args) {
    if (this._status && typeof this._status === 'function') {
      this._status.call(null, args);
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
