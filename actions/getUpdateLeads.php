<?PHP

class getUpdateLeads{
  static function get(){
    include_once ("../includes/db/__config.php");
    $id = $_POST['id'];

    try{

      return $pdo->query("SELECT * FROM leads WHERE id = '$id'")->fetchObject();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }
  }
}
print json_encode(getUpdateLeads::get());
