<?PHP

class createLeads{
  static function createLeads(){
    include_once ("../includes/db/__config.php");
    $nome = trim($_POST['nome']);
    $email = trim($_POST['email']);
    $telefone = trim($_POST['telefone']);
    $cidade = $_POST['cidade'];
    $estado = $_POST['estado'];
    $id = $_POST['id'];

    $sql = $id == 0 ? 
    "INSERT INTO leads (id_usuario, nome, email, telefone, cidade, estado) VALUES ('1', '$nome', '$email', '$telefone', '$cidade', '$estado')" :
    "UPDATE leads SET nome = '$nome', email = '$email', telefone = '$telefone', cidade = '$cidade', estado = '$estado' WHERE id = '$id'";

    try{
      $pdo->prepare($sql)->execute();
    
    }catch(Exception $e){
      var_dump($e);
      die();
    }

    return $id;
  }
}
print (createLeads::createLeads());
