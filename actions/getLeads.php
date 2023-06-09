<?PHP

class getLeads{
  static function getLeads(){
    include_once ("../includes/db/__config.php");
    $result['all'] =  $pdo->query("SELECT * FROM leads")->fetchAll();
    $mes = date("Y-m");
    $result['mes'] = Count($pdo->query("SELECT id FROM leads WHERE data_time LIKE '$mes%' ")->fetchAll());
    $mes = date("m");
    return $result;
  }
}
print json_encode(getLeads::getLeads());
