<?php
	session_start();
	
	//destroi a session
	session_destroy();

	//Limpa
	unset ($_SESSION['login']);
	unset ($_SESSION['senha']);
	unset ($_SESSION['id']);
	unset ($_SESSION['nome']);
	unset ($_SESSION['perfil']);

	header("location: ./login");
?>