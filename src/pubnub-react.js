import PubNub from 'pubnub';
import update from 'immutability-helper';
import wrap from './wrapper';
import { getStatus, getMessage, getPresence, Trigger } from './triggerEvents';

export default class PubNubReact {
  constructor(config) {
    let instance = new PubNub(config);
    wrap(instance, this);

    this._pubnubInstance = instance;
    this._component = null;
  }

  /**
   * Set the react's states to invoke a new render process when a new real time message is received
   *
   * @param {component} args
   */
  init(component) {
    if (!component.state) {
      component.state = { pn_messages: {}, pn_status: {}, pn_presence: {} };
    } else {
      component.state = update(component.state, { $merge: { pn_status: {}, pn_messages: {}, pn_presence: {} } });
    }

    this.getPresence = getPresence.bind(this);
    this.getMessage = getMessage.bind(this);
    this.getStatus = getStatus.bind(this);

    this._component = component;
  }

  /**
   * Wrap the subscribe method to enable trigger events to the broadcast
   *
   * @param {object} args
   */
  subscribe(args) {
    this._pubnubInstance.subscribe(args);
    Trigger.subscribeChannels(args);
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
    this.getMessage(channel, callback);
  }

  /**
   * Get to receive presence information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getPresence(channel, callback) {
    this.getPresence(channel, callback);
  }

  /**
   * Get to receive status information from a channel or a set of channels through a callback
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getStatus(callback) {
    this.getStatus(callback);
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
