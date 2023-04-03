"use strict";

const formRegistro = "#formRegistro";
const formAgregarVendedor = "#formAgregarVendedor";
const modalCrearVendedor = "#modalCrearVendedor";
const tablaUsuarios = "#tablaUsuarios";

$(function () {
    generalidades.marcarRequeridos(formRegistro);
    generalidades.validarFormulario(formRegistro, enviarDatos);

    generalidades.marcarRequeridos(formAgregarVendedor);
    generalidades.validarFormulario(formAgregarVendedor, guardar);
});

const enviarDatos = (form) => {
    let formData = new FormData(document.getElementById("formRegistro"));

    const config = {
        'method': 'POST',
        'headers': {
            'Accept': generalidades.CONTENT_TYPE_JSON,
        },
        'body': formData
    }
    const success = (response) => {
        if (response.estado == 'success') {
            generalidades.resetValidate(formRegistro);
        }
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
        generalidades.ocultarCargando(formRegistro);
    }
    const error = (response) => {
        generalidades.ocultarCargando(formRegistro);
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
    }
    generalidades.create(window.baseUrl+'Registro/store', config, success, error);
    generalidades.mostrarCargando(formRegistro);
}

const guardar = (form) => {
    let formData = new FormData(document.getElementById("formAgregarVendedor"));

    const config = {
        'method': 'POST',
        'headers': {
            'Accept': generalidades.CONTENT_TYPE_JSON,
        },
        'body': formData
    }
    const success = (response) => {
        if (response.estado == 'success') {
            generalidades.resetValidate(formAgregarVendedor);
            $(`${modalCrearVendedor} .btnCerrarModal`).trigger('click');
        }
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
        generalidades.ocultarCargando(formAgregarVendedor);
        $(tablaUsuarios).DataTable().ajax.reload(null, false);
    }
    const error = (response) => {
        generalidades.ocultarCargando(formAgregarVendedor);
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
    }
    generalidades.create(window.baseUrl+'Usuario/store', config, success, error);
    generalidades.mostrarCargando(formAgregarVendedor);
}

$(document).on('change', '.selectCargo', function(){
    if (this.value && this.value == 'Supervisor') {
        $('.inputComision').val(10).attr('readonly', true);
    } else {
        $('.inputComision').val('').attr('readonly', false);
    }
});