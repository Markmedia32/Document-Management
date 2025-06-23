<?php
$host = 'localhost';
$db   = 'document_management'; // Your database name
$user = 'root';                // Default XAMPP MySQL user
$pass = '';                    // Default password is empty

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB connection failed: " . $e->getMessage());
}
?>
