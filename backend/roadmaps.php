<?php
include 'config.php';

if (!isset($_SESSION['user_id'])) {
    header('Location: login.php');
    exit();
}

$user_id = $_SESSION['user_id'];
$role = $_SESSION['role'];
$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['create_roadmap'])) {
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $steps_array = array_filter(array_map('trim', explode("\n", $_POST['steps'])));
    $steps = json_encode($steps_array);

    $stmt = $conn->prepare("INSERT INTO roadmaps (title, description, steps, created_by) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("sssi", $title, $description, $steps, $user_id);
    if ($stmt->execute()) {
        $message = 'Roadmap created successfully.';
        log_activity($user_id, 'create_roadmap', "Created roadmap: $title");
    } else {
        $message = 'Failed to create roadmap.';
    }
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['update_roadmap'])) {
    $id = (int) $_POST['id'];
    $title = sanitize($_POST['title']);
    $description = sanitize($_POST['description']);
    $steps_array = array_filter(array_map('trim', explode("\n", $_POST['steps'])));
    $steps = json_encode($steps_array);

    $stmt = $conn->prepare("SELECT created_by FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $roadmap = $result->fetch_assoc();
        if ($roadmap['created_by'] == $user_id || $role === 'admin') {
            $stmt = $conn->prepare("UPDATE roadmaps SET title = ?, description = ?, steps = ? WHERE id = ?");
            $stmt->bind_param("sssi", $title, $description, $steps, $id);
            if ($stmt->execute()) {
                $message = 'Roadmap updated successfully.';
                log_activity($user_id, 'update_roadmap', "Updated roadmap ID: $id");
            }
        }
    }
    $stmt->close();
}

if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = (int) $_GET['delete'];
    $stmt = $conn->prepare("SELECT created_by FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $roadmap = $result->fetch_assoc();
        if ($roadmap['created_by'] == $user_id || $role === 'admin') {
            $stmt = $conn->prepare("DELETE FROM roadmaps WHERE id = ?");
            $stmt->bind_param("i", $id);
            if ($stmt->execute()) {
                $message = 'Roadmap deleted.';
                log_activity($user_id, 'delete_roadmap', "Deleted roadmap ID: $id");
            }
        }
    }
    $stmt->close();
}

$search = isset($_GET['search']) ? sanitize($_GET['search']) : '';
$query = "SELECT r.*, u.username as creator FROM roadmaps r LEFT JOIN users u ON r.created_by = u.id WHERE 1";
if ($search) {
    $query .= " AND (r.title LIKE '%$search%' OR r.description LIKE '%$search%')";
}
$query .= " ORDER BY r.created_at DESC";
$result = $conn->query($query);
$roadmaps = $result->fetch_all(MYSQLI_ASSOC);

$edit_roadmap = null;
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $id = (int) $_GET['edit'];
    $stmt = $conn->prepare("SELECT * FROM roadmaps WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 1) {
        $edit_roadmap = $result->fetch_assoc();
        if ($edit_roadmap['created_by'] != $user_id && $role !== 'admin') {
            $edit_roadmap = null;
        }
    }
    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roadmaps - CYVE</title>
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
        <a href="dashboard.php?logout" class="btn-login">Logout</a>
    </nav>

    <div class="container">
        <h2>Roadmaps</h2>
        <?php if ($message) echo "<p class='message'>$message</p>"; ?>

        <h3><?php echo $edit_roadmap ? 'Edit Roadmap' : 'Create Roadmap'; ?></h3>
        <form method="POST">
            <?php if ($edit_roadmap): ?>
                <input type="hidden" name="id" value="<?php echo $edit_roadmap['id']; ?>">
            <?php endif; ?>
            <input type="text" name="title" placeholder="Roadmap Title" value="<?php echo $edit_roadmap ? htmlspecialchars($edit_roadmap['title']) : ''; ?>" required>
            <textarea name="description" placeholder="Description"><?php echo $edit_roadmap ? htmlspecialchars($edit_roadmap['description']) : ''; ?></textarea>
            <textarea name="steps" placeholder="Steps (one per line)"><?php echo $edit_roadmap ? htmlspecialchars(implode("\n", json_decode($edit_roadmap['steps'], true) ?: [])) : ''; ?></textarea>
            <button type="submit" name="<?php echo $edit_roadmap ? 'update_roadmap' : 'create_roadmap'; ?>"><?php echo $edit_roadmap ? 'Update' : 'Create'; ?> Roadmap</button>
            <?php if ($edit_roadmap): ?>
                <a href="roadmaps.php">Cancel</a>
            <?php endif; ?>
        </form>

        <h3>All Roadmaps</h3>
        <form method="GET">
            <input type="text" name="search" placeholder="Search roadmaps..." value="<?php echo htmlspecialchars($search); ?>">
            <button type="submit">Search</button>
        </form>

        <div class="roadmap-list">
            <?php foreach ($roadmaps as $roadmap): ?>
            <div class="roadmap-item">
                <h4><?php echo htmlspecialchars($roadmap['title']); ?></h4>
                <p><?php echo htmlspecialchars($roadmap['description']); ?></p>
                <p>Created by: <?php echo htmlspecialchars($roadmap['creator']); ?></p>
                <ul>
                    <?php foreach (json_decode($roadmap['steps'], true) ?: [] as $step): ?>
                        <li><?php echo htmlspecialchars($step); ?></li>
                    <?php endforeach; ?>
                </ul>
                <?php if ($roadmap['created_by'] == $user_id || $role === 'admin'): ?>
                    <a href="?edit=<?php echo $roadmap['id']; ?>">Edit</a>
                    <a href="?delete=<?php echo $roadmap['id']; ?>" onclick="return confirm('Delete this roadmap?')">Delete</a>
                <?php endif; ?>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>