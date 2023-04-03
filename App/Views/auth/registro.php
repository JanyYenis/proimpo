<div class="container">
    <div class="row">
        <div class="col text-center">
            <h1 class="mt-3">Registro</h1>
        </div>
    </div>
    <div>
        <form id="formRegistro">
            <div class="form-group row">
                <div class="col-lg-6">
                    <label class="requerido">Nombre</label>
                    <input type="text" name="nombre" placeholder="Ingrese su nombre" class="form-control" required>
                </div>
                <div class="col-lg-6">
                    <label class="requerido">Apellido</label>
                    <input type="text" name="apellido" placeholder="Ingrese su apellido" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-6">
                    <label class="requerido">Cedula</label>
                    <input type="text" name="cedula" placeholder="Ingrese su cedula" class="form-control" required>
                </div>
                <div class="col-lg-6">
                    <label class="requerido">Telefono</label>
                    <input type="tel" name="telefono" placeholder="Ingrese su telefono" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-12">
                    <label class="requerido">Dirección</label>
                    <input type="text" name="direccion" placeholder="Ingrese su dirección" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
                <div class="col-lg-6">
                    <label class="requerido">Email</label>
                    <input type="email" name="email" placeholder="Ingrese su email" class="form-control" required>
                </div>
                <div class="col-lg-6">
                    <label class="requerido">Contraseña</label>
                    <input type="password" name="clave" placeholder="Ingrese su clave" class="form-control" required>
                </div>
            </div>
            <br>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Registrar</button>
            </div>
        </form>
    </div>
</div>

<script src="<?= $baseUrl ?>js/usuarios/principal.js"></script>