<script>
    var resizefunc = [];
</script>

<!-- jQuery  -->
<script src="js/jquery.min.js"></script>
<script src="js/bootstrap.min.js"></script>

<?php
if(!isset($nowaves)){
?>
<script src="js/waves.js"></script>
<?php
}
?>

<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.10/js/select2.min.js"></script>

<script src="js/wow.min.js"></script>
<script src="js/jquery.nicescroll.js" type="text/javascript"></script>
<script src="js/jquery.scrollTo.min.js"></script>
<script src="assets/chat/moment-2.2.1.js"></script>
<script src="assets/jquery-sparkline/jquery.sparkline.min.js"></script>
<script src="assets/jquery-detectmobile/detect.js"></script>
<script src="assets/fastclick/fastclick.js"></script>
<script src="assets/jquery-slimscroll/jquery.slimscroll.js"></script>
<script src="assets/jquery-blockui/jquery.blockUI.js"></script>

<script src="js/jquery-ui-1.10.1.custom.min.js"></script>
<!--<script src="assets/select2/select2.min.js" type="text/javascript"></script>-->

<script src="assets/datatables/jquery.dataTables.min.js"></script>
<script src="assets/datatables/dataTables.bootstrap.js"></script>

<script src="assets/timepicker/bootstrap-timepicker.min.js"></script>
<script src="assets/timepicker/bootstrap-datepicker.js"></script>

<!-- sweet alerts -->
<script src="assets/sweet-alert/sweet-alert.min.js"></script>
<script src="assets/sweet-alert/sweet-alert.init.js"></script>
<script src="js/sweet.js"></script>

<script>
    $(document).ready(function(){

        toggle_openLeftBarMenu();

    });

    function toggle_openLeftBarMenu(){
        $("li.has_sub").on("click", function(){
           $(this).find("ul").toggleClass("open");
        });

        $(".button-menu-mobile").on("click", function(){
            $("#wrapper").toggleClass("enlarged");
        });
    }

    function toggleSlide () {
      const div = document.querySelector('div')
      
      if(div.classList.contains('open')){
        div.classList.remove('open')
      }else{
        div.classList.add('open')
      }
    }
</script>