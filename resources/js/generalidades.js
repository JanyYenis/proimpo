"use strict";
export default class Generalidades {

    constructor() {
        $.validator = "";
        // $.validator.messages.required = "";
        this.token = $('meta[name="csrf-token"]').attr("content");
    }

}

require('./generalidades/mis-genericos');

window.generalidades = new Generalidades();
