<?php

define('HOST', 'localhost');
define('DB_NAME', 'credcasa_teste');//nome do seu banco de dados
// define('USER', 'semsenha');//login do seu banco de dados
// define('PASS', '');//senha do seu banco de dados
define('USER', 'root');//alterado
define('PASS', '6364');//alterado

$dns = 'mysql:host='.HOST.';dbname='.DB_NAME;

try{
	$pdo = new PDO($dns,USER,PASS);
	//$pdo->exec("set names utf8mb4");
	$pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);

	//echo '';
}catch(Exception $e){
	echo htmlentities('Houve algum erro com a conexao com o banco de dados: '. $e->getMessage());
}

	
?>