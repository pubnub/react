/* global navigator, window */

import PubNubCore from '../../node_modules/pubnub/lib/core/pubnub-common';
import Networking from '../../node_modules/pubnub/lib/networking';
import db from '../../node_modules/pubnub/lib/db/web';
import { get, post } from '../../node_modules/pubnub/lib/networking/modules/web-node';
import { getMessage, getPresence, getStatus } from '../modules';

function sendBeacon(url) {
  if (navigator && navigator.sendBeacon) {
    navigator.sendBeacon(url);
  } else {
    return false;
  }
}

export default class extends PubNubCore {
  constructor(setup) {
    // extract config.
    const { listenToBrowserNetworkEvents = true } = setup;

    setup.db = db;
    setup.sdkFamily = 'React';
    setup.networking = new Networking({ get, post, sendBeacon });

    super(setup);

    if (listenToBrowserNetworkEvents) {
      // mount network events.
      window.addEventListener('offline', () => {
        this.networkDownDetected();
      });

      window.addEventListener('online', () => {
        this.networkUpDetected();
      });
    }

    this.getMessage = getMessage.bind(this);
    this.getPresence = getPresence.bind(this);
    this.getStatus = getStatus.bind(this);
  }

}
