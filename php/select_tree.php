<?php
/*
    << SELECT_TREE.php >>
    HTML側からのTree情報要求に応答するPHP
    T_TREEテーブルから情報を取得し、Altertnative JSON形式でechoにて返却する
    all rights reserved by Savvvy inc.
*/

include_once "db.setting.php";    // 呼び出してるファイルと同じ階層は探せる。

try{
  $db = new PDO(PDO_DSN, DB_USERNAME, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $stmt = $db->query("select * from t_tree");
  $trees = $stmt->fetchAll(PDO::FETCH_CLASS, 'T_tree');
  $s = "[";
  foreach ($trees as $tree){
    // {"id": "device", "parent": "#", "text": "Devices", "type":"file"},
    $s .= '{"id": "' . $tree->jid
         . '", "parent": "' . $tree->jparent
         . '", "text": "' . $tree->jtext
         . '", "type": "' . $tree->jicon 
         . '"},';
  }
  $jsTreeData = substr($s, 0, -1);  // 最後の１バイト削る(,)
  $jsTreeData .= "]";
  echo $jsTreeData;
  $db = null;
}catch(PDOException $e){
  echo $e->getMessage();
  exit;
}
?>
