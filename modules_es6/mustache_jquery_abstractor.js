$.fn.extend({
	template: function(template, data) {
		if(data === undefined) data = {}
		this.html(Mustache.render(
			$('template[template="' + template + '"]').html(), data
		))
	},
	template_append: function(template, data) {
		if(data === undefined) data = {}
		this.append(Mustache.render(
			$('template[template="' + template + '"]').html(), data
		))
	}
})