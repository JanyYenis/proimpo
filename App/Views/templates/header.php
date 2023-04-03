<?php
    session_start();
?>
<!doctype html>
<html lang="es" class="h-100">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title><?= 'Proimpo | '.$title ?? 'Proimpo' ?></title>

    <!-- Bootstrap core CSS -->
    <link href="<?= $baseUrl ?>css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-aFq/bzH65dt+w6FI2ooMVUpc+21e0SRygnTpmBvdBgSdnuTN7QbdgL+OapgHtvPp" crossorigin="anonymous">
    <script>
        var KTAppOptions = {};
    </script>
    <script src="<?= $baseUrl ?>js/app.js"></script>
    <style>
        .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        @media (min-width: 768px) {
            .bd-placeholder-img-lg {
                font-size: 3.5rem;
            }
        }

        table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>td:first-child:before, table.dataTable.dtr-inline.collapsed>tbody>tr[role="row"]>th:first-child:before{
            top: 50%;
            left: 4px;
            height: 20px;
            width: 20px;
            display: block;
            position: absolute;
            color: white;
            border: 2px solid white;
            border-radius: 100px;
            box-shadow: 0 0 3px #444;
            box-sizing: border-box;
            text-align: center;
            text-indent: 5 !important;
            font-family: 'Courier New', Courier, monospace;
            line-height: 17px;
            content: '+';
            background-color: #337ab7;
        }
        .dataTables_wrapper table.dataTable.dtr-inline.collapsed > tbody > tr.parent > td:first-child:before {
            color: #3699FF;
            background-color: transparent;
            font-family: Ki;
            font-style: normal;
            font-weight: normal;
            font-variant: normal;
            line-height: 1.5;
            text-decoration: inherit;
            text-rendering: optimizeLegibility;
            text-transform: none;
            -moz-osx-font-smoothing: grayscale;
            -webkit-font-smoothing: antialiased;
            content: "";
        }
    </style>
    <!-- Custom styles for this template -->
    <link href="<?= $baseUrl ?>css/style.css" rel="stylesheet">
</head>

<body class="d-flex flex-column h-100">
    <header>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top">
            <div class="px-2">
                <a class="navbar-brand" href="<?= $baseUrl ?>">Proimpo</a>
            </div>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="<?= $baseUrl ?>Home">Home</a>
                    </li>
                    <?php
                        if (!isset($_SESSION['id'])) {
                    ?>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= $baseUrl ?>Login">Login</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= $baseUrl ?>Registro">Registro</a>
                    </li>
                    <?php
                        }
                        if (isset($_SESSION['id'])) {
                    ?>
                    <li class="nav-item">
                        <a class="nav-link" href="<?= $baseUrl ?>Usuario">Usuarios</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="cerrarSeccion">Salir</a>
                    </li>
                    <?php
                        }
                    ?>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Begin page content -->
    <main role="main" class="flex-shrink-0">