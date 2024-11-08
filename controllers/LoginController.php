<?php
namespace Controllers;

use MVC\Router;

class LoginController{
    public static function login(Router $router){
        $router->render('auth/login',[]);
    }

    public static function logout(){
        echo "desde logout";
    }

    public static function olvide(Router $router){
        $router->render('auth/olvide-password',[]);
    }

    public static function recuperar(){
        echo "desde recuperar";
    }

    public static function crear(Router $router){
        
        if($_SERVER["REQUEST_METHOD"] === 'POST'){
            $datos_usuario = [];
            $datos_usuario[] = $_POST['nombre'];
            $datos_usuario[] = $_POST['apellido'];
            $datos_usuario[] = $_POST['telefono'];
            $datos_usuario[] = $_POST['email'];
            $datos_usuario[] = $_POST['password'];
            
            
        };
        $router->render('auth/crear-cuenta',[]);
        
    }
}