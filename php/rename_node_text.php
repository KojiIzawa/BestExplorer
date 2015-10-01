<?php
/*
    << RENAME_NODE_TEXT.php >>
    Update node name in the table.
    all rights reserved by Savvvy inc.
*/

include_once "db.setting.php";    // searchable this file due to same directory with caller file.
$jid = $_POST['jid'];
$jparent = $_POST['jparent'];
$jtext = $_POST['jtext'];
// $jposition = $_POST['jposition'];  // not receive position data in rename command

try{
  $db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $db->prepare("update t_tree set jtext = :jtext where jid = :jid and jparent = :jparent ");
  $stmt->execute([
    ':jtext' => $jtext,
    ':jid' => $jid,
    ':jparent' => $jparent
  ]);
  echo "<br>" . $stmt->rowCount();

  $db = null;
}catch(PDOException $e){
  echo $e->getMessage();
  exit;
}

?>
