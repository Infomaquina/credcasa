<?php
include_once ("./includes/__constants.php"); 
?>

<!DOCTYPE html>
<html>
    <head>
        <?php $title = NAME_PROJECT." - Login"; ?>
        <?php include "includes/__headtags.php"; ?>   

        <style>
            .panel-heading.bg-img {
                text-align:center;
            }

            .panel-heading.bg-img img {
                z-index:999999999;
            }

            .bg-overlay{
                z-index:-1;
            }
        </style>
        
    </head>
    <body class="bg-gradient login">


        <div class="wrapper-page">
            <div class="panel panel-color panel-primary panel-pages">
                <div class="panel-heading bg-img"> 
                    <div class="bg-overlay"></div>
                    <div class="logo">
                        <img src="images/logo.png" style="" class="logo-name">
                    </div>
                </div> 


                <div class="panel-body">
                <form class="form-horizontal m-t-10" action="actions/autentica.php" method="POST">
                    
                    <?php
                    if(!empty($_GET)){
                        if($_GET['msg'] == "error"){
                            if($_GET['code'] == "01f"){
                            ?>
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                Login ou senha incorretos!
                            </div>
                            <?php
                            }else if($_GET['code'] == "02f"){
                            ?>
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                O login ou a senha nao foram digitados!
                            </div>
                            <?php
                            }else if($_GET['code'] == "03f"){
                            ?>
                            <div class="alert alert-danger alert-dismissable">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                A sua conta ainda não foi ativada pelo administrador. O seu cadastro está em análise, em breve você vai receber mais informações por e-mail.
                            </div>
                            <?php
                            }else{
                                header("location: ./login");
                            }
                        }else{
                            header("location: ./login");
                        }
                    }

                    ?>

                    <div class="form-group ">
                        <div class="col-xs-12">
                            <input class="form-control input-lg " type="text" required="" placeholder="E-mail" name="login">
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="col-xs-12">
                            <input class="form-control input-lg" type="password" required="" placeholder="Senha" name="senha">
                        </div>
                    </div>

                    <div class="form-group ">
                        <div class="col-xs-12">
                            <div class="checkbox checkbox-primary">
                                <input id="checkbox-signup" type="checkbox">
                                <label for="checkbox-signup">
                                    Lembrar
                                </label>
                            </div>
                            
                        </div>
                    </div>
                    
                    <div class="form-group text-center m-t-20">
                        <div class="col-xs-12">
                            <button class="btn btn-success btn-lg w-lg waves-effect waves-light" type="submit">Entrar</button>
                        </div>
                    </div>

                    <div class="form-group m-t-30">
                        <div class="col-sm-7">
                            <a href="javascript:;"><i class="fa fa-lock m-r-5"></i> Esqueceu a senha?</a>
                        </div>
                        <div class="col-sm-5 text-right">
                            <a href="javascript:;">Cadastre-se</a>
                        </div>
                    </div>
                </form> 
                </div>                                 
                
            </div>
        </div>

        
    	<script>
            var resizefunc = [];
        </script>
    	<script src="js/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src="js/waves.js"></script>
        <script src="js/wow.min.js"></script>
        <script src="js/jquery.nicescroll.js" type="text/javascript"></script>
        <script src="js/jquery.scrollTo.min.js"></script>
        <script src="assets/jquery-detectmobile/detect.js"></script>
        <script src="assets/fastclick/fastclick.js"></script>
        <script src="assets/jquery-slimscroll/jquery.slimscroll.js"></script>
        <script src="assets/jquery-blockui/jquery.blockUI.js"></script>


        <!-- CUSTOM JS -->
        <script src="js/jquery.app.js"></script>
	
	</body>
</html>