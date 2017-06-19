const Header = class {
	constructor(){
		$('header').template('header')
		new Event_binder(this, 'header', {
			click: ['header_clicked']
		})
	}
	header_clicked(){
		alert('header_clicked real')
	}
}