class Watcher{
	constructor(data){
		this.root = data.root
		this.folder_compiled = data.folder_compiled
		this.folders = data.folders
		this.nb_file = 0
		this.nb_styl = 0
		this.nb_folder_started = 0
		this.connect()
		this.exec = require('child_process').exec
		this.fs = require('fs')
		this.watcher()
	}
	connect(){
		const port = 3013
		const app = require('express')()
		/*
		const server = require('https').createServer({
			key: this.fs.readFileSync('./ssl/ssl.key'),
			cert: this.fs.readFileSync('./ssl/ssl.crt'),
			ca: this.fs.readFileSync('./ssl/ca_certif.crt'),
			requestCert: false,
			rejectUnauthorized: false
		}, app)
		*/
		const server = require('http').createServer()
		this.io = require('socket.io').listen(server)
		server.listen(port, () => {
			console.log('Watcher running on port ' + port)
		})
	}
	watcher(){
		const chokidar = require('chokidar')
		const walk = require('walk')
		const watcher = chokidar.watch('file, dir, glob, or array', {ignored: /[\/\\]\./, persistent: true})
		watcher.on('change', (path, stats) => this.update(path))
		for (var i in this.folders) {
			let walker = walk.walk(this.root + this.folders[i], { followLinks: false })
			walker.on('file', (root, stat, next) => {
				if (stat.name.endsWith('.html') ||
					stat.name.endsWith('.js') ||
					stat.name.endsWith('.css') ||
					stat.name.endsWith('.styl')){
					let path_and_file = root + '/' + stat.name
					watcher.add(path_and_file)
					console.log(path_and_file)
					this.nb_file += 1
				}
				if (stat.name.endsWith('.styl')) {
					this.nb_styl += 1
				}
				next()
			})
			walker.on('end', () => {
				this.nb_folder_started += 1
				if (this.nb_folder_started === this.folders.length) {
					console.log(`${this.nb_file} files watched and ${this.nb_styl} stylus live compiled`)
				}
			})
		}
	}
	force_directory_sync(directory) {  
		if (!this.fs.existsSync(directory)){
			let parent_dir = directory.substring(0, directory.slice(0, -1).lastIndexOf('/') + 1)
			this.force_directory_sync(parent_dir)
			this.fs.mkdirSync(directory)
		}
	}
	update(file){
		if (file.endsWith('.styl')){
			const path = file.substring(0, file.lastIndexOf('/') + 1),
				root_compiled = this.root + this.folder_compiled + '/',
				path_compiled = root_compiled + path.split(this.root)[1]
			this.force_directory_sync(path_compiled)
			this.exec(`stylus ${file} --out ${path_compiled}`, (e, stdout, stderr) => {
				if (stderr) console.log(stderr)
				let css_file = path_compiled + file.substring(file.lastIndexOf('/') + 1)
				css_file = css_file.replace('.styl', '.css')
				this.io.sockets.emit('file_updated', {file_name: css_file})
			})
		} else {
			this.io.sockets.emit('file_updated', {file_name: file})
		}
	}
}
const watcher = new Watcher({
	root: 'www/',
	folder_compiled: 'compiled',
	folders: [
		'public',
		'app/app',
		'app/starter'
	]
})
