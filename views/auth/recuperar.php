<h1 class='nombre-pagina'>Recuperar Contraseña</h1>
<p class='descripcion-pagina'>Introduce tu nuevo password a continuación</p>
<?php 
include_once __DIR__. '/../templates/alertas.php'
?> 
<?php 
if (!$error){ ?>
    
<form class='formulario' method="POST">
<div class="campo"><label for="password">Password</label>
    <input type="password" id="password" placeholder="Tu Nuevo Password" name="password">
    </div>
    <input class="boton" type="submit" value="Reestablecer Contraseña">
</form>
<?php } ?>

<div class="acciones">
<a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
<a href="/crear-cuenta">¿Aún no tienes cuenta?, Crear una</a>
</div>