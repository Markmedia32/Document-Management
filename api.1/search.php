<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "db.php";

$search = $_GET['q'] ?? '';

if (!$search) {
    echo json_encode([]); // return empty array if no query
    exit;
}

try {
    $stmt = $pdo->prepare("
        SELECT * FROM client_service_requests 
        WHERE name LIKE ? 
           OR id_number LIKE ? 
           OR phone LIKE ? 
        ORDER BY submitted_at DESC
    ");

    $stmt->execute([
        "%$search%",
        "%$search%",
        "%$search%"
    ]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Search failed: " . $e->getMessage()
    ]);
}
