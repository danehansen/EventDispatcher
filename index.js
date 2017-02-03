"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CALLBACKS = {};

function _addEventListener(callbackHolder, type, listener) {
	var callbacks = callbackHolder[type];
	if (!callbacks) {
		callbacks = [];
		callbackHolder[type] = callbacks;
	}
	if (callbacks.indexOf(listener) < 0) {
		callbacks.push(listener);
	}
}

function _removeEventListener(callbackHolder, type, listener) {
	var callbacks = callbackHolder[type];
	if (callbacks) {
		var index = callbacks.indexOf(listener);
		if (index >= 0) {
			callbacks.splice(index, 1);
		}
	}
}

var EventDispatcher = function () {
	_createClass(EventDispatcher, null, [{
		key: "addEventListener",
		value: function addEventListener(type, listener) {
			_addEventListener(CALLBACKS, type, listener);
		}
	}, {
		key: "removeEventListener",
		value: function removeEventListener(type, listener) {
			_removeEventListener(CALLBACKS, type, listener);
		}
	}, {
		key: "dispatchEvent",
		value: function dispatchEvent(type) {
			var callbacks = CALLBACKS[type];
			if (callbacks) {
				for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
					args[_key - 1] = arguments[_key];
				}

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var callback = _step.value;

						callback.apply(undefined, args);
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
			}
		}
	}]);

	function EventDispatcher(target) {
		var _this = this;

		_classCallCheck(this, EventDispatcher);

		this.addEventListener = function (type, listener) {
			_addEventListener(_this._callbacks, type, listener);
		};

		this.removeEventListener = function (type, listener) {
			_removeEventListener(_this._callbacks, type, listener);
		};

		this.clearEventListeners = function () {
			_this._callbacks = {};
		};

		this.dispatchEvent = function (type) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			var callbacks = _this._callbacks[type];
			if (callbacks) {
				var obj = { target: _this._target, type: type };
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = callbacks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var callback = _step2.value;

						callback.apply(undefined, [obj].concat(args));
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		};

		this._target = target || this;
		this.clearEventListeners();
	}

	return EventDispatcher;
}();

exports.default = EventDispatcher;
