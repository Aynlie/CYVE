<?php
<<<<<<< Updated upstream
/**
 * CYVE - Premium Dashboard
 * Secure event management and platform overview.
 */
include 'config.php';

// Authentication check
=======
include 'config.php';

>>>>>>> Stashed changes
if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$role = $_SESSION['role'];
$username = $_SESSION['username'];
<<<<<<< Updated upstream
$full_name = isset($_SESSION['full_name']) ? $_SESSION['full_name'] : $username;

$message = '';
$messageType = '';
=======

$message = '';
>>>>>>> Stashed changes

// Handle logout
if (isset($_GET['logout'])) {
    log_activity($user_id, 'logout', 'User logged out');
    session_destroy();
    header('Location: login.php');
    exit();
}

// Handle event creation
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['create_event'])) {
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $event_date = $_POST['event_date'];
    $location = sanitize($_POST['location']);

    $stmt = $conn->prepare("INSERT INTO events (title, description, event_date, location, created_by) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $title, $description, $event_date, $location, $user_id);
    if ($stmt->execute()) {
<<<<<<< Updated upstream
        $message = 'Mission briefing created successfully.';
        $messageType = 'success';
        log_activity($user_id, 'create_event', "Created event: $title");
    }
    else {
        $message = 'Failed to create mission briefing.';
        $messageType = 'error';
=======
        $message = 'Event created successfully.';
        log_activity($user_id, 'create_event', "Created event: $title");
    } else {
        $message = 'Failed to create event.';
>>>>>>> Stashed changes
    }
    $stmt->close();
}

// Handle event approval (admin only)
if ($role == 'admin' && isset($_GET['approve']) && is_numeric($_GET['approve'])) {
    $event_id = $_GET['approve'];
    $stmt = $conn->prepare("UPDATE events SET status = 'approved', approved_by = ? WHERE id = ?");
    $stmt->bind_param("ii", $user_id, $event_id);
    if ($stmt->execute()) {
<<<<<<< Updated upstream
        $message = 'Mission approved for deployment.';
        $messageType = 'success';
=======
        $message = 'Event approved.';
>>>>>>> Stashed changes
        log_activity($user_id, 'approve_event', "Approved event ID: $event_id");
    }
    $stmt->close();
}

// Handle event deletion
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $event_id = $_GET['delete'];
    // Check if user owns the event or is admin
    $stmt = $conn->prepare("SELECT created_by FROM events WHERE id = ?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows == 1) {
        $event = $result->fetch_assoc();
        if ($event['created_by'] == $user_id || $role == 'admin') {
            $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
            $stmt->bind_param("i", $event_id);
            if ($stmt->execute()) {
<<<<<<< Updated upstream
                $message = 'Mission aborted and removed.';
                $messageType = 'success';
=======
                $message = 'Event deleted.';
>>>>>>> Stashed changes
                log_activity($user_id, 'delete_event', "Deleted event ID: $event_id");
            }
        }
    }
    $stmt->close();
}

// Fetch events
$search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
$query = "SELECT e.*, u.username as creator FROM events e LEFT JOIN users u ON e.created_by = u.id WHERE 1";
if ($search) {
    $query .= " AND (e.title LIKE '%$search%' OR e.description LIKE '%$search%')";
}
$query .= " ORDER BY e.event_date DESC";
$result = $conn->query($query);
$events = $result->fetch_all(MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - CYVE</title>
<<<<<<< Updated upstream
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../styles.css">
    <style>
        /* Specific styles for dashboard components not in styles.css */
        .dashboard-container {
            max-width: 1200px;
            margin: 4rem auto;
            padding: 0 2rem;
        }
        .message {
            padding: 1rem;
            background: rgba(245, 190, 30, 0.1);
            border: 1px solid var(--color-2);
            color: var(--color-2);
            border-radius: 8px;
            margin-bottom: 2rem;
            text-align: center;
        }
        .card {
            background: #141414;
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 12px;
            margin-bottom: 2rem;
        }
        .card h2 {
            color: var(--color-2);
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
        }
        .form-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1.5rem;
        }
        input, textarea {
            width: 100%;
            padding: 0.75rem;
            background: #1d1b20;
            border: 1px solid #333;
            border-radius: 6px;
            color: white;
            font-family: inherit;
        }
        .event-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        .event-table th, .event-table td {
            text-align: left;
            padding: 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .event-table th { color: var(--color-2); font-weight: 700; text-transform: uppercase; font-size: 0.8rem; }
        .action-link {
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-size: 0.85rem;
            text-decoration: underline;
        }
        .approve-link { color: #2ecc71; }
        .delete-link { color: #ff4d4d; }
    </style>
</head>
<body>
    <nav class="navigation">
        <a href="../index.html" class="logo">CYVE</a>
        <ul class="nav-links">
            <li><a href="dashboard.php">Dashboard</a></li>
            <li><a href="roadmaps.php">Roadmap</a></li>
            <li><a href="calendar.php">Calendar</a></li>
        </ul>
        <a href="?logout" class="btn-login" style="font-size: 1rem; font-family: inherit; padding: 0.5rem 1rem;">Logout (<?php echo htmlspecialchars($username); ?>)</a>
    </nav>

    <div class="dashboard-container">
        <h1 style="font-size: 3rem; margin-bottom: 2rem;">Command, Dashboard</h1>
        
        <?php if ($message): ?>
            <div class="message"><?php echo $message; ?></div>
        <?php
endif; ?>

        <div class="card">
            <h2>Initialize Mission</h2>
            <form method="POST">
                <div class="form-grid">
                    <input type="text" name="title" placeholder="Mission Title" required>
                    <input type="datetime-local" name="event_date" required>
                    <input type="text" name="location" placeholder="Deployment Zone">
                </div>
                <textarea name="description" placeholder="Intelligence Details" style="margin-top: 1.5rem;" rows="3"></textarea>
                <button type="submit" name="create_event" class="btn-login" style="margin-top: 1.5rem; font-size: 1rem; border: none; cursor: pointer;">Deploy Mission</button>
            </form>
        </div>

        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h2>Intelligence Log</h2>
                <form method="GET" style="display: flex; gap: 0.5rem;">
                    <input type="text" name="search" placeholder="Filter log..." value="<?php echo htmlspecialchars($search); ?>">
                    <button type="submit" class="btn-login" style="padding: 0.5rem 1rem; border: none; font-size: 0.8rem;">Filter</button>
                </form>
            </div>

            <table class="event-table">
                <thead>
                    <tr>
                        <th>Mission</th>
                        <th>Date</th>
                        <th>Agent</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($events)): ?>
                        <tr><td colspan="5" style="text-align: center; color: #888; padding: 2rem;">No logs found.</td></tr>
                    <?php
else: ?>
                        <?php foreach ($events as $event): ?>
                            <tr>
                                <td>
                                    <strong><?php echo htmlspecialchars($event['title']); ?></strong><br>
                                    <small style="color: #888;"><?php echo htmlspecialchars($event['description']); ?></small>
                                </td>
                                <td><?php echo date('M d, Y', strtotime($event['event_date'])); ?></td>
                                <td><?php echo htmlspecialchars($event['creator']); ?></td>
                                <td>
                                    <span style="color: <?php echo $event['status'] == 'approved' ? '#2ecc71' : '#f5be1e'; ?>">
                                        <?php echo strtoupper($event['status']); ?>
                                    </span>
                                </td>
                                <td>
                                    <?php if ($role == 'admin' && $event['status'] == 'pending'): ?>
                                        <a href="?approve=<?php echo $event['id']; ?>" class="action-link approve-link">Authorize</a>
                                    <?php
        endif; ?>
                                    <?php if ($event['created_by'] == $user_id || $role == 'admin'): ?>
                                        <a href="?delete=<?php echo $event['id']; ?>" class="action-link delete-link" onclick="return confirm('Abort mission?')">Abort</a>
                                    <?php
        endif; ?>
                                </td>
                            </tr>
                        <?php
    endforeach; ?>
                    <?php
endif; ?>
                </tbody>
            </table>
        </div>
=======
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navigation">
        <a href="index.html" class="logo">CYVE</a>
        <ul class="nav-links">
            <li><a href="dashboard.php">Dashboard</a></li>
            <li><a href="roadmaps.php">Roadmaps</a></li>
            <li><a href="calendar.php">Calendar</a></li>
        </ul>
        <a href="?logout" class="btn-login">Logout (<?php echo $username; ?>)</a>
    </nav>

    <div class="container">
        <h2>Dashboard</h2>
        <?php if ($message) echo "<p class='message'>$message</p>"; ?>

        <h3>Create Event</h3>
        <form method="POST">
            <input type="text" name="title" placeholder="Event Title" required>
            <input type="datetime-local" name="event_date" required>
            <textarea name="description" placeholder="Description"></textarea>
            <input type="text" name="location" placeholder="Location">
            <button type="submit" name="create_event">Create Event</button>
        </form>

        <h3>Events</h3>
        <form method="GET">
            <input type="text" name="search" placeholder="Search events..." value="<?php echo $search; ?>">
            <button type="submit">Search</button>
        </form>

        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Creator</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($events as $event): ?>
                <tr>
                    <td><?php echo htmlspecialchars($event['title']); ?></td>
                    <td><?php echo htmlspecialchars($event['description']); ?></td>
                    <td><?php echo $event['event_date']; ?></td>
                    <td><?php echo htmlspecialchars($event['location']); ?></td>
                    <td><?php echo $event['status']; ?></td>
                    <td><?php echo htmlspecialchars($event['creator']); ?></td>
                    <td>
                        <?php if ($role == 'admin' && $event['status'] == 'pending'): ?>
                            <a href="?approve=<?php echo $event['id']; ?>">Approve</a>
                        <?php endif; ?>
                        <?php if ($event['created_by'] == $user_id || $role == 'admin'): ?>
                            <a href="?delete=<?php echo $event['id']; ?>" onclick="return confirm('Delete this event?')">Delete</a>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
>>>>>>> Stashed changes
    </div>
</body>
</html>
