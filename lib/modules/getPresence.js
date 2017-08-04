'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresence = getPresence;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function init(instance, channel) {
  if (instance._component.state.pn_presence[channel]) {
    return false;
  }

  instance._component.setState(function (prevState) {
    return {
      pn_presence: (0, _immutabilityHelper2.default)(prevState.pn_presence, { $merge: _defineProperty({}, channel, {}) })
    };
  });

  return true;
}

function emit(instance, channel, presence) {
  instance._component.setState(function (prevState) {
    return {
      pn_presence: (0, _immutabilityHelper2.default)(prevState.pn_presence, _defineProperty({}, channel, { $set: presence }))
    };
  });

  instance._broadcast.emit('presence', presence.channel, presence);
}

function getPresence(channel, callback) {
  var _this = this;

  this._broadcast.presence(channel, callback);

  init(this, channel);

  if (!this._listener.presence) {
    this._listener.presence = function (ps) {
      if (ps.subscription && _this._broadcast.isSubscribe('presence', ps.subscription)) {
        emit(_this, ps.subscription, ps);
      }

      if (ps.channel && _this._broadcast.isSubscribe('presence', ps.channel)) {
        emit(_this, ps.channel, ps);
      }
    };
  }

  if (this._component.state && this._component.state.pn_presence) {
    return this._component.state.pn_presence[channel];
  } else {
    return {};
  }
}
//# sourceMappingURL=getPresence.js.map
