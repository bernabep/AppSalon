<h1 class='nombre-pagina'>Olvide Password</h1>
<p class='descripcion-pagina'>Reestablece tu password escibiendo tu email a continuación</p>
<form class='formulario' method="POST" action='/olvide'>
    <div class="campo"><label for="email">Email</label>
    <input type="email" id="email" placeholder="Tu Email" name="email">
    </div>
    <input class="boton" type="submit" value="Enviar Instrucciones">
</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes cuenta?, Crear una</a>
</div>