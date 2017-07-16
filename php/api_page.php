<?php
class Api_page {
	function __construct($root) {
		$this->root = $root;
		$this->api_page_list = [];
	}
	function add_api_pages($file) {
		if (is_dir($file)) {
			foreach (glob($file.'/*') as $key => $sub) {
				self::add_api_pages($sub);
			}
		} else {
			$this->api_page_list[] = trim(trim(explode($this->root, $file)[1], '.php'), '/');
		}
	}
}