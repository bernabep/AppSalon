<?php
namespace Controllers;
use MVC\Router;

Class CitaController{
    public static function index(Router $router){
        $router->render('cita/index',[]);

    }
}

?>