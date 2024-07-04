<nav>
    <a href="add.php"><button class="addBook">Добавить книгу</button></a>
</nav>
<main>
    <div class="books">
        <?php foreach ($books as $book): ?>
                            <div class="book" onclick="location.href='/update.php?id=<?= $book['_id'] ?>'">
                                <img src="<?= $book['image_url'] ?? "" ?>" alt="">
                                <h2><?= $book['name'] ?></h2>
                                <h4><?= $book['author']['name'] ?></h4>
                                <?php if (isset($book['rating'])): ?>
                                                    <p><?= $book['rating'] ?> / 10</p>
                                <?php endif; ?>
                                <?php if (isset($book['comment'])): ?>
                                                    <p class="comment"><?= $book['comment'] ?></p>
                                <?php endif; ?>
                                <a href="delete.php?id=<?= $book['_id'] ?>" onclick="event.stopPropagation();">
                                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                                        <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                        <g id="SVGRepo_iconCarrier">
                                            <path d="M10 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M14 11V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M4 7H20" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </g>

                                    </svg>
                                </a>
                            </div>
        <?php endforeach; ?>
    </div>
</main>