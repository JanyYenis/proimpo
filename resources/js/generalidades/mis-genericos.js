import Generalidades from '../generalidades';

Generalidades.prototype.CONTENT_TYPE_JSON = "application/json";
Generalidades.prototype.CONTENT_TYPE_HTML = "text/html";
Generalidades.prototype.CONTENT_TYPE_FORMDATA = "multipart/form-data";

Generalidades.prototype.mostrarCargando = function (elemento) {
    if (elemento != undefined) {
        KTApp.block(elemento, {
            overlayColor: "#000000",
            type: "v2",
            state: "success",
            size: "lg"
        });
    } else {
        KTApp.startPageLoading({
            animate: true
        });
    }
}

Generalidades.prototype.ocultarCargando = function (elemento) {
    if (elemento != undefined) {
        KTApp.unblock(elemento);
    } else {
        KTApp.stopPageLoading();
    }
}

Generalidades.prototype.ejecutar = function (method = 'GET', ruta, elemento = 'body', modal = null, div = null, completado = false) {
    setTimeout(function() {
        $.ajax({
            type: method,
            url: ruta,
            success: function(response) {
                if (response.html != undefined) {
                    $(div).html(response.html);
                }
                if (modal) {
                    generalidades.modalActual(modal);
                }
                if (completado != false) {
                    completado(response);
                }
                generalidades.ocultarCargando(elemento);
            }
        });
    },3000);
}

Generalidades.prototype.dataTables = function (dt, config, filtro = null) {
    var table = $(dt);
    table.DataTable(config);
    return table;
}

Generalidades.prototype.mensajeSwal = function (validaciones, type = 'error', title = 'Error', footer = null, accionConfirmar = null, mostrarCancelar = false, accionCancelar = null) {

    if (!validaciones) {
        return;
    }
    let html = '';

    if (typeof validaciones === "object") {
        $.each(validaciones, function (i, value) {
            html += `<li> ${value} </li>`;
        });
    } else {
        html += validaciones;
    }

    let configSwal = {
        type,
        title,
        html,
        footer
    };

    if (accionConfirmar != null) {
        Object.assign(configSwal, {
            "focusConfirm": false,
            "confirmButtonText": '<i class="fa fa-check"></i> Confirmar',
            "confirmButtonAriaLabel": 'Confirmar',
        });
    }

    if (mostrarCancelar) {
        Object.assign(configSwal, {
            "showCloseButton": true,
            "showCancelButton": true,
            "cancelButtonText": '<i class="fa fa-times"></i> Cancelar',
            "cancelButtonAriaLabel": 'Cancelar'
        });
    }

    swal.fire(configSwal).then((resultado) => {
        if (resultado.value && accionConfirmar != null) {
            accionConfirmar();
        } else if (!resultado.value && accionCancelar != null) {
            accionCancelar();
        }
    });
}

Generalidades.prototype.validarDatos = function (
    formElement,
    submitHandler,
    invalidHandler = false,
    highlight = false,
    unhighlight = false,
    errorPlacement = false,
    rules = false,
    messages = false
) {
    if (invalidHandler === false) {
        invalidHandler = evt => {
            this.toastrGenerico(
                "error",
                "Ha ocurrido un error de validación, por favor, verifica todos los campos."
            );
            evt.preventDefault();
            return false;
        };
    }
    if (highlight === false) {
        highlight = element => {
            if ($(element).hasClass("selectGenerico")) {
                $(element)
                    .parent()
                    .addClass("is-invalid");
                $(element)
                        .parent()
                        .find(".select2-selection")
                        .css("border-color", "#fd397a");
                return true;
            }

            if ($(element).hasClass("summernote")) {
                $(element).parent().find(".note-editor").addClass("line-error");
                return true;
            }

            if ($(element).closest(".kt-checkbox").length == 1) {
                let contenedorCheckbox = $(element).closest(".kt-checkbox");
                if (contenedorCheckbox.parent().find(".errorCheckbox").length == 0) {
                    $("<span class='errorCheckbox text-danger'><br/>Este campo es requerido.</span>").insertAfter(contenedorCheckbox);
                }
                return true;
            }

            $(element)
                .closest(".form-control")
                .addClass("is-invalid");
        };
    }
    if (unhighlight === false) {
        unhighlight = element => {
            if ($(element).hasClass("selectGenerico")) {
                $(element)
                    .parent()
                    .removeClass("is-invalid");
                $(element)
                    .parent()
                    .find(".select2-selection")
                    .css("border-color", "");
                return true;
            }

            if ($(element).hasClass("summernote")) {
                $(element).parent().find(".note-editor").removeClass("line-error");
                return true;
            }

            if ($(element).closest(".kt-checkbox").parent().find(".errorCheckbox").length >= 1) {
                $(element).closest(".kt-checkbox").parent().find(".errorCheckbox").remove();
                return true;
            }

            $(element)
                .closest(".form-control")
                .removeClass("is-invalid");
        };
    }
    $(formElement).validate({
        ignoreTitle: true,
        ignore: ':hidden:not(.summernote),.note-editable.card-block',
        errorElement: "span", //default input error message container
        errorClass: "help-block help-block-error", // default input error message class
        focusInvalid: true,
        onfocusout: false,
        lang: "es",
        highlight, 
        unhighlight,
        invalidHandler,
        submitHandler,
        errorPlacement,
        rules,
        messages
    });
}

Generalidades.prototype.validarFormulario = function (formularioId, accion) {
    const submitHandler = (form, e) => {
        e.preventDefault();

        let divValidacion = $(formularioId).find(".div-validacion");
        if (divValidacion.length == 1) {
            divValidacion.addClass("d-none");
        }

        let botonActivador = document.activeElement;
        if (!((botonActivador instanceof HTMLButtonElement) || (botonActivador instanceof HTMLInputElement)) && !botonActivador.getAttribute("type") == "submit") {
            botonActivador = null;
        }
        accion(form, botonActivador);
        return false;
    };
    this.validarDatos(formularioId, submitHandler);
}

Generalidades.prototype.marcarRequeridos = function (form) {
    $(`${form} .requerido .marcadoRequerido`).remove();
    $(`${form} .requerido`).each(function () {
        let label = $(this).text();
        $(this).html(`${label} <span class="text-danger marcadoRequerido">*</span>`);
    });
}

/**
 * Función que permite inicializar un repeaterGenerico.
 * @param {string} id - El identificador del div a convertir en repeater.
 * @param {Boolean} initEmpty - Se define si se oculta el formulario del repeater al cargar el documento
 * @param {Boolean} prependItems - Se define si el despliegue del repeater es de forma descendente o sea que cargue primero el elemento que se crea
 * @param {Object} defaultValues - Valores por defecto a agregarse al repeater.
 * @param {Function} callbackAgregado - Función a ejecutarse cuando ya se haya agregado un elemento al repeater.
 * @param {Function} callbackEliminado - Función a ejecutarse cuando ya se haya eliminado un elemento del repeater.
 */
Generalidades.prototype.repeaterGenerico = function (id, initEmpty = false, prependItems = true, defaultValues = {}, callbackAgregado = false, callbackEliminado = false) {
    $(id).repeater({
        initEmpty: initEmpty,
        defaultValues: defaultValues,
        prependItems: prependItems,
        show: function () {
            $(this).slideDown("slow");
            if (callbackAgregado != false && typeof (callbackAgregado) === "function") {
                callbackAgregado(this);
            }
        },
        hide: function (deleteElement) {
            $(this).slideUp(deleteElement, function () {
                if (callbackEliminado != false && typeof (callbackEliminado) === "function") {
                    callbackEliminado(this);
                }
            });
        }
    });
}

Generalidades.prototype.resetValidate = function (idForm) {
    console.log(111);
    let validator = $(idForm).validate(); 
    $(idForm).find(".kt-select2")
        .empty()
        .trigger("change");
    $(idForm)
        .find(".form-control")
        .val("");
    $(idForm)
        .find(".touchspin")
        .trigger("touchspin.updatesettings", { "initval": 1 })
    
    $(idForm)
        .find(".div-validacion")
        .addClass("d-none");
    
    validator.resetForm();
}


/**
 * Función que permite realizar una petición HTTP.
 * @param {string} url Ruta a la cual hacer la petición HTTP.
 * @param {Object} config JSON con la configuración de la petición, ej: headers, token...
 * @param {Function} success Función callback al tener éxito.
 * @param {Function} error Función callback al no cumplirse.
 * @param {string} tipo Tipo de contenido esperado, JSON, HTML, etc...
 */
Generalidades.prototype.peticionHttp = async function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    const headers = new Headers(config.headers); // Crea un objeto de tipo Headers dado el parámetro.
    if (!headers.has("X-CSRF-TOKEN")) {
        headers.append("X-CSRF-TOKEN", this.token);
    }

    if (headers.has("Content-Type")) {
        const content = headers.get("Content-Type");

        if (config.body && content == this.CONTENT_TYPE_JSON) {
            if (config.body instanceof FormData) {
                config.body = this.formDataAJson(config.body, true);
            } else {
                config.body = JSON.stringify(config.body);
            }
        }
    }
    let accept = headers.has("Accept") ? headers.get("Accept") : this.CONTENT_TYPE_JSON;

    config.headers = headers;
    
    const request = new Request(url, config);
    try {
        const response = await fetch(request);
        
        if (response.status == 401) {
            return this.mensajeSwal("Tu sesión ha expirado. Inicia sesión para continuar.", "info", "Sesión expirada", null, () => {window.location.reload()}, false, () => {window.location.reload()});
        }

        let respuesta;
        switch (accept) {
            case this.CONTENT_TYPE_HTML:
                respuesta = await response.text();
                break;
            case this.CONTENT_TYPE_JSON:
                respuesta = await response.json();
                if (respuesta.statusCode === 422 && error != null) {
                    return error(respuesta);
                }
                break;
            default:
                respuesta = await response.json();
                break;

        }
        success(respuesta);
    } catch (ex) {
        if (error == null)
            error = ex => {
                console.error(ex);
            };
        error(ex);
    }
}

/**
 * Función que permite realizar una petición de tipo POST.
 * @param {string} url Dirección a la cual hacer la petición.
 * @param {Object} config JSOn con un FormData con la configuración de la petición.
 * @param {Function} success Función callback en caso de éxito.
 * @param {Function} error Función callback en caso de error.
 */
Generalidades.prototype.create = function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    if (config.body) {
        config.method = "POST";
        this.peticionHttp(url, config, success, error, tipo);
        return true;
    }
    console.error("Debes enviar datos.");
    return false;
}

/**
 * Refresca el listado de la sección.
 * @param {object} btnAccion botón de la sección
 * @param {string} ruta ruta de la sección
 * @param {string} div div de la sección
 */
Generalidades.prototype.refrescarSeccion = function (btnAccion, ruta, div, completado = false) {
    if (btnAccion) {
        btnAccion.prop("disabled", true);
    }

    this.mostrarCargando(div);
    const success = response => {
        if (btnAccion) {
            btnAccion.prop("disabled", false);
        }
        this.ocultarCargando(div);
        if (response.html != undefined) {
            $(div).html(response.html);
        }
        if (response.estado && response.mensaje) {
            this.toastrGenerico(response.estado, response.mensaje);
        }
        if (completado != false) {
            completado(response);
        }
    };
    const error = response => {
        if (btnAccion) {
            btnAccion.prop("disabled", false);
        }
        this.ocultarCargando(div);
    };
    
    const config = {
        "headers": {
            "Content-Type": generalidades.CONTENT_TYPE_JSON,
            "Accept": generalidades.CONTENT_TYPE_JSON
        }
    };
    
    this.get(ruta, config, success, error);
}

/**
 * Función que permite refrescar múltiples secciones. Estas secciones son definidas desde el backend.
 * @param {object} btnAccion botón que realizó la carga de la sección.
 * @param {string} ruta Ruta para cargar las secciones.
 * @param {Function} completado Función callback ejecutada al completar el cargado.
 */
Generalidades.prototype.refrescarSecciones = function (btnAccion, ruta, completado = false) {
    if (btnAccion && btnAccion.jquery === undefined) {
        btnAccion = $(btnAccion);
    }

    const config = {
        "headers": {
            "Accept": generalidades.CONTENT_TYPE_JSON,
            "Content-Type": generalidades.CONTENT_TYPE_JSON
        }
    };

    const success = (response) => {
        this.ocultarCargando("body");
        if (btnAccion) {
            btnAccion.prop("disabled", false);
        }

        if (response.estado == "success" && response?.html) {
            let html = response?.html ?? {};
            // converitmos el objeto a un array iterable llave => valor
            let iterableHtml = Object.entries(html);
            // iteramos y reemplazamos el html de esos indices.
            iterableHtml.forEach(([index, val]) => $(index).html(val));
            generalidades.toastrGenerico(response.estado, response.mensaje);
            if (completado != null) {
                completado(response);
            }
        }
    }

    const error = (response) => {
        if (btnAccion) {
            btnAccion.prop("disabled", false);
        }
        this.ocultarCargando("body");
    }

    this.mostrarCargando("body");
    this.get(ruta, config, success, error);
}

/**
 * Función que permite realizar una petición de tipo GET.
 * @param {string} url Dirección a la cual hacer la petición.
 * @param {Object} config JSON con la configuración de la petición.
 * @param {Function} success Función callback en caso de éxito.
 * @param {Function} error Función callback en caso de error.
 */
Generalidades.prototype.get = function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    if (!config.body) {
        config.method = "GET";
        this.peticionHttp(url, config, success, error, tipo);
        return true;
    }
    console.error("Una peticion GET no debe tener body");
    return false;
}

/**
 * Función que permite realizar una petición de tipo POST.
 * @param {string} url Dirección a la cual hacer la petición.
 * @param {Object} config JSON con la configuración de la petición.
 * @param {Function} success Función callback en caso de éxito.
 * @param {Function} error Función callback en caso de error.
 */
Generalidades.prototype.post = function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    config.method = "POST";
    this.peticionHttp(url, config, success, error, tipo);
    return true;
}

/**
 * Función que permite realizar una petición de tipo DELETE.
 * @param {string} url Dirección a la cual hacer la petición.
 * @param {Object} config JSON con la configuración de la petición.
 * @param {Function} success Función callback en caso de éxito.
 * @param {Function} error Función callback en caso de error.
 */
Generalidades.prototype.delete = function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    if (config.method === "DELETE") {
        this.peticionHttp(url, config, success, error, tipo);
        return true;
    }
    console.error("Error al eliminar.");
    return false;
}

/**
 * Función que permite realizar una petición de tipo PUT o PATCH.
 * @param {string} url Dirección a la cual hacer la petición.
 * @param {Object} config JSON con la configuración de la petición.
 * @param {Function} success Función callback en caso de éxito.
 * @param {Function} error Función callback en caso de error.
 */
Generalidades.prototype.edit = function (url, config, success, error = null, tipo = this.CONTENT_TYPE_JSON) {
    
    const headers = new Headers(config.headers); // Crea un objeto de tipo Headers dado el parámetro.
    if (!headers.has("Content-Type")) {
        headers.append("Content-Type", this.CONTENT_TYPE_JSON);
    }
    config.headers = headers;

    
    if (config.body && (config.method === "PUT" || config.method === "PATCH")) {
        this.peticionHttp(url, config, success, error, tipo);
        return true;
    }
    return false;
}

/**
 * Función que permite transformar un formData a JSON.
 * @param {FormData} formData formData a transformar a JSON.
 * @param {boolean} stringify Retornar como un string JSON o no.
 * @returns {string|Object} Retorna un Objeto o un string.
 */
Generalidades.prototype.formDataAJson = function (formData, stringify = false) {
    let json = {};
    formData.forEach((value, key) => {
        json[key] = value;
    });
    if (stringify) {
        return JSON.stringify(json);
    }
    return json;
}

/**
 * Función que permite transformar un formData a JSON.
 * @param {FormData} formData formData a transformar a JSON.
 * @param {boolean} stringify Retornar como un string JSON o no.
 * @returns {string|Object} Retorna un Objeto o un string.
 */
Generalidades.prototype.formToJson = function (formData, stringify = false) {

    let json= Array.from(formData.keys()).reduce((result, key) => {
        if (result[key]) {
          result[key] = formData.getAll(key)
          return result
        }
        result[key] = formData.get(key);
        return result;
      }, {});
    if (stringify) {
        return JSON.stringify(json);
    }
    return json;
}


/**
 * Función que permite hacer una petición a los datatables. Anteriomente se usaba ajax
 * @param {string} url Dirección URL para consultar la información
 * @param {object} data Información que sera enviada en la petición
 * @param {Function} callback Respuesta de la petición http
 * @param {object} settings Configuración del datatable
 * @param {string} method Tipo de metodo que sera la petición
 * @param {Function} success Accion Adicional cuando da la respuesta la petición
 * @param {Function} error accion cuando se presenta un error.
 */
Generalidades.prototype.peticionDT = function (url, data, callback, settings, method = "POST", success = null, error = null) {

    const idTable = settings.sTableId;

    const config = {
        method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: data
    };

    generalidades.mostrarCargando(`#${idTable}`);

    if (!error)
        error = ex => {
            console.error(ex);
        };

    if (!success)
        success = response => {};

    const complete = response => {
        generalidades.ocultarCargando(`#${idTable}`);
        success(response);
        callback(response)
    }

    generalidades.peticionHttp(url, config, complete, error);
}

Generalidades.prototype.toastrGenerico = function (estado, mensaje, configuracion = null) {
    if (!configuracion) {
        configuracion = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: "toast-bottom-left",
            preventDuplicates: false,
            onclick: null,
            showDuration: "500",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };
    }
    toastr.options = configuracion;
    if (estado && mensaje) {
        toastr[estado](mensaje);
    }
}

Generalidades.prototype.mensajeGeneral = function (titulo, mensaje, color, boton1, boton2, accionConfirmar = null, accionCancelar = null) {

    swal.fire({
        title: titulo,
        text: mensaje,
        icon: color,
        showCancelButton: true,
        confirmButtonText: boton1 ?? "Yes, delete it!",
        cancelButtonText: boton2 ?? "No, cancel!",
        reverseButtons: true
    }).then(function(resultado) {
        if (resultado.value) {
            if (accionConfirmar != null) {
                accionConfirmar();
                // swal.fire(
                //     "Eliminado",
                //     "Se elimino correctamente.",
                //     "success"
                // )
            }
        } else if (resultado.dismiss === "cancel") {
            if (accionCancelar) {
                accionCancelar();
            }
            swal.fire(
                "Cancelado",
                "Cancelaste la accion de eliminar",
                "error"
            )
        }
    });
}