(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory() // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(factory) // AMD
  } else {
    root.nscAPI = factory() // Browser globals
  }
})(this, function () {
  
  var defs = {} // { [version.group.name]: def }

  var nscAPI = call
  nscAPI.define = define
  nscAPI.config = config
  nscAPI.intercept = intercept
  nscAPI.call = call
  nscAPI._defs = defs

  /**
   * add 'default' as version if it is omitted
   * <group>.<name> => default.<group>.<name>
   */
  function normalizeExp (exp) {
    var items = parseExp(exp)
    if (items.length === 2) {
      return ['default'].concat(items).join('.')
    } else {
      return exp
    }
  }

  function parseExp (exp, format) {
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

  /**
   * defs: v1.user.get, v1.user.*, v1.*.*
   * v1.user.get => v1.user.get
   * v1.user.list => v1.user.*
   * v1.product.get => v1.*.*
   */
  function matchDef (exp) {
    if (defs[exp]) {
      return defs[exp]
    } else {
      var keys = Object.keys(defs)
      keys = keys.sort(function (k1, k2) {
        var wildcatCount = function (key) {
          return key.split('.').filter(function (k) {
            return k === '*'
          }).length
        }
        var c1 = wildcatCount(k1)
        var c2 = wildcatCount(k2)
        return c1 - c2
      })
      var parsedExp = parseExp(exp)
      var m = function (v1, v2) { return v1 === v2 || v2 === '*'}
      for (var i = 0; i < keys.length; i++) {
        var parsedKey = parseExp(keys[i])
        if (
          m(parsedExp[0], parsedKey[0]) &&
          m(parsedExp[1], parsedKey[1]) &&
          m(parsedExp[2], parsedKey[2])
        ) {
          return defs[keys[i]]
        }
      }
      return null
    }
  }

  function set (path, obj, val) {
    if (path.length === 0) {
      return
    } else if (path.length === 1) {
      obj[path[0]] = val
    } else {
      var attr = path[0]
      if (!obj[attr]) {
        obj[attr] = {}
      }
      set(path.slice(1), obj[attr], val)
    }
  }

  function define (exp, def) {
    exp = normalizeExp(exp)
    if (defs[exp]) {
      console.warn('api of expression[' + exp + '] will be overrided')
    }

    // set(parseExp(exp), _version, def)
    set(parseExp(exp), nscAPI, def)
    defs[exp] = def
  }

  function call (/* exp, ...args */) {
    var exp = normalizeExp(arguments[0])
    var args = Array.prototype.slice.call(arguments, 1)
    var def = matchDef(exp)

    if (!def) {
      throw new Error('api of expression[' + exp + '] does not exist')
    }

    if (typeof def === 'function') {
      var parsedExp = parseExp(exp, 'object')
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

  return nscAPI
})