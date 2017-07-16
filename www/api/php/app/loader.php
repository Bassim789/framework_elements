<?php
class Loader {
	function __construct($compiled, $folder_compiled) {
		$this->compiled = $compiled;
		$this->folder_compiled = $folder_compiled;
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
				if ($this->compiled){
					$file = $this->folder_compiled.'/'.$file;
				}
				$this->files[] = [
					'type' => 'js',
					'url' => $file,
					'timestamp' => filemtime(ROOT_PATH.$file)
				];
			} else if (endsWith($file, '.styl')) {
				$file = $this->folder_compiled.'/'.str_replace('.styl', '.css', $file);
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