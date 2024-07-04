<?php
include 'fetch.php';
include 'utils.php';

$data = get_books();
$page_content = render('templates/main.php', ['books' => $data]);



$layout_content = render(
    'templates/layout.php',
    ['content' => $page_content, 'title' => 'Книги']
);

print ($layout_content);