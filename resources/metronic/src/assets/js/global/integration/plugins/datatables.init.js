"use strict";
// var defaults = {
// 	"language": {
// 		"paginate": {
// 			"first": '<i class="la la-angle-double-left"></i>',
// 			"last": '<i class="la la-angle-double-right"></i>',
// 			"next": '<i class="la la-angle-right"></i>',
// 			"previous": '<i class="la la-angle-left"></i>'
// 		}
// 	}
// };
var defaults = {
    language: {
        aria: {
            sortAscending: ": activate to sort column ascending",
            sortDescending: ": activate to sort column descending"
        },
        processing: "Cargando...",
        emptyTable: "No hay datos en la tabla",
        info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
        infoEmpty: "Ningún dato disponible en esta tabla",
        infoFiltered: "(filtrado de un total de _MAX_ registros)",
        lengthMenu: "_MENU_",
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
        zeroRecords: "No se encontraron resultados",
        paginate: {
            first: '<i class="la la-angle-double-left"></i>',
            last: '<i class="la la-angle-double-right"></i>',
            next: '<i class="la la-angle-right"></i>',
            previous: '<i class="la la-angle-left"></i>'
        }
    },
    loadingMessage: "Cargando...",
    orderCellsTop: true,
    autoWidth: false,
    
    // processing: false,
    // serverSide: true,
    stateSave: false,
    // deferLoading: 100,

    deferRender: true,
    colReorder: true,
    destroy: true,
    pagingType: "full_numbers",
    // reponsive: true,
    // fixedHeader: {
    //     header: true,
    //     headerOffset: 119
    // },
    // responsive: {
    //     breakpoints: [{
    //             name: "desktop",
    //             width: Infinity
    //         },
    //         {
    //             name: "tablet",
    //             width: 1024
    //         },
    //         {
    //             name: "fablet",
    //             width: 768
    //         },
    //         {
    //             name: "phone",
    //             width: 480
    //         }
    //     ]
    // },
    // searching: false,
    // ordering: false,
    colReorder: {
        reorderCallback: function () {
            console.log("callback");
        }
    },
    order: [
        [0, "asc"]
    ],
    lengthMenu: [
        [5, 10, 15, 20, -1],
        [5, 10, 15, 20, "Todos"] // change per page values here
    ],
    pageLength: 15,
    LengthChange: true,
    // bInfo: true,
    // dom: "<'row'<'col-sm-7 col-xs-12'l><'col-sm-5 col-xs-12'B>r> <'row'<'col-sm-7 col-xs-12'i><'col-sm-5 col-xs-12'p>r><'table-scrollable't><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12'p>>", // horizobtal scrollable datatable
    dom: `
        <'row'
            <'col-sm-12 col-xs-12 text-right pb-2 'B>
        r>
        <'row'
            <'col-sm-6 col-xs-12'i>
            <'col-sm-6 col-xs-12 dataTables_pager'lp>
        r>
        <'table-scrollable't>
        <'row'
            <'col-md-6 col-sm-12'i>
            <'col-md-6 col-sm-12 dataTables_pager'lp>
        r>`, // horizobtal scrollable datatable
    // dom: "<'row'<'col-sm-6 col-xs-12'i><'col-sm-6 col-xs-12 dataTables_pager'lp>r><'table-scrollable't><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12 text-right dataTables_pager'lp>>", // horizobtal scrollable datatable
    // dom: "<'row'<'col-sm-6 col-xs-12'i><'col-sm-6 col-xs-12 dataTables_pager'lp>r><'table-scrollable't><'row'<'col-md-6 col-sm-12'i><'col-md-6 col-sm-12 text-right dataTables_pager'lp>>", // horizobtal scrollable datatable

    initComplete: function () {
        var thisTable = this;
        // console.log('# 3',$(this).attr('id'));
        var rowFilter = $(this)
            .find(".filterDT")
        // .find(".column_")
        ;
        // console.log('# 2',$('#'+$(this).attr('id')).find('.filterDT'));

        // hide search column for responsive table
        var hideSearchColumnResponsive = function () {
            thisTable
                .api()
                .columns()
                .every(function () {
                    var column = this;
                    if (column.responsiveHidden()) {
                        $(rowFilter)
                            .find("th")
                            .eq(column.index())
                            .show();
                    } else {
                        $(rowFilter)
                            .find("th")
                            .eq(column.index())
                            .hide();
                    }
                });

            // thisTable.DataTable().fixedHeader.headerOffset($('#fixed').height());   // apply new value
            // above fails, as there so no such method to update headerOffset (yet)
            // thisTable.DataTable().fixedHeader.adjust();
            // console.log(window.screen.width);

            if (window.screen.width <= 1024) {
                thisTable.DataTable().fixedHeader.disable();
            } else {
                thisTable.DataTable().fixedHeader.enable();
            }
        };

        // init on datatable load
        hideSearchColumnResponsive();
        // recheck on window resize
        window.onresize = hideSearchColumnResponsive;

        // $('#kt_datepicker_1,#kt_datepicker_2').datepicker();
    }
};

if (KTUtil.isRTL()) {
    defaults = {
        language: {
            paginate: {
                first: '<i class="la la-angle-double-right"></i>',
                last: '<i class="la la-angle-double-left"></i>',
                next: '<i class="la la-angle-left"></i>',
                previous: '<i class="la la-angle-right"></i>'
            }
        }
    };
}

$.extend(true, $.fn.dataTable.defaults, defaults);

// fix dropdown overflow inside datatable
KTApp.initAbsoluteDropdown(".dataTables_wrapper");

$(function () {
    $.fn.dataTable.ext.errMode = "none";
});
