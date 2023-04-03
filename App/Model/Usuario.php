<?php

namespace App\Model;

use Core\Model;

class Usuario extends Model
{
    public function store($datos)
    {
        $sql = "INSERT INTO usuarios(nombre, apellido, cedula, telefono, direccion,	email, clave, cargo, comision) 
            VALUES('{$datos[0]}', '{$datos[1]}', '{$datos[2]}', '{$datos[3]}', '{$datos[4]}', '{$datos[5]}', '{$datos[6]}', '{$datos[7]}', {$datos[8]})";

        return $this->db->query($sql);
    }

    public function getAll()
    {
        $sql = "SELECT * FROM usuarios WHERE cargo != 'Administrador'";

        return $this->db->query($sql);
    }

    public function getAllVendedores()
    {
        $sql = "SELECT * FROM usuarios WHERE cargo = 'Vendedor'";

        return $this->db->query($sql);
    }

    public function getAllSupervisores()
    {
        $sql = "SELECT * FROM usuarios WHERE cargo = 'Supervisor'";

        return $this->db->query($sql);
    }

    public function login($datos)
    {
        $sql = "SELECT * FROM usuarios WHERE email = '{$datos[0]}'";
        $usuario = $this->db->query($sql);
        $usuario = $usuario->fetch();
        
        if(password_verify($datos[1], $usuario?->clave)){
            return $usuario;
        }
        return false;
    }

    public function getFristId($id)
    {
        $sql = "SELECT * FROM usuarios WHERE id = '{$id}'";
        $vendedor = $this->db->query($sql);
        $vendedor = $vendedor->fetch();
        
        return $vendedor;
    }
    
    public function comisionVentas()
    {
        $usuarios = $this->getAll();
        $usuarios = $usuarios->fetchAll();
        if ($usuarios) {
            foreach ($usuarios as $usuario) {
                $comisionTotal[$usuario?->id] = [];
                if ($usuario?->cargo == 'Vendedor' && $usuario?->comision) {
                    $sql = "SELECT precio FROM ventas WHERE id_usuario = {$usuario->id}";
                    $ventas = $this->db->query($sql);
                    $ventas = $ventas->fetchAll();
                    $comisionTotal = $this->calcularComision($ventas, $usuario, $comisionTotal);
                } elseif ($usuario?->cargo == 'Supervisor') {
                    $vendedores = $this->getAllVendedores();
                    foreach ($vendedores as $vendedor) {
                        $sql = "SELECT precio FROM ventas WHERE id_usuario = {$vendedor->id}";
                        $ventas = $this->db->query($sql);
                        $ventas = $ventas->fetchAll();
                        $comisionTotal = $this->calcularComision($ventas, $usuario, $comisionTotal);
                    }
                }
            }

            foreach ($comisionTotal as $index => $elemento) {
                if (count($elemento)) {
                    $suma = 0;
                    foreach ($elemento as $cal) {
                        $suma = $suma + $cal;
                    }
                    $comisionTotal[$index] = $suma;
                } else {
                    $comisionTotal[$index] = 0;
                }
            }
            return $comisionTotal;
        }
    }

    public function calcularComision($ventas, $usuario, $comisionTotal)
    {
        if ($ventas) {
            $comision = 0;
            foreach ($ventas as $venta) {
                $comision = $comision + $venta?->precio;
            }
            if ($comision) {
                $comision = ($comision * $usuario?->comision) / 100;
            }
            array_push($comisionTotal[$usuario->id], $comision);
        }
        return $comisionTotal;
    }
}