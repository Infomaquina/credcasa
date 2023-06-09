<?PHP

class Checklist{
  static function checklist(){
    include_once ("../includes/db/__config.php");
    $id = $_POST['id'];
    $state = $_POST['state'];

    try{
      $pdo->prepare("UPDATE tarefas SET state = '$state' WHERE id = '$id'")->execute();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }

    return $state;
  }
}
print (Checklist::checklist());