const mix = require('laravel-mix');


mix.js('resources/js/app.js', 'public/js')
    .sourceMaps();

mix.js("resources/js/usuarios/principal.js", "public/js/usuarios/principal.js");
mix.js("resources/js/login.js", "public/js/login.js");

// ---------------------------------------------------------------------------------------------
// CSS

mix.styles(
    "resources/css/dataTables.css",
    "public/css/dataTables.css"
);