<?php
include 'fetch.php';
include 'utils.php';

$id = isset($_GET['id']) ? $_GET['id'] : '';

$authors = get_authors();
$bookData = get_book($id);

$page_content = render('templates/update.php', ['book' => $bookData, 'authors' => $authors]);

$layout_content = render(
    'templates/layout.php',
    ['content' => $page_content, 'title' => 'Добавить книгу']
);

print ($layout_content);