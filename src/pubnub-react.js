import PubNub from 'pubnub';
import update from 'immutability-helper';
import wrap from './wrapper';
import Autoload from './autoload';
import { Broadcast } from './broadcast';
import { getStatus, getMessage, getPresence, clean, release } from './modules';

export default class PubNubReact {
  constructor(config) {
    let instance = new PubNub(config);
    wrap(instance, this);

    this._pubnubInstance = instance;
    this._autoload = new Autoload();
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

    this._component = component;
    this._broadcast = new Broadcast();
    this._listener = {};
    this._keepMessages = {};

    this.addListener(this._listener);
    this._autoload.initialize(this);

    this.getPresence = getPresence.bind(this);
    this.getMessage = getMessage.bind(this);
    this.getStatus = getStatus.bind(this);
    this.clean = clean.bind(this);
    this.release = release.bind(this);
  }

  /**
   * Wrap the subscribe method to enable trigger events to the broadcast
   *
   * @param {object} args
   */
  subscribe(args) {
    this._pubnubInstance.subscribe(args);
    this._autoload.enableLoad(args);
  }

  /**
   * Wrap the unsubscribe method to disable the trigger events to the broadcast
   *
   * @param args
   */
  unsubscribe(args) {
    this._pubnubInstance.unsubscribe(args);
    this._autoload.disableLoad(args);
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
