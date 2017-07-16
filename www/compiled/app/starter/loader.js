'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = function () {
	function Loader(compiled, folder_compiled, callback) {
		_classCallCheck(this, Loader);

		this.compiled = compiled;
		this.folder_compiled = folder_compiled;
		this.callback = callback;
		this.nb_file_loaded = 0;
		this.nb_file_to_load = 0;
		this.head = $('head');
		this.run();
	}

	_createClass(Loader, [{
		key: 'run',
		value: function run() {
			var _this = this;

			$.post('api/php/app/load_ressources', {
				compiled: this.compiled,
				folder_compiled: this.folder_compiled
			}, function (data) {
				_this.nb_file_to_load = data.files.length;
				_this.load_files(data.files);
			}, 'json').fail(function (err) {
				console.log(err.responseText);
			});
		}
	}, {
		key: 'load_files',
		value: function load_files(files) {
			var _this2 = this;

			$.each(files, function (key, file) {
				if (file.type === 'js') {
					var script = document.createElement('script');
					script.setAttribute('src', file.url + '?t=' + file.timestamp);
					document.getElementsByTagName('head')[0].appendChild(script);
					script.onload = function () {
						return _this2.add_file_loaded();
					};
				} else if (file.type === 'css') {
					var _script = document.createElement('link');
					_script.setAttribute('rel', 'stylesheet');
					_script.setAttribute('href', file.url + '?t=' + file.timestamp);
					_this2.head.prepend(_script);
					_script.onload = function () {
						return _this2.add_file_loaded();
					};
				} else if (file.type === 'html') {
					_this2.head.append(file.content);
					_this2.add_file_loaded();
				}
			});
		}
	}, {
		key: 'add_file_loaded',
		value: function add_file_loaded() {
			this.nb_file_loaded += 1;
			if (this.nb_file_loaded === this.nb_file_to_load) this.callback();
		}
	}]);

	return Loader;
}();
