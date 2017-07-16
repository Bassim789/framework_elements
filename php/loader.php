<?php
class Loader {
	function __construct($compiled, $folder_compiled) {
		$this->compiled = $compiled;
		$this->folder_compiled = $folder_compiled;
		$this->files = [];
		$this->root = ROOT_PATH_WWW;
	}
	function include_folders($folders) {
		foreach ($folders as $key => $folder) {
			self::include_files($this->root.$folder);
		}
	}
	function include_files($file) {
		if (is_dir($file)) {
			foreach (glob($file.'/*') as $key => $sub) {
				self::include_files($sub);
			}
		} else {
			$file = explode($this->root, $file)[1];
			if (endsWith($file, '.js')) {
				if ($this->compiled){
					$file = $this->folder_compiled.'/'.$file;
				}
				$this->files[] = [
					'type' => 'js',
					'url' => $file,
					'timestamp' => filemtime($this->root.$file)
				];
			} else if (endsWith($file, '.styl')) {
				$file = $this->folder_compiled.'/'.str_replace('.styl', '.css', $file);
				$this->files[] = [
					'type' => 'css',
					'url' => $file,
					'timestamp' => filemtime($this->root.$file)
				];
			} else if (endsWith($file, '.html')) {
				$this->files[] = [
					'type' => 'html',
					'content' => file_get_contents($this->root.$file)
				];
			}
		}
	}
	function get_ressources(){
		$ressources = ['html' => [], 'css' => [], 'js' => []];
		foreach ($this->files as $key => $file){	
			$ressources[$file['type']][] = $file;
		}
		return $ressources;
	}
}