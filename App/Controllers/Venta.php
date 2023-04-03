<?php

namespace App\Controllers;

use App\Model\Venta as ModelVenta;
use Core\View;
use PDO;

class Venta extends Controllers
{   
    public function listado()
    {
        $ventas = new ModelVenta();
        $id = $_REQUEST['id'];
        $resultado = $ventas->ventasPorVendedor($id);

        if ($resultado) {
            $data = $resultado->fetchAll(PDO::FETCH_FUNC, fn($id, $id_usuario, $precio, $nombre) 
                => [
                    $id,
                    'nombre' => $nombre,
                    'precio' => "$".$precio,
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
        $datos[] = $_REQUEST['id_usuario'];
        $datos[] = $_REQUEST['precio'];
        
        $venta = new ModelVenta();
        
        $nuevoVenta = $venta->store($datos);
        if (!$nuevoVenta) {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Error al registrar el venta.']);
            return;
        }

        echo json_encode(['estado'  => 'success', 'mensaje' => 'Se registro el venta correctamente.']);
    }
}