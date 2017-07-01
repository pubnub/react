import config from '../config.json';

/**
 * Wrap a PubNub's attributes
 *
 * @param {string} attributeName
 */
function wrapAttribute(originalInstance, wrappedInstance, attributeName) {
  wrappedInstance[attributeName] = originalInstance[attributeName];
}

/**
 * Wrap a PubNub's methods
 *
 * @param methodName
 */
function wrapMethod(OriginalInstance, wrappedInstance, methodName) {
  wrappedInstance[methodName] = function () {
    return OriginalInstance[methodName].apply(wrappedInstance, arguments);
  };
}

/**
 * Wrap the PubNubReact with PubNub
 *
 * @param originalInstance
 * @param wrappedInstance
 */
export default function (originalInstance, wrappedInstance) {
  config.attributes_to_delegate.forEach((attribute) => {
    wrapAttribute(originalInstance, wrappedInstance, attribute);
  });

  config.methods_to_delegate.forEach((method) => {
    wrapMethod(originalInstance, wrappedInstance, method);
  });
}
