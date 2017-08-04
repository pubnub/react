'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.count = {};
    this.instance = undefined;
  }

  _createClass(_class, [{
    key: 'initialize',
    value: function initialize(instance) {
      this.instance = instance;
    }
  }, {
    key: 'enableLoad',
    value: function enableLoad(args) {
      var _this = this;

      if (this.instance && args.autoload && typeof args.autoload === 'number') {
        this.count[args.channels] = args.autoload;

        args.channels.forEach(function (channel) {
          _this.count[channel] = args.autoload;
        });
      }
    }
  }, {
    key: 'getHistory',
    value: function getHistory(channel, callback) {
      var _this2 = this;

      if (this.count[channel]) {
        this.instance.history({ channel: channel, count: this.count[channel] }).then(function (response) {
          response.messages.forEach(function (m) {
            m.message = m.entry;
            m.channel = channel;

            _this2.instance._component.setState(function (prevState) {
              return {
                pn_messages: (0, _immutabilityHelper2.default)(prevState.pn_messages, _defineProperty({}, channel, { $push: [m] }))
              };
            });
          });

          if (callback) {
            callback();
          }
        }).catch(function () {});
      }
    }
  }, {
    key: 'disableLoad',
    value: function disableLoad(args) {
      var _this3 = this;

      if (Array.isArray(args.channels)) {
        args.channels.forEach(function (ch) {
          if (_this3.count[ch]) delete _this3.count[ch];
        });
      } else if (this.count[args.channels]) {
        delete this.count[args.channels];
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
module.exports = exports['default'];
//# sourceMappingURL=autoload.js.map
