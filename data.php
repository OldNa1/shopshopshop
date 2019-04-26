<?php
$id = $_REQUEST["id"];
$arr = array(
  "id" => $id,
  "txt" => "hello world"
);

echo json_encode($arr);

?>