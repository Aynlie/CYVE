<?php
// Database configuration
<<<<<<< Updated upstream
define('DB_HOST', '127.0.0.1');
=======
define('DB_HOST', 'localhost');
>>>>>>> Stashed changes
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cyve');

// Create connection
$conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

<<<<<<< Updated upstream
// CORS Handling
$allowed_origin = "http://localhost:3000";
if (isset($_SERVER['HTTP_ORIGIN']) && $_SERVER['HTTP_ORIGIN'] === $allowed_origin) {
    header("Access-Control-Allow-Origin: $allowed_origin");
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check connection
if ($conn->connect_error) {
    header('Content-Type: application/json');
    die(json_encode(["success" => false, "message" => "Database connection failed"]));
}

// Secure Session Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_samesite', 'Lax');
// ini_set('session.cookie_secure', 1); // Enable if using HTTPS

session_start();

// Helper to send JSON response
function send_response($success, $message, $data = [], $code = 200)
{
    http_response_code($code);
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message
    ], $data));
    exit();
}

// Function to sanitize input
function sanitize($data)
{
=======
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Start session
session_start();

// Function to sanitize input
function sanitize($data) {
>>>>>>> Stashed changes
    global $conn;
    return mysqli_real_escape_string($conn, trim($data));
}

// Function to log activity
<<<<<<< Updated upstream
function log_activity($user_id, $action, $details = '')
{
=======
function log_activity($user_id, $action, $details = '') {
>>>>>>> Stashed changes
    global $conn;
    $stmt = $conn->prepare("INSERT INTO audit_log (user_id, action, details) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $user_id, $action, $details);
    $stmt->execute();
    $stmt->close();
}
?>
