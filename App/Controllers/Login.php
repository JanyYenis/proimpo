<?php

namespace App\Controllers;

use App\Model\Usuario;
use Core\View;

class Login
{
    public function index()
    {
        $views = ['auth/login'];
        $args  = ['title' => 'Login'];
        View::render($views, $args);
    }

    public function login()
    {
        session_start();
        $datos[] = $_REQUEST['email'];
        $datos[] = $_REQUEST['clave'];
        
        $usuario = new Usuario();
        $resultado = $usuario->login($datos);
        
        if (!$resultado) {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Informacion incorrecta.']);
            return;
        }

        $_SESSION['id']     = $resultado?->id;
        $_SESSION['nombre'] = $resultado?->nombre;

        echo json_encode([
            'estado'  => 'success',
            'mensaje' => "Binvenido {$resultado?->nombre}.",
            'ruta'    => 'Home'
        ]);
    }

    public function cerrarSeccion()
    {
        session_start();
        session_unset();
        echo json_encode(['ruta' => 'Home']);
    }
}