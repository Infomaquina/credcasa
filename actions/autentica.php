<?php

//ini_set('display_errors', 1);
//error_reporting(E_ALL);

include_once ("../includes/db/__config.php"); 

if (!empty($_POST)) {

	$login = $_POST['login'];
	$senha = $_POST['senha'];

	$autenticate = false;

	
	if($login != "" && $senha != ""){	
		
		$sql = '
		SELECT 
		usuarios.id,
		usuarios.email,
		usuarios.nome,
		usuarios.profissao,
		usuarios.senha,
		usuarios.perfil,
		usuarios.conta_ativada,
		perfil_profissional.id as "id_perfil_profissional",
		perfil_profissional.foto
		FROM usuarios
		LEFT JOIN perfil_profissional
		ON usuarios.id = perfil_profissional.id_usuario';

		try{
			$query = $pdo->prepare($sql);
			$query->execute();
			
			//pega todas as linhas
			while ($data = $query->fetch(PDO::FETCH_ASSOC)) {
				$idBD = "{$data['id']}";
				$loginBD = "{$data['email']}";
				$senhaBD = "{$data['senha']}";
				$id_perfil_profissional = "{$data['id_perfil_profissional']}";
				$nomeBD = "{$data['nome']}";
				$profissaoBD = "{$data['profissao']}";
				$fotoBD = "{$data['foto']}";

				//faz a verificacao do login
				if($login == $loginBD and md5($senha) == $senhaBD){
					// session_start inicia a sessao
					session_start();
					 
					$_SESSION['login'] = $login;
					$_SESSION['id_usuario'] = $idBD;//id do usuario
					$_SESSION['id_perfil_profissional'] = $id_perfil_profissional;
					$_SESSION['nome'] = $nomeBD;
					$_SESSION['profissao'] = $profissaoBD;
					$_SESSION['foto'] = $fotoBD;
					
					$_SESSION['perfil'] = "Aluno";
					
					$autenticate = true;
				}
			}
			
			if($autenticate == false){

				session_start();
				//destroi a session
				session_destroy();
			 
				//Limpa
				unset ($_SESSION['login']);
        		unset ($_SESSION['perfil']);
		        unset ($_SESSION['id_usuario']);
		        unset ($_SESSION['id_perfil_profissional']);
		        unset ($_SESSION['nome']);
				unset ($_SESSION['profissao']);
				unset ($_SESSION['foto']);

				header("location: ../login?msg=error&code=01f");
				
			}else{
        
				header("location: ../index");
			}
			
		}catch(PDOException $e){
			echo $e->getMessage();
		}

	}else{	
		header("location: ../login?msg=error&code=02f");
	}
	
}else{
	echo 'Acesso negado!';
}

function logMsg( $msg, $level = 'info', $file = 'main.log' ){
    // variável que vai armazenar o nível do log (INFO, WARNING ou ERROR)
    $levelStr = '';
 
    // verifica o nível do log
    switch ( $level )
    {
        case 'info':
            // nível de informação
            $levelStr = 'INFO';
            break;
 
        case 'warning':
            // nível de aviso
            $levelStr = 'WARNING';
            break;
 
        case 'error':
            // nível de erro
            $levelStr = 'ERROR';
            break;
    }
 
    // data atual
    $date = date( 'Y-m-d H:i:s' );
 
    // formata a mensagem do log
    // 1o: data atual
    // 2o: nível da mensagem (INFO, WARNING ou ERROR)
    // 3o: a mensagem propriamente dita
    // 4o: uma quebra de linha
    $msg = sprintf( "[%s] [%s]: %s%s", $date, $levelStr, $msg, PHP_EOL );
 
    // escreve o log no arquivo
    // é necessário usar FILE_APPEND para que a mensagem seja escrita no final do arquivo, preservando o conteúdo antigo do arquivo
    file_put_contents( $file, $msg, FILE_APPEND );
}
?>