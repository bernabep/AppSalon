<?php

namespace Controllers;

use Classes\Email;
use Model\Usuario;
use MVC\Router;

class LoginController
{
    public static function login(Router $router)
    {
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();

            if (empty($alertas)) {
                //Verificar si existe el usuario
                $usuario = Usuario::where('email', $auth->email);
                if ($usuario) {
                    $verificado = $usuario->comprobarPasswordAndVerificado($auth->password);
                    if ($verificado) {
                        //Autenticar al usuario
                        if (!isset($_SESSION)) {
                            session_start();
                        }
                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;

                        //Redireccionar
                        if ($usuario->admin === '1') {
                            $_SESSION['admin'] = $usuario->admin ?? null;
                            header('Location: /admin');
                        } else {
                            header('Location: /cita');
                        }
                    }
                } else {
                    $auth->setAlerta('error', "Usuario no encontrado");
                }
            }
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/login', [
            'alertas' => $alertas
        ]);
    }

    public static function logout()
    {
        echo "desde logout";
    }

    public static function olvide(Router $router)
    {
        $alertas = [];
        $auth = [];
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);
            $alertas = $auth->validarEmail();
            if (empty($alertas)) {
                $usuario = Usuario::where('email', $auth->email);
                // debuguear($usuario);
                if ($usuario && $usuario->confirmado === '1') {
                    //Generar un token 
                    $usuario->crearToken();
                    $usuario->guardar();

                    //Enviar un email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);
                    $email->enviarInstrucciones();

                    //Alerta de exito
                    Usuario::setAlerta('exito', 'Compruebo tu correo, te hemos enviado un mail para resetear la contraseña');
                } else {
                    Usuario::setAlerta('error', 'El usuario no existe o no está confirmado');
                }
            }
        }
        $alertas = Usuario::getAlertas();
        $router->render('auth/olvide-password', [
            'alertas' => $alertas,
            'usuario' => $auth
        ]);
    }

    public static function recuperar(Router $router)
    {
        $alertas = [];
        $error = false;


        //Buscar usuario por su token
        $token = s($_GET['token']);
        $usuario = Usuario::where('token', $token);
        if (!$usuario) {
            Usuario::setAlerta('error', 'Token No Válido');
            $error = true;
        }


        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            //Leer el nuevo password y guardarlo
            $password = new Usuario($_POST);
            $alertas = $password->validarPassword();
            if (empty($alertas)) {
                $usuario->password = null;
                $usuario->password = $password->password;
                $usuario->hashPassword();
                $usuario->token = null;
                $resultado = $usuario->guardar();
                if($resultado){
                    header('Location: /');
                }

            }

            // Usuario::validarPassword();
        }


        $alertas = Usuario::getAlertas();
        $router->render('auth/recuperar', [
            'alertas' => $alertas,
            'error' => $error
        ]);
    }

    public static function crear(Router $router)
    {
        $usuario = new Usuario;
        $alertas = [];

        if ($_SERVER["REQUEST_METHOD"] === 'POST') {
            $usuario->sincronizar($_POST);
            $alertas =  $usuario->validarNuevaCuenta();
            //Revisar que no hay alertas
            if (empty($alertas)) {
                //Verificar que el usuario no esté verificado
                $resultado = $usuario->existeUsuario();
                if ($resultado->num_rows) {
                    $alertas = Usuario::getAlertas();
                } else {
                    //Hashear el password
                    $usuario->hashPassword();

                    //Generar un Token único
                    $usuario->crearToken();
                    // debuguear($usuario);
                    //Enviar el email
                    $email = new Email($usuario->email, $usuario->nombre, $usuario->token);

                    $email->enviarConfirmacion();

                    //Crear el usuario
                    $resultado = $usuario->guardar();
                    if ($resultado) {
                        header('Location: /mensaje');
                    }
                }
            }
        };
        $router->render('auth/crear-cuenta', [
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }

    public static function confirmar(Router $router)
    {
        $alertas = [];

        $token = s($_GET['token']);
        $usuario = Usuario::where('token', $token);
        if (empty($usuario)) {
            //Mostrar mensaje de error
            Usuario::setAlerta('error', 'Token No Válido');
        } else {
            //Modificar a usuario confirmado
            $usuario->confirmado = "1";
            $usuario->token = "";
            $usuario->guardar();
            Usuario::setAlerta('exito', 'Cuenta Comprobada Correctamente');
            // $usuario->guardar();
        }
        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar-cuenta', [
            'alertas' => $alertas
        ]);
    }

    public static function mensaje(Router $router)
    {
        $router->render('auth/mensaje');
    }
}
