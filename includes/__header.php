<div class="topbar">
    <!-- LOGO -->
    <div class="topbar-left">
      <div class="text-center">
        <a href="index" class="logo">
          <img src="images/mascote.png" style="width: 35px;margin-top: -5px;margin-right: 5px;">
          <img src="images/logo3.png" class="logo-name">
        </a>
      </div>
    </div>
    <!-- Button mobile view to collapse sidebar menu -->
    <div class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="">
                <div class="pull-left">
                    <button class="button-menu-mobile open-left">
                        <i class="fa fa-bars"></i>
                    </button>
                    <span class="clearfix"></span>
                </div>

                <ul class="nav navbar-nav navbar-right pull-right">
                    <li class="dropdown hidden-xs">
                        <a href="#" data-target="#" class="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                            <i class="md md-notifications"></i> <span class="badge badge-xs badge-danger">0</span>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-lg" style="display:none;">
                            <li class="text-center notifi-title">Notification</li>
                            <li class="list-group">
                                <a href="javascript:;" class="list-group-item">
                                  <div class="media">
                                     <div class="pull-left">
                                        <em class="fa fa-bell-o fa-2x text-danger"></em>
                                     </div>
                                     <div class="media-body clearfix">
                                        <div class="media-heading">Updates</div>
                                        <p class="m-0">
                                           <small>There are
                                              <span class="text-primary">2</span> new updates available</small>
                                        </p>
                                     </div>
                                  </div>
                                </a>
                               <!-- last list item -->
                                <a href="javascript:;" class="list-group-item">
                                  <small>Ver todas as notificações</small>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="hidden-xs">
                        <a href="#" id="btn-fullscreen" class="waves-effect waves-light"><i class="md md-crop-free"></i></a>
                    </li>
                    <li class="dropdown">
                        <a href="" class="dropdown-toggle profile" data-toggle="dropdown" aria-expanded="true"><img src='<?php echo $_SESSION['foto']; ?>' data-img="<?php echo $_SESSION['foto']; ?>" alt="user-img" class="img-circle"> </a>
                        <ul class="dropdown-menu">
                            <li><a href="logout"><i class="md md-settings-power"></i> Sair</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <!--/.nav-collapse -->
        </div>
    </div>
</div>