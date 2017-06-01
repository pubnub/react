import PubNub from 'pubnub';
import wrap from './wrapper';
import { getStatus, getMessage, getPresence } from './triggerEvents';

export default class PubNubReact {
  constructor(config) {
    let instance = new PubNub(config);
    wrap(instance, this);

    this._pubnubInstance = instance;
  }

  /**
   * Wrap the subscribe method to enable trigger events to the broadcast
   *
   * @param {object} args
   */
  subscribe(args) {
    this._pubnubInstance.subscribe(args);
  }

  /**
   * Wrap the unsubscribe method to disable the trigger events to the broadcast
   *
   * @param args
   */
  unsubscribe(args) {
    this._pubnubInstance.unsubscribe(args);
  }

  /**
   * Get to receive messages from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getMessage(channel, callback) {
  }

  /**
   * Get to receive presence information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getPresence(channel, callback) {
  }

  /**
   * Get to receive status information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getStatus(channel, callback) {
  }

  /**
   * Clean the stack of messages for a channel or a set of channels
   *
   * @param {string|[string]} channel
   */
  clean(channel) {
  }

  /**
   * Get the PubNub instance wrapped or throw an exception if this is not instanced yet
   *
   * @returns {PubNub|*|null}
   */
  getOriginalInstance() {
    if (this._pubnubInstance) {
      return this._pubnubInstance;
    } else {
      throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
    }
  }
}
