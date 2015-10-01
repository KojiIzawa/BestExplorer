<?php
/*
    << NEW_NODE_CREATED.php >>
    Insert new node data into table.
    all rights reserved by Savvvy inc.
*/

include_once "db.setting.php";    // searchable same directory where caller script is.
$jid = $_POST['jid'];  // receive data through POST method.
$jparent = $_POST['jparent'];
$jtext = $_POST['jtext'];
$jposition = $_POST['jposition'];
$jicon = $_POST['jicon'];

// output variables to file for debug.
// $file = 'insert.txt';
// $current = file_get_contents($file);
// $current = 'jid : ' . $jid . '\n jparent : ' . $jparent . '\n jtext : ' . $jtext . '\n jposition : ' .  $jposition . '\n jicon : ' . $jicon;
// file_put_contents($file, $current);
//

try{
  $db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $db->prepare("insert into t_tree  (jid, jparent, jtext, jposition, jicon) values (?,?,?,?,?)");
  $stmt->execute([$jid, $jparent, $jtext, $jposition, $jicon]);
  $db = null;
}catch(PDOException $e){
  echo $e->getMessage();
  exit;
}

?>
