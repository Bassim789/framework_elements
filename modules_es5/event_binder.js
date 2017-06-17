'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event_binder = function () {
	function Event_binder(source, events) {
		_classCallCheck(this, Event_binder);

		this.each_event(source, events);
	}

	_createClass(Event_binder, [{
		key: 'each_event',
		value: function each_event(source, events) {
			var _this = this;

			$.each(events, function (event, actions) {
				$.each(actions, function (i, action) {
					_this.bind(source, event, action);
				});
			});
		}
	}, {
		key: 'bind',
		value: function bind(source, event, action) {
			var id = '[event~="' + event + ':' + action + '"]';
			if (event === 'enter') {
				$('body').off('keyup', id).on('keyup', id, function (e) {
					if (e.which == 13) {
						return source[action](this, e);
					}
				});
			} else {
				$('body').off(event, id).on(event, id, function (e) {
					return source[action](this, e);
				});
			}
		}
	}]);

	return Event_binder;
}();