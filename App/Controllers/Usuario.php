<?php

namespace App\Controllers;

use App\Model\Usuario as ModelUsuario;
use Core\View;
use PDO;

class Usuario extends Controllers
{
    public function index()
    {
        $views = ['usuarios/index'];
        $args  = ['title' => 'Usuarios'];
        View::render($views, $args);
    }
    
    public function listado()
    {
        $usuario = new ModelUsuario();
        $resultado = $usuario->getAll();
        $comisiones = $usuario->comisionVentas();
        
        if ($resultado) {
            $data = $resultado->fetchAll(PDO::FETCH_FUNC, fn($id, $nombre, $apellido, $cedula, $telefono, $direccion, $email, $clave, $cargo, $comision) 
                => [
                    $id,
                    'nombre'    => $nombre,
                    'apellido'  => $apellido,
                    'cedula'    => $cedula,
                    'telefono'  => $telefono,
                    'direccion' => $direccion,
                    'email'     => $email,
                    'cargo'     => $cargo,
                    'comision'  => $comision."%",
                    'comisionTotal' => $comisiones[$id] ?? 0,
                    'action'    => $cargo == 'Vendedor' ? "<button class='btn btn-primary btnVentas' data-ventas='$id'></i>Ventas</button>" : 'Sin acción'
                ]);
                
            echo json_encode([
                'data' => $data,
            ]);
        } else {
            var_dump($this->db->errorInfo());
            die;
        }
    }

    
    public function store()
    {
        $datos[] = $_REQUEST['nombre'];
        $datos[] = $_REQUEST['apellido'];
        $datos[] = $_REQUEST['cedula'];
        $datos[] = $_REQUEST['telefono'];
        $datos[] = $_REQUEST['direccion'];
        $datos[] = $_REQUEST['email'];
        $datos[] = null;
        $datos[] = $_REQUEST['cargo'];
        $datos[] = $_REQUEST['comision'] != '' ? $_REQUEST['comision'] : 0;
        
        $usuario = new ModelUsuario();
        
        $nuevoUsuario = $usuario->store($datos);
        if (!$nuevoUsuario) {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Error al registrar el usuario.']);
            return;
        }

        echo json_encode(['estado'  => 'success', 'mensaje' => 'Se registro el usuario correctamente.']);
    }
}