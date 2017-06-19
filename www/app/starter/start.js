const pages = {},
	gvar = {}
let router
gvar.compiled = false
gvar.watcher = false
gvar.img = {}
gvar.img.default_desktop = 'app/media/img/back2.jpg'
gvar.img.default_mobile = 'app/media/img/back2.jpg'
new Loader(gvar.compiled, () => {
	const header = new Header(),
		body = new Body(),
		watcher = new Watcher
	router = new Router('/framework_elements/www/')
	router.load_page()
	$('#splash_screen').fadeOut(500)
})