<?php
session_start();
error_reporting(-1);
define('ROOT_PATH', realpath(__DIR__.'/../').'/');
define('ROOT_PATH_PHP', ROOT_PATH.'php/');
define('ROOT_PATH_WWW', ROOT_PATH.'www/');
include ROOT_PATH_PHP.'util.php';
include ROOT_PATH_PHP.'api_page.php';
$api_page = new Api_page(ROOT_PATH_PHP.'api');
$api_page->add_api_pages($api_page->root);
if (in_array($_GET['api_page'], $api_page->api_page_list)){
	include ROOT_PATH.'php/api/'.$_GET['api_page'].'.php';
} else {
	die(json_encode(['err' => 'api_page not found']));
}