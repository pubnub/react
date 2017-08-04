'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStatus = getStatus;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getStatus(callback) {
  var _this = this;

  this._broadcast.status(callback);

  if (!this._listener.status) {
    this._listener.status = function (st) {
      if (!_this._broadcast.isSubscribe('status')) {
        return true;
      }

      _this._component.setState(function (prevState) {
        return {
          pn_status: (0, _immutabilityHelper2.default)(prevState.pn_status, { $set: st })
        };
      });

      _this._broadcast.emitStatus(st);
    };
  }

  if (this._component.state && this._component.state.pn_status) {
    return this._component.state.pn_status;
  } else {
    return {};
  }
}
//# sourceMappingURL=getStatus.js.map
