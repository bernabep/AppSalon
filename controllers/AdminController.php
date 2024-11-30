<?php
namespace Controllers;

use Model\AdminCita;
use MVC\Router;

Class Admincontroller{
    public static function index(Router $router){
        if(!isset($_SESSION)){
            session_start();
        }
        isAuth();
        
        $query = "SELECT ";
        $query .= "citas.id,citas.hora, ";
        $query .= "CONCAT_WS(' ',usuarios.nombre,usuarios.apellido) AS cliente,";
        $query .= "usuarios.email, ";
        $query .= "usuarios.telefono, ";
        $query .= "servicios.nombre AS servicio,";
        $query .= "servicios.precio ";
        $query .= "FROM citas ";
        $query .= "LEFT JOIN citasservicios ON citas.id = citasservicios.citaId ";
        $query .= "LEFT JOIN usuarios ON  usuarios.id = citas.usuarioId ";
        $query .= "LEFT JOIN servicios ON servicios.id = citasservicios.servicioId ";
        // $query .= "WHERE ";
        // $query .= "citas.fecha = '2024-11-28'";
        $nombre = $_SESSION['nombre'];
        // debuguear($query);
        $citas = AdminCita::SQL($query);
        
        $router->render('admin/index',[
            'nombre' => $nombre,
            'citas' => $citas
        ]);

    }
}

?>