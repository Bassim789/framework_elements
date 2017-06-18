<?php
class Loader {
	function __construct() {
		$this->files = [];
	}
	function include_folders($folders) {
		foreach ($folders as $key => $folder) {
			self::include_files(ROOT_PATH.$folder);
		}
	}
	function include_files($file) {
		if (is_dir($file)) {
			foreach (glob($file.'/*') as $key => $sub) {
				self::include_files($sub);
			}
		} else {
			$file = explode(ROOT_PATH, $file)[1];
			if (endsWith($file, '.js')) {
				$this->files[] = [
					'type' => 'js',
					'url' => $file,
					'timestamp' => filemtime(ROOT_PATH.$file)
				];
			} else if (endsWith($file, '.css')) {
				$this->files[] = [
					'type' => 'css',
					'url' => $file,
					'timestamp' => filemtime(ROOT_PATH.$file)
				];
			} else if (endsWith($file, '.html')) {
				$this->files[] = [
					'type' => 'html',
					'content' => file_get_contents(ROOT_PATH.$file)
				];
			}
		}
	}
}