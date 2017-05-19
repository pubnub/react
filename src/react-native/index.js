import PubNubCore from '../node_modules/pubnub/lib/core/pubnub-common';
import Networking from '../node_modules/pubnub/lib/networking';
import Database from '../node_modules/pubnub/lib//db/common';
import { get, post } from '../node_modules/pubnub/lib/networking/modules/react_native';
import { getMessage, getPresence, getStatus } from '../modules';

export default class extends PubNubCore {
  constructor(setup) {
    setup.db = new Database();
    setup.networking = new Networking({get, post});
    setup.sdkFamily = 'ReactNative';
    setup.ssl = true;

    super(setup);

    this.getMessage = getMessage.bind(this);
    this.getPresence = getPresence.bind(this);
    this.getStatus = getStatus.bind(this);
  }
}
