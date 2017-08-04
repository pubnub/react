'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Broadcast = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function subscribeChannel(event, channel, callback) {
  if (!event[channel]) {
    event[channel] = callback || {};
  } else if (event[channel] === {} && callback) {
    event[channel] = callback;
  }
}

function unsubscribeChannel(event, channel) {
  if (event[channel]) {
    delete event[channel];
  }
}

var Broadcast = exports.Broadcast = function () {
  function Broadcast() {
    _classCallCheck(this, Broadcast);

    this._message = {};
    this._presence = {};
    this._status = null;
  }

  _createClass(Broadcast, [{
    key: 'message',
    value: function message(channel, callback) {
      subscribeChannel(this._message, channel, callback);
    }
  }, {
    key: 'presence',
    value: function presence(channel, callback) {
      subscribeChannel(this._presence, channel, callback);
    }
  }, {
    key: 'status',
    value: function status(callback) {
      if (!this._status) {
        this._status = callback || {};
      } else if (this._status === {} && callback) {
        this._status = callback;
      }
    }
  }, {
    key: 'isSubscribe',
    value: function isSubscribe(event, channel) {
      var subscriber = '_' + event;

      if (subscriber === '_status') {
        return this[subscriber];
      } else {
        return this[subscriber] && this[subscriber][channel];
      }
    }
  }, {
    key: 'emit',
    value: function emit(event, channel, args) {
      var subscriber = '_' + event;

      if (this[subscriber] && this[subscriber][channel] && typeof this[subscriber][channel] === 'function') {
        this[subscriber][channel].call(null, args);
      }
    }
  }, {
    key: 'emitStatus',
    value: function emitStatus(args) {
      if (this._status && typeof this._status === 'function') {
        this._status.call(null, args);
      }
    }
  }, {
    key: 'error',
    value: function error(callback) {
      this._error = callback;
    }
  }, {
    key: 'emitError',
    value: function emitError(args) {
      if (this._error) {
        this._error.call(null, args);
      }
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(channel) {
      var _this = this;

      _config2.default.subscribe_listener_events_to_broadcast.forEach(function (event) {
        var subscriber = '_' + event;

        unsubscribeChannel(_this[subscriber], channel);
      });
    }
  }]);

  return Broadcast;
}();
//# sourceMappingURL=broadcast.js.map
