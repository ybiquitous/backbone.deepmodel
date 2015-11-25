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

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _objectPath = __webpack_require__(2);

	var objectPath = _interopRequireWildcard(_objectPath);

	var _deepCopy = __webpack_require__(3);

	var _deepCopy2 = _interopRequireDefault(_deepCopy);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DeepModel = (function (_Backbone$Model) {
	  _inherits(DeepModel, _Backbone$Model);

	  function DeepModel() {
	    _classCallCheck(this, DeepModel);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DeepModel).apply(this, arguments));
	  }

	  _createClass(DeepModel, [{
	    key: 'get',
	    value: function get(attr) {
	      return objectPath.get(this.attributes, attr);
	    }
	  }, {
	    key: 'set',
	    value: function set(key, val, options) {
	      // BEGIN: copy from original `set` method
	      if (key == null) {
	        return this;
	      }

	      // Handle both `"key", value` and `{key: value}` -style arguments.
	      var attrs;
	      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
	        attrs = key;
	        options = val;
	      } else {
	        (attrs = {})[key] = val;
	      }

	      options || (options = {});
	      // END: copy from original `set` method

	      var target = (0, _deepCopy2.default)(this.attributes);
	      Object.keys(attrs).forEach(function (key) {
	        objectPath.set(target, key, attrs[key]);
	      });

	      return _get(Object.getPrototypeOf(DeepModel.prototype), 'set', this).call(this, target, options);
	    }
	  }], [{
	    key: 'extend',
	    value: function extend() {
	      var _get2;

	      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	        args[_key] = arguments[_key];
	      }

	      return (_get2 = _get(Object.getPrototypeOf(DeepModel), 'extend', this)).call.apply(_get2, [this].concat(args));
	    }
	  }, {
	    key: 'VERSION',
	    get: function get() {
	      return '0.0.1';
	    }
	  }]);

	  return DeepModel;
	})(_backbone2.default.Model);

	exports.default = DeepModel;
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
	exports.get = get;
	exports.set = set;
	function split(path) {
	  return path.replace(/\[(\w+)\]/g, '.$1').split('.');
	}

	function get(obj, path) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = split(path)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var pathElement = _step.value;

	      if (pathElement in obj) {
	        obj = obj[pathElement];
	      } else {
	        return;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return obj;
	}

	function set(obj, path, value) {
	  var pathElements = split(path);
	  var lastIndex = pathElements.length - 1;
	  pathElements.forEach(function (pathElement, index) {
	    if (index < lastIndex) {
	      obj = obj[pathElement];
	    } else {
	      obj[pathElement] = value;
	    }
	  });
	  return obj;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = deepCopy;

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

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