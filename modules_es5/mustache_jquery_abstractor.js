'use strict';

$.fn.extend({
	template: function template(_template, data) {
		if (data === undefined) data = {};
		this.html(Mustache.render($('template[template="' + _template + '"]').html(), data));
	},
	template_append: function template_append(template, data) {
		if (data === undefined) data = {};
		this.append(Mustache.render($('template[template="' + template + '"]').html(), data));
	}
});