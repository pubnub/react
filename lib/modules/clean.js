'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clean = clean;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function clean(channel) {
  if (this._broadcast.isSubscribe('message', channel)) {
    this._component.setState(function (prevState) {
      return {
        pn_messages: (0, _immutabilityHelper2.default)(prevState.pn_messages, _defineProperty({}, channel, { $set: [] }))
      };
    });
  }

  if (this._broadcast.isSubscribe('presence', channel)) {
    this._component.setState(function (prevState) {
      return {
        pn_presence: (0, _immutabilityHelper2.default)(prevState.pn_presence, _defineProperty({}, channel, { $set: [] }))
      };
    });
  }
}
//# sourceMappingURL=clean.js.map
