"use strict";

const formVentas = "#formVentas";
const modalVentas = "#modalVentas";
const tablaVentas = "#tablaVentas";
const tablaUsuarios = "#tablaUsuarios";

$(function () {
    listadoVentas();
    generalidades.validarFormulario(formVentas, enviarDatos);
});

$(document).on("click", ".btnVentas", function () {
    let id = $(this).attr("data-ventas");
    if (id) {
        $(`${formVentas} #idUsuario`).val(id);
        generalidades.marcarRequeridos(formVentas);
        $("#tablaVentas").DataTable().ajax.reload(null, false);
        $(modalVentas).modal('show');
    }
});

const enviarDatos = (form) => {
    let formData = new FormData(document.getElementById("formVentas"));;
    
    const config = {
        'method': 'POST',
        'headers': {
            'Accept': generalidades.CONTENT_TYPE_JSON,
        },
        'body': formData
    }

    const success = (response) => {
        if (response.estado == 'success') {
            $('#tabListado').trigger('click');
            generalidades.resetValidate(formVentas);
        }
        generalidades.ocultarCargando(formVentas);
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
        $("#tablaVentas").DataTable().ajax.reload(null, false);
        $(tablaUsuarios).DataTable().ajax.reload(null, false);
    }

    const error = (response) => {
        generalidades.ocultarCargando(formVentas);
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
    }

    generalidades.create(window.baseUrl+'Venta/store', config, success, error);
    generalidades.mostrarCargando(formVentas);
}

$(document).on('hiden.bs.modal', modalVentas, function () {
    generalidades.resetValidate(formVentas);
});

$(document).on('click', '#tabListado', function(){
    $('.btnGuardarVentas').addClass('d-none');
});

$(document).on('click', '#tabAgregarVenta', function(){
    $('.btnGuardarVentas').removeClass('d-none');
});

const listadoVentas = () => {
    var table = $(tablaVentas).DataTable({
        paging: true,
        responsive: true,
        processing: true,
        autowidth: false,
        ajax: {
            "url": window.baseUrl+`Venta/listado`,
            "type": "GET",                  
            "headers": {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
            },
            data: function (data) {
                generalidades.mostrarCargando(tablaVentas);
                data.id = $(`${formVentas} #idUsuario`).val();
                data = Object.assign(data);
            },
            dataSrc: function (json) {
                generalidades.ocultarCargando(tablaVentas);
                return json.data
            },
        },
        language: {
            "lengthMenu": "Mostrar _MENU_  registros por pagina",
            "info": "Pagina _PAGE_ de _PAGES_",
            "infoEmpty": "No hay registros disponibles",
            "infoFiltered": "(filtrada de _MAX_ registros)",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "No se encontraron registros coincidentes",
        },
        buttons: [
            {
                extend: "pdf",
                text: '<i class="fa fa-download"></i> PDF',
                className: "btn btn-outline-danger",
                title: "Listado ventas.",
                exportOptions: {
                    columns: ":not(.excluir)"
                }
            },
            {
                text: '<i class="fa fa-sync-alt"></i> Actualizar',
                className: "btn btn-secondary",
                action: function (e, dt, node, config) {
                    dt.ajax.reload(null, false);
                }
            }
        ],
        columnDefs: [
            {
                targets: "all",
                className: "text-center"
            }
        ],
        columns: [
            {
                render: function (data, type, full, meta) {
                    return meta.row + 1;
                }
            },
            {
                data: 'nombre',
                name: 'nombre'
            },
            {
                data: 'precio',
                name: 'precio'
            }
        ],
        order: [
            [0, "asc"]
        ], 
        lengthMenu: [
            [5, 10, 20, 50, -1],
            [5, 10, 20, 50, "Todos"]
        ],
        pageLength: 5,
        dom : `<'row mb-2'<'col-12 text-right'B>><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12 text-right dataTables_pager'lp>><'table-scrollable't><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12 text-right dataTables_pager'lp>>`,
        initComplete: function () {}
    });
}