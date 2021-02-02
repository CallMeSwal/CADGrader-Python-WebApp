<?php
$file_path = "/wamp64/www/website_local/file_practice/".$_GET["name"]."/";
array_map('unlink', glob("$file_path*.*"));
rmdir($file_path);
?>