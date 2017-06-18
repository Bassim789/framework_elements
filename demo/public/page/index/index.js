pages.index = class{
	constructor(){
		$('#body').template('page_index', {
			name: 'your name'
		})
		new Event_binder(this, '#body', {
			click: [
				'header_clicked',
				'go_to_page_2',
				'test_api'
			]
		})
	}
	header_clicked(){
		alert('header_clicked from page 1')
	}
	go_to_page_2(){
		new pages.Page_2()
	}
	test_api(){
		$.api('api/data1.json', '', {}, (data) => {
			console.log(data)
		})
	}
}