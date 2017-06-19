let Loader = class {
	constructor(compiled, callback) {
		this.compiled = compiled
		this.callback = callback
		this.nb_file_loaded = 0
		this.nb_file_to_load = 0
		this.head = $('head')
		this.run()
	}
	run() {
		$.post('api/php/app/load_ressources', {
			compiled: this.compiled
		}, (data) => {
			this.nb_file_to_load = data.files.length
			this.load_files(data.files)
		}, 'json')
	}
	load_files(files) {
		$.each(files, (key, file) => {
			if (file.type === 'js') {
				let script = document.createElement('script')
				script.setAttribute('src', file.url + '?t=' + file.timestamp)
				document.getElementsByTagName('head')[0].appendChild(script)
				script.onload = () => this.add_file_loaded()
			}
			else if (file.type === 'css') {
				let script = document.createElement('link')
				script.setAttribute('rel', 'stylesheet')
				script.setAttribute('href', file.url + '?t=' + file.timestamp)
				this.head.prepend(script)
				script.onload = () => this.add_file_loaded()
			}
			else if (file.type === 'html') {
				this.head.append(file.content)
				this.add_file_loaded()
			}
		})
	}
	add_file_loaded() {
		this.nb_file_loaded += 1
		if (this.nb_file_loaded === this.nb_file_to_load) this.callback()
	}
}