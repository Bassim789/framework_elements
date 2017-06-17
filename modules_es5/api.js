'use strict';

$.api = function (url, action, data, callback) {
	var stack = new Error().stack;
	return $.post(url + '?action=' + action, data, callback, 'json').fail(function (data) {
		console.error(['url api: ' + url, 'response: ' + data.responseText, 'stack: ' + stack].join('\n'));
	});
};