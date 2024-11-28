<?php
namespace Controllers;
use MVC\Router;

Class Admincontroller{
    public static function index(Router $router){
        if(!isset($_SESSION)){
            session_start();
        }
        isAuth();
        
        $nombre = $_SESSION['nombre'];
        $router->render('admin/index',[
            'nombre' => $nombre
        ]);

    }
}

?>