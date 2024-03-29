/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _gameModel = __webpack_require__(1);
	
	var _gameModel2 = _interopRequireDefault(_gameModel);
	
	var _gameView = __webpack_require__(2);
	
	var _gameView2 = _interopRequireDefault(_gameView);
	
	var _gameController = __webpack_require__(3);
	
	var _gameController2 = _interopRequireDefault(_gameController);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var pfController = new _gameController2.default(),
	    pfModel = new _gameModel2.default(),
	    pfView = new _gameView2.default();
	
	pfController.init($("#content"), pfModel);
	pfModel.init(pfView);
	pfView.init($("#content"), pfModel);
	
	var cf = {
	  integer: 2,
	  numerator: 1,
	  denominator: 8
	};
	
	$(".properFractionsBlock").on("DOMNodeInserted", "canvas", function (event) {
	  var pfDOM = $(event.target).parent()[0];
	  var properFraction = {
	    integer: +pfDOM.getAttribute("data-integer"),
	    numerator: +pfDOM.getAttribute("data-numerator"),
	    denominator: +pfDOM.getAttribute("data-denominator")
	  };
	  pfController.makeProperFractionDraggable(pfDOM, properFraction);
	});
	
	var properFractions = pfView.generateProperFractions(cf, "double it");
	
	properFractions.forEach(function (properFraction) {
	  pfView.drawProperFraction(properFraction);
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameModel = function () {
	  function GameModel() {
	    _classCallCheck(this, GameModel);
	  }
	
	  _createClass(GameModel, [{
	    key: "init",
	    value: function init(view) {
	      this.view = view;
	      this.isPFinBlock = null;
	      this.pfList = [];
	    }
	  }, {
	    key: "getPfList",
	    value: function getPfList() {
	      return this.pfList;
	    }
	  }, {
	    key: "setPfinPfList",
	    value: function setPfinPfList(pf) {
	      this.pfList.push(pf);
	    }
	  }, {
	    key: "getIsPFinBlock",
	    value: function getIsPFinBlock() {
	      return this.isPFinBlock;
	    }
	  }, {
	    key: "setPFinBlock",
	    value: function setPFinBlock(pfDraggable) {
	      this.isPFinBlock = pfDraggable;
	      if (pfDraggable !== null) {
	        this.view.makeDraggableCopyPF(pfDraggable);
	        this.view.positionPFinBlock();
	      }
	    }
	  }]);
	
	  return GameModel;
	}();
	
	exports.default = GameModel;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView() {
	    _classCallCheck(this, GameView);
	  }
	
	  _createClass(GameView, [{
	    key: "init",
	    value: function init(content, model) {
	      this.content = content;
	      this.model = model;
	    }
	  }, {
	    key: "drawProperFraction",
	    value: function drawProperFraction(properFraction) {
	      var canvas = void 0,
	          pfDOM = void 0;
	      if (properFraction.copy) {
	        if (properFraction.nextSibling.length) {
	          $(properFraction.nextSibling).before("<div class=properFraction>");
	        } else {
	          $(properFraction.prevSibling).after("<div class=properFraction>");
	        }
	        $(".properFraction:not(:has(canvas))").append("<canvas></canvas>");
	        canvas = $("canvas:not(.drawn)")[0];
	      } else {
	        $(".properFractionsBlock").append("<div class=properFraction>");
	        $(".properFraction:last-child").append("<canvas></canvas>");
	        canvas = $("canvas")[$("canvas").length - 1];
	      }
	
	      pfDOM = $(canvas).parent()[0];
	      pfDOM.setAttribute("data-integer", properFraction.integer);
	      pfDOM.setAttribute("data-numerator", properFraction.numerator);
	      pfDOM.setAttribute("data-denominator", properFraction.denominator);
	
	      var context = canvas.getContext("2d"),
	          beginAngle = Math.PI * 1.5,
	          angle360 = Math.PI * 2;
	
	      canvas.setAttribute("width", "100px");
	      canvas.setAttribute("height", "100px");
	
	      context.beginPath();
	      context.fillStyle = "rgb(255, 237, 115)";
	
	      if (properFraction.integer === 1) {
	        context.arc(50, 50, 30, beginAngle, beginAngle + angle360);
	      }
	
	      context.arc(50, 50, 30, beginAngle, beginAngle + angle360 / properFraction.denominator * properFraction.numerator);
	      context.lineTo(50, 50);
	      context.fill();
	
	      context.strokeStyle = "rgb(255, 237, 115)";
	      context.arc(50, 50, 30, beginAngle, beginAngle + angle360);
	      context.stroke();
	      context.closePath();
	
	      $(canvas).addClass("drawn");
	
	      this.model.setPfinPfList(pfDOM);
	
	      return pfDOM;
	    }
	  }, {
	    key: "generateProperFractions",
	    value: function generateProperFractions(complexFraction, typeOfGame) {
	      var cf = Object.assign({}, complexFraction),
	          properFractions = [{
	        integer: 1,
	        numerator: 0,
	        denominator: cf.denominator
	      }, {
	        integer: 0,
	        numerator: 1,
	        denominator: cf.denominator
	      }];
	
	      switch (typeOfGame) {
	        case "double it":
	          if (cf.denominator % 2 === 0 && cf.numerator > 0) {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator / 2
	            });
	          } else if (cf.numerator === 0) {
	            properFractions.pop();
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 2
	            });
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 3
	            });
	          } else {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator - 1
	            });
	          }
	          break;
	        case "tripple it":
	          if (cf.denominator % 2 === 0 && cf.numerator > 0) {
	            if (cf.denominator / 3) {
	              properFractions.push({
	                integer: 0,
	                numerator: 1,
	                denominator: cf.denominator / 3
	              });
	            } else {
	              properFractions.push({
	                integer: 0,
	                numerator: 1,
	                denominator: cf.denominator / 2
	              });
	            }
	          } else if (cf.numerator === 0) {
	            properFractions.pop();
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 2
	            });
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 3
	            });
	          } else {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator - 1
	            });
	          }
	          break;
	        case "find one-half":
	          if (cf.denominator % 2 === 0 && cf.numerator > 0) {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator * 2
	            });
	          } else if (cf.numerator === 0) {
	            properFractions.pop();
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 2
	            });
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 3
	            });
	          } else {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator - 1
	            });
	          }
	          break;
	        case "find one-third":
	          if ((cf.denominator * cf.numerator + 1) % 3) {
	            properFractions.pop();
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 2
	            });
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: 3
	            });
	          } else {
	            properFractions.push({
	              integer: 0,
	              numerator: 1,
	              denominator: cf.denominator * 3
	            });
	          }
	          break;
	        default:
	          return false;
	      }
	
	      return properFractions;
	    }
	  }, {
	    key: "positionPFinBlock",
	    value: function positionPFinBlock() {
	      var inputBlockRect = $(".answerBlock")[0].getBoundingClientRect(),
	          pfDraggable = this.model.getIsPFinBlock();
	      if (pfDraggable !== null) {
	        $(".answerBlock").append(pfDraggable.element);
	        pfDraggable.element.style.left = inputBlockRect.left + pageXOffset;
	        pfDraggable.element.style.top = "0px";
	        this.model.setPFinBlock(null);
	        return true;
	      }
	    }
	  }, {
	    key: "makeDraggableCopyPF",
	    value: function makeDraggableCopyPF(pfDraggable) {
	      var pfDOM = pfDraggable.$element[0];
	      var pfCopy = {
	        integer: +pfDOM.getAttribute("data-integer"),
	        numerator: +pfDOM.getAttribute("data-numerator"),
	        denominator: +pfDOM.getAttribute("data-denominator"),
	        copy: true,
	        nextSibling: $(pfDOM).next(),
	        prevSibling: $(pfDOM).prev()
	      };
	      this.drawProperFraction(pfCopy);
	    }
	  }]);
	
	  return GameView;
	}();
	
	exports.default = GameView;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _draggabilly = __webpack_require__(4);
	
	var _draggabilly2 = _interopRequireDefault(_draggabilly);
	
	var _numberUtils = __webpack_require__(9);
	
	var _numberUtils2 = _interopRequireDefault(_numberUtils);
	
	var _arrayUtils = __webpack_require__(10);
	
	var _arrayUtils2 = _interopRequireDefault(_arrayUtils);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameController = function () {
	  function GameController() {
	    _classCallCheck(this, GameController);
	  }
	
	  _createClass(GameController, [{
	    key: "init",
	    value: function init(content, model) {
	      this.content = content;
	      this.model = model;
	    }
	  }, {
	    key: "makeProperFractionDraggable",
	    value: function makeProperFractionDraggable(properFractionDOM, properFraction) {
	      var self = this,
	          dragabillySetting = { grid: [1, 1] },
	          pfDraggable = new _draggabilly2.default(properFractionDOM, dragabillySetting);
	      pfDraggable.on("dragEnd", function (event, pointer) {
	        self.isPFinAnswerBlock(pointer, this);
	      });
	      return pfDraggable;
	    }
	  }, {
	    key: "isPFinAnswerBlock",
	    value: function isPFinAnswerBlock(pointer, pfDraggable) {
	      var self = this,
	          inputBlockRect = $(".answerBlock")[0].getBoundingClientRect();
	      if (pointer.pageX >= inputBlockRect.left + pageXOffset && pointer.pageX <= inputBlockRect.right + pageXOffset && pointer.pageY >= inputBlockRect.top + pageYOffset && pointer.pageY <= inputBlockRect.bottom + pageYOffset) {
	        self.model.setPFinBlock(pfDraggable);
	        self.findSum();
	        return true;
	      } else if (pointer.pageX >= inputBlockRect.right + pageXOffset || pointer.pageX <= inputBlockRect.left + pageXOffset) {
	        $(pfDraggable.$element).remove();
	        self.findSum();
	      } else {
	        try {
	          self.model.setPFinBlock(pfDraggable);
	        } catch (e) {
	          $(pfDraggable.$element).remove();
	          return false;
	        }
	        $(pfDraggable.$element).remove();
	        return false;
	      }
	    }
	  }, {
	    key: "findSum",
	    value: function findSum() {
	      var pfAnswer = $(".answerBlock div"),
	          properFractions = [],
	          commonDenominator = void 0,
	          numeratorsSum = 0,
	          integersSum = 0,
	          denominatorMultiples = [],
	          result = {};
	
	      if (!pfAnswer.length) {
	        return false;
	      }
	
	      for (var i = 0; i < pfAnswer.length; i++) {
	        properFractions.push({
	          integer: +pfAnswer[i].getAttribute("data-integer"),
	          numerator: +pfAnswer[i].getAttribute("data-numerator"),
	          denominator: +pfAnswer[i].getAttribute("data-denominator")
	        });
	      }
	
	      if (properFractions.length === 1) {
	        result.integer = properFractions[0].integer;
	        result.numerator = properFractions[0].numerator;
	        result.denominator = properFractions[0].denominator;
	      } else {
	        properFractions.forEach(function (pf) {
	          denominatorMultiples.push(_arrayUtils2.default.arrayToMap(_numberUtils2.default.findMultiples(pf.denominator)));
	        });
	
	        commonDenominator = _numberUtils2.default.findLowestCommonDenominator(denominatorMultiples);
	
	        properFractions.forEach(function (pf) {
	          pf.numerator *= commonDenominator / pf.denominator;
	          pf.denominator = commonDenominator;
	          numeratorsSum += pf.numerator;
	          integersSum += pf.integer;
	        });
	
	        result.denominator = commonDenominator;
	
	        if (numeratorsSum > commonDenominator) {
	          result.integer = Math.floor(numeratorsSum / commonDenominator);
	          result.integer = numeratorsSum - result.integer * commonDenominator;
	          result.integer += integersSum;
	        } else {
	          result.integer = integersSum;
	          result.numerator = numeratorsSum;
	        }
	      }
	
	      console.log(result.integer + " / " + result.numerator + " " + result.denominator);
	
	      return result;
	    }
	  }]);
	
	  return GameController;
	}();
	
	exports.default = GameController;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Draggabilly v2.2.0
	 * Make that shiz draggable
	 * https://draggabilly.desandro.com
	 * MIT license
	 */
	
	/*jshint browser: true, strict: true, undef: true, unused: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*globals define, module, require */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	        __webpack_require__(5),
	        __webpack_require__(6)
	      ], __WEBPACK_AMD_DEFINE_RESULT__ = function( getSize, Unidragger ) {
	        return factory( window, getSize, Unidragger );
	      }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('get-size'),
	      require('unidragger')
	    );
	  } else {
	    // browser global
	    window.Draggabilly = factory(
	      window,
	      window.getSize,
	      window.Unidragger
	    );
	  }
	
	}( window, function factory( window, getSize, Unidragger ) {
	
	'use strict';
	
	// -------------------------- helpers & variables -------------------------- //
	
	// extend objects
	function extend( a, b ) {
	  for ( var prop in b ) {
	    a[ prop ] = b[ prop ];
	  }
	  return a;
	}
	
	function noop() {}
	
	var jQuery = window.jQuery;
	
	// --------------------------  -------------------------- //
	
	function Draggabilly( element, options ) {
	  // querySelector if string
	  this.element = typeof element == 'string' ?
	    document.querySelector( element ) : element;
	
	  if ( jQuery ) {
	    this.$element = jQuery( this.element );
	  }
	
	  // options
	  this.options = extend( {}, this.constructor.defaults );
	  this.option( options );
	
	  this._create();
	}
	
	// inherit Unidragger methods
	var proto = Draggabilly.prototype = Object.create( Unidragger.prototype );
	
	Draggabilly.defaults = {
	};
	
	/**
	 * set options
	 * @param {Object} opts
	 */
	proto.option = function( opts ) {
	  extend( this.options, opts );
	};
	
	// css position values that don't need to be set
	var positionValues = {
	  relative: true,
	  absolute: true,
	  fixed: true
	};
	
	proto._create = function() {
	  // properties
	  this.position = {};
	  this._getPosition();
	
	  this.startPoint = { x: 0, y: 0 };
	  this.dragPoint = { x: 0, y: 0 };
	
	  this.startPosition = extend( {}, this.position );
	
	  // set relative positioning
	  var style = getComputedStyle( this.element );
	  if ( !positionValues[ style.position ] ) {
	    this.element.style.position = 'relative';
	  }
	
	  // events, bridge jQuery events from vanilla
	  this.on( 'pointerDown', this.onPointerDown );
	  this.on( 'pointerMove', this.onPointerMove );
	  this.on( 'pointerUp', this.onPointerUp );
	
	  this.enable();
	  this.setHandles();
	};
	
	/**
	 * set this.handles and bind start events to 'em
	 */
	proto.setHandles = function() {
	  this.handles = this.options.handle ?
	    this.element.querySelectorAll( this.options.handle ) : [ this.element ];
	
	  this.bindHandles();
	};
	
	/**
	 * emits events via EvEmitter and jQuery events
	 * @param {String} type - name of event
	 * @param {Event} event - original event
	 * @param {Array} args - extra arguments
	 */
	proto.dispatchEvent = function( type, event, args ) {
	  var emitArgs = [ event ].concat( args );
	  this.emitEvent( type, emitArgs );
	  this.dispatchJQueryEvent( type, event, args );
	};
	
	proto.dispatchJQueryEvent = function( type, event, args ) {
	  var jQuery = window.jQuery;
	  // trigger jQuery event
	  if ( !jQuery || !this.$element ) {
	    return;
	  }
	  // create jQuery event
	  var $event = jQuery.Event( event );
	  $event.type = type;
	  this.$element.trigger( $event, args );
	};
	
	// -------------------------- position -------------------------- //
	
	// get x/y position from style
	proto._getPosition = function() {
	  var style = getComputedStyle( this.element );
	  var x = this._getPositionCoord( style.left, 'width' );
	  var y = this._getPositionCoord( style.top, 'height' );
	  // clean up 'auto' or other non-integer values
	  this.position.x = isNaN( x ) ? 0 : x;
	  this.position.y = isNaN( y ) ? 0 : y;
	
	  this._addTransformPosition( style );
	};
	
	proto._getPositionCoord = function( styleSide, measure ) {
	  if ( styleSide.indexOf('%') != -1 ) {
	    // convert percent into pixel for Safari, #75
	    var parentSize = getSize( this.element.parentNode );
	    // prevent not-in-DOM element throwing bug, #131
	    return !parentSize ? 0 :
	      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
	  }
	  return parseInt( styleSide, 10 );
	};
	
	// add transform: translate( x, y ) to position
	proto._addTransformPosition = function( style ) {
	  var transform = style.transform;
	  // bail out if value is 'none'
	  if ( transform.indexOf('matrix') !== 0 ) {
	    return;
	  }
	  // split matrix(1, 0, 0, 1, x, y)
	  var matrixValues = transform.split(',');
	  // translate X value is in 12th or 4th position
	  var xIndex = transform.indexOf('matrix3d') === 0 ? 12 : 4;
	  var translateX = parseInt( matrixValues[ xIndex ], 10 );
	  // translate Y value is in 13th or 5th position
	  var translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
	  this.position.x += translateX;
	  this.position.y += translateY;
	};
	
	// -------------------------- events -------------------------- //
	
	proto.onPointerDown = function( event, pointer ) {
	  this.element.classList.add('is-pointer-down');
	  this.dispatchJQueryEvent( 'pointerDown', event, [ pointer ] );
	};
	
	/**
	 * drag start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragStart = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  this._getPosition();
	  this.measureContainment();
	  // position _when_ drag began
	  this.startPosition.x = this.position.x;
	  this.startPosition.y = this.position.y;
	  // reset left/top style
	  this.setLeftTop();
	
	  this.dragPoint.x = 0;
	  this.dragPoint.y = 0;
	
	  this.element.classList.add('is-dragging');
	  this.dispatchEvent( 'dragStart', event, [ pointer ] );
	  // start animation
	  this.animate();
	};
	
	proto.measureContainment = function() {
	  var container = this.getContainer();
	  if ( !container ) {
	    return;
	  }
	
	  var elemSize = getSize( this.element );
	  var containerSize = getSize( container );
	  var elemRect = this.element.getBoundingClientRect();
	  var containerRect = container.getBoundingClientRect();
	
	  var borderSizeX = containerSize.borderLeftWidth + containerSize.borderRightWidth;
	  var borderSizeY = containerSize.borderTopWidth + containerSize.borderBottomWidth;
	
	  var position = this.relativeStartPosition = {
	    x: elemRect.left - ( containerRect.left + containerSize.borderLeftWidth ),
	    y: elemRect.top - ( containerRect.top + containerSize.borderTopWidth )
	  };
	
	  this.containSize = {
	    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
	    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height
	  };
	};
	
	proto.getContainer = function() {
	  var containment = this.options.containment;
	  if ( !containment ) {
	    return;
	  }
	  var isElement = containment instanceof HTMLElement;
	  // use as element
	  if ( isElement ) {
	    return containment;
	  }
	  // querySelector if string
	  if ( typeof containment == 'string' ) {
	    return document.querySelector( containment );
	  }
	  // fallback to parent element
	  return this.element.parentNode;
	};
	
	// ----- move event ----- //
	
	proto.onPointerMove = function( event, pointer, moveVector ) {
	  this.dispatchJQueryEvent( 'pointerMove', event, [ pointer, moveVector ] );
	};
	
	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragMove = function( event, pointer, moveVector ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  var dragX = moveVector.x;
	  var dragY = moveVector.y;
	
	  var grid = this.options.grid;
	  var gridX = grid && grid[0];
	  var gridY = grid && grid[1];
	
	  dragX = applyGrid( dragX, gridX );
	  dragY = applyGrid( dragY, gridY );
	
	  dragX = this.containDrag( 'x', dragX, gridX );
	  dragY = this.containDrag( 'y', dragY, gridY );
	
	  // constrain to axis
	  dragX = this.options.axis == 'y' ? 0 : dragX;
	  dragY = this.options.axis == 'x' ? 0 : dragY;
	
	  this.position.x = this.startPosition.x + dragX;
	  this.position.y = this.startPosition.y + dragY;
	  // set dragPoint properties
	  this.dragPoint.x = dragX;
	  this.dragPoint.y = dragY;
	
	  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
	};
	
	function applyGrid( value, grid, method ) {
	  method = method || 'round';
	  return grid ? Math[ method ]( value / grid ) * grid : value;
	}
	
	proto.containDrag = function( axis, drag, grid ) {
	  if ( !this.options.containment ) {
	    return drag;
	  }
	  var measure = axis == 'x' ? 'width' : 'height';
	
	  var rel = this.relativeStartPosition[ axis ];
	  var min = applyGrid( -rel, grid, 'ceil' );
	  var max = this.containSize[ measure ];
	  max = applyGrid( max, grid, 'floor' );
	  return  Math.max( min, Math.min( max, drag ) );
	};
	
	// ----- end event ----- //
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.onPointerUp = function( event, pointer ) {
	  this.element.classList.remove('is-pointer-down');
	  this.dispatchJQueryEvent( 'pointerUp', event, [ pointer ] );
	};
	
	/**
	 * drag end
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.dragEnd = function( event, pointer ) {
	  if ( !this.isEnabled ) {
	    return;
	  }
	  // use top left position when complete
	  this.element.style.transform = '';
	  this.setLeftTop();
	  this.element.classList.remove('is-dragging');
	  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
	};
	
	// -------------------------- animation -------------------------- //
	
	proto.animate = function() {
	  // only render and animate if dragging
	  if ( !this.isDragging ) {
	    return;
	  }
	
	  this.positionDrag();
	
	  var _this = this;
	  requestAnimationFrame( function animateFrame() {
	    _this.animate();
	  });
	
	};
	
	// left/top positioning
	proto.setLeftTop = function() {
	  this.element.style.left = this.position.x + 'px';
	  this.element.style.top  = this.position.y + 'px';
	};
	
	proto.positionDrag = function() {
	  this.element.style.transform = 'translate3d( ' + this.dragPoint.x +
	    'px, ' + this.dragPoint.y + 'px, 0)';
	};
	
	// ----- staticClick ----- //
	
	proto.staticClick = function( event, pointer ) {
	  this.dispatchEvent( 'staticClick', event, [ pointer ] );
	};
	
	// ----- methods ----- //
	
	/**
	 * @param {Number} x
	 * @param {Number} y
	 */
	proto.setPosition = function( x, y ) {
	  this.position.x = x;
	  this.position.y = y;
	  this.setLeftTop();
	};
	
	proto.enable = function() {
	  this.isEnabled = true;
	};
	
	proto.disable = function() {
	  this.isEnabled = false;
	  if ( this.isDragging ) {
	    this.dragEnd();
	  }
	};
	
	proto.destroy = function() {
	  this.disable();
	  // reset styles
	  this.element.style.transform = '';
	  this.element.style.left = '';
	  this.element.style.top = '';
	  this.element.style.position = '';
	  // unbind handles
	  this.unbindHandles();
	  // remove jQuery data
	  if ( this.$element ) {
	    this.$element.removeData('draggabilly');
	  }
	};
	
	// ----- jQuery bridget ----- //
	
	// required for jQuery bridget
	proto._init = noop;
	
	if ( jQuery && jQuery.bridget ) {
	  jQuery.bridget( 'draggabilly', Draggabilly );
	}
	
	// -----  ----- //
	
	return Draggabilly;
	
	}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * getSize v2.0.3
	 * measure size of elements
	 * MIT license
	 */
	
	/* jshint browser: true, strict: true, undef: true, unused: true */
	/* globals console: false */
	
	( function( window, factory ) {
	  /* jshint strict: false */ /* globals define, module */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory();
	  } else {
	    // browser global
	    window.getSize = factory();
	  }
	
	})( window, function factory() {
	'use strict';
	
	// -------------------------- helpers -------------------------- //
	
	// get a number from a string, not a percentage
	function getStyleSize( value ) {
	  var num = parseFloat( value );
	  // not a percent like '100%', and a number
	  var isValid = value.indexOf('%') == -1 && !isNaN( num );
	  return isValid && num;
	}
	
	function noop() {}
	
	var logError = typeof console == 'undefined' ? noop :
	  function( message ) {
	    console.error( message );
	  };
	
	// -------------------------- measurements -------------------------- //
	
	var measurements = [
	  'paddingLeft',
	  'paddingRight',
	  'paddingTop',
	  'paddingBottom',
	  'marginLeft',
	  'marginRight',
	  'marginTop',
	  'marginBottom',
	  'borderLeftWidth',
	  'borderRightWidth',
	  'borderTopWidth',
	  'borderBottomWidth'
	];
	
	var measurementsLength = measurements.length;
	
	function getZeroSize() {
	  var size = {
	    width: 0,
	    height: 0,
	    innerWidth: 0,
	    innerHeight: 0,
	    outerWidth: 0,
	    outerHeight: 0
	  };
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    size[ measurement ] = 0;
	  }
	  return size;
	}
	
	// -------------------------- getStyle -------------------------- //
	
	/**
	 * getStyle, get style of element, check for Firefox bug
	 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	 */
	function getStyle( elem ) {
	  var style = getComputedStyle( elem );
	  if ( !style ) {
	    logError( 'Style returned ' + style +
	      '. Are you running this code in a hidden iframe on Firefox? ' +
	      'See https://bit.ly/getsizebug1' );
	  }
	  return style;
	}
	
	// -------------------------- setup -------------------------- //
	
	var isSetup = false;
	
	var isBoxSizeOuter;
	
	/**
	 * setup
	 * check isBoxSizerOuter
	 * do on first getSize() rather than on page load for Firefox bug
	 */
	function setup() {
	  // setup once
	  if ( isSetup ) {
	    return;
	  }
	  isSetup = true;
	
	  // -------------------------- box sizing -------------------------- //
	
	  /**
	   * Chrome & Safari measure the outer-width on style.width on border-box elems
	   * IE11 & Firefox<29 measures the inner-width
	   */
	  var div = document.createElement('div');
	  div.style.width = '200px';
	  div.style.padding = '1px 2px 3px 4px';
	  div.style.borderStyle = 'solid';
	  div.style.borderWidth = '1px 2px 3px 4px';
	  div.style.boxSizing = 'border-box';
	
	  var body = document.body || document.documentElement;
	  body.appendChild( div );
	  var style = getStyle( div );
	  // round value for browser zoom. desandro/masonry#928
	  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
	  getSize.isBoxSizeOuter = isBoxSizeOuter;
	
	  body.removeChild( div );
	}
	
	// -------------------------- getSize -------------------------- //
	
	function getSize( elem ) {
	  setup();
	
	  // use querySeletor if elem is string
	  if ( typeof elem == 'string' ) {
	    elem = document.querySelector( elem );
	  }
	
	  // do not proceed on non-objects
	  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
	    return;
	  }
	
	  var style = getStyle( elem );
	
	  // if hidden, everything is 0
	  if ( style.display == 'none' ) {
	    return getZeroSize();
	  }
	
	  var size = {};
	  size.width = elem.offsetWidth;
	  size.height = elem.offsetHeight;
	
	  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';
	
	  // get all measurements
	  for ( var i=0; i < measurementsLength; i++ ) {
	    var measurement = measurements[i];
	    var value = style[ measurement ];
	    var num = parseFloat( value );
	    // any 'auto', 'medium' value will be 0
	    size[ measurement ] = !isNaN( num ) ? num : 0;
	  }
	
	  var paddingWidth = size.paddingLeft + size.paddingRight;
	  var paddingHeight = size.paddingTop + size.paddingBottom;
	  var marginWidth = size.marginLeft + size.marginRight;
	  var marginHeight = size.marginTop + size.marginBottom;
	  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
	  var borderHeight = size.borderTopWidth + size.borderBottomWidth;
	
	  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;
	
	  // overwrite width and height if we can get it from style
	  var styleWidth = getStyleSize( style.width );
	  if ( styleWidth !== false ) {
	    size.width = styleWidth +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
	  }
	
	  var styleHeight = getStyleSize( style.height );
	  if ( styleHeight !== false ) {
	    size.height = styleHeight +
	      // add padding and border unless it's already including it
	      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
	  }
	
	  size.innerWidth = size.width - ( paddingWidth + borderWidth );
	  size.innerHeight = size.height - ( paddingHeight + borderHeight );
	
	  size.outerWidth = size.width + marginWidth;
	  size.outerHeight = size.height + marginHeight;
	
	  return size;
	}
	
	return getSize;
	
	});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unidragger v2.3.0
	 * Draggable base class
	 * MIT license
	 */
	
	/*jshint browser: true, unused: true, undef: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /*jshint strict: false */ /*globals define, module, require */
	
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(7)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( Unipointer ) {
	      return factory( window, Unipointer );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('unipointer')
	    );
	  } else {
	    // browser global
	    window.Unidragger = factory(
	      window,
	      window.Unipointer
	    );
	  }
	
	}( window, function factory( window, Unipointer ) {
	
	'use strict';
	
	// -------------------------- Unidragger -------------------------- //
	
	function Unidragger() {}
	
	// inherit Unipointer & EvEmitter
	var proto = Unidragger.prototype = Object.create( Unipointer.prototype );
	
	// ----- bind start ----- //
	
	proto.bindHandles = function() {
	  this._bindHandles( true );
	};
	
	proto.unbindHandles = function() {
	  this._bindHandles( false );
	};
	
	/**
	 * Add or remove start event
	 * @param {Boolean} isAdd
	 */
	proto._bindHandles = function( isAdd ) {
	  // munge isAdd, default to true
	  isAdd = isAdd === undefined ? true : isAdd;
	  // bind each handle
	  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
	  var touchAction = isAdd ? this._touchActionValue : '';
	  for ( var i=0; i < this.handles.length; i++ ) {
	    var handle = this.handles[i];
	    this._bindStartEvent( handle, isAdd );
	    handle[ bindMethod ]( 'click', this );
	    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
	    if ( window.PointerEvent ) {
	      handle.style.touchAction = touchAction;
	    }
	  }
	};
	
	// prototype so it can be overwriteable by Flickity
	proto._touchActionValue = 'none';
	
	// ----- start event ----- //
	
	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerDown = function( event, pointer ) {
	  var isOkay = this.okayPointerDown( event );
	  if ( !isOkay ) {
	    return;
	  }
	  // track start event position
	  this.pointerDownPointer = pointer;
	
	  event.preventDefault();
	  this.pointerDownBlur();
	  // bind move and end events
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};
	
	// nodes that have text fields
	var cursorNodes = {
	  TEXTAREA: true,
	  INPUT: true,
	  SELECT: true,
	  OPTION: true,
	};
	
	// input types that do not have text fields
	var clickTypes = {
	  radio: true,
	  checkbox: true,
	  button: true,
	  submit: true,
	  image: true,
	  file: true,
	};
	
	// dismiss inputs with text fields. flickity#403, flickity#404
	proto.okayPointerDown = function( event ) {
	  var isCursorNode = cursorNodes[ event.target.nodeName ];
	  var isClickType = clickTypes[ event.target.type ];
	  var isOkay = !isCursorNode || isClickType;
	  if ( !isOkay ) {
	    this._pointerReset();
	  }
	  return isOkay;
	};
	
	// kludge to blur previously focused input
	proto.pointerDownBlur = function() {
	  var focused = document.activeElement;
	  // do not blur body for IE10, metafizzy/flickity#117
	  var canBlur = focused && focused.blur && focused != document.body;
	  if ( canBlur ) {
	    focused.blur();
	  }
	};
	
	// ----- move event ----- //
	
	/**
	 * drag move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerMove = function( event, pointer ) {
	  var moveVector = this._dragPointerMove( event, pointer );
	  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
	  this._dragMove( event, pointer, moveVector );
	};
	
	// base pointer move logic
	proto._dragPointerMove = function( event, pointer ) {
	  var moveVector = {
	    x: pointer.pageX - this.pointerDownPointer.pageX,
	    y: pointer.pageY - this.pointerDownPointer.pageY
	  };
	  // start drag if pointer has moved far enough to start drag
	  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
	    this._dragStart( event, pointer );
	  }
	  return moveVector;
	};
	
	// condition if pointer has moved far enough to start drag
	proto.hasDragStarted = function( moveVector ) {
	  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
	};
	
	// ----- end event ----- //
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	  this._dragPointerUp( event, pointer );
	};
	
	proto._dragPointerUp = function( event, pointer ) {
	  if ( this.isDragging ) {
	    this._dragEnd( event, pointer );
	  } else {
	    // pointer didn't move enough for drag to start
	    this._staticClick( event, pointer );
	  }
	};
	
	// -------------------------- drag -------------------------- //
	
	// dragStart
	proto._dragStart = function( event, pointer ) {
	  this.isDragging = true;
	  // prevent clicks
	  this.isPreventingClicks = true;
	  this.dragStart( event, pointer );
	};
	
	proto.dragStart = function( event, pointer ) {
	  this.emitEvent( 'dragStart', [ event, pointer ] );
	};
	
	// dragMove
	proto._dragMove = function( event, pointer, moveVector ) {
	  // do not drag if not dragging yet
	  if ( !this.isDragging ) {
	    return;
	  }
	
	  this.dragMove( event, pointer, moveVector );
	};
	
	proto.dragMove = function( event, pointer, moveVector ) {
	  event.preventDefault();
	  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
	};
	
	// dragEnd
	proto._dragEnd = function( event, pointer ) {
	  // set flags
	  this.isDragging = false;
	  // re-enable clicking async
	  setTimeout( function() {
	    delete this.isPreventingClicks;
	  }.bind( this ) );
	
	  this.dragEnd( event, pointer );
	};
	
	proto.dragEnd = function( event, pointer ) {
	  this.emitEvent( 'dragEnd', [ event, pointer ] );
	};
	
	// ----- onclick ----- //
	
	// handle all clicks and prevent clicks when dragging
	proto.onclick = function( event ) {
	  if ( this.isPreventingClicks ) {
	    event.preventDefault();
	  }
	};
	
	// ----- staticClick ----- //
	
	// triggered after pointer down & up with no/tiny movement
	proto._staticClick = function( event, pointer ) {
	  // ignore emulated mouse up clicks
	  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
	    return;
	  }
	
	  this.staticClick( event, pointer );
	
	  // set flag for emulated clicks 300ms after touchend
	  if ( event.type != 'mouseup' ) {
	    this.isIgnoringMouseUp = true;
	    // reset flag after 300ms
	    setTimeout( function() {
	      delete this.isIgnoringMouseUp;
	    }.bind( this ), 400 );
	  }
	};
	
	proto.staticClick = function( event, pointer ) {
	  this.emitEvent( 'staticClick', [ event, pointer ] );
	};
	
	// ----- utils ----- //
	
	Unidragger.getPointerPoint = Unipointer.getPointerPoint;
	
	// -----  ----- //
	
	return Unidragger;
	
	}));


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Unipointer v2.3.0
	 * base class for doing one thing with pointer event
	 * MIT license
	 */
	
	/*jshint browser: true, undef: true, unused: true, strict: true */
	
	( function( window, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /*global define, module, require */
	  if ( true ) {
	    // AMD
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
	      __webpack_require__(8)
	    ], __WEBPACK_AMD_DEFINE_RESULT__ = function( EvEmitter ) {
	      return factory( window, EvEmitter );
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS
	    module.exports = factory(
	      window,
	      require('ev-emitter')
	    );
	  } else {
	    // browser global
	    window.Unipointer = factory(
	      window,
	      window.EvEmitter
	    );
	  }
	
	}( window, function factory( window, EvEmitter ) {
	
	'use strict';
	
	function noop() {}
	
	function Unipointer() {}
	
	// inherit EvEmitter
	var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );
	
	proto.bindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, true );
	};
	
	proto.unbindStartEvent = function( elem ) {
	  this._bindStartEvent( elem, false );
	};
	
	/**
	 * Add or remove start event
	 * @param {Boolean} isAdd - remove if falsey
	 */
	proto._bindStartEvent = function( elem, isAdd ) {
	  // munge isAdd, default to true
	  isAdd = isAdd === undefined ? true : isAdd;
	  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
	
	  // default to mouse events
	  var startEvent = 'mousedown';
	  if ( window.PointerEvent ) {
	    // Pointer Events
	    startEvent = 'pointerdown';
	  } else if ( 'ontouchstart' in window ) {
	    // Touch Events. iOS Safari
	    startEvent = 'touchstart';
	  }
	  elem[ bindMethod ]( startEvent, this );
	};
	
	// trigger handler methods for events
	proto.handleEvent = function( event ) {
	  var method = 'on' + event.type;
	  if ( this[ method ] ) {
	    this[ method ]( event );
	  }
	};
	
	// returns the touch that we're keeping track of
	proto.getTouch = function( touches ) {
	  for ( var i=0; i < touches.length; i++ ) {
	    var touch = touches[i];
	    if ( touch.identifier == this.pointerIdentifier ) {
	      return touch;
	    }
	  }
	};
	
	// ----- start event ----- //
	
	proto.onmousedown = function( event ) {
	  // dismiss clicks from right or middle buttons
	  var button = event.button;
	  if ( button && ( button !== 0 && button !== 1 ) ) {
	    return;
	  }
	  this._pointerDown( event, event );
	};
	
	proto.ontouchstart = function( event ) {
	  this._pointerDown( event, event.changedTouches[0] );
	};
	
	proto.onpointerdown = function( event ) {
	  this._pointerDown( event, event );
	};
	
	/**
	 * pointer start
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 */
	proto._pointerDown = function( event, pointer ) {
	  // dismiss right click and other pointers
	  // button = 0 is okay, 1-4 not
	  if ( event.button || this.isPointerDown ) {
	    return;
	  }
	
	  this.isPointerDown = true;
	  // save pointer identifier to match up touch events
	  this.pointerIdentifier = pointer.pointerId !== undefined ?
	    // pointerId for pointer events, touch.indentifier for touch events
	    pointer.pointerId : pointer.identifier;
	
	  this.pointerDown( event, pointer );
	};
	
	proto.pointerDown = function( event, pointer ) {
	  this._bindPostStartEvents( event );
	  this.emitEvent( 'pointerDown', [ event, pointer ] );
	};
	
	// hash of events to be bound after start event
	var postStartEvents = {
	  mousedown: [ 'mousemove', 'mouseup' ],
	  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
	  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
	};
	
	proto._bindPostStartEvents = function( event ) {
	  if ( !event ) {
	    return;
	  }
	  // get proper events to match start event
	  var events = postStartEvents[ event.type ];
	  // bind events to node
	  events.forEach( function( eventName ) {
	    window.addEventListener( eventName, this );
	  }, this );
	  // save these arguments
	  this._boundPointerEvents = events;
	};
	
	proto._unbindPostStartEvents = function() {
	  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
	  if ( !this._boundPointerEvents ) {
	    return;
	  }
	  this._boundPointerEvents.forEach( function( eventName ) {
	    window.removeEventListener( eventName, this );
	  }, this );
	
	  delete this._boundPointerEvents;
	};
	
	// ----- move event ----- //
	
	proto.onmousemove = function( event ) {
	  this._pointerMove( event, event );
	};
	
	proto.onpointermove = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerMove( event, event );
	  }
	};
	
	proto.ontouchmove = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerMove( event, touch );
	  }
	};
	
	/**
	 * pointer move
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerMove = function( event, pointer ) {
	  this.pointerMove( event, pointer );
	};
	
	// public
	proto.pointerMove = function( event, pointer ) {
	  this.emitEvent( 'pointerMove', [ event, pointer ] );
	};
	
	// ----- end event ----- //
	
	
	proto.onmouseup = function( event ) {
	  this._pointerUp( event, event );
	};
	
	proto.onpointerup = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerUp( event, event );
	  }
	};
	
	proto.ontouchend = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerUp( event, touch );
	  }
	};
	
	/**
	 * pointer up
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerUp = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerUp( event, pointer );
	};
	
	// public
	proto.pointerUp = function( event, pointer ) {
	  this.emitEvent( 'pointerUp', [ event, pointer ] );
	};
	
	// ----- pointer done ----- //
	
	// triggered on pointer up & pointer cancel
	proto._pointerDone = function() {
	  this._pointerReset();
	  this._unbindPostStartEvents();
	  this.pointerDone();
	};
	
	proto._pointerReset = function() {
	  // reset properties
	  this.isPointerDown = false;
	  delete this.pointerIdentifier;
	};
	
	proto.pointerDone = noop;
	
	// ----- pointer cancel ----- //
	
	proto.onpointercancel = function( event ) {
	  if ( event.pointerId == this.pointerIdentifier ) {
	    this._pointerCancel( event, event );
	  }
	};
	
	proto.ontouchcancel = function( event ) {
	  var touch = this.getTouch( event.changedTouches );
	  if ( touch ) {
	    this._pointerCancel( event, touch );
	  }
	};
	
	/**
	 * pointer cancel
	 * @param {Event} event
	 * @param {Event or Touch} pointer
	 * @private
	 */
	proto._pointerCancel = function( event, pointer ) {
	  this._pointerDone();
	  this.pointerCancel( event, pointer );
	};
	
	// public
	proto.pointerCancel = function( event, pointer ) {
	  this.emitEvent( 'pointerCancel', [ event, pointer ] );
	};
	
	// -----  ----- //
	
	// utility function for getting x/y coords from event
	Unipointer.getPointerPoint = function( pointer ) {
	  return {
	    x: pointer.pageX,
	    y: pointer.pageY
	  };
	};
	
	// -----  ----- //
	
	return Unipointer;
	
	}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * EvEmitter v1.1.0
	 * Lil' event emitter
	 * MIT License
	 */
	
	/* jshint unused: true, undef: true, strict: true */
	
	( function( global, factory ) {
	  // universal module definition
	  /* jshint strict: false */ /* globals define, module, window */
	  if ( true ) {
	    // AMD - RequireJS
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if ( typeof module == 'object' && module.exports ) {
	    // CommonJS - Browserify, Webpack
	    module.exports = factory();
	  } else {
	    // Browser globals
	    global.EvEmitter = factory();
	  }
	
	}( typeof window != 'undefined' ? window : this, function() {
	
	"use strict";
	
	function EvEmitter() {}
	
	var proto = EvEmitter.prototype;
	
	proto.on = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // set events hash
	  var events = this._events = this._events || {};
	  // set listeners array
	  var listeners = events[ eventName ] = events[ eventName ] || [];
	  // only add once
	  if ( listeners.indexOf( listener ) == -1 ) {
	    listeners.push( listener );
	  }
	
	  return this;
	};
	
	proto.once = function( eventName, listener ) {
	  if ( !eventName || !listener ) {
	    return;
	  }
	  // add event
	  this.on( eventName, listener );
	  // set once flag
	  // set onceEvents hash
	  var onceEvents = this._onceEvents = this._onceEvents || {};
	  // set onceListeners object
	  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
	  // set flag
	  onceListeners[ listener ] = true;
	
	  return this;
	};
	
	proto.off = function( eventName, listener ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  var index = listeners.indexOf( listener );
	  if ( index != -1 ) {
	    listeners.splice( index, 1 );
	  }
	
	  return this;
	};
	
	proto.emitEvent = function( eventName, args ) {
	  var listeners = this._events && this._events[ eventName ];
	  if ( !listeners || !listeners.length ) {
	    return;
	  }
	  // copy over to avoid interference if .off() in listener
	  listeners = listeners.slice(0);
	  args = args || [];
	  // once stuff
	  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];
	
	  for ( var i=0; i < listeners.length; i++ ) {
	    var listener = listeners[i]
	    var isOnce = onceListeners && onceListeners[ listener ];
	    if ( isOnce ) {
	      // remove listener
	      // remove before trigger to prevent recursion
	      this.off( eventName, listener );
	      // unset once flag
	      delete onceListeners[ listener ];
	    }
	    // trigger listener
	    listener.apply( this, args );
	  }
	
	  return this;
	};
	
	proto.allOff = function() {
	  delete this._events;
	  delete this._onceEvents;
	};
	
	return EvEmitter;
	
	}));


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var NumberUtils = function () {
	  function NumberUtils() {
	    _classCallCheck(this, NumberUtils);
	  }
	
	  _createClass(NumberUtils, null, [{
	    key: "findPrimes",
	    value: function findPrimes(number) {
	      var result = [];
	      nextPrime: for (var i = 2; i <= number; i++) {
	        for (var j = 2; j < i; j++) {
	          if (i % j === 0) continue nextPrime;
	        }
	        result.push(i);
	      }
	      return result;
	    }
	  }, {
	    key: "findMultiples",
	    value: function findMultiples(number) {
	      var result = [],
	          primes = this.findPrimes(number);
	      for (var i = 0; i < primes.length; i++) {
	        if (number % primes[i] === 0) {
	          result.push(primes[i]);
	          number /= primes[i];
	          --i;
	        }
	      }
	      return result;
	    }
	  }, {
	    key: "getRandomInteger",
	    value: function getRandomInteger(min, max) {
	      return Math.floor(min + Math.random() * (max + 1 - min));
	    }
	  }, {
	    key: "findLowestCommonDenominator",
	    value: function findLowestCommonDenominator(arrayOfMaps) {
	      var commonMultiples = new Map();
	      var result = 1;
	      arrayOfMaps.forEach(function (map) {
	        map.forEach(function (value, key) {
	          if (commonMultiples.has(key)) {
	            if (commonMultiples.get(key) < value) {
	              commonMultiples.set(key, value);
	            }
	          } else {
	            commonMultiples.set(key, value);
	          }
	        });
	      });
	      commonMultiples.forEach(function (value, key) {
	        result *= Math.pow(key, value);
	      });
	      return result;
	    }
	  }]);
	
	  return NumberUtils;
	}();
	
	exports.default = NumberUtils;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ArrayUtils = function () {
	  function ArrayUtils() {
	    _classCallCheck(this, ArrayUtils);
	  }
	
	  _createClass(ArrayUtils, null, [{
	    key: "arrayToMap",
	    value: function arrayToMap(array) {
	      var map = new Map();
	      array.forEach(function (element) {
	        if (map.has(element)) {
	          map.set(element, map.get(element) + 1);
	        } else {
	          map.set(element, 1);
	        }
	      });
	      return map;
	    }
	  }]);
	
	  return ArrayUtils;
	}();
	
	exports.default = ArrayUtils;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map