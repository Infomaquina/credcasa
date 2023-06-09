<?PHP

class createLeads{
  static function createLeads(){
    include_once ("../includes/db/__config.php");
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $telefone = trim($_POST['telefone']);
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];

    try{
      $pdo->prepare("INSERT INTO leads (nome, email, telefone, cidade, estado) VALUES ('$nome', '$email', '$telefone', '$cidade', '$estado')")->execute();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }
  }
}
print json_encode(createLeads::createLeads());
