'use strict';

$.api = function (url, action, data, callback) {
	var stack = new Error().stack;
	url += '?action=' + action;
	return $.post(url, data, callback, 'json').fail(function (data) {
		console.error(['url api: ' + url, 'response: ' + data.responseText, 'stack: ' + stack].join('\n'));
	});
};
