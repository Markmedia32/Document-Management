<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include_once "db.php";

try {
    $stmt = $pdo->query("SELECT * FROM client_service_requests ORDER BY submitted_at DESC");
    $requests = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($requests);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Fetch failed: " . $e->getMessage()
    ]);
}
