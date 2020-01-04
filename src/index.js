(function (root, factory) {
  'use strict'
  /* istanbul ignore next */
  if (typeof exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(factory) // AMD. Register as an anonymous module.
  } else {
    root.nscAPI = factory() // Browser globals
  }
})(this, function () {
  function factory () {
    function define (exp, def) {

    }
    function config () {

    }
    function intercept () {

    }
    function call (exp) {

    }

    function _parseExp (exp) {
      var items = exp.split('.')
      return {
        version: items[0],
        group: items[1],
        name: items[2]
      }
    }

    var nscAPI = call
    nscAPI.define = define
    nscAPI.config = config
    nscAPI.intercept = intercept
    nscAPI.call = call

    return nscAPI
  }
  return factory
})