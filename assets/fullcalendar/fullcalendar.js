/**
* Theme: Montran Admin Template
* Author: Coderthemes
* Component: Full-Calendar
* 
*/




!function($) {
    "use strict";

    var CalendarApp = function() {
        this.$body = $("body")
        this.$modal = $('#event-modal'),
        this.$event = ('#external-events div.external-event'),
        this.$calendar = $('#calendar'),
        this.$saveCategoryBtn = $('.save-category'),
        this.$categoryForm = $('#add-category form'),
        this.$extEvents = $('#external-events'),
        this.$calendarObj = null
    };


    /* on drop */
    CalendarApp.prototype.onDrop = function (eventObj, date) { 
        var $this = this;
            // retrieve the dropped element's stored Event Object
            var originalEventObject = eventObj.data('eventObject');
            var $categoryClass = eventObj.attr('data-class');
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            // assign it the date that was reported
            copiedEventObject.start = date;
            if ($categoryClass)
                copiedEventObject['className'] = [$categoryClass];
            // render the event on the calendar
            $this.$calendar.fullCalendar('renderEvent', copiedEventObject, true);
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                eventObj.remove();
            }
    },
    /* on click on event */
    CalendarApp.prototype.onEventClick =  function (calEvent, jsEvent, view) {
        var $this = this;
            var form = $("<form></form>");

            var html = "";
            html += '<input type="hidden" value="' + calEvent.id + '" id="id">';

            html += '<div class="col-md-12" style="padding-left:0px;padding-right:5px;">';
            html += "    <div class='form-group' style='margin-bottom:20px;'>";
            html += "        <label>Nome do lead</label>";
            html += "        <div class='input-group'><input disabled class='form-control' type=text id='nome-lead' /></div>";
            html += "    </div>";
            html += '</div>';

            html += '<div class="col-md-6" style="padding-left:0px;padding-right:5px;">';
            html += "    <div class='form-group' style='margin-bottom:20px;'>";
            html += "        <label>Título</label>";
            html += "        <div class='input-group'><input class='form-control' type=text value='" + calEvent.title + "' id='title' placeholder='Digite o título'/></div>";
            html += "    </div>";
            html += '</div>';

            html += '<div class="col-md-6" style="padding-right:0px;padding-left:5px;">';
            html += "    <div class='form-group' style='margin-bottom:20px;'>";
            html += "        <label>Cor</label>";
            html += "        <select class='form-control' id='category' name='category' value='" + calEvent.className + "'>";
            html += "            <option value=''>Selecione...</option>";

            if(calEvent.className == 'bg-danger'){
                html += "            <option value='bg-danger' selected>Vermelho</option>";
            }else{
                html += "            <option value='bg-danger'>Vermelho</option>";
            }

            if(calEvent.className == 'bg-success'){
                html += "            <option value='bg-success' selected>Verde</option>";
            }else{
                html += "            <option value='bg-success'>Verde</option>";
            }

            if(calEvent.className == 'bg-purple'){
                html += "            <option value='bg-purple' selected>Roxo</option>";
            }else{
                html += "            <option value='bg-purple'>Roxo</option>";
            }

            if(calEvent.className == 'bg-primary'){
                html += "            <option value='bg-primary' selected>Azul</option>";
            }else{
                html += "            <option value='bg-primary'>Azul</option>";
            }

            if(calEvent.className == 'bg-inverse'){
                html += "            <option value='bg-inverse' selected>Preto</option>";
            }else{
                html += "            <option value='bg-inverse'>Preto</option>";
            }

            if(calEvent.className == 'bg-warning'){
                html += "            <option value='bg-warning' selected>Amarelo</option>";
            }else{
                html += "            <option value='bg-warning'>Amarelo</option>";
            }

            html += "        </select>";
            html += "    </div>";
            html += '</div>';

            html += "<div class='form-group' style='margin-bottom:20px;'>";
            html += "    <label>Descrição</label>";
            html += "    <div class='input-group'><textarea class='form-control' id='description' placeholder='Descrição do compromisso'>" + calEvent.description + "</textarea></div>";
            html += "</div>";

            var dateFormat = new Date(calEvent.start);

            //console.log(dateFormat);

            var dia = dateFormat.getDate();
            var mes = (dateFormat.getMonth()+1);
            var ano = dateFormat.getFullYear();

            var horas = dateFormat.getHours();
            var minutos = dateFormat.getMinutes();

            if(mes < 10){
                mes = "0"+mes;
            }

            if(dia < 10){
                dia = "0"+dia;
            }

            if(horas < 10){
                horas = "0"+horas;
            }

            if(minutos < 10){
                minutos = "0"+minutos;
            }

            var data = ano+"-"+mes+"-"+dia;

            var horario = horas + ":" + minutos;

            html += '<div class="col-md-6" style="padding-left:0px;padding-right:5px;">';
            html += '    <div class="form-group" style="margin-bottom:20px;">';
            html += "        <label>Data</label>";
            html += '        <input type="date" class="form-control" value="' + data + '" placeholder="mm/dd/yyyy" id="data">';
            html += '    </div>';
            html += '</div>';

            html += '<div class="col-md-6" style="padding-right:0px;padding-left:5px;">';
            html += '    <div class="form-group" style="margin-bottom:20px;">';
            html += "        <label>Horário</label>";
            html += '        <input type="time" class="form-control" value="' + horario + '" placeholder="00:00" id="horario">';
            html += '    </div>';
            html += '</div>';

            html += "<div class='form-group'>";
            html += "    <div class='input-group'><span class='input-group-btn'><button type='submit' class='btn btn-success waves-effect waves-light'><i class='fa fa-check'></i> Atualizar</button></span></div>";
            html += "</div>";

            form.append(html);

            $("#selecionar-lead").val(calEvent.id_lead);

            var id_lead = calEvent.id_lead;

            $.ajax({
                url: "actions/select-lead.php",
                type : 'POST',
                data : {id_lead: id_lead},
                success :function(request){
                    //console.log(request);
                    $("#nome-lead").val(request.nome);
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

            $(".box-selecionar-lead").hide();
            $("#event-modal h4.modal-title").text("Editar compromisso");

            $this.$modal.modal({
                backdrop: 'static'
            });
            $this.$modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                $this.$calendarObj.fullCalendar('removeEvents', function (ev) {
                    return (ev._id == calEvent._id);
                });
                $this.$modal.modal('hide');

                $.ajax({
                    url: "actions/delete-agendamento.php",
                    type : 'POST',
                    data : {id: calEvent.id},
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
            $this.$modal.find('form').on('submit', function () {
                var data = form.find("#data").val();
                var horario = form.find("#horario").val();

                var new_date = data+" "+horario;

                calEvent.title = form.find("#title").val();
                calEvent.description = form.find("#description").val();
                calEvent.className = form.find("#category").val();
                calEvent.start = new_date;
                $this.$calendarObj.fullCalendar('updateEvent', calEvent);
                $this.$modal.modal('hide');

                var obj_envio = {
                    id: form.find("#id").val(),
                    title: form.find("#title").val(),
                    description: form.find("#description").val(),
                    etiqueta: form.find("#category").val(),
                    start: new_date
                }

                //console.log(obj_envio);

                $.ajax({
                    url: "actions/update-agendamento.php",
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

                return false;
            });
    },
    /* on select */
    CalendarApp.prototype.onSelect = function (start, end, allDay) {
        var $this = this;
            $this.$modal.modal({
                backdrop: 'static'
            });
            var form = $("<form></form>");
            form.append("<div class='row'></div>");
            
            var html = "";
            html += '<div class="col-md-6" style="padding-left:0px;padding-right:5px;">';
            html += "    <div class='form-group' style='margin-bottom:20px;'>";
            html += "        <label>Título</label>";
            html += "        <div class='input-group'><input class='form-control' type=text id='title' placeholder='Digite o título'/></div>";
            html += "    </div>";
            html += '</div>';

            html += '<div class="col-md-6" style="padding-right:0px;padding-left:5px;">';
            html += "    <div class='form-group' style='margin-bottom:20px;'>";
            html += "        <label>Cor</label>";
            html += "        <select class='form-control' id='category' name='category'>";
            html += "            <option value=''>Selecione...</option>";
            html += "            <option value='bg-danger'>Vermelho</opction>";
            html += "            <option value='bg-success'>Verde</option>";
            html += "            <option value='bg-purple'>Roxo</option>";
            html += "            <option value='bg-primary'>Azul</option>";
            html += "            <option value='bg-inverse'>Preto</option>";
            html += "            <option value='bg-warning'>Amarelo</option>";
            html += "        </select>";
            html += "    </div>";
            html += '</div>';

            html += "<div class='form-group' style='margin-bottom:20px;'>";
            html += "    <label>Descrição</label>";
            html += "    <div class='input-group'><textarea class='form-control' id='description' placeholder='Digite a descrição'></textarea></div>";
            html += "</div>";

            html += '<div class="col-md-6" style="padding-left:0px;padding-right:5px;">';
            html += '    <div class="form-group" style="margin-bottom:20px;">';
            html += "        <label>Data</label>";
            html += '        <input type="date" class="form-control" placeholder="mm/dd/yyyy" id="data">';
            html += '    </div>';
            html += '</div>';

            html += '<div class="col-md-6" style="padding-right:0px;padding-left:5px;">';
            html += '    <div class="form-group" style="margin-bottom:20px;">';
            html += "        <label>Horário</label>";
            html += '        <input type="time" class="form-control" placeholder="00:00" id="horario">';
            html += '    </div>';
            html += '</div>';

            form.append(html);

            $(".box-selecionar-lead").show();
            $("#event-modal h4.modal-title").text("Novo compromisso");

            var dateFormat = new Date(start);

            var dia = (dateFormat.getDate()+1);
            var mes = (dateFormat.getMonth()+1);
            var ano = dateFormat.getFullYear();

            if(mes < 10){
                mes = "0"+mes;
            }

            if(dia < 10){
                dia = "0"+dia;
            }

            if(dia == 32){
                dia = "01";
                mes =  (parseInt(mes)+1);

                if(mes < 10){
                    mes = "0"+mes;
                }
            }

            var clicked_date = ano+"-"+mes+"-"+dia;

            //alert(clicked_date);

            setTimeout(function(){
                $("#data").val(clicked_date);
            }, 300);

            $this.$modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                form.submit();
            });
            $this.$modal.find('form').on('submit', function () {
                var title = form.find("#title").val();

                var start_compromisso = form.find("#data").val()+" "+form.find("#horario").val();
                var id_lead = $("#selecionar-lead").val();
                
                var categoryClass = form.find("select[name='category'] option:checked").val();

                if(form.find("#title").val() == ""
                    || form.find("#description").val() == ""
                    || start_compromisso == ""
                    || form.find("#category").val() == ""
                    || id_lead == ""
                    ){
                    alert("Preencha todos os campos!");
                }else{
                    $this.$calendarObj.fullCalendar('renderEvent', {
                        title: title,
                        start: start_compromisso,
                        end: end,
                        allDay: false,
                        className: categoryClass
                    }, true);  

                    $this.$modal.modal('hide');

                    var obj_envio = {
                        id_lead: id_lead,
                        title: form.find("#title").val(),
                        description: form.find("#description").val(),
                        start: start_compromisso,
                        etiqueta: form.find("#category").val()
                    }

                    //console.log(obj_envio);

                    $.ajax({
                        url: "actions/insert-agendamento.php",
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
                }
                

                return false;
                
            });
            $this.$calendarObj.fullCalendar('unselect');
    },
    CalendarApp.prototype.enableDrag = function() {
        //init events
        $(this.$event).each(function () {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim($(this).text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            $(this).data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            $(this).draggable({
                zIndex: 999,
                revert: true,      // will cause the event to go back to its
                revertDuration: 0  //  original position after the drag
            });
        });
    }
    /* Initializing */
    CalendarApp.prototype.init = function() {
        this.enableDrag();
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var today = new Date($.now());

        var $this = this;
        $this.$calendarObj = $this.$calendar.fullCalendar({
            /*
            slotDuration: '00:15:00', // If we want to split day time each 15minutes 
            minTime: '08:00:00',
            maxTime: '19:00:00',  
            */
            locale: 'pt-br',
            defaultView: 'month',  
            handleWindowResize: true,   
            height: $(window).height() - 200,   
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            events: 'actions/select-agendamentos.php',
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            eventLimit: true, // allow "more" link when too many events
            selectable: true,
            drop: function(date) { 
                $this.onDrop($(this), date); 
            },
            select: function (start, end, allDay) { 
                $this.onSelect(start, end, allDay); 
            },
            eventClick: function(calEvent, jsEvent, view) { 
                $this.onEventClick(calEvent, jsEvent, view); 
            },
            ignoreTimezone: false,
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
            columnFormat: {
                month: 'ddd',
                week: 'D/MMM',
                day: ''
            },
            axisFormat: 'H:mm',
            timeFormat: 'HH:mm',
            buttonText: {
                today: "Hoje",
                month: "Mês",
                week: "Semana",
                day: "Dia",
                list: 'Lista'
            },
            allDayText: '24 horas',
            slotLabelFormat: 'HH:mm',
            displayEventTime: this.displayEventTime,
        });

        //on new event
        this.$saveCategoryBtn.on('click', function(){
            var categoryName = $this.$categoryForm.find("input[name='category-name']").val();
            var categoryColor = $this.$categoryForm.find("select[name='category-color']").val();
            if (categoryName !== null && categoryName.length != 0) {
                $this.$extEvents.append('<div class="external-event bg-' + categoryColor + '" data-class="bg-' + categoryColor + '" style="position: relative;"><i class="fa fa-move"></i>' + categoryName + '</div>')
                $this.enableDrag();
            }

        });
    },

   //init CalendarApp
    $.CalendarApp = new CalendarApp, $.CalendarApp.Constructor = CalendarApp
    
}(window.jQuery),

//initializing CalendarApp
function($) {
    "use strict";
    $.CalendarApp.init()
}(window.jQuery);
