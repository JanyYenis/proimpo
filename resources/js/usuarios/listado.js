"use strict";

const tablaUsuarios = "#tablaUsuarios";

$(function () {
    listadoVendedores();
});

const listadoVendedores = () => {
    var table = $(tablaUsuarios).DataTable({
        paging: true,
        responsive: true,
        processing: true,
        autowidth: false,
        ajax: {
            "url": window.baseUrl+'Usuario/listado',
            "type": "GET",                  
            
            "headers": {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr('content')
            },
            data: function (data) {
                generalidades.mostrarCargando(tablaUsuarios);
                data = Object.assign(data);
            },
            dataSrc: function (json) {
                generalidades.ocultarCargando(tablaUsuarios);
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
                extend: 'colvis',
                text: '<i class="fas fa-hand-holding-usd"></i> Calcular comisiones',
                className: "btn btn-outline-success btnMostrarComision",
                columns: 9
            },
            {
                extend: "pdf",
                text: '<i class="fa fa-download"></i> PDF',
                className: "btn btn-outline-danger",
                title: "Listado vendedores.",
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
            },
            {
                targets: "none",
                className: "text-justify"
            },
            { 
                targets: 9,
                visible: false,
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
                data: 'apellido',
                name: 'apellido'
            },
            {
                data: 'cedula',
                name: 'cedula'
            },
            {
                data: 'telefono',
                name: 'telefono'
            },
            {
                data: 'direccion',
                name: 'direccion'
            },
            {
                data: 'email',
                name: 'email'
            },
            {
                data: 'cargo',
                name: 'cargo'
            },
            {
                data: 'comision',
                name: 'comision'
            },
            {
                data: 'comisionTotal',
                name: 'comisionTotal',
                render: function(data, type, full, meta) {
                    let comision = full?.comisionTotal ?? 0;
                    return `$${comision}`;
                }
            },
            {
                data: 'action',
                name: 'action',
                orderable: false,
                searchable: false
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