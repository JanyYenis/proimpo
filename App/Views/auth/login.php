<div class="container mt-3">
  <div>
    <div class="card">
      <div class="card-header">
        <div class="card-title">
        <h1 class="text-center">Login</h1>
        </div>
      </div>
      <div class="card-body">
        <form id="formLogin">
            <div class="form-group row">
                <div class="col-lg-12">
                    <label class="requerido">Email</label>
                    <input type="email" name="email" placeholder="Ingrese su email" class="form-control" required>
                </div>
            </div>
            <div class="form-group row">
              <div class="col-lg-12">
                  <label class="requerido">Contraseña</label>
                  <input type="password" name="clave" placeholder="Ingrese su clave" class="form-control" required>
              </div>
            </div>
            <br>
            <div class="text-center">
                <button type="submit" class="btn btn-primary">Login</button>
            </div>
        </form>
      </div>
    </div>
    </div>
</div>

<script src="<?= $baseUrl ?>js/usuarios/principal.js"></script>