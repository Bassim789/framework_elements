class App {
	constructor(){
		this.header = new Header()
		this.body = new Body()
		this.watcher = new Watcher()
		this.router = new Router('/framework_elements/www/')
		this.router.load_page()
		$('#splash_screen').fadeOut(500)
	}
}