<?php
    include("./config.php");

    $pageIndex = $_GET['pageIndex'];
    $count = $_GET['count'];

    $sqlAll = "select * from shoping";
    $resAll = mysql_query($sqlAll);
    $countAll = mysql_num_rows($resAll);
    $pageCount = ceil($countAll / $count);

    // index
    // 1       limit  0,4
    // 2       limit  4,4
    // 3       limit  8,4
    // limit ($pageIndex-1)*$count,$count
    
    $start = ($pageIndex-1)*$count;
    $sql = "select * from shoping limit $start,$count";

    $res = mysql_query($sql);

    $shoping = array();

    while($row = mysql_fetch_assoc($res)){
        array_push($shoping,$row);
    }

    // 判断$shoping的长度为0的话，返回失败

    $json = array (
        "res_code" => 1,
        "res_message" => "查询成功",
        "res_body" => array (
        "data" => $shoping,
        "pageCount" => $pageCount
        )
    );
    echo json_encode($json);

    mysql_close();
?>