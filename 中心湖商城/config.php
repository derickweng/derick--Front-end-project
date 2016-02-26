<?php
		header('Content-Type:text/html; charset=utf-8');
		@mysql_connect('localhost', 'root', '') or die('服务器登陆失败');
		@mysql_select_db('megacenter') or die('数据库错误'); 					
		@mysql_query("set names utf8") or die ('字符错误');
?>
