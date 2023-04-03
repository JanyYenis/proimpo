"use strict";

window.jQuery = window.$ = require("jquery");
require("bootstrap");
// require("morris.js");
require("block-ui");
// window.Chart = require("chart.js");
window.Cookies = require("js-cookie");
window.Popper = require("popper.js");
require("jquery-form");

// Toastr
require("toastr/build/toastr.css");
window.toastr = require("toastr");

// Tooltips
import Tooltip from "tooltip.js";
window.Tooltip = Tooltip;

// Perfect-Scrollbar
require("perfect-scrollbar/css/perfect-scrollbar.css");
window.PerfectScrollbar = require("perfect-scrollbar/dist/perfect-scrollbar");

// Daterangepicker
// require("bootstrap-daterangepicker/daterangepicker.css");
// require("bootstrap-daterangepicker");

// Bootstrap-Select
require("bootstrap-select/dist/css/bootstrap-select.min.css");
require("bootstrap-select");
require("../../../src/assets/js/global/integration/plugins/bootstrap-selectpicker.init.js");

// Sweetalert2
require("sweetalert2/dist/sweetalert2.css");
import swal from "sweetalert2/dist/sweetalert2";
window.swal = swal;
require("es6-promise-polyfill/promise.min.js");
require("../../../src/assets/js/global/integration/plugins/sweetalert2.init");

// Bootstrap-Datepicker
require("bootstrap-datepicker/dist/css/bootstrap-datepicker3.css");
require("bootstrap-datepicker");
require("bootstrap-datepicker/js/locales/bootstrap-datepicker.es.js");
require("../../../src/assets/js/global/integration/plugins/bootstrap-datepicker.init");

// Bootstrap-Datetimepicker
require("bootstrap-datetime-picker/css/bootstrap-datetimepicker.css");
require("bootstrap-datetime-picker");
require("../../../src/assets/js/global/integration/plugins/bootstrap-datetimepicker.init");


// Select2
require("select2/dist/css/select2.min.css");
require("select2-bootstrap-theme/dist/select2-bootstrap.min.css");
require("select2");

// Bootstrap-Timepicker
require("bootstrap-timepicker/css/bootstrap-timepicker.css");
require("bootstrap-timepicker");
require("../../../src/assets/js/global/integration/plugins/bootstrap-timepicker.init");

// Tagify
require("@yaireo/tagify/dist/tagify.css");
window.Tagify = require("@yaireo/tagify/dist/tagify");
require("@yaireo/tagify/dist/tagify.polyfills.min");

// Summernote
require("summernote/dist/summernote.css");
// require("summernote");
// require("summernote/lang/summernote-es-ES.js");

// Inputmask
require("inputmask/dist/inputmask");
require("inputmask/dist/jquery.inputmask");

// jQuery-Validation
require("jquery-validation");
require("jquery-validation/dist/additional-methods.js");
require("../../../src/assets/js/global/integration/plugins/jquery-validation.init");

// Bootstrap-Touchspin
require("bootstrap-touchspin/dist/jquery.bootstrap-touchspin.css");
require("bootstrap-touchspin");

// Font Icons
require("../../../src/assets/plugins/line-awesome/css/line-awesome.css");
require("../../../src/assets/plugins/flaticon/flaticon.css");
require("../../../src/assets/plugins/flaticon2/flaticon.css");
require("@fortawesome/fontawesome-free/css/all.min.css");
require("socicon");

require("../../../src/assets/plugins/jquery-ui/jquery-ui.min.js");
require("../../../src/assets/plugins/jquery-ui/jquery-ui.min.css");
require("./custom/jquery-ui.js");
