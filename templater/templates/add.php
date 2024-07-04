<?php
$coverImageUrl = "";
$name = "";
$author = "";
$error = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['formType'])) {
        switch ($_POST['formType']) {
            case 'searchByISBN':
                $isbnData = get_by_isbn($_POST['ISBN']);
                if ($isbnData == "") {
                    $error = "Неверный, либо отсутствующий ISBN!";
                } else {
                    $coverImageUrl = $isbnData['image_url'];
                    $name = $isbnData['name'];
                    $author = $isbnData['author'];
                }
                break;
            case 'submitBookDetails':
                $coverImageUrl = $_POST['coverImageUrl'];
                $name = $_POST['name'];
                $author = $_POST['author'];

                if (add_book($name, $author, $coverImageUrl)) {
                    header("Location: /");
                    exit;
                } else {
                    echo "There was an error adding the book!";
                }
                break;
        }
    }
}
?>
<main class="form">
    <p class="error"><?= $error ?></p>
    <form id="ISBNForm" method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <input placeholder="Введите ISBN(в точности, как на книге)" type="text" id="ISBN" name="ISBN">
        <input type="hidden" name="formType" value="searchByISBN">
        <input type="submit" value="Поиск">
    </form>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="coverImageUrl">Cover Image URL:</label><br>
        <input type="text" id="coverImageUrl" name="coverImageUrl" value="<?= $coverImageUrl ?>"><br>

        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" value="<?= $name ?>" required><br>

        <label for="author">Author:</label><br>
        <input type="text" list="authors" id="author" name="author" value="<?= $author ?>" required><br>
        
        <datalist id="authors">
            <?php foreach ($authors as $author): ?>
                        <option value="<?= $author['name'] ?>">
                            <?= $author['name'] ?>
                        </option>
            <?php endforeach ?>
        </datalist>
        <input type="hidden" name="formType" value="submitBookDetails">

        <input type="submit" value="Отправить">
    </form>
</main>