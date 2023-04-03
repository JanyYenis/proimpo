<?php

namespace App\Model;

use Core\Model;

class Venta extends Model
{
    public function store($datos)
    {
        $sql = "INSERT INTO ventas(id_usuario, precio) VALUES('{$datos[0]}', {$datos[1]})";

        return $this->db->query($sql);
    }

    public function getAll()
    {
        $sql = "SELECT v.*, u.nombre AS nombre FROM ventas v INNER JOIN usuarios u ON u.id=v.id_usuario";

        return $this->db->query($sql);
    }

    public function ventasPorVendedor($id)
    {
        $sql = "SELECT v.*, u.nombre AS nombre FROM ventas v INNER JOIN usuarios u ON u.id=v.id_usuario 
            WHERE v.id_usuario={$id}";

        return $this->db->query($sql);
    }
}