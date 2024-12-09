<?php

$db = mysqli_connect(
    hostname: $_ENV['DB_HOST'],
    username: $_ENV['DB_USER'],
    password: $_ENV['DB_PASS'],
    database: $_ENV['DB_NAME']
);
$db->set_charset("utf8");

if (!$db) {
    echo "Error: No se pudo conectar a MySQL.";
    echo "errno de depuración: " . mysqli_connect_errno();
    echo "error de depuración: " . mysqli_connect_error();
    exit;
}
