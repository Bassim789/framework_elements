$.api = function(url, action, data, callback) {
	const stack = new Error().stack
	url += '?action=' + action
	return $.post(url, data, callback, 'json').fail((data) => {
		console.error([
			'url api: ' + url, 
			'response: ' + data.responseText,
			'stack: ' + stack
		].join('\n'))
	})
}

$.api_php = function(api_page, action, data, callback) {
	const stack = new Error().stack
	const url = 'php_api?api_page=' + api_page + '&action=' + action
	return $.post(url, data, callback, 'json').fail((data) => {
		console.error([
			'url api: ' + api_page, 
			'response: ' + data.responseText,
			'stack: ' + stack
		].join('\n'))
	})
}