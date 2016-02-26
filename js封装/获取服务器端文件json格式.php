<?php 
	sleep(3);
	require 'config.php';
	$megaUpdate="SELECT User,posttime,content FROM megadate ";
	$queryUpdate=mysql_query($megaUpdate);
	if ($row=mysql_fetch_array($queryUpdate,MYSQL_ASSOC)) 		
		{
		    foreach ( $row as $key => $value ) 
		    {
				$row[$key] = urlencode(str_replace("\n","", $value));
			}
			$json .= urldecode(json_encode($row)).',';
		
		echo '['.substr($json, 0, strlen($json) - 1).']';
	}else {
			echo '数据获取失败';
		}
	;		
		mysql_close();
?>