<?php
session_start();
error_reporting(-1);
define('ROOT_PATH', __DIR__.'/../../../');
include ROOT_PATH.'api/php/app/util.php';
include ROOT_PATH.'api/php/app/loader.php';
$is_compiled = $_POST['compiled'] === 'true';
$loader = new Loader($is_compiled, $_POST['folder_compiled']);
$loader->include_folders([
	'public',
	'app/app'
]);
send(['files' => $loader->files]);