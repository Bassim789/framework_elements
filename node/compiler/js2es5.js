class Js2es5 {
	constructor() {
		this.root = '../www/'
		this.folders = [
			'public',
			'app/app',
			'app/starter'
		]
		this.exec = require('child_process').exec
		this.walk = require('walk')
		this.files = []
		this.nb_folder_started = 0
		this.nb_file_done = 0
		this.run()
		this.start_time = new Date()
	}
	puts(error, stdout, stderr) {
		let that = js2es5
		that.nb_file_done += 1
		if (stderr) console.log(stderr)
		if (error) console.log(error)
		let filename = stdout.trim()
		let time = (new Date() - that.start_time) / 1000
		console.log(filename + ' ' + time + 's')
	}
	run() {
		for (let i in this.folders) {
			let walker = this.walk.walk(this.root + this.folders[i], { followLinks: false })
			walker.on('file', (root, stat, next) => {
				if (stat.name.endsWith('.js') && !stat.name.endsWith('_compiled.js')) {
					let path_and_file = root + '/' + stat.name,
						path_and_file_compiled = path_and_file.replace('.js', '_compiled.js')
					this.exec(
						`babel ${path_and_file} --out-file ${path_and_file_compiled};
						echo ${stat.name}`,
						this.puts
					)
					this.files.push(root + '/' + stat.name)
				}
				setTimeout(() => next(), 1000)
			})
			walker.on('end', () => {
				this.nb_folder_started += 1
				if (this.nb_folder_started === this.folders.length) {
					console.log(this.files.length + ' files compiled')
				}
			})
		}
	}
}
let js2es5 = new Js2es5()