<?php 
	require 'config.php';
	$megaPic='SELECT picpath FROM megaPic ';
	$queryPic=mysql_query($megaPic);
	while ($row=mysql_fetch_array($queryPic,MYSQL_ASSOC)) 
	{
		foreach ($row as $key => $value) 
		{
			$row[$key] = urlencode(str_replace("\n", "", $value));
		}
		$json.=urldecode(json_encode($row)).',';
	}
	echo '[' . substr($json,0,strlen($json)-1).']';
	mysql_close();
?>