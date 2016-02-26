<?php
	header('Content-Type:text/html; charset=utf-8');
	@mysql_connect('localhost', 'root', '') or die('服务器登陆失败');
	@mysql_select_db('megacenter') or die('数据库错误'); 					
	@mysql_query("set names utf8") or die ('字符错误');

	$query = mysql_query("SELECT user  FROM megalogin WHERE user='{$_POST['login_user']}'") or die('SQL 错误！');
	
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo 'true';
	} else {
		echo 'false';
	}
	
	mysql_close();
?>