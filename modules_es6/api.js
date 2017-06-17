$.api = function(url, action, data, callback) {
	let stack = new Error().stack
	return $.post(url + '?action=' + action, data, callback, 'json')
		.fail((data) => {
			console.error([
				'url api: ' + url, 
				'response: ' + data.responseText,
				'stack: ' + stack
			].join('\n'))
		})
}