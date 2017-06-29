import update from 'immutability-helper';

export default class {
  constructor() {
    this.count = {};
    this.instance = undefined;
  }

  /**
   * Initialize the autoload with a wrapper instance
   *
   * @param instance
   */
  initialize(instance) {
    this.instance = instance;
  }

  /**
   * Enable the autoload for a channel or a set of channels subscribed
   *
   * @param args
   */
  enableLoad(args) {
    if (this.instance && args.autoload && typeof args.autoload === 'number') {
      this.count[args.channels] = args.autoload;

      args.channels.forEach((channel) => {
        this.count[channel] = args.autoload;
      });
    }
  }

  /**
   * Get history of a channel or a set of channels.
   *
   * @param {string|[string]} channel
   * @param callback
   */
  getHistory(channel, callback) {
    if (this.count[channel]) {
      this.instance.history({ channel: channel, count: this.count[channel] }).then((response) => {
        response.messages.forEach((m) => {
          m.message = m.entry;
          m.channel = channel;

          this.instance._component.setState(prevState => ({
            pn_messages: update(prevState.pn_messages, { [channel]: { $push: [m] } })
          }));
        });

        if (callback) {
          callback();
        }
      }).catch(() => {});
    }
  }

  /**
   * Disable the autoload for a channel or set of channels
   *
   * @param args
   */
  disableLoad(args) {
    if (Array.isArray(args.channels)) {
      args.channels.forEach((ch) => {
        if (this.count[ch]) delete this.count[ch];
      });
    } else if (this.count[args.channels]) {
      delete this.count[args.channels];
    }
  }
}
