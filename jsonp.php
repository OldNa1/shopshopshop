<?php
	$cb = $_GET['cb'];
	$arr = array(
		"id" => 2,
		"name" => "zhaosi"
	);
	$json = json_encode($arr);
	echo "$cb($json)";
	
?>