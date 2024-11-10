<?php
namespace Controllers;

use Classes\Email;
use Model\Usuario;
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
        $usuario = new Usuario;
        $alertas = [];

        if($_SERVER["REQUEST_METHOD"] === 'POST'){
            $usuario->sincronizar($_POST);
            $alertas =  $usuario->validarNuevaCuenta();
            //Revisar que no hay alertas
            if(empty($alertas)){
                //Verificar que el usuario no esté verificado
                $resultado = $usuario->existeUsuario();
                if($resultado->num_rows){
                    $alertas = Usuario::getAlertas();
                }else{
                    //Hashear el password
                    $usuario->hashPassword();
                    
                    //Generar un Token único
                    $usuario->crearToken();
                    // debuguear($usuario);
                    //Enviar el email
                    $email = new Email($usuario->email,$usuario->nombre,$usuario->token);

                    $email->enviarConfirmacion();
                }
            
            }
            
            

            
            
        };
        $router->render('auth/crear-cuenta',[
            'usuario' =>$usuario,
            'alertas' =>$alertas
        ]);
        
    }

    public static function confirmar(Router $router){
        if($_SERVER['REQUEST_METHOD']=='GET'){
            $token = $_GET['token'];
            debuguear($token);
        }

    }
}