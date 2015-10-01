<?php
/*
    << db.setting.php >>
    Definition of variables or classes of database.
    all rights reserved by Savvvy inc.
*/
define('DB_DATABASE', 'outline_db');
define('DB_USERNAME', 'outline');
define('DB_PASSWORD', '0138');
define('PDO_DSN', 'mysql:dbhost=localhost;dbname=' . DB_DATABASE);

class T_tree{
  // public $id;    // ommitable if there is same column name in the table.
  // public $aj;
  // public $jid;
  // public $jparent;
  // public $jtext;
  // public $jicon;
}

?>
