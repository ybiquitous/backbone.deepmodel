/*!
 * backbone.deepmodel v0.1.2
 * Copyright 2015 ybiquitous
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

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

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
	  pathSeparator: '.'
	});

	var _defaults = _extends({}, DEFAULTS);

	function isObject(value) {
	  return value !== null && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object';
	}

	var DeepModel = function (_Backbone$Model) {
	  _inherits(DeepModel, _Backbone$Model);

	  function DeepModel() {
	    _classCallCheck(this, DeepModel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DeepModel).apply(this, arguments));
	  }

	  _createClass(DeepModel, [{
	    key: 'get',
	    value: function get(attr) {
	      _objectPath2.default.pathSeparator = _defaults.pathSeparator;
	      return _objectPath2.default.get(this.attributes, attr);
	    }
	  }, {
	    key: 'set',
	    value: function set(key, value, options) {
	      var _this2 = this;

	      if (key == null) {
	        return this;
	      }

	      var _ = _objectPath2.default;
	      _.pathSeparator = _defaults.pathSeparator;

	      var attrs = undefined;
	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	        options = value;
	      } else {
	        if (!_.hasSeparator(key)) {
	          return _get(Object.getPrototypeOf(DeepModel.prototype), 'set', this).call(this, key, value, options);
	        }
	        attrs = {};
	        attrs[key] = value;
	      }

	      var newAttrs = Object.keys(attrs).reduce(function (newObj, path) {
	        var paths = _.parse(path);

	        if (paths.length === 1) {
	          newObj[path] = attrs[path];
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
	        newObj[rootPath] = obj;

	        return _.set(newObj, paths, attrs[path]);
	      }, {});

	      return _get(Object.getPrototypeOf(DeepModel.prototype), 'set', this).call(this, newAttrs, options);
	    }
	  }], [{
	    key: 'defaults',
	    value: function defaults() {
	      var settings = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	      _extends(_defaults, settings === null ? DEFAULTS : settings);
	    }
	  }, {
	    key: 'VERSION',
	    get: function get() {
	      return '0.1.2';
	    }
	  }]);

	  return DeepModel;
	}(_backbone2.default.Model);

	exports.default = DeepModel;

	DeepModel.extend = _backbone2.default.Model.extend;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function ARRAY_PATTERN() {
	  return (/\[(\w+)\]/g
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
	    if (!this.hasSeparator(path)) {
	      return [path];
	    }
	    var sep = this.pathSeparator;
	    return path.replace(ARRAY_PATTERN(), sep + '$1').split(sep);
	  },

	  /**
	   * @param {Object} obj
	   * @param {string | string[]} path
	   * @returns {?Object}
	   */
	  get: function get(obj, path) {
	    var pathElements = this.parse(path);
	    for (var i = 0, len = pathElements.length; i < len; i++) {
	      var pathElement = pathElements[i];
	      if (pathElement in obj) {
	        obj = obj[pathElement];
	      } else {
	        return;
	      }
	    }
	    return obj;
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
	      if (index < lastIndex) {
	        if (pathElement in current) {
	          current = current[pathElement];
	        } else {
	          var newObj = isArrayIndex(pathElements[index + 1]) ? [] : {};
	          current = current[pathElement] = newObj;
	        }
	      } else {
	        current[pathElement] = value;
	      }
	      return current;
	    }, obj);
	    return obj;
	  }
	};
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deepCopy;
	function deepCopy(source) {
	  if ((typeof source === 'undefined' ? 'undefined' : _typeof(source)) !== 'object' || source === null) {
	    return source;
	  }

	  var initial = Array.isArray(source) ? [] : {};
	  return Object.keys(source).reduce(function (copy, key) {
	    copy[key] = deepCopy(source[key]);
	    return copy;
	  }, initial);
	}
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=backbone.deepmodel.js.map