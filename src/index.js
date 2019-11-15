(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof exports === 'object') {
      // CommonJS
      module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define(factory)
  } else {
      // Browser globals
      root.nscAPI = factory()
  }
})(this, function () {
  var nscAPI = {}
  function factory () {

  }
  return factory
})