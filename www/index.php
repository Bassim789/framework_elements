<?php
define('ROOT_PATH', realpath(__DIR__.'/../').'/');
define('ROOT_PATH_PHP', ROOT_PATH.'php/');
define('ROOT_PATH_WWW', ROOT_PATH.'www/');
require_once ROOT_PATH_PHP.'util.php';
require_once ROOT_PATH_PHP.'/lib/mustache/Autoloader.php';
require_once ROOT_PATH_PHP.'loader.php';
$config_file = file_get_contents(ROOT_PATH_WWW.'config.json');
$config = json_decode($config_file, true);
$loader = new Loader($config['compiled'], $config['folder_compiled']);
$loader->include_folders([
	'public',
	'app/app'
]);
$ressources = $loader->get_ressources();
Mustache_Autoloader::register();
$mustache = new Mustache_Engine;
$template = file_get_contents(ROOT_PATH_WWW.'index_template.html');
echo $mustache->render($template, [
	'ressources' => $ressources,
	'gvar' => [
		'watcher' => $config['watcher'] ? 'true' : 'false'
	]
]);