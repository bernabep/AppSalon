<?php
namespace Model;
use Model\ActiveRecord;

Class AdminCita extends ActiveRecord{
    protected static $tabla = 'citasServicios';
    protected static $columasDB = ['id','hora','cliente','email','telefono','servicio','precio'];

public $id;
public $hora;
public $cliente;
public $email;
public $telefono;
public $servicio;
public $precio;


    public  function __construct($args=[])
    {
        $this->id = $args['id'] ?? null;
        $this->hora = $args['hora'] ?? '';
        $this->cliente = $args['cliente'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->servicio = $args['servicio'] ?? '';
        $this->precio = $args['precio'] ?? '';
    }
}
?>