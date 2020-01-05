(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(factory) // AMD
  } else {
    root.nscAPI = factory() // Browser globals
  }
})(this, function () {
  function factory () {
    var _version = {} // version.group.name

    function _parseExp (exp, format) {
      var items = exp.split('.')
      if (format === 'array') {
        return items
      } else {
        return {
          version: items[0],
          group: items[1],
          name: items[2]
        }
      }
    }

    function _get (exp, obj) {
      

    }

    function _set (exp, obj, val) {

    }

    function define (exp, def) {
      if (_get(exp)) {
        console.warn('api of expression[' + exp + '] will be overrided')
      }
      _set(exp, def)
    }
    function config () {

    }
    function intercept () {

    }
    function call (exp, ...args) {
      var def = _get(exp)
      if (!def) {
        throw new Error('api of expression[' + exp + '] does not exist')
      }
      if (typeof def === 'function') {

      } else {
        return def(args)
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