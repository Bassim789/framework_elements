<?php
// API
function action($action) {
	return isset($_GET['action']) && $_GET['action'] === $action;
}
function send($arr) {
	die(json_encode($arr));
}
function send_ok() {
	send(['state' => 'ok']);
}
// STRING
function startsWith($haystack, $needle) {
	return $needle === "" || strrpos($haystack, $needle, -strlen($haystack)) !== false;
}
function endsWith($haystack, $needle) {
	return  $needle === "" || (($temp = strlen($haystack) - strlen($needle)) >= 0 && 
			strpos($haystack, $needle, $temp) !== false);
}