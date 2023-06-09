$(document).ready(function(){
    $(".bt-add-deal").on("click", function(){
        $("#modal-add-deal").modal("show");
    });

    $(".bt-salvar-lead").on("click", function(){
        var nome = $("#nome").val(); 
        var email = $("#email").val();
        var telefone = $("#telefone").val();
        var cidade = $("#cidade").val();
        var estado = $("#estado").val();
        var valor_lote = $("#valor_lote").val();
        var valor_obra = $("#valor_obra").val();
        var estagio_funil = $("#estagio_funil").val();
        var tags = $("#tags").val();
        var comentarios = $("#comentarios").val();

        var person = {
            id: "",
            nome: nome,
            email: email,
            telefone: telefone,
            cidade: cidade,
            estado: estado
        }

        var deal = {
            valor_lote: valor_lote,
            valor_obra: valor_obra,
            estagio_funil: estagio_funil,
            tags: tags,
            comentarios: comentarios,
            novo: 0
        }

        if($("#modal-add-deal .dados-do-lead").is(":visible")){
            var id_lead = $("#modal-add-deal .dados-do-lead .id_lead").text();
            nome = $("#modal-add-deal .dados-do-lead .nome").text();
            email = $("#modal-add-deal .dados-do-lead .email").text();
            telefone = $("#modal-add-deal .dados-do-lead .telefone").text();
            cidade = $("#modal-add-deal .dados-do-lead .cidade").text();
            estado = $("#modal-add-deal .dados-do-lead .estado").text();

            person = {
                nome: nome,
                email: email,
                telefone: telefone,
                cidade: cidade,
                estado: estado
            }

            deal.novo = 1;
            person.id = id_lead;
        }

        if(nome == ""
            || email == ""
            || telefone == ""
            || cidade == ""
            || estado == ""){
            swal("Atenção!", "Preencha os campos obrigatórios.");
        }else{
            if(EmailValido(email)){
                addLead(person , deal);
            }else{
                swal("Atenção!", "E-mail inválido.");
            }
        }
    });

    $(".bt-completar-lead").on("click", function(){
        var renda_bruta = $("#renda_bruta").val(); 
        var tipo_renda = $("#tipo_renda").val(); 
        var possui_lote = $("#possui_lote").val(); 
        var situacao_lote = $("#situacao_lote").val(); 
        var recurso_proprio = $("#recurso_proprio").val(); 
        var padrao_imovel = $("#padrao_imovel").val(); 

        var id_negocio = $("#modal-completar-cadastro .dados-do-lead .id_negocio").text();

        var dados_lead = {
            id_negocio: id_negocio,
            renda_bruta: renda_bruta,
            tipo_renda: tipo_renda,
            possui_lote: parseInt(possui_lote),
            situacao_lote: situacao_lote,
            recurso_proprio: recurso_proprio,
            padrao_imovel: padrao_imovel
        }

        console.log(dados_lead);

        completarCadastro(dados_lead);
    });

    countQtdItemsFunil();

    activeDragDropDragula();

    $("#valor_lote").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#valor_obra").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#renda_bruta").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#recurso_proprio").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    //----

    $("#editar-valor-lote").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#editar-valor-obra").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#editar-renda-bruta").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $("#editar-recurso-proprio").maskMoney({
        prefix:'', 
        thousands:'.', 
        decimal:',',
        minimumFractionDigits: 2, 
        style: 'currency', 
        currency: 'BRL' 
    });

    $(".bt-cadastrar-lead").on("click", function(){
        $(".box-selecionar-lead").hide();
        $(".box-cadastrar-negociacao").show();
        $(".box-cadastrar-lead").show();
    });

    $("#cidade").select2({
        dropdownParent: $("#modal-add-deal")
    });

    $("#estado").select2({
        dropdownParent: $("#modal-add-deal")
    });

    $("#selecionar-lead").select2({
        dropdownParent: $("#modal-add-deal")
    });

    //$("#select-funil").select2({});

    $("#select-funil").on("change", function(){
      var id_funil = $("#select-funil").val();
      var slug = $("#select-funil").select2().find(":selected").data("slug");

      window.location.href = "funil?slug="+slug;
    });
    
    $("#selecionar-lead").on("change", function(){
        if($(this).val() != ""){
            var id_lead = $(this).val();
            var id_negocio = $("#modal-completar-cadastro .dados-do-lead .id_negocio").text();

            selectDadosLead(id_lead, id_negocio);

            $(".box-selecionar-lead").hide();
            $(".box-cadastrar-negociacao").show();
            $(".box-cadastrar-lead").hide();
            $(".box-dados-lead").show();
        }
    });

    $("#modal-add-deal").on('show.bs.modal', function (e) {
        //reset modal
        $("#selecionar-lead").val("");
        $("#select2-selecionar-lead-container").text("Selecione...");
        $(".box-selecionar-lead").show();
        $(".box-cadastrar-negociacao").hide();
        $(".box-cadastrar-lead").hide();
        $(".box-dados-lead").hide();
        $('#form-add-deal').trigger("reset");
        $("#cidade").empty();
        $("#cidade").append('<option value="">Selecione...</option>');
        $("#cidade").prop("disabled", true);
        $("#estado").val("");
        $("#select2-estado-container").text("Selecione...");
    });

    $(".bt-ver-mais").on("click", function(){
        $(".view-more").toggleClass("on");
        $(this).toggleClass("on");
    });

    $(".bt-editar-funil").on("click", function(){
        swal({
            title:"Em breve!", 
            text:"A opção de editar o funil estará disponível em breve.", 
            html:true
        });
    });

    /*
    $(".bt-add-funil").on("click", function(){
        swal({
            title:"Em breve!", 
            text:"A opção de adicionar um funil persolnalizado estará disponível em breve.", 
            html:true
        });
    });
    */

    loadFunil();

    $("#modal-completar-cadastro").on('hidden.bs.modal', function (e) {
        loadFunil();
    });

    /*
    //when modal open
    $(window).on('shown.bs.modal', function() { 
        $("#detalhes-negocio").modal('show');
        //alert('shown');
    });
    */

    //----

    $(".bt-atualizar-negocio").on("click", function(){
        var id = $("#detalhes-negocio").attr("data-deal");

        var estagio_funil = $("#editar-estagio-funil").val();
        var valor_lote = $("#editar-valor-lote").val();
        var valor_obra = $("#editar-valor-obra").val();
        var tags = $("#editar-tags").val();

        var renda_bruta = $("#editar-renda-bruta").val();
        var tipo_renda = $("#editar-tipo-renda").val();
        var possui_lote = $("#editar-possui-lote").val();
        var situacao_lote = $("#editar-situacao-lote").val();
        var recurso_proprio = $("#editar-recurso-proprio").val();
        var padrao_imovel = $("#editar-padrao-imovel").val();

        var obj_envio = {
            id: id,
            estagio_funil: estagio_funil,
            valor_lote: valor_lote,
            valor_obra: valor_obra,
            tags: tags,
            renda_bruta: renda_bruta,
            tipo_renda: tipo_renda,
            possui_lote: possui_lote,
            situacao_lote: situacao_lote,
            recurso_proprio: recurso_proprio,
            padrao_imovel: padrao_imovel
        }

        //console.log(obj_envio);

        if(estagio_funil == ""
            || valor_lote == ""
            || valor_obra == ""
            || tags == ""){
            swal({
                title:"Atenção!", 
                text:"Preencha os campos obrigatórios.", 
                html:true
            });
        }else{
            $.ajax({
                url: "actions/update-negocio-editar.php",
                type : 'POST',
                data : obj_envio,
                success :function(request){
                    console.log(request);

                    if(request.success == false){
                        swal({
                            title:"Atenção!", 
                            text:request.error, 
                            html:true
                        });
                    }else{
                        swal({
                            title:"Pronto!", 
                            text:"Informações atualizadas com sucesso.", 
                            html:true
                        });

                        loadFunil();
                    }
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

    });

    //----

    $(".bt-add-comentario").on("click", function(){
        var comentarios = $("#add-comentarios").val();

        var id_negocio = $(this).parent().parent().parent().attr("data-deal");

        var obj_envio = {
            id_negocio: id_negocio,
            comentarios: comentarios
        }

        if(comentarios == ""){
            swal({
                title:"Atenção!", 
                text:"Você deve preencher o campo de texto com o seu comentário.", 
                html:true
            });
        }else{
            $.ajax({
                url: "actions/insert-comentarios.php",
                type : 'POST',
                data : obj_envio,
                success :function(request){
                    //console.log(request);
                    loadFunil();
                    loadComentarios(id_negocio);
                    $("#add-comentarios").val("");
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
        
    });

    //----

    $(".bt-add-anexo").on("click", function(){
        swal({
            title:"Em breve!", 
            text:"A opção de enviar anexos em um comentário estará disponível em breve.", 
            html:true
        });
    });

    //----

    $(".bt-editar-data-negociacao").on("click", function(){
        var id_negocio = $(this).parent().attr("data-deal");

        var data = $("#editar-data-inicio").text().split(" ");

        var dia = data[0];
        var mes = data[1];
        var ano = data[2];

        if(dia < 10){
            dia = "0"+dia;
        }

        var meses = {
            'Jan': {
                slug: 'Jan',
                name: 'janeiro',
                number: '01'
            },
            'Fev': {
                slug: 'Fev',
                name: 'fevereiro',
                number: '02'
            }, 
            'Mar': {
                slug: 'Mar',
                name: 'março',
                number: '03'
            }, 
            'Abr': {
                slug: 'Abr',
                name: 'abril',
                number: '04'
            }, 
            'Mai': {
                slug: 'Mai',
                name: 'maio',
                number: '05'
            }, 
            'Jun': {
                slug: 'Jun',
                name: 'junho',
                number: '06'
            }, 
            'Jul': {
                slug: 'Jul',
                name: 'julho',
                number: '07'
            }, 
            'Ago': {
                slug: 'Ago',
                name: 'agosto',
                number: '08'
            }, 
            'Set': {
                slug: 'Set',
                name: 'setembro',
                number: '09'
            }, 
            'Out': {
                slug: 'Out',
                name: 'outubro',
                number: '10'
            }, 
            'Nov': {
                slug: 'Nov',
                name: 'novembro',
                number: '11'
            }, 
            'Dez': {
                slug: 'Dez',
                name: 'dezembro',
                number: '12'
            }
        }

        var monta_data = ano+"-"+meses[mes].number+"-"+dia;

        $("#modal-editar-data-inicio").modal("show");

        $("#modal-editar-data-inicio").attr("data-deal", id_negocio);

        $("#editar-data-negociacao").val(monta_data);

        if($(".modal-backdrop.show").length > 1){
            $(".modal-backdrop.show:eq(1)").attr("style", "z-index:9999;");
            $("#modal-editar-data-inicio").attr("style", "z-index:99999;");
        }
    });

    //----

    $(".bt-salvar-data-editar").on("click", function(){
        var id_negocio = $("#modal-editar-data-inicio").attr("data-deal");
        var data = $("#editar-data-negociacao").val();

        var obj_envio = {
            id: id_negocio,
            data: data
        }

        $.ajax({
            url: "actions/update-data-inicio.php",
            type : 'POST',
            data : obj_envio,
            success :function(request){
                //console.log(request);

                if(request.success == false){
                    swal({
                        title:"Atenção!", 
                        text:request.error, 
                        html:true
                    });
                }else{
                    $("#modal-editar-data-inicio").modal("hide");

                    swal({
                        title:"Pronto!", 
                        text:"Informações atualizadas com sucesso.", 
                        html:true
                    });

                    loadFunil();

                    var arraydata = data.split("-");

                    var dia = (arraydata[2])*1;
                    var mes = (arraydata[1])*1;
                    var ano = arraydata[0];

                    //console.log(arraydata);

                    var meses = {
                        '1': {
                            slug: 'Jan',
                            name: 'janeiro',
                            number: '01'
                        },
                        '2': {
                            slug: 'Fev',
                            name: 'fevereiro',
                            number: '02'
                        }, 
                        '3': {
                            slug: 'Mar',
                            name: 'março',
                            number: '03'
                        }, 
                        '4': {
                            slug: 'Abr',
                            name: 'abril',
                            number: '04'
                        }, 
                        '5': {
                            slug: 'Mai',
                            name: 'maio',
                            number: '05'
                        }, 
                        '6': {
                            slug: 'Jun',
                            name: 'junho',
                            number: '06'
                        }, 
                        '7': {
                            slug: 'Jul',
                            name: 'julho',
                            number: '07'
                        }, 
                        '8': {
                            slug: 'Ago',
                            name: 'agosto',
                            number: '08'
                        }, 
                        '9': {
                            slug: 'Set',
                            name: 'setembro',
                            number: '09'
                        }, 
                        '10': {
                            slug: 'Out',
                            name: 'outubro',
                            number: '10'
                        }, 
                        '11': {
                            slug: 'Nov',
                            name: 'novembro',
                            number: '11'
                        }, 
                        '12': {
                            slug: 'Dez',
                            name: 'dezembro',
                            number: '12'
                        }
                    }

                    var monta_data = dia+" "+meses[mes].slug+" "+ano;

                    /*
                    var data_hoje = new Date();
                    var dia = String(data_hoje.getDate()).padStart(2, '0');
                    var mes = String(data_hoje.getMonth() + 1).padStart(2, '0');
                    var ano = data_hoje.getFullYear();

                    data_hoje = ano+"-"+mes+"-"+dia;

                    const d1  = data;
                    const d2    = data_hoje;
                    const diffInMs   = new Date(d2) - new Date(d1)
                    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
                    */

                    $("#editar-data-inicio").text(monta_data);
                    //$("#editar-dias-passados").text(diffInDays);
                    selectDadosNegocio(id_negocio);
                }
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

$(window).on('load', function () {
    setTimeout(function(){
        
    }, 500);
});

function completarCadastro(dados_lead){
    $("#modal-completar-cadastro").addClass("hide");
    $("#modal-loader").modal("show");

    $.ajax({
        url: "actions/update-negocio.php",
        type : 'POST',
        data : dados_lead,
        success :function(request){
            console.log(request);
            
            $("#modal-loader").modal("hide");
            $("#modal-completar-cadastro").modal("hide");
            $("#modal-completar-cadastro").removeClass("hide");

            if(request.success == false){
                swal({
                    title:"Atenção!", 
                    text:request.error, 
                    html:true
                });
            }else{
                swal({
                    title:"Pronto!", 
                    text:"Informações atualizadas com sucesso.", 
                    html:true
                });
            }
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

function loadComentarios(id_negocio){
    $.ajax({
        url: "actions/select-comentarios.php",
        type : 'POST',
        data : {id_negocio: id_negocio},
        success :function(request){
            //console.log(request);

            if(request.success == false){
                swal({
                    title:"Atenção!", 
                    text:request.error, 
                    html:true
                });
            }else{
                //console.log(request);

                $(".box-show-comentarios").empty();

                for(var x = 0; x < request.comentarios.length; x++){
                    
                    var userid = request.comentarios[x].id;
                    var username = request.comentarios[x].usuario;
                    var date = request.comentarios[x].date;
                    var msg = request.comentarios[x].mensagem;
                    var flag_editado = request.comentarios[x].flag_editado;

                    var htmlItem = "";
                    htmlItem += '<div class="item" data-id="'+userid+'">';
                    htmlItem += '    <p class="username">'+username+'</p>';

                    if(flag_editado == 1){
                        htmlItem += '    <p class="date">'+date+' (editado)</p>';
                    }else{
                        htmlItem += '    <p class="date">'+date+'</p>';
                    }

                    htmlItem += '    <div class="box-msg">';
                    htmlItem += '        <span class="text">'+msg+'</span>';
                    htmlItem += '        <div class="dropdown float-end">';
                    htmlItem += '            <a href="javascript:;" class="dropdown dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">';
                    htmlItem += '                <i class="fa fa-angle-down"></i>';
                    htmlItem += '            </a>';

                    htmlItem += '            <div class="dropdown-menu dropdown-menu-end">';                
                    htmlItem += '                <a href="javascript:;" class="dropdown-item bt-editar-comentario">';
                    htmlItem += '                    <i class="fa fa-pencil"></i>Editar'; 
                    htmlItem += '                </a>'; 

                    htmlItem += '                <a href="javascript:;" class="dropdown-item bt-deletar-comentario">';
                    htmlItem += '                    <i class="fa fa-trash-o"></i>Deletar'; 
                    htmlItem += '                </a>';           
                    htmlItem += '            </div>';

                    htmlItem += '        </div>';
                    htmlItem += '    </div>';
                    htmlItem += '</div>';

                    $(".box-show-comentarios").append(htmlItem);
                }

                //----

                $(".bt-deletar-comentario").on("click", function(){

                    var item = $(this).parent().parent().parent().parent();

                    var id = item.attr("data-id");
                    var id_negocio = item.parent().parent().attr("data-deal");

                    var obj_envio = {
                        id: id
                    }

                    swal({   
                        title: "Atenção!",   
                        text:"Você quer deletar realmente este comentário?", 
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#317eeb",   
                        confirmButtonText: "Sim, deletar",  
                        cancelButtonText: "Cancelar", 
                        closeOnConfirm: true, 
                        html:true
                    }, function(){   
                        //after confirm
                        $.ajax({
                            url: "actions/delete-comentario.php",
                            type : 'POST',
                            data : obj_envio,
                            success :function(request){
                                //console.log(request);

                                if(request.success == false){
                                    alert(request.error);
                                }else{
                                    loadComentarios(id_negocio);     
                                }
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

                //----

                $(".bt-editar-comentario").on("click", function(){
                    var item = $(this).parent().parent().parent().parent();
                    
                    var msg = $(this).parent().parent().parent().find(".text").text();
                    var id = item.attr("data-id");
                    var id_negocio = item.parent().parent().attr("data-deal");

                    $("#editar-comentario").attr("data-id", id);
                    $("#editar-comentario").attr("data-deal", id_negocio);
                    $("#field-editar-comentario").val(msg);
                    $("#editar-comentario").modal("show");

                    if($(".modal-backdrop.show").length > 1){
                        $(".modal-backdrop.show:eq(1)").attr("style", "z-index:9999;");
                        $("#editar-comentario").attr("style", "z-index:99999;");
                    }
                });

                //----

                $(".bt-salvar-comentario-editar").on("click", function(){
                    
                    var id = $("#editar-comentario").attr("data-id");

                    var comentario = $("#field-editar-comentario").val();

                    var obj_envio = {
                        id: id,
                        comentario: comentario
                    }

                    $.ajax({
                        url: "actions/update-comentario.php",
                        type : 'POST',
                        data : obj_envio,
                        success :function(request){
                            //console.log(request);

                            $("#editar-comentario").modal("hide");

                            if(request.success == false){
                                swal({
                                    title:"Atenção!", 
                                    text:request.error, 
                                    html:true
                                });
                            }else{
                                swal({   
                                    title: "Pronto!",   
                                    text: "Comentário editado com sucesso.",   
                                    type: "success"
                                }, function(){  
                                    loadComentarios(id_negocio);
                                });        
                            }
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
            }
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

function loadFunil(){
    $("#modal-loader").modal("show");

    var id_funil = $("#select-funil").val();

    $.ajax({
        url: "actions/select-negocios-funil.php",
        type : 'POST',
        data : {id_funil: id_funil},
        success :function(request){
            //console.log(request);

            if(request.success == true){
              distribuirCards(request.cards);
            }else{
                //limpa os cards
                $(".board .task-list-items").empty();
                countQtdItemsFunil();
            }

            setTimeout(function(){
                $("#modal-loader").modal("hide");
            }, 1000);
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

function distribuirCards(cards){
    //console.log(cards);

    //limpa os cards
    $(".board .task-list-items").empty();

    //----

    var lista_estagios_funil = [];
    var qtd_estagios = $(".board").find(".tasks").length;

    //percorre todos os funis
    for(var x = 0; x < qtd_estagios; x++){
        var div = $(".board").find(".tasks:eq("+x+")");
        var title = div.find(".task-header .title").text();

        var item = {
            nome: title,
            estagio: x,
            deals: {
                ordenados: [],
                desordenados: []
            }
        }

        lista_estagios_funil.push(item);
    }

    //console.log(lista_estagios_funil);

    //----

    //percorre cada card individualmente
    for(var x = 0; x < cards.length; x++){
        var id_lead = cards[x].lead.id;
        var nome_lead = cards[x].lead.nome;

        var id_negocio = cards[x].deal.id;
        var dias_passados = cards[x].deal.dias_passados;
        var date_time = cards[x].deal.date_time;
        var data = cards[x].deal.data;
        var estagio_funil = cards[x].deal.estagio_funil;
        var ordem_funil = cards[x].deal.ordem_funil;
        var etiqueta = cards[x].deal.etiqueta;
        var qtd_comentarios = cards[x].deal.qtd_comentarios;
        var flag_cadastro_completo = cards[x].deal.flag_cadastro_completo;

        if(flag_cadastro_completo == 0){
            flag_cadastro_completo = "on";
        }else{
            flag_cadastro_completo = "";
        }

        var htmlCard = "";
        htmlCard += '<div class="card mb-0" id="deal-'+id_negocio+'" data-lead="'+id_lead+'" data-ordem="'+ordem_funil+'">';
        htmlCard += '    <div class="card-body p-3">';
        htmlCard += '        <small class="float-end text-muted">'+data+'</small>';
        htmlCard += '        <span class="badge bg-ouro">'+etiqueta+'</span>';

        htmlCard += '        <h5 class="mt-2 mb-2 lead-name">';
        htmlCard += '            <a href="javascript:;" class="text-body bt-editar-negociacao">'+nome_lead+'</a>';
        htmlCard += '        </h5>';

        htmlCard += '        <p class="mb-0">';
        htmlCard += '            <span class="text-nowrap mb-2 d-inline-block">';
        htmlCard += '                <i class="mdi mdi-comment-multiple-outline text-muted"></i>';
        htmlCard += '                <b>'+qtd_comentarios+'</b> Comentários';
        htmlCard += '            </span>';
        htmlCard += '        </p>';

        htmlCard += '        <div class="dropdown float-end">';
        htmlCard += '            <a href="#" class="dropdown-toggle text-muted arrow-none" data-bs-toggle="dropdown" aria-expanded="false">';
        htmlCard += '                <i class="md md-more-vert"></i>';
        htmlCard += '            </a>';
        htmlCard += '            <div class="dropdown-menu dropdown-menu-end">';
        htmlCard += '                <a href="javascript:;" class="dropdown-item bt-editar-negociacao"><i class="fa fa-pencil"></i>Editar</a>';
                        
        htmlCard += '                <a href="javascript:;" class="dropdown-item bt-agendar-compromisso"><i class="fa fa-calendar"></i>Agendar</a>';
                        
        htmlCard += '                <a href="javascript:;" class="dropdown-item bt-deletar-negociacao"><i class="fa fa-trash-o"></i>Deletar</a>';
        htmlCard += '           </div>';
        htmlCard += '        </div>';

        htmlCard += '        <div class="wrapper-options float-end">';
        htmlCard += '            <a href="javascript:;" class="bt-negociacao-ganha" title="Negociação Ganha">';
        htmlCard += '                <i class="md md-check"></i>';
        htmlCard += '            </a>';

        htmlCard += '            <a href="javascript:;" class="bt-negociacao-perdida" title="Negociação Perdida">';
        htmlCard += '                <i class="md md-close"></i>';
        htmlCard += '            </a>';
        htmlCard += '        </div>';

        htmlCard += '        <div class="wrapper-infos">';
        htmlCard += '            <p class="mb-0 tempo-negociacao">';
        htmlCard += '                <i class="fa fa-clock-o"></i>'+dias_passados+'d';
        htmlCard += '            </p>';

        htmlCard += '            <div class="alerta '+flag_cadastro_completo+'">';
        htmlCard += '                <a href="javascript:;" class="bt-alerta-completar-cadastro" title="Completar Cadastro">';
        htmlCard += '                   <i class="ion-android-information"></i>';
        htmlCard += '                </a>';
        htmlCard += '            </div>';
        htmlCard += '        </div>';
        htmlCard += '    </div>';
        htmlCard += '</div>';

        //console.log(estagio_funil);

        //percorre cada estagio do funil
        for(var y = 0; y < lista_estagios_funil.length; y++){

          var estagio_funil_atual = lista_estagios_funil[y].nome;

          //console.log(estagio_funil_atual);

          //verifica se o card da vez, pertence ao estagio do funil atual no loop
          if(lista_estagios_funil[y].nome == estagio_funil){

              //console.log(estagio_funil_atual);
              //console.log(estagio_funil);

              //insere o card no funil (sem ordenacao)
              var estagio_atual = "";
              var n = lista_estagios_funil[y].estagio;
              estagio_atual = $(".board").find(".tasks:eq("+n+")");
              var item_card = estagio_atual.find(".task-list-items");       
              item_card.append(htmlCard);
           }

        }

        countQtdItemsFunil();
    }

    //----
    $(".bt-alerta-completar-cadastro").on("click", function(){                    
        $(".tasks .card").removeClass("on");
        $(this).parent().parent().parent().parent().addClass("on");
        var id_lead = $(".tasks .card.on").attr("data-lead");
        var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");

        selectDadosLead(id_lead, id_negocio);
        selectDadosNegocio(id_negocio);

        $("#modal-completar-cadastro").modal("show");
    });

    $(".tasks .card").on("click", function(){
        $(".tasks .card").removeClass("on");
        $(this).addClass("on");

        var id_lead = $(".tasks .card.on").attr("data-lead");
        var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");

        selectDadosLead(id_lead, id_negocio);
    });

    //----

    $(".bt-negociacao-ganha").on("click", function(){

        var id_funil = $(".board").attr("data-id-funil");

        if($(this).hasClass("on_modal")){
            var id_lead = 0;
            var id_negocio = $(this).parent().attr("data-deal");
        }else{
            var card = $(this).parent().parent().parent();

            $(".tasks .card").removeClass("on");
            card.addClass("on");

            var id_lead = $(".tasks .card.on").attr("data-lead");
            var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");
        }

        var obj_envio = {
          id_lead: id_lead, 
          id_negocio: id_negocio
        }

        //verificar se tem uma proxima etapa, e entao passar o bastao
        getEtapasFunil(id_funil, obj_envio);
    });

    //----

    $(".bt-negociacao-perdida").on("click", function(){
        if($(this).hasClass("on_modal")){
            var id_lead = 0;
            var id_negocio = $(this).parent().attr("data-deal");
        }else{
            var card = $(this).parent().parent().parent();

            $(".tasks .card").removeClass("on");
            card.addClass("on");

            var id_lead = $(".tasks .card.on").attr("data-lead");
            var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");
        }

        var obj_envio = {
          id_lead: id_lead, 
          id_negocio: id_negocio
        }

        swal({   
            title: "Atenção!",   
            text:"Deseja realmente definir esta negociação como perdida? Confirme para continuar...", 
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#317eeb",   
            confirmButtonText: "Confirmar",  
            cancelButtonText: "Cancelar", 
            closeOnConfirm: true, 
            html:true
        }, function(){   
            //after confirm

            $.ajax({
                url: "actions/update-negocio-perdido.php",
                type : 'POST',
                data : obj_envio,
                success :function(request){
                    if(request.success == false){
                        swal({
                            title:"Atenção!", 
                            text:request.error, 
                            html:true
                        });
                    }else{
                        swal({   
                            title: "Não foi dessa vez!",   
                            text: "Negociação perdida.",   
                            type: "error"
                        }, function(){  
                            $(".modal").modal("hide");
                            loadFunil();
                        });        
                    }
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

    //----

    $(".bt-deletar-negociacao").on("click", function(){
        if($(this).hasClass("on_modal")){
            var id_lead = 0;
            var id_negocio = $(this).parent().attr("data-deal");
        }else{
            var card = $(this).parent().parent().parent().parent();

            $(".tasks .card").removeClass("on");
            card.addClass("on");

            var id_lead = $(".tasks .card.on").attr("data-lead");
            var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");
        }

        var obj_envio = {
          id_lead: id_lead, 
          id_negocio: id_negocio
        }

        swal({   
            title: "Atenção!",   
            text:"Deseja realmente deletar esta negociação?", 
            type: "warning",   
            showCancelButton: true,   
            confirmButtonColor: "#317eeb",   
            confirmButtonText: "Sim, deletar",  
            cancelButtonText: "Cancelar", 
            closeOnConfirm: true, 
            html:true
        }, function(){   
            //after confirm
            $.ajax({
                url: "actions/delete-negocio.php",
                type : 'POST',
                data : obj_envio,
                success :function(request){
                    console.log(request);

                    if(request.success == false){
                        swal({
                            title:"Atenção!", 
                            text:request.error, 
                            html:true
                        });
                    }else{
                        swal({   
                            title: "Parabéns!",   
                            text: "Negociação deletada com sucesso.",   
                            type: "success"
                        }, function(){  
                            $(".modal").modal("hide");
                            loadFunil();
                        });        
                    }
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

    //----

    $(".bt-agendar-compromisso").on("click", function(){
        var card = $(this).parent().parent().parent().parent();

        $(".tasks .card").removeClass("on");
        card.addClass("on");

        var id_lead = $(".tasks .card.on").attr("data-lead");
        var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");

        var obj_envio = {
          id_lead: id_lead, 
          id_negocio: id_negocio
        }

        window.location.href = "agenda?lead="+id_lead;
    });

    //----

    $(".bt-editar-lead").on("click", function(){
        var id_lead = $(this).parent().parent().find(".id_lead").text();
        var id_negocio = $(this).parent().parent().find(".id_negocio").text();

        selectDadosLead(id_lead, id_negocio);

        //$("#detalhes-negocio").modal("hide");

        $("#modal-editar-lead").attr("data-id", id_lead);

        $("#modal-editar-lead").modal("show");

        if($(".modal-backdrop.show").length > 1){
            $(".modal-backdrop.show:eq(1)").attr("style", "z-index:9999;");
            $("#modal-editar-lead").attr("style", "z-index:99999;");
        }
    });

    //----

    $(".bt-salvar-lead-editar").on("click", function(){
        var nome = $("#editar-nome").val(); 
        var email = $("#editar-email").val();
        var telefone = $("#editar-telefone").val();
        var cidade = $("#editar-cidade").val();
        var estado = $("#editar-estado").val();

        var person = {
            id: $("#modal-editar-lead").attr("data-id"),
            nome: nome,
            email: email,
            telefone: telefone,
            cidade: cidade,
            estado: estado
        }

        if(nome == ""
            || email == ""
            || telefone == ""
            || cidade == ""
            || estado == ""){
            swal("Atenção!", "Preencha os campos obrigatórios.");
        }else{
            if(EmailValido(email)){
                //console.log(person);
                updateLead(person);
                $("#modal-editar-lead .modal-title").text("Editar Lead");
            }else{
                swal("Atenção!", "E-mail inválido.");
            }
        }
    });    

    //----

    $(".lead-name .bt-editar-negociacao").on("click", function(){
        var card = $(this).parent().parent().parent();

        $(".tasks .card").removeClass("on");
        card.addClass("on");

        var id_lead = $(".tasks .card.on").attr("data-lead");
        var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");

        $("#detalhes-negocio").attr("data-lead", id_lead);
        $("#detalhes-negocio").attr("data-deal", id_negocio);

        $("#detalhes-negocio .wrapper-comentarios").attr("data-lead", id_lead);
        $("#detalhes-negocio .wrapper-comentarios").attr("data-deal", id_negocio);

        $("#detalhes-negocio .dropdown-menu").attr("data-deal", id_negocio);

        selectDadosNegocio(id_negocio);
        loadComentarios(id_negocio);

        $("#detalhes-negocio").modal("show");
    });   

    //----

    $(".dropdown-menu .bt-editar-negociacao").on("click", function(){
        var card = $(this).parent().parent().parent().parent();

        $(".tasks .card").removeClass("on");
        card.addClass("on");

        var id_lead = $(".tasks .card.on").attr("data-lead");
        var id_negocio = $(".tasks .card.on").attr("id").replace("deal-", "");

        $("#detalhes-negocio").attr("data-lead", id_lead);
        $("#detalhes-negocio").attr("data-deal", id_negocio);

        $("#detalhes-negocio .wrapper-comentarios").attr("data-lead", id_lead);
        $("#detalhes-negocio .wrapper-comentarios").attr("data-deal", id_negocio);

        $("#detalhes-negocio .dropdown-menu").attr("data-deal", id_negocio);

        selectDadosNegocio(id_negocio);
        loadComentarios(id_negocio);

        $("#detalhes-negocio").modal("show");
    });

    //----

    $(".bt-add-agenda").on("click", function(){
        var id_lead = $("#detalhes-negocio").attr("data-lead");

        window.location.href = "agenda?lead="+id_lead;
    });
}

function getEtapasFunil(id_funil, obj_envio){
    $.ajax({
        url: "actions/select-etapas-funil.php",
        type : 'POST',
        data : obj_envio,
        success :function(request){
            //console.log(request);

            for(var x = 0; x < request.etapas.length; x++){
                if(id_funil == request.etapas[x]){
                    var current = x;
                    var next = current+1;
                    var proxima_etapa = request.etapas[next];
                    
                    if(proxima_etapa == ""
                        || proxima_etapa == null
                        || proxima_etapa == undefined){
                        //concluir negociacao
                        concluirNegociacao(obj_envio);
                    }else{
                        //passar o bastao
                        passarBastao(obj_envio.id_negocio, proxima_etapa);
                    }

                    //console.log(proxima_etapa);
                }
            }
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

function passarBastao(id_negocio, proxima_etapa){
    //pegar o primeiro estagio da proxima etapa do funil

    var obj_envio = {
        id_negocio: id_negocio,
        id_funil: proxima_etapa,
        estagio_inicial: ""
    }

    $.ajax({
        url: "actions/select-estagio-inicial.php",
        type : 'POST',
        data : obj_envio,
        success :function(request){
            //console.log(request);

            obj_envio.estagio_inicial = request.estagio_inicial;

            //atualizar  negocio com o id do novo funil

            swal({   
                title: "Atenção!",   
                text:"Deseja realmente passar o bastão para a próxima etapa: <b>"+request.nome_funil+"</b>? Confirme para continuar...", 
                type: "warning",   
                showCancelButton: true,   
                confirmButtonColor: "#317eeb",   
                confirmButtonText: "Confirmar",  
                cancelButtonText: "Cancelar", 
                closeOnConfirm: true, 
                html:true
            }, function(){ 
                updateFunilNegocio(obj_envio);
            });
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

function updateFunilNegocio(obj_envio){
    $.ajax({
        url: "actions/update-negocio-funil-atual.php",
        type : 'POST',
        data : obj_envio,
        success :function(request){
            console.log(request);
            loadFunil();
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

function concluirNegociacao(obj_envio){
    swal({   
        title: "Atenção!",   
        text:"Deseja realmente definir esta construção como <b>concluída</b>? Confirme para continuar...", 
        type: "warning",   
        showCancelButton: true,   
        confirmButtonColor: "#317eeb",   
        confirmButtonText: "Confirmar",  
        cancelButtonText: "Cancelar", 
        closeOnConfirm: true, 
        html:true
    }, function(){   
        //after confirm

        $.ajax({
            url: "actions/update-negocio-ganho.php",
            type : 'POST',
            data : obj_envio,
            success :function(request){
                console.log(request);

                if(request.success == false){
                    swal({
                        title:"Atenção!", 
                        text:request.error, 
                        html:true
                    });
                }else{
                    swal({   
                        title: "Parabéns!",   
                        text: "Construção concluída com sucesso.",   
                        type: "success"
                    }, function(){  
                        $(".modal").modal("hide");
                        loadFunil();
                    });        
                }
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
}

function updateLead(person){
    $("#modal-editar-lead").modal("hide");
    $("#modal-loader").modal("show");

    $.ajax({
        url: "actions/update-lead.php",
        type : 'POST',
        data : person,
        success :function(request){
            console.log(request);

            $("#modal-loader").modal("hide");

            if(request.success == false){
                swal({
                    title:"Atenção!", 
                    text:request.error, 
                    html:true
                });
            }else{
                swal({
                    title:"Sucesso!", 
                    text:"Lead atualizado com sucesso.", 
                    html:true
                }, function(){
                    window.location.reload();
                });
            }
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

function selectDadosLead(id_lead, id_negocio){
    $.ajax({
        url: "actions/select-lead.php",
        type : 'POST',
        data : {id_lead: id_lead, id_negocio: id_negocio},
        success :function(request){
            //console.log(request);

            $(".dados-do-lead .id_lead").empty();
            $(".dados-do-lead .id_negocio").empty();
            $(".dados-do-lead .nome").empty();
            $(".dados-do-lead .email").empty();
            $(".dados-do-lead .telefone").empty();
            $(".dados-do-lead .estado").empty();
            $(".dados-do-lead .cidade").empty();

            $(".dados-do-lead .id_lead").text(id_lead);
            $(".dados-do-lead .id_negocio").text(id_negocio);
            $(".dados-do-lead .nome").text(request.nome);
            $(".dados-do-lead .email").text(request.email);
            $(".dados-do-lead .telefone").append(request.telefone+' <a href="javascript:;" class="bt-whatsapp"><i class="fa fa-whatsapp"></i></a>');
            $(".dados-do-lead .estado").text(request.estado);
            $(".dados-do-lead .cidade").text(request.cidade);

            //----

            //modal editar lead

            //clean form
            document.getElementById("form-editar-lead").reset();
            $("#cidade").empty();
            $("#cidade").append('<option value="">Selecione...</option>');
            $("#cidade").prop("disabled", true);
            $("#estado").val("");
            $("#select2-estado-container").text("Selecione...");

            $("#editar-nome").val(request.nome); 
            $("#editar-email").val(request.email);
            $("#editar-telefone").val(request.telefone);
            $("#editar-estado").val(request.estado);

            buscaCidades2(request.estado);

            $("#editar-cidade").val(request.cidade);
            
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

function selectDadosNegocio(id_negocio){
    $.ajax({
        url: "actions/select-negocio.php",
        type : 'POST',
        data : {id_negocio: id_negocio},
        success :function(request){
            //console.log(request);

            $('#renda_bruta').val(request.renda_bruta);
            $('#tipo_renda').val(request.tipo_renda);
            $('#possui_lote').val(request.possui_lote);
            $('#situacao_lote').val(request.situacao_lote);
            $('#recurso_proprio').val(request.recurso_proprio);
            $('#padrao_imovel').val(request.padrao_imovel);

            //----

            //modal: negociacoes em andamento
            $('#editar-data-inicio').text(request.data_inicio);
            $('#editar-dias-passados').text(request.dias_passados+"d");

            $('#editar-estagio-funil').val(request.estagio_funil);
            $('#editar-valor-lote').val(request.valor_lote);
            $('#editar-valor-obra').val(request.valor_obra);

            $('#editar-tags option').each(function(){
                for(var x = 0; x < request.tags.length; x++){
                    if($(this).val() == request.tags[x]){
                        $(this).attr("selected", true);
                    }    
                }
            });

            $('#editar-renda-bruta').val(request.renda_bruta);
            $('#editar-tipo-renda').val(request.tipo_renda);
            $('#editar-possui-lote').val(request.possui_lote);
            $('#editar-situacao-lote').val(request.situacao_lote);
            $('#editar-recurso-proprio').val(request.recurso_proprio);
            $('#editar-padrao-imovel').val(request.padrao_imovel);

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

function addLead(person , deal){
    $("#modal-add-deal").addClass("hide");
    $("#modal-loader").modal("show");

    if(deal.novo == 1){
        addNegocio(person.id, deal);
    }else{
        $.ajax({
            url: "actions/insert-lead.php",
            type : 'POST',
            data : person,
            success :function(request){
                console.log(request);

                if(request.success == false){
                    $("#modal-add-deal").removeClass("hide");
                    $("#modal-loader").modal("hide");
                    /*
                    swal({
                        title:"Atenção!", 
                        text:request.error, 
                        html:true
                    });
                    */

                    swal({   
                        title: "Atenção",   
                        text:request.error, 
                        type: "warning",   
                        showCancelButton: true,   
                        confirmButtonColor: "#317eeb",   
                        confirmButtonText: "Selecionar este lead",  
                        cancelButtonText: "Cancelar", 
                        closeOnConfirm: true, 
                        html:true
                    }, function(){   
                        //after confirm
                        $(".box-cadastrar-lead").hide();
                        $(".box-dados-lead").show();
                    });
                }else{
                    addNegocio(request.id_lead, deal);
                }
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
}

function addNegocio(id_lead, deal){
    var obj_envio = {
        id_lead: id_lead,
        id_funil: $("#select-funil").val(),
        valor_lote: deal.valor_lote,
        valor_obra: deal.valor_obra,
        estagio_funil: deal.estagio_funil,
        tags: deal.tags
    }

    $.ajax({
        url: "actions/insert-negocio.php",
        type : 'POST',
        data : obj_envio,
        success :function(request){
            console.log(request);

            var id_negocio = request.id_negocio;

            loadFunil();

            if(deal.comentarios != ""){
                addComentarios(id_lead, id_negocio, deal.comentarios);
            }else{
                showModalCompletarCadastro(id_lead, id_negocio);
            }
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

function showModalCompletarCadastro(id_lead, id_negocio){
    $("#modal-add-deal").modal("hide");
    $("#modal-add-deal").removeClass("hide");
    $("#modal-loader").modal("hide");

    swal({   
        title: "Negociação criada",   
        text: "Deseja completar o cadastro do lead agora?",   
        type: "success",   
        showCancelButton: true,   
        confirmButtonColor: "#317eeb",   
        confirmButtonText: "Sim, completar cadastro",  
        cancelButtonText: "Depois", 
        closeOnConfirm: true 
    }, function(){  
        selectDadosLead(id_lead, id_negocio);
        $("#modal-completar-cadastro").modal("show");
    });
}

function addComentarios(id_lead, id_negocio, comentarios){
    var obj_envio = {
        id_negocio: id_negocio,
        comentarios: comentarios
    }

    $.ajax({
        url: "actions/insert-comentarios.php",
        type : 'POST',
        data : obj_envio,
        success :function(request){
            console.log(request);
            showModalCompletarCadastro(id_lead, id_negocio);
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

function activeDragDropDragula(){
    $('[data-plugin="dragula"]').each(function() {
        var etapas = $(this).data("containers");
        var funil = [];

        if (etapas){
            for (var x = 0; x < etapas.length; x++){

                var etapa_funil = $("#" + etapas[x])[0];

                funil.push(etapa_funil);
            }
        }else{
            funil = [$(this)[0]];
        }

        var i = $(this).data("handleclass");

        dragula(funil).on('drop', function(el, target, source, sibling){
          // do something

          var id_card = el.id.replace("deal-", "");
          var estagio = $("#"+target.id).parent().find(".title").text();
          var ordem = $(el).index();

          var card = {
            id_negocio: id_card,
            estagio_funil: estagio,
            ordem: ordem
          }

          //console.log(card);

          updateFunil(card);

          updateOrdemCards();

          countQtdItemsFunil();
        }); 
    });
}

function updateFunil(card){
    $.ajax({
        url: "actions/update-negocio-funil.php",
        type : 'POST',
        data : card,
        success :function(request){
            //console.log(request);
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

function updateOrdemCards(){
    var qtd_estagios = $(".board").find(".tasks").length;
    
    //percorre todos os funis
    for(var x = 0; x < qtd_estagios; x++){
        var div = $(".board").find(".tasks:eq("+x+")");
        var title = div.find(".task-header .title").text();
        var qtd_cards = div.find(".card").length;

        //percorre todos os cards do funil atual
        for(var y = 0; y < qtd_cards; y++){
            div.find(".card:eq('"+y+"')").attr("data-ordem", y);

            var item_id_negocio = div.find(".card:eq('"+y+"')").attr("id").replace("deal-", "");

            var obj_card = {
                id_negocio: item_id_negocio,
                estagio_funil: title,
                ordem: y
            }

            updateFunil(obj_card);
        }

    }
}

function countQtdItemsFunil(){
    $(".tasks").each(function(){
        var count_qtd = $(this).find(".count-qtd");
        var qtd = $(this).find(".task-list-items .card").length;
        count_qtd.text("("+qtd+")");
    });
}

function EmailValido(email) {
    let regEmail = RegExp('^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$', 'i');
    return regEmail.test(email);
}