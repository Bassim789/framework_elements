class Watcher{
	constructor(){
		this.root = '../www/'
		this.folders = [
			'public',
			'app/app',
			'app/starter']
		this.nb_file = 0
		this.nb_styl = 0
		this.nb_folder_started = 0
		this.connect()
		this.exec = require('child_process').exec
		this.watcher()
	}
	connect(){
		const port = 3013
		const fs = require('fs')
		const app = require('express')()
		/*
		const server = require('https').createServer({
			key: fs.readFileSync('./ssl/ssl.key'),
			cert: fs.readFileSync('./ssl/ssl.crt'),
			ca: fs.readFileSync('./ssl/ca_certif.crt'),
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
					console.log(`${this.nb_file}  files watched and ${this.nb_styl} stylus live compiled`)
				}
			})
		}
	}
	update(file){
		if (file.endsWith('.styl')){
			let root = file.substring(0, file.lastIndexOf('/') + 1)
			console.log('update styl: ' + file)
			this.exec(`stylus ${file} --out ${root}`, (e, stdout, stderr) => {
				if (stderr) console.log(stderr)
			})
		} else {
			this.io.sockets.emit('file_updated', {file_name: file}) 
		}
	}
}
new Watcher()