<?php
    include("./config.php");

    $name = $_GET["name"];
    $price = $_GET['price'];
    $number = $_GET['number'];

    $sql = "insert into shoping (name,price,number) values ('$name',$price,$number)";

    $res = mysql_query($sql);
    if($res){
        echo json_encode(array(
            "res_code" =>1,
            "res_message" => "添加成功"
        ));
    }else{
        echo json_encode(array(
            "res_code" =>0,
            "res_message" => "添加失败"
        ));
    };
?>