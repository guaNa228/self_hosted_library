<?php
include 'fetch.php';
include 'utils.php';
$authors = get_authors();
$page_content = render('templates/add.php', ['authors' => $authors]);

$layout_content = render(
    'templates/layout.php',
    ['content' => $page_content, 'title' => 'Добавить книгу']
);

print ($layout_content);