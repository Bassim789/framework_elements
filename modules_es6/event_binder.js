let Event_binder = class {
	constructor(source, events) {
		this.each_event(source, events)
	}
	each_event(source, events) {
		$.each(events, (event, actions) => {
			$.each(actions, (i, action) => {
				this.bind(source, event, action)
			})
		})
	}
	bind(source, event, action) {
		let id = '[event~="' + event + ':' + action + '"]'
		if (event === 'enter') {
			$('body').off('keyup', id).on('keyup', id, function(e) {
				if (e.which == 13) {
					return source[action](this, e)
				}
			})
		} else {
			$('body').off(event, id).on(event, id, function(e) {
				return source[action](this, e)
			})
		}
	}
}