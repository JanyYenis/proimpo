<div class="container  py-4">
    <div class="row">
        <div class="col">
            <h1 class="mt-5">Usuarios</h1>
        </div>
        <div class="col text-right">
            <button type="button" id="btnAgregarVendedor" class="btn btn-primary mt-5" data-bs-toggle="modal" 
                data-bs-target="#modalCrearVendedor">
                Agregar usuario
            </button>
        </div>
    </div>
    <div class="mt-5">
        <div class="col-lg-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered" id="tablaUsuarios">
                    <thead>
                        <tr>
                            <th class="text-center all">#</th>
                            <th class="text-center all">Nombre</th>
                            <th class="text-center all">Apellido</th>
                            <th class="text-center all">Cedula</th>
                            <th class="text-center none">Telefono</th>
                            <th class="text-center none">Dirección</th>
                            <th class="text-center all">Email</th>
                            <th class="text-center none">Cargo</th>
                            <th class="text-center all">Comisión %</th>
                            <th class="text-center all">Comisión Total</th>
                            <th class="text-center all">Acciones</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<?php require VIEWS.'usuarios/modals.php'; ?>

<script src="<?= $baseUrl ?>js/usuarios/principal.js"></script>