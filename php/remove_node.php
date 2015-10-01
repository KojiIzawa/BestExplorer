<?php
/*
    << REMOVE_NODE.php >>
    Update node name in the table.
    all rights reserved by Savvvy inc.
*/

include_once "db.setting.php";    // searchable this file due to same directory with caller file.
$jid = $_POST['jid'];
$jparent = $_POST['jparent'];
$jtext = $_POST['jtext'];
$jposition = $_POST['jposition'];

// output variables to file for debug.
$file = 'remove.txt';
$current = file_get_contents($file);
$current = 'jid : ' . $jid . '\n jparent : ' . $jparent . '\n jtext : ' . $jtext . '\n jposition : ' .  $jposition . '\n jicon : ' . $jicon;
file_put_contents($file, $current);
//

try{
  $db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $db->prepare("delete from t_tree where jid = :jid and jparent = :jparent and jtext = :jtext");
  $stmt->execute([
    ':jid' => $jid,
    ':jparent' => $jparent,
    ':jtext' => $jtext
  ]);
  echo "<br>" . $stmt->rowCount();

  $db = null;
}catch(PDOException $e){
  echo $e->getMessage();
  exit;
}

?>
