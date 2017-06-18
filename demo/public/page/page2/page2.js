pages.Page_2 = class{
	constructor(){
		$('#body').template('page_2')
		new Event_binder(this, '#body', {
			click: [
				'go_to_page_1',
				'click_on_input'
			],
			enter: ['press_enter'],
			keyup: ['which_key']
		})
	}
	go_to_page_1(){
		new pages.index()
	}
	click_on_input(){
		console.log('click_on_input')
	}
	press_enter(){
		console.log('press_enter')
	}
	which_key(el, event){
		console.log('key: ' + event.which)
	}
}