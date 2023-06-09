<?PHP

class deleteLeads{
  static function apaga(){
    include_once ("../includes/db/__config.php");
    $id = $_POST['id'];

    try{
      $pdo->prepare("DELETE FROM leads WHERE id = '$id'")->execute();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }
  }
}

DeleteLeads::apaga();
