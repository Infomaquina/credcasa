<div class="left side-menu">
    <div class="sidebar-inner slimscrollleft">
        <div class="user-details">
            <div class="pull-left">
                <a href="configuracoes">
                    <img src='<?php echo $_SESSION['foto']; ?>' data-img="<?php echo $_SESSION['foto']; ?>" alt="" class="thumb-md img-circle">
                </a>
            </div>
            <div class="user-info">
                <div class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><?php echo $_SESSION['nome']; ?> <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="logout"><i class="md md-settings-power"></i> Sair</a></li>
                    </ul>
                </div>
                
                <p class="text-muted m-0"><?php echo $_SESSION['profissao']; ?></p>
            </div>
        </div>
        <!--- Divider -->
        <div id="sidebar-menu">
            <ul>
                <li>
                    <a href="dashboard" class="waves-effect"><i class="fa fa-line-chart"></i><span> Dashboard </span></a>
                </li>
                <li>
                    <a href="leads" class="waves-effect"><i class="fa fa-user"></i><span> Leads </span></a>
                </li>
                
            </ul>
            <div class="clearfix"></div>
        </div>
        <div class="clearfix"></div>
    </div>
</div>