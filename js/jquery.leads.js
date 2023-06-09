$(()=>{

  getLeads()
    $("form").on('submit', (e)=>{
    e.preventDefault();

    $.ajax({
      url: '/actions/createLeads.php',
      data: $("form").serialize(),
      type: 'POST',
      success: (d)=>{
        
        action = d == 0 ?  'adicionado' : 'editado'
        $("#myModal").modal('hide')
        Swal.fire({
          icon: 'success',
          title: 'Lead '+action,
          backdrop: 'rgba(0,0,0,0.8)',
          timer: 2000,
        })
        getLeads()        
      }
    })
  })

  $("#estado").on('change', ()=>{
    cidades()
  })

  $("#telefone").inputmask("(99) 99999-9999");
  
  console.log("%ccredcasa", "font-weight: bold; font-size: 70px;color: red; text-shadow: 3px 3px 0 rgb(4,77,145) , 6px 6px 0 rgb(42,21,113);");
  console.log("%cTeste de apresentação. 09/06/2023", "color: #007acc;font-size: 20px; margin-left: 5px");

})

function cidades(){

  estado = $("#estado").val()
  $("#cidade").empty()
  $.each(json_cidades.estados,(i,v)=>{
    if(v.sigla === estado){      
      $.each(v.cidades,(i,v)=>{
        $("#cidade").append(`
          <option value="${v}">${v}</option>
        `)        
      })
    }
  })
}

function formatar(){

  $("#id").val(0)      
  $("#myModalLabel").html(`
    Cadastrar Lead
  `)
  $('form')[0].reset()
  $("#cidade").empty()
  $("#cidade").append(`
    <option value="">Selecione o Estado...</option>
  `)
  $("tbody").empty()
}

function getLeads(){
  $.ajax({
    url: '/actions/getLeads.php',
    dataType: 'json',
    success: (d)=>{

      // FORMATAR
      formatar()

      // TOTAL CADASTRADO
      $("#total").html('Leads cadastrados <strong>'+Object.keys(d.all).length+'</strong>')

      // TOTAL DO MES
      now = new Date
      monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "agosto", "outubro", "novembro", "dezembro")
      $("#mes").html('Leads no mes ('+monName [now.getMonth()]+')<strong> '+d.mes+'</strong>')

      // TABELA
      $.each(d.all,(i,v)=>{
        $('tbody').append(`
          <tr>
            <td>${v.id}</td>
            <td>${v.nome}</td>
            <td>${v.telefone}<i class="fa text-success fa-whatsapp fa-lg" onclick="whatsapp('${v.telefone}','${v.nome}')" title="CLIQUE PARA CONTATO"></i></td>
            <td>${v.email}</td>
            <td>${v.estado}</td>
            <td>${v.cidade}</td>
            <td>
              <i class="fa fa-pencil text-primary fa-lg" style="cursor:pointer" onclick="edita('${v.id}')" title="EDITAR LEAD" data-toggle="modal" data-target="#myModal"></i>
            </td>
            <td>
              <i class="fa fa-trash text-danger fa-lg" style="cursor:pointer" onclick="apaga('${v.id}')" title="APAGAR LEAD"></i>
            </td>
          </tr>
        `)
      })

      // CIDADES
      $("#estado").empty()
      $("#estado").append('<option value="">Escolha...</option>')
      $.each(json_cidades.estados,(i,v)=>{
        $("#estado").append(`
          <option value="${v.sigla}">${v.sigla}</option>
        `)
      }) 

    },
    error: (e)=>{
      console.log('er');      
    }  
  })
}

function edita(id){
  $.ajax({
    url: '/actions/getUpdateLeads.php',
    data: {id:id},
    type: 'POST',
    dataType: 'json',
    success: (d)=>{
      
      console.log(d.estado)
      $("#myModalLabel").html(`Editar Lead`)
      $("#id").val(id)
      $("#nome").val(d.nome)
      $("#telefone").val(d.telefone)
      $("#email").val(d.email)
      $("#estado").val(d.estado)
      cidades()
      $("#cidade").val(d.cidade)      
    }
  })
}

function apaga(id){
  
  Swal.fire({
    icon: 'question',
    title: 'Remover Lead?',
    backdrop: 'rgba(0,0,0,0.8)',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  }).then((result)=>{
    if(result.isConfirmed){
      $.ajax({
        url: '/actions/deleteLeads.php',
        data: {id:id},
        type: 'POST',
        success: ()=>{
          getLeads()       
        }
      })
    }
  })
}

function whatsapp(tel,nome){
  tel = tel.replace(/\D/g, '')
  window.open("https://api.whatsapp.com/send?phone=55"+tel+"&text=Caro "+nome+" ...")
}