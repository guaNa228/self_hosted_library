<?php
$error = "";
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (update_book($_POST['_id'], $_POST['name'], $_POST['author'], $_POST['coverImageUrl'], $_POST['rating'], $_POST['comment'])) {
        print_r("Worked");
        header("Location: /");
        exit;
    } else {
        $error = "Something went wrong";
    }
}
?>
<main class="updateForm">
    <p class="error"><?= $error ?></p>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
        <label for="coverImageUrl">Cover Image URL:</label><br>
        <input type="text" id="coverImageUrl" name="coverImageUrl" value="<?= isset($book['image_url']) ? $book['image_url'] : "" ?>"><br>

        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name" value="<?= $book['name'] ?>" required><br>

        <label for="author">Author:</label><br>
        <input type="text" list="authors" id="author" name="author" value="<?= $book['author']['name'] ?>" required><br>
        
        <datalist id="authors">
            <?php foreach ($authors as $author): ?>
                                                                                                                                                                                                                                                        <option value="<?= $author['name'] ?>">
                                                                                                                                                                                                                                                            <?= $author['name'] ?>
                                                                                                                                                                                                                                                        </option>
            <?php endforeach ?>
        </datalist>
        
        <div>
        <label for="rating">Rating:</label><br>
        <input type="number" min="0" max="10" id="name" name="rating" value="<?= isset($book['rating']) ? $book['rating'] : "" ?>" required><span>/10</span><br>
        </div>
        <div>
        <label for="comment">Comment:</label><br>
        <textarea name="comment" id="comment"><?= isset($book['comment']) ? $book['comment'] : "" ?></textarea>
        </div>
        
        <input name="_id" type="hidden" value="<?= $book['_id'] ?>">
        <input type="submit" value="Отправить">
    </form>
    <img src="" alt="">
</main>
<script>
    let imgInput = document.querySelector('input#coverImageUrl');
    let imagePreview = document.querySelector('img');
    
    let setImagePreviewSrc = () => {
        imagePreview.src = imgInput.value;
    }

    imgInput.addEventListener("input", setImagePreviewSrc);

    setImagePreviewSrc();
</script>