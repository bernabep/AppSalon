<?php

$db = mysqli_connect(hostname:'localhost', username:'root', password:'root', database:'appsalon_mvc');
$db->set_charset("utf8");

if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
