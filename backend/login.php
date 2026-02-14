<?php
<<<<<<< Updated upstream
/**
 * CYVE - Secure User Login
 */
include 'config.php';

$message = '';
$messageType = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $identity = trim($_POST['identity']); // Can be email or username
    $password = $_POST['password'];

    // Check user by identity (email or username)
    $stmt = $conn->prepare("SELECT id, username, email, password, full_name, role FROM users WHERE email = ? OR username = ?");
    $stmt->bind_param("ss", $identity, $identity);
=======
include 'config.php';

$message = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = sanitize($_POST['username']);
    $password = $_POST['password'];

    $stmt = $conn->prepare("SELECT id, password, role FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
>>>>>>> Stashed changes
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
<<<<<<< Updated upstream
            // Set session variables
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['full_name'] = $user['full_name'];
            $_SESSION['role'] = $user['role'];

            // Log activity
            log_activity($user['id'], 'login', 'User logged in via login.php');

            // Redirect to dashboard
            header('Location: dashboard.php');
            exit();
        }
        else {
            $message = 'Invalid password verification.';
            $messageType = 'error';
        }
    }
    else {
        $message = 'User identity not recognized.';
        $messageType = 'error';
=======
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $user['role'];
            log_activity($user['id'], 'login', 'User logged in');
            header('Location: dashboard.php');
            exit();
        } else {
            $message = 'Invalid password.';
        }
    } else {
        $message = 'User not found.';
>>>>>>> Stashed changes
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<<<<<<< Updated upstream
    <title>Login - CYVE Cybersecurity</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #f5be1e;
            --primary-dark: #d4a017;
            --bg: #0a0a0a;
            --card-bg: #141414;
            --text: #ffffff;
            --text-dim: #a0a0a0;
            --error: #ff4d4d;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            background-image: radial-gradient(circle at 50% 50%, #1a1a1a 0%, #0a0a0a 100%);
            color: var(--text);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
        }

        .auth-card {
            background-color: var(--card-bg);
            border: 1px solid #333;
            border-radius: 12px;
            padding: 40px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .auth-header {
            text-align: center;
            margin-bottom: 30px;
        }

        .auth-header h1 {
            color: var(--primary);
            font-size: 24px;
            font-weight: 700;
            margin: 0 0 10px 0;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .auth-header p {
            color: var(--text-dim);
            font-size: 14px;
            margin: 0;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            font-size: 12px;
            font-weight: 600;
            color: var(--text-dim);
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .form-group input {
            width: 100%;
            padding: 12px;
            background-color: #1a1a1a;
            border: 1px solid #333;
            border-radius: 6px;
            color: var(--text);
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.2s;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--primary);
        }

        .btn-login {
            width: 100%;
            padding: 14px;
            background-color: var(--primary);
            color: #000;
            border: none;
            border-radius: 6px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 10px;
        }

        .btn-login:hover {
            background-color: var(--primary-dark);
        }

        .message {
            padding: 12px;
            border-radius: 6px;
            font-size: 14px;
            margin-bottom: 20px;
            text-align: center;
            background-color: rgba(255, 77, 77, 0.1);
            color: var(--error);
            border: 1px solid var(--error);
        }

        .auth-footer {
            margin-top: 25px;
            text-align: center;
            font-size: 14px;
            color: var(--text-dim);
        }

        .auth-footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="auth-card">
        <div class="auth-header">
            <h1>CYVE Auth</h1>
            <p>Access your cybersecurity headquarters</p>
        </div>

        <?php if ($message): ?>
            <div class="message">
                <?php echo $message; ?>
            </div>
        <?php
endif; ?>

        <form method="POST" action="login.php">
            <div class="form-group">
                <label for="identity">Email or Username</label>
                <input type="text" id="identity" name="identity" placeholder="Enter your email or username" required>
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter your password" required>
            </div>

            <button type="submit" class="btn-login">Login</button>
        </form>

        <div class="auth-footer">
            New to the path? <a href="signup.php">Enroll Now</a>
        </div>
=======
    <title>Login - CYVE</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <?php if ($message) echo "<p class='message'>$message</p>"; ?>
        <form method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <input type="password" name="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p><a href="register.php">Register</a></p>
>>>>>>> Stashed changes
    </div>
</body>
</html>
