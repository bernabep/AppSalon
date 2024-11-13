<?php
namespace Model;

class Usuario extends ActiveRecord{
    protected static $tabla = 'usuarios';
    protected static $columnasDB = [
        'id',
        'nombre',
        'apellido',
        'email',
        'password',
        'telefono',
        'admin',
        'confirmado',
        'token'
    ];
    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args=[])
    {
    $this->id = $args['id'] ?? null;
    $this->nombre = $args['nombre'] ?? '';
    $this->apellido = $args['apellido'] ?? '';
    $this->email = $args['email'] ?? '';
    $this->password = $args['password'] ?? '';
    $this->telefono = $args['telefono'] ?? '';
    $this->admin = $args['admin'] ?? 0;
    $this->confirmado = $args['confirmado'] ?? 0;
    $this->token = $args['token'] ?? '';
    }

    public function validarNuevaCuenta(){
        $patron = "/^(?=.*[!@#$%^&*()_+=-?<>]).{8,}$/";
        if (!$this->nombre){
            self::$alertas['error'][] = 'El Nombre es Obligatorio';
        }
        if(!$this->apellido){
            self::$alertas['error'][] = 'El Apellido es Obligatorio';
        }
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }
        if(!preg_match($patron,$this->password)){
            self::$alertas['error'][] = 'La contraseña no es válida. Debe tener al menos 8 caracteres y un carácter especial';
        }
        return self::$alertas;
    }

    public function validarPassword(){
        $patron = "/^(?=.*[!@#$%^&*()_+=-?<>]).{8,}$/";
        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }
        if(!preg_match($patron,$this->password)){
            self::$alertas['error'][] = 'La contraseña no es válida. Debe tener al menos 8 caracteres y un carácter especial';
        }
        return self::$alertas;
    }

    public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][]= "El email es obligatorio";
        }
        if(!$this->password){
            self::$alertas['error'][]= "El Password es obligatorio";
        }
        return self::$alertas;
    }

    public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][]= "El email es obligatorio";
        }
        return self::$alertas;
    }

    //Revisa si el usuario ya existe
    public function existeUsuario(){
        $query = "SELECT * FROM ". self::$tabla ." WHERE email = '" . $this->email ."' LIMIT 1";
        $resultado = self::$db->query($query);
        if($resultado->num_rows){
            self::$alertas['error'][] = 'El Usuario ya está registrado';
        }
        return $resultado;
    }

    //Hash password
    public function hashPassword(){
        $this->password = password_hash($this->password,PASSWORD_BCRYPT);
    }

    //Crear token
    public function crearToken(){
        $this->token = uniqid();
    }

    public function comprobarPasswordAndVerificado($password){
        $respuesta = password_verify($password,$this->password);

        if(!$respuesta){
            Usuario::setAlerta('error','El password es incorrecto');
            return false;
        }else{
            if(!$this->confirmado){
                Usuario::setAlerta('error','La cuenta no ha sido confirmada');
                return false;
            }else{
                return True;
            }
        }   
    }
}

