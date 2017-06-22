/*!
 * backbone.deepmodel v1.1.0
 * Copyright 2017 ybiquitous <ybiquitous@gmail.com>
 * MIT Licensed
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"));
	else if(typeof define === 'function' && define.amd)
		define(["backbone"], factory);
	else if(typeof exports === 'object')
		exports["DeepModel"] = factory(require("backbone"));
	else
		root["Backbone"] = root["Backbone"] || {}, root["Backbone"]["DeepModel"] = factory(root["Backbone"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _backbone = __webpack_require__(1);

var _backbone2 = _interopRequireDefault(_backbone);

var _objectPath = __webpack_require__(2);

var _objectPath2 = _interopRequireDefault(_objectPath);

var _deepCopy = __webpack_require__(3);

var _deepCopy2 = _interopRequireDefault(_deepCopy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULTS = Object.freeze({
  pathSeparator: '.',
  pathParser: null
});

var _defaults = _extends({}, DEFAULTS);

function updateObjectPath() {
  _objectPath2.default.pathSeparator = _defaults.pathSeparator;

  var pathParser = _defaults.pathParser;
  if (typeof pathParser === 'function' || pathParser == null) {
    _objectPath2.default.pathParser = pathParser;
  }

  return _objectPath2.default;
}

function isObject(value) {
  return value != null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
}

/**
 * @class
 * @see http://backbonejs.org/#Model
 *
 * @example
 * class Person extends DeepModel {...}
 *
 * // or
 * const Person = DeepModel.extend({...})
 */

var DeepModel = function (_Backbone$Model) {
  _inherits(DeepModel, _Backbone$Model);

  function DeepModel() {
    _classCallCheck(this, DeepModel);

    return _possibleConstructorReturn(this, (DeepModel.__proto__ || Object.getPrototypeOf(DeepModel)).apply(this, arguments));
  }

  _createClass(DeepModel, [{
    key: 'get',


    /**
     * @see http://backbonejs.org/#Model-get
     * @override
     * @param {string} attribute
     * @returns {*}
     *
     * @example
     * model.get('a.b')
     */
    value: function get(attribute) {
      return updateObjectPath().get(this.attributes, attribute);
    }

    /**
     * @see http://backbonejs.org/#Model-set
     * @override
     * @param {string} attribute
     * @param {*}      value
     * @param {Object} [options]
     * @returns {DeepModel}
     *
     * @example
     * model.set({'a.b': 'value'})
     * model.set('a.b', 'value')
     */

  }, {
    key: 'set',
    value: function set(attribute, value, options) {
      var _this2 = this;

      if (attribute == null) {
        return this;
      }

      var _ = updateObjectPath();

      var attrs = void 0;
      if ((typeof attribute === 'undefined' ? 'undefined' : _typeof(attribute)) === 'object') {
        attrs = attribute;
        options = value; // eslint-disable-line no-param-reassign
      } else {
        if (!_.pathParser && !_.hasSeparator(attribute)) {
          return _get(DeepModel.prototype.__proto__ || Object.getPrototypeOf(DeepModel.prototype), 'set', this).call(this, attribute, value, options);
        }
        attrs = {};
        attrs[attribute] = value;
      }

      var newAttrs = Object.keys(attrs).reduce(function (newObj, path) {
        var paths = _.parse(path);

        if (paths.length === 0) {
          return newObj;
        }
        if (paths.length === 1) {
          newObj[paths[0]] = attrs[path]; // eslint-disable-line no-param-reassign
          return newObj;
        }

        var rootPath = paths[0];
        var obj = newObj[rootPath];
        if (obj == null) {
          obj = (0, _deepCopy2.default)(_this2.attributes[rootPath]);
        }
        if (!isObject(obj)) {
          throw new Error('"' + path + '" does not exist in ' + JSON.stringify(_this2));
        }
        newObj[rootPath] = obj; // eslint-disable-line no-param-reassign

        return _.set(newObj, paths, attrs[path]);
      }, {});

      return _get(DeepModel.prototype.__proto__ || Object.getPrototypeOf(DeepModel.prototype), 'set', this).call(this, newAttrs, options);
    }
  }], [{
    key: 'extend',
    value: function extend() {
      var _Backbone$Model2;

      return (_Backbone$Model2 = _backbone2.default.Model).extend.apply(_Backbone$Model2, arguments);
    }

    /**
     * this module's version.
     */

  }, {
    key: 'defaults',


    /**
     * Update default settings.
     *
     * @param {Object} [settings={}] reset if `null`
     * @param {string} [settings.pathSeparator='/']
     * @param {function(path: string): Array.<string>} [settings.pathParser] ignore if returns `[]`
     * @returns {Object}
     *
     * @example
     * DeepModel.defaults({anySetting: true})
     * DeepModel.defaults(null) // reset!
     *
     * @example
     * DeepModel.defaults({pathSeparator: '/'})
     *
     * const model = new DeepModel()
     * model.set('a', {})
     * model.set('a/b', 1)
     * model.get('a/b') //=> 1
     *
     * @example
     * DeepModel.defaults({
     *   pathParser(path) {
     *     if (path === '*') { return [] } // ignore!
     *     return path.split('_')
     *   }
     * })
     *
     * const model = new DeepModel()
     * model.set('a', {})
     * model.set('a_b', 1)
     * model.get('a_b') //=> 1
     * model.set('*', 2)
     * model.get('*') //=> undefined
     */
    value: function defaults() {
      var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return _extends(_defaults, settings == null ? DEFAULTS : settings);
    }
  }, {
    key: 'VERSION',
    get: function get() {
      return '0.0.0';
    }
  }]);

  return DeepModel;
}(_backbone2.default.Model);

exports.default = DeepModel;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function ARRAY_PATTERN() {
  return (/\[(\w+)]/g
  );
}

function isArrayIndex(value) {
  var num = Number(value);
  return num >= 0 && num % 1 === 0;
}

exports.default = {
  pathSeparator: '.',

  /**
   * @param {?string} s
   * @returns {boolean}
   */
  hasSeparator: function hasSeparator(s) {
    return typeof s === 'string' && (s.indexOf(this.pathSeparator) >= 0 || ARRAY_PATTERN().test(s));
  },


  /**
   * @param {string | string[]} path
   * @returns {string[]}
   *
   * @example
   * parse('a.b')      //=> ['a', 'b']
   * parse('a[0]')     //=> ['a', '0']
   * parse(['a', 'b']) //=> ['a', 'b']
   */
  parse: function parse(path) {
    if (Array.isArray(path)) {
      return path;
    }
    if (typeof this.pathParser === 'function') {
      return this.pathParser(path);
    }
    if (!this.hasSeparator(path)) {
      return [path];
    }
    var sep = this.pathSeparator;
    return path.replace(ARRAY_PATTERN(), sep + '$1').split(sep);
  },


  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @returns {?*}
   */
  get: function get(obj, path) {
    var pathElements = this.parse(path);
    if (pathElements.length === 0) {
      return undefined;
    }

    // TODO: Because of "Symbol is not defined", cannot use `for..of`
    var value = obj;
    for (var i = 0, len = pathElements.length; i < len; i += 1) {
      var pathElement = pathElements[i];
      if (pathElement in value) {
        value = value[pathElement];
      } else {
        return undefined;
      }
    }
    return value;
  },


  /**
   * @param {Object} obj
   * @param {string | string[]} path
   * @param {*} value
   * @returns {Object} given `obj`
   */
  set: function set(obj, path, value) {
    var pathElements = this.parse(path);
    var lastIndex = pathElements.length - 1;
    pathElements.reduce(function (current, pathElement, index) {
      /* eslint-disable no-param-reassign */
      if (index < lastIndex) {
        if (pathElement in current) {
          current = current[pathElement];
        } else {
          var newObj = isArrayIndex(pathElements[index + 1]) ? [] : {};
          current[pathElement] = newObj;
          current = newObj;
        }
      } else {
        current[pathElement] = value;
      }
      return current;
      /* eslint-enable no-param-reassign */
    }, obj);
    return obj;
  }
};
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = deepCopy;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @private
 * @param {Object|Array} [source]
 * @returns {Object|Array}
 */
function deepCopy(source) {
  if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object' || source == null) {
    return source;
  }

  var initial = Array.isArray(source) ? [] : {};
  return Object.keys(source).reduce(function (copy, key) {
    return _extends(copy, _defineProperty({}, key, deepCopy(source[key])));
  }, initial);
}
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=backbone.deepmodel.js.map