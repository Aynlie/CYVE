<?php
include 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$role = $_SESSION['role'];
$username = $_SESSION['username'];
$message = '';

if (isset($_GET['logout'])) {
    log_activity($user_id, 'logout', 'User logged out');
    session_destroy();
    header('Location: login.php');
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_event'])) {
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $event_date = $_POST['event_date'];
    $location = sanitize($_POST['location']);

    $stmt = $conn->prepare("INSERT INTO events (title, description, event_date, location, created_by) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssi", $title, $description, $event_date, $location, $user_id);
    if ($stmt->execute()) {
        $message = 'Event created successfully.';
        log_activity($user_id, 'create_event', "Created event: $title");
    } else {
        $message = 'Failed to create event.';
    }
    $stmt->close();
}

if ($role === 'admin' && isset($_GET['approve']) && is_numeric($_GET['approve'])) {
    $event_id = (int) $_GET['approve'];
    $stmt = $conn->prepare("UPDATE events SET status = 'approved', approved_by = ? WHERE id = ?");
    $stmt->bind_param("ii", $user_id, $event_id);
    if ($stmt->execute()) {
        $message = 'Event approved.';
        log_activity($user_id, 'approve_event', "Approved event ID: $event_id");
    }
    $stmt->close();
}

if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $event_id = (int) $_GET['delete'];
    $stmt = $conn->prepare("SELECT created_by FROM events WHERE id = ?");
    $stmt->bind_param("i", $event_id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $event = $result->fetch_assoc();
        if ($event['created_by'] == $user_id || $role === 'admin') {
            $stmt = $conn->prepare("DELETE FROM events WHERE id = ?");
            $stmt->bind_param("i", $event_id);
            if ($stmt->execute()) {
                $message = 'Event deleted.';
                log_activity($user_id, 'delete_event', "Deleted event ID: $event_id");
            }
        }
    }
    $stmt->close();
}

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
        <a href="?logout" class="btn-login">Logout (<?php echo htmlspecialchars($username); ?>)</a>
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
            <input type="text" name="search" placeholder="Search events..." value="<?php echo htmlspecialchars($search); ?>">
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
                    <td><?php echo htmlspecialchars($event['event_date']); ?></td>
                    <td><?php echo htmlspecialchars($event['location']); ?></td>
                    <td><?php echo htmlspecialchars($event['status']); ?></td>
                    <td><?php echo htmlspecialchars($event['creator']); ?></td>
                    <td>
                        <?php if ($role === 'admin' && $event['status'] === 'pending'): ?>
                            <a href="?approve=<?php echo $event['id']; ?>">Approve</a>
                        <?php endif; ?>
                        <?php if ($event['created_by'] == $user_id || $role === 'admin'): ?>
                            <a href="?delete=<?php echo $event['id']; ?>" onclick="return confirm('Delete this event?')">Delete</a>
                        <?php endif; ?>
                    </td>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
</body>
</html>