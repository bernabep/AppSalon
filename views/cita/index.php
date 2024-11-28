<h1 class="nombre-pagina">Crear nueva Cita</h1>
<p class="descripcion-pagina">Elige tus servicios a coloca tus datos</p>
<?php
include_once __DIR__ . '/../templates/barra.php'
?>
<nav class="tabs">
    <button class="actual" type="button" data-paso="1">Servicios</button>
    <button type="button" data-paso="2">Información Cita</button>
    <button type="button" data-paso="3">Resumen</button>
</nav>
<div id="app">
    <div id="paso-1" class="seccion">
        <h1>Servicios</h1>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h1>Tus Datos y Cita</h1>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>

        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input id="nombre" type="text" name="nombre" value="<?php echo $nombre; ?>" disabled>
            </div>
            <div class="campo">
                <label for="fecha">fecha</label>
                <input id="fecha" type="date" name="fecha" min="<?php echo date('Y-m-d', strtotime('+1 day')) ?>">
            </div>
            <div class="campo">
                <label for="hora">Hora</label>
                <input id="hora" type="time" name="hora">
            </div>
            <input type=hidden id='id' value='<?php echo $id; ?>'>
        </form>

    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h1>Resumen</h1>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>
    <div class="paginacion">
        <button id="anterior" class="boton">Anterior &laquo</button>
        <button id="siguiente" class="boton">Siguiente &raquo</button>
    </div>
</div>
<?php $script = "
<script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
<script src='build/js/app.js'></script>
" ?>