<?php
include_once ("./includes/__constants.php"); 
include_once ("./includes/db/__checklogin.php"); 
include_once ("./includes/db/__config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <?php $title = NAME_PROJECT." - Dashboard"; ?>
        <?php include "includes/__headtags.php"; ?>   

        <style>
            .box-instrucoes{
                margin-top: 20px;
                list-style: none;
                padding: 0;
            }

            .box-instrucoes li{
                margin-bottom: 20px;
            }
        </style>
    </head>

    <body class="fixed-left">
        
        <!-- Begin page -->
        <div id="wrapper">
        
            <!-- Top Bar Start -->
            <?php include "includes/__header.php"; ?>   
            <!-- Top Bar End -->

            <!-- ========== Left Sidebar Start ========== -->
            <?php 
            include "includes/__menu.php";
            ?>  
            <!-- Left Sidebar End --> 

            <!-- ============================================================== -->
            <!-- Start right Content here -->
            <!-- ============================================================== -->
                    
            <div class="content-page">
                <!-- Start content -->
                <div class="content">
                    <div class="container">

                        <!-- Page-Title -->
                        <div class="row">
                            <div class="col-sm-12">
                                <h4 class="pull-left page-title">Bem vindo!</h4>
                                <ol class="breadcrumb pull-right">
                                    <li><a href="#">Credcasa</a></li>
                                    <li class="active">Dashboard</li>
                                </ol>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel panel-default">
                                    <div class="panel-body"> 
                                        <div class="alert alert-info fade in">
                                            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                            <p><i class="ion-android-information"></i> <b>Atenção:</b> Para o desenvolvimento e entrega do seu teste, você deve utilizar PHP (sem framework), JS, jQuery & Ajax para comunicar o frontend com o backend. Siga as instruções abaixo:</p>
                                        </div>

                                        <hr>

                                        <h3 style="font-size:15px;">CHECKLIST DE ENTREGA</h3>

                                        <ul class="box-instrucoes">
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa1" type="checkbox" class="tarefa" data-id="1">
                                                    <label for="tarefa1">
                                                        Criar uma nova página chamada "leads" e adicionar um link para esta página no menu lateral
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa2" type="checkbox" class="tarefa" data-id="2">
                                                    <label for="tarefa2">
                                                        Reproduzir o layout da tela de leads a partir do layout em anexo na pasta do projeto
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa3" type="checkbox" class="tarefa" data-id="3">
                                                    <label for="tarefa3">
                                                        Na página de leads, adicionar o botão "Cadstrar Lead" com a funcionalidade de inserir um novo lead no banco de dados (abrir uma modal com o fomulário de cadastro)
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa4" type="checkbox" class="tarefa" data-id="4">
                                                    <label for="tarefa4">
                                                        Popular a lista de leads com os dados da tabela "leads" no banco de dados, selecionar as colunas: nome, telefone, email, estado, cidade
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa5" type="checkbox" class="tarefa" data-id="5">
                                                    <label for="tarefa5">
                                                        Adicionar a funcionalidade de editar um lead
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa6" type="checkbox" class="tarefa" data-id="6">
                                                    <label for="tarefa6">
                                                        Adicionar a funcionalidade de deletar um lead
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa7" type="checkbox" class="tarefa" data-id="7">
                                                    <label for="tarefa7">
                                                        No card da esquerda (LEADS CADASTRADOS), fazer um select do total de leads no banco de dados e mostrar a quantidade
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="checkbox checkbox-primary">
                                                    <input id="tarefa8" type="checkbox" class="tarefa" data-id="8">
                                                    <label for="tarefa8">
                                                        No card da direita (LEADS NO MÊS), fazer um select do total de leads do mês atual no banco de dados e mostrar a quantidade
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div> 
                                </div>
                            </div>
                        </div>

                    </div> <!-- container -->
                               
                </div> <!-- content -->

                <footer class="footer text-right">
                    2023 © <?php echo NAME_PROJECT;?>.
                </footer>

            </div>
            <!-- ============================================================== -->
            <!-- End Right content here -->
            <!-- ============================================================== -->
           
    
        <?php include "includes/__scripts.php"; ?>  

        <!-- CUSTOM JS -->
        <script src="js/jquery.app.js"></script>

        <script>

            //ativar a funcao abaixo e implementar o arquivo "update-checklist.php" para salvar o checklist de tarefas no banco de dados

            $(document).ready(function(){
                $(".tarefa").on("change", function(){
                    var id_tarefa = $(this).attr("data-id");

                    var state = 0;
                    if($(this).prop('checked') == true) {
                        state = 1;
                    }else{
                        state = 0;
                    }

                    var obj_envio = {
                        id: id_tarefa,
                        state: state
                    }

                    $.ajax({    
                        url: "actions/update-checklist.php",
                        type : 'POST',
                        data : obj_envio,
                        success :function(request){
                            console.log(request);
                        },
                        error :function(request){
                            if(request.responseText){
                                console.log("Erro! Ocorreu um erro desconhecido");
                                console.log(request.responseText);
                            }else{  
                                console.log("Erro! Ocorreu um erro desconhecido");
                                console.log(request);
                            }
                        }
                    });
                });
            });

            // LEITURA DE BOX SELECIONADO
            $.ajax({
              url: "/actions/selected-checklist",
              type: "GET",
              dataType: "json",
              success: (d)=>{
                $.each(d,(i,v)=>{
                  if(v.state == 1){
                    $("#tarefa"+v.id).attr("checked", "checked");
                  }
                })                
              }
            })

        </script>
    
    </body>
</html>