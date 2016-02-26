<?php
	require 'config.php';

	$query = mysql_query("SELECT user  FROM megalogin WHERE user='{$_POST['login_user']}'") or die('SQL 错误！');
	
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo 'true';
	} else {
		echo 'false';
	}
	
	mysql_close();
?>