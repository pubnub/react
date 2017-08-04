'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.release = release;
function release(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    var pnMessages = this._component.state.pn_messages;

    delete pnMessages[channel];

    this._component.setState({ pn_messages: pnMessages });
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    var pnPresence = this._component.state.pn_presence;

    delete pnPresence[channel];

    this._component.setState({ pn_presence: pnPresence });
  }

  this._broadcast.unsubscribe(channel);
}
//# sourceMappingURL=release.js.map
