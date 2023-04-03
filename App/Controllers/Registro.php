<?php

namespace App\Controllers;

use App\Model\Usuario;
use Core\View;
use ErrorException;

class Registro
{
    public function index()
    {
        $views = ['auth/registro'];
        $args  = ['title' => 'Registro'];
        View::render($views, $args);
    }

    public function store()
    {
        $datos[] = $_REQUEST['nombre'];
        $datos[] = $_REQUEST['apellido'];
        $datos[] = $_REQUEST['cedula'];
        $datos[] = $_REQUEST['telefono'];
        $datos[] = $_REQUEST['direccion'];
        $datos[] = $_REQUEST['email'];
        $datos[] = password_hash($_REQUEST['clave'], PASSWORD_BCRYPT, ['cost' =>10]); //encriptacion
        $datos[] = 'Administrador';
        $datos[] = 0;
        
        $usuario = new Usuario();
        
        $nuevoUsuario = $usuario->store($datos);
        if (!$nuevoUsuario) {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Error al registrar el usuario.']);
            return;
        }

        echo json_encode(['estado'  => 'success', 'mensaje' => 'Se registro el usuario correctamente.']);
    }
}