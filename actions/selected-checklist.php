<?PHP

class Checklist{
  static function checklist(){
    include_once ("../includes/db/__config.php");

    try{
      return $pdo->query("SELECT * FROM tarefas")->fetchAll();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }
  }
}
print json_encode(Checklist::checklist());
