<?php
session_start();
error_reporting(-1);
define('ROOT_PATH', __DIR__.'/../../../');
include ROOT_PATH.'api/php/app/util.php';
include ROOT_PATH.'api/php/app/loader.php';
$loader = new Loader($_POST['compiled']);
$loader->include_folders([
	'public',
	'app/app'
]);
send(['files' => $loader->files]);