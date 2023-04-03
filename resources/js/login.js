"use strict";

const formLogin = "#formLogin";

$(function () {
    generalidades.validarFormulario(formLogin, enviarDatos);
});

const enviarDatos = (form) => {
    let formData = new FormData(document.getElementById("formLogin"));

    const config = {
        'method': 'POST',
        'headers': {
            'Accept': generalidades.CONTENT_TYPE_JSON,
        },
        'body': formData
    };

    const success = (response) => {
        if (response.estado == 'success') {
            generalidades.resetValidate(formLogin);
            setTimeout(window.open(window.baseUrl+response?.ruta, '_self'), 5000);
        }
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
        // generalidades.ocultarCargando(formLogin);
    }
    const error = (response) => {
        // generalidades.ocultarCargando(formLogin);
        generalidades.toastrGenerico(response?.estado, response?.mensaje);
    }
    generalidades.post(window.baseUrl+'Login/login', config, success, error);
    // generalidades.mostrarCargando(formLogin);
}

$(document).on('click', '#cerrarSeccion', function(){
    const config = {};

    const success = (response) => {
        if (response.ruta) {
            setTimeout(window.open(window.baseUrl+response?.ruta, '_self'), 5000);
        }
    }
    generalidades.get(window.baseUrl+'Login/cerrarSeccion', config, success);
});