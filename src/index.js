(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(factory) // AMD
  } else {
    root.nscAPI = factory() // Browser globals
  }
})(this, function () {
  var _version = {} // version.group.name
  var _defs = {}

  function _parseExp (exp, format) {
    var items = exp.split('.')
    if (format === 'object') {
      return {
        version: items[0],
        group: items[1],
        name: items[2]
      }
    } else {
      return items
    }
  }

  function _set (path, obj, val) {
    if (path.length === 0) {
      return
    } else if (path.length === 1) {
      obj[path[0]] = val
    } else {
      var attr = path[0]
      if (!obj[attr]) {
        obj[attr] = {}
      }
      _set(path.slice(1), obj[attr], val)
    }
  }

  function define (exp, def) {
    if (_defs[exp]) {
      console.warn('api of expression[' + exp + '] will be overrided')
    }

    _set(_parseExp(exp), _version, def)
    _defs[exp] = def
  }

  function call (/* exp, ...args */) {
    var exp = arguments[0]
    var args = Array.prototype.slice.call(arguments, 1)
    var def = _defs[exp]

    if (!def) {
      throw new Error('api of expression[' + exp + '] does not exist')
    }

    if (typeof def === 'function') {
      var parsedExp = _parseExp(exp, 'object')
      var ctx = { expression: exp, parsedExpression: parsedExp }
      return def.apply(ctx, args)
    } else {
      return axios(def)
    }
  }

  function config () {

  }

  function intercept () {

  }

  var nscAPI = call
  nscAPI.define = define
  nscAPI.config = config
  nscAPI.intercept = intercept
  nscAPI.call = call
  nscAPI._defs = _defs
  nscAPI._version = _version

  return nscAPI
})