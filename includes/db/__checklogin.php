<?php

session_start();
 
//Caso o usuário não esteja autenticado, limpa os dados e redireciona
if ( !isset($_SESSION['login']) and !isset($_SESSION['senha']) ) {
	//Destrói
	session_destroy();
 
	//Limpa
	unset ($_SESSION['login']);
	unset ($_SESSION['senha']);
	unset ($_SESSION['id']);
	unset ($_SESSION['nome']);
	unset ($_SESSION['perfil']);
	 
	header("location: login");
}
