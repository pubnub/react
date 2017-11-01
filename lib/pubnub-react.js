'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pubnub = require('pubnub');

var _pubnub2 = _interopRequireDefault(_pubnub);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _wrapper = require('./wrapper');

var _wrapper2 = _interopRequireDefault(_wrapper);

var _autoload = require('./autoload');

var _autoload2 = _interopRequireDefault(_autoload);

var _broadcast = require('./broadcast');

var _modules = require('./modules');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PubNubReact = function () {
  function PubNubReact(config) {
    _classCallCheck(this, PubNubReact);

    var instance = new _pubnub2.default(config);
    (0, _wrapper2.default)(instance, this);

    this._pubnubInstance = instance;
    this._autoload = new _autoload2.default();
  }

  _createClass(PubNubReact, [{
    key: 'init',
    value: function init(component) {
      if (!component.state) {
        component.state = { pn_messages: {}, pn_status: {}, pn_presence: {} };
      } else {
        component.state = (0, _immutabilityHelper2.default)(component.state, { $merge: { pn_status: {}, pn_messages: {}, pn_presence: {} } });
      }

      this._component = component;
      this._broadcast = new _broadcast.Broadcast();
      this._listener = {};
      this._keepMessages = {};

      this.addListener(this._listener);
      this._autoload.initialize(this);

      this.getPresence = _modules.getPresence.bind(this);
      this.getMessage = _modules.getMessage.bind(this);
      this.getStatus = _modules.getStatus.bind(this);
      this.clean = _modules.clean.bind(this);
      this.release = _modules.release.bind(this);
    }
  }, {
    key: 'subscribe',
    value: function subscribe(args) {
      this._pubnubInstance.subscribe(args);
      this._autoload.enableLoad(args);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe(args) {
      this._pubnubInstance.unsubscribe(args);
      this._autoload.disableLoad(args);
    }
  }, {
    key: 'getOriginalInstance',
    value: function getOriginalInstance() {
      if (this._pubnubInstance) {
        return this._pubnubInstance;
      } else {
        throw new ReferenceError('Pubnub default instance is not initialized yet. Invoke #init() method first.');
      }
    }
  }]);

  return PubNubReact;
}();

exports.default = PubNubReact;
module.exports = exports['default'];
//# sourceMappingURL=pubnub-react.js.map
