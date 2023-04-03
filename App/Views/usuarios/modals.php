<!-- Modal crear -->
<div class="modal fade" id="modalCrearVendedor" tabindex="-1" role="dialog" aria-labelledby="modalCrearVendedor"
    aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <form id="formAgregarVendedor">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="exampleModalLabel">Agregar Vendedor</h5>
                    <button type="button" class="btn-close btnCerrarModal" data-bs-dismiss="modal" aria-label="Close">
                        <i class=""></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div>
                        <div class="alert alert-outline-primary" role="alert">
                            <div class="row">
                                <div class="mt-5 col-lg-2 offset-lg-1">
                                    <div class="alert-icon"><i class="fas fa-info-circle icon-3x"></i></div>
                                </div>
                                <div class="col-lg-9">
                                    <div class="alert-text">
                                        El valor de la comisión se calculará de la siguiente manera:
                                        <ul>
                                            <li><b>Vendedor:</b> Se sumaran todas las ventas del vendedor, a la suma total se le sacara el porcentaje según lo ingresado en el campo comisión y esta será la comisión que recibirá el vendedor.</li>
                                            <li><b>Supervisor:</b> Se sumaran todas las ventas de los vendedores, a la suma total se le sacara el porcentaje según lo ingresado en el campo comisión y esta será la comisión que recibirá el supervisor.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Nombre</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="text" name='nombre' required class="form-control" placeholder="Ingrese su nombre">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Apellido</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="text" name='apellido' required class="form-control" placeholder="Ingrese su apellido">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Cedula</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="number" name='cedula' required class="form-control" placeholder="Ingrese su numero de cedula">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Telefono</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="tel" name='telefono' required class="form-control" placeholder="Ingrese su telefono">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Dirección</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="text" name='direccion' required class="form-control" placeholder="Ingrese su dirección">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Email</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="email" name='email' required class="form-control" placeholder="Ingrese su email">
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right requerido">Cargo</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <select name="cargo" required class="form-control selectCargo">
                                    <option value="Vendedor">Vendedor</option>
                                    <option value="Supervisor">Supervisor</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class=" col-lg-2 col-form-label text-sm-right">Comisión</label>
                        <div class="col-lg-9">
                            <div class="input-group flex-nowrap">
                                <input type="number" name="comision" class="form-control inputComision" placeholder="Ingrese la comisión">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer botonesModal">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </form>
</div>

<!-- Modal ventas -->
<div class="modal fade" id="modalVentas" tabindex="-1" role="dialog" aria-labelledby="modalVentas"
    aria-hidden="true" data-bs-backdrop="static" data-bs-keyboard="false">
    <form id="formVentas">
        <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title text-center" id="exampleModalLabel">Ventas</h5>
                    <button type="button" class="btn-close btnCerrarModal" data-bs-dismiss="modal" aria-label="Close">
                        <i class=""></i>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name='id_usuario' id="idUsuario" required class="form-control">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" id="tabListado" aria-current="page" data-bs-toggle="tab" data-bs-target="#listadoVentas" href="#">Listado</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" id="tabAgregarVenta" data-bs-toggle="tab" data-bs-target="#agregraVenta" href="#">Agregar Venta</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="listadoVentas" role="tabpanel">
                            <div class="container mt-3">
                                <?php require VIEWS.'usuarios/ventas/index.php'; ?>
                            </div>
                        </div>
                        <div class="tab-pane" id="agregraVenta" role="tabpanel">
                            <div class="container mt-3">
                                <div class="form-group row">
                                    <label class=" col-lg-2 col-form-label text-sm-right requerido">Valor</label>
                                    <div class="col-lg-9">
                                        <div class="input-group flex-nowrap">
                                            <input type="number" placeholder="Ingrese el valor" required name="precio" class="form-control">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer botonesModal">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="submit" class="btn btn-primary btnGuardarVentas d-none">Guardar</button>
                </div>
            </div>
        </div>
    </form>
</div>