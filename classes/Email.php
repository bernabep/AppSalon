<?php

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

class Email
{
    public $email;
    public $nombre;
    public $token;

    public function __construct($email, $nombre, $token)
    {
        $this->email = $email;
        $this->nombre = $nombre;
        $this->token = $token;
    }

    public function enviarConfirmacion()
    {
        try {
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 2525;
            $mail->Username = '6e25219db0710b';
            $mail->Password = 'd4fab631faec9e';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->setFrom('cuentas@appsalonmvc.com', 'Mailer');
            $mail->addAddress('cuentas@appsalonmvc.com', 'appsalonmvc.com');
            $mail->Subject = 'Confirma tu cuenta';

            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';

            $contenido = "<html>";
            $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en AppSalon, 
        solo debes confirmarla presionando el siguiente enlace</p>";
            $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/confirmar-cuenta?token=" . $this->token . "'>Confirmar Cuenta</a></p>";
            $contenido .= "<p>Si tu no solicitaste esta cuenta, puedes ignorar el mensaje</p>";
            $contenido .= "</html>";

            $mail->Body = $contenido;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
    public function enviarInstrucciones()
    {
        try {
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = 'sandbox.smtp.mailtrap.io';
            $mail->SMTPAuth = true;
            $mail->Port = 2525;
            $mail->Username = '6e25219db0710b';
            $mail->Password = 'd4fab631faec9e';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->setFrom('cuentas@appsalonmvc.com', 'Mailer');
            $mail->addAddress('cuentas@appsalonmvc.com', 'appsalonmvc.com');
            $mail->Subject = 'Reestablece tu password';

            $mail->isHTML(true);
            $mail->CharSet = 'UTF-8';

            $contenido = "<html>";
            $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado reestablecer tu password de AppSalon, 
        solo debes crear tu nueva contraseña presionando el siguiente enlace</p>";
            $contenido .= "<p>Presiona aquí: <a href='http://localhost:3000/recuperar?token=" . $this->token . "'>Reestabler Password</a></p>";
            $contenido .= "<p>Si tu no solicitaste reestablecer tu password, puedes ignorar el mensaje</p>";
            $contenido .= "</html>";

            $mail->Body = $contenido;

            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }
}
