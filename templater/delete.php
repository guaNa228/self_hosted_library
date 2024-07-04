<?php
include 'fetch.php';
$id = isset($_GET['id']) ? $_GET['id'] : '';

if (delete_fetching($id)) {
    header("Location: /");
    exit;
} else {
    echo "There was and error deleting the book!";
}