'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (originalInstance, wrappedInstance) {
  _config2.default.attributes_to_delegate.forEach(function (attribute) {
    wrapAttribute(originalInstance, wrappedInstance, attribute);
  });

  _config2.default.methods_to_delegate.forEach(function (method) {
    wrapMethod(originalInstance, wrappedInstance, method);
  });
};

var _config = require('../config.json');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function wrapAttribute(originalInstance, wrappedInstance, attributeName) {
  wrappedInstance[attributeName] = originalInstance[attributeName];
}

function wrapMethod(OriginalInstance, wrappedInstance, methodName) {
  wrappedInstance[methodName] = function () {
    return OriginalInstance[methodName].apply(wrappedInstance, arguments);
  };
}

module.exports = exports['default'];
//# sourceMappingURL=wrapper.js.map
