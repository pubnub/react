'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMessage = getMessage;

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function init(component, channel) {
  if (component.state.pn_messages[channel]) {
    return false;
  } else {
    component.setState(function (prevState) {
      return {
        pn_messages: (0, _immutabilityHelper2.default)(prevState.pn_messages, { $merge: _defineProperty({}, channel, []) })
      };
    });

    return true;
  }
}

function emit(instance, channel, message) {
  var messages = instance._component.state.pn_messages[channel];
  var keepMessages = instance._keepMessages[channel];

  messages.push(message);

  if (keepMessages && messages.length > keepMessages) {
    messages = messages.slice(messages.length - keepMessages);
  }

  instance._component.setState(function (prevState) {
    return {
      pn_messages: (0, _immutabilityHelper2.default)(prevState.pn_messages, _defineProperty({}, channel, { $set: messages }))
    };
  });

  instance._broadcast.emit('message', channel, message);
}

function getMessage(channel) {
  var _this = this;

  var component = this._component;
  var callback = void 0;
  var keepMessages = 100;

  if (arguments.length === 2 && typeof arguments[1] === 'function') {
    callback = arguments[1];
  } else if (arguments.length === 2 && typeof arguments[1] === 'number') {
    keepMessages = arguments[1];
  } else if (arguments.length === 3) {
    callback = arguments[1];
    keepMessages = arguments[2];
  }

  if (init(component, channel)) {
    this._keepMessages[channel] = keepMessages;
    this._autoload.getHistory(channel, callback);
  }

  this._broadcast.message(channel, callback);

  if (!this._listener.message) {
    this._listener.message = function (message) {
      if (message.subscription && _this._broadcast.isSubscribe('message', message.subscription)) {
        emit(_this, message.subscription, message);
      }

      if (message.channel && _this._broadcast.isSubscribe('message', message.channel)) {
        emit(_this, message.channel, message);
      }
    };
  }

  if (component.state && component.state.pn_messages && component.state.pn_messages[channel]) {
    return component.state.pn_messages[channel];
  } else {
    return [];
  }
}
//# sourceMappingURL=getMessage.js.map
