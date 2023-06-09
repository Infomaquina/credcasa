<?php
include_once ("./includes/__constants.php"); 
include_once ("./includes/db/__checklogin.php"); 
include_once ("./includes/db/__config.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <?php $title = NAME_PROJECT." - Leads"; ?>
        <?php include "includes/__headtags.php"; ?>  
      <style>
        .form-group{
          padding: 8px;
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
            <?php include "includes/__menu.php"; ?>  
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
                            <h4 class="pull-left page-title" style="padding-right: 10px;">Leads</h4>
                            <a class="btn btn-primary" data-toggle="modal" data-target="#myModal" role="button" onclick="formatar()">+Cadastrar Lead</a>
                            <ol class="breadcrumb pull-right">
                              <li><a href="#">Credcasa</a></li>
                              <li class="active">Leads</li>
                            </ol>
                          </div>
                        </div>

                        <div class="panel panel-default float-end" style="height:100px;width:49%;">
                          <div class="panel-body">
                            <!-- Pls Remove -->
                            <div> 
                              <i class="fa fa-3x fa-users text-primary"></i>
                              <p id="mes"></p>
                            </div>
                          </div>
                        </div>

                        <div class="panel panel-default" style="height:100px;width:48%;">
                          <div class="panel-body">
                            <!-- Pls Remove -->
                            <div>
                              <i class="fa fa-3x fa-user text-primary"></i>
                              <p id="total"></p>
                            </div>
                          </div>
                        </div>

                        <div class="panel panel-default">
                          <div class="panel-body">
                            <!-- Pls Remove -->
                            <div>
                              <strong>Lista Total de Leads</strong>
                              <hr>
                              <div class="table-responsive">
                                <table class="table">
                                <thead>
                                  <tr>
                                    <td>#</td>
                                    <td>Nome</td>
                                    <td>Telefone</td>
                                    <td>E-mail</td>
                                    <td>Estado</td>
                                    <td>Cidade</td>
                                    <td colspan="2">Ações</td>
                                  </tr>
                                </thead>
                                <tbody>
                                </tbody>
                              </table>
                              </div>
                            </div>
                          </div>
                        </div>

                      <!-- Modal -->
                      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                          <form class="form-horizontal">
                          <div class="modal-content">
                            <div class="modal-header">
                              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                              <h4 class="modal-title" id="myModalLabel">Adicionar Lead</h4>
                              <input type="hidden" name="id" id="id" value="0">
                            </div>
                            <div class="modal-body">
                                <div class="form-group">
                                  <label for="nome" class="col-sm-2 control-label">Nome*</label>
                                  <div class="col-sm-10">
                                  <input type="text" required class="form-control" id="nome" name="nome" placeholder="Jane Doe">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="telefone" class="col-sm-2 control-label">Telefone*</label>
                                  <div class="col-sm-10">
                                  <input type="text" required class="form-control" id="telefone" name="telefone">
                                  </div>
                                </div>
                                <div class="form-group">
                                  <label for="email" class="col-sm-2 control-label">Email</label>
                                  <div class="col-sm-10">
                                  <input type="email" class="form-control" id="email" name="email" placeholder="jane.doe@example.com">
                                </div>
                                </div>
                                <div class="form-group">
                                  <label for="estado" class="col-sm-2 control-label">Estado*</label>
                                  <div class="col-sm-10">
                                  <select required class="form-control" id="estado" name="estado">
                                  </select>
                                </div>
                                </div>
                                <div class="form-group">
                                  <label for="cidade" class="col-sm-2 control-label">Cidade*</label>
                                  <div class="col-sm-10">
                                  <select required class="form-control" id="cidade" name="cidade">
                                    <option value="">Escolha o Estado</option>
                                  </select>
                                </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>
                              <button type="submit" class="btn btn-primary">Salvar</button>
                            </div>
                          </div>
                          </form>
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


        </div>
        <!-- END wrapper -->

        <?php include "includes/__scripts.php"; ?>  
        <script src="js/json_cidades.js"></script>
        <script src="js/inputmask-jquery.inputmask.js"></script>
        <script src="js/jquery.leads.js"></script>
	</body>
</html>