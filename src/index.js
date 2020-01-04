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
  function factory () {
    
    /**
     * 
     * @param {Object} def { group, apis }
     */
    function parseDef (def) {

    }

    /**
     * @param {Array} defs [{ group, apis: []}]
     */
    function create (defs) {
      return {
        version: version
      }
    }
    
    function version (versionName, impl) {

    }

    return { create: create }
  }
  return factory
})