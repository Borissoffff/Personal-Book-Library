<?php

require_once 'classes/Book.php';
require_once 'classes/Author.php';
require_once 'DAO/AuthorDao.php';
require_once 'DAO/BookDao.php';

$authorDao = new AuthorDao();
$bookDao = new BookDao();

$cmd = $_GET['cmd'] ?? 'show-books';


if ($cmd === 'show-books') {

    header("Content-type: application/json");

    print json_encode($bookDao->getAllBooks());
}

else if ($cmd == 'save-book') {
    $jsonAsText = file_get_contents('php://input');

    $object = json_decode($jsonAsText);

    $book = new Book($object->title, $object->isRead, $object->grade);
    foreach ($object->authorIds as $id) {
        $book->authorsIds[] = $id;
    }

    $bookDao->saveBook($book);

    header("Content-type: application/json");

    print json_encode("saved");
}

else if ($cmd == 'delete-book') {
    $id = $_GET['id'];

    $bookDao->deleteBookById($id);

    header("Content-type: application/json");

    print json_encode("deleted");
}
else if ($cmd == 'get-book') {
    $id = $_GET['id'];

    header("Content-type: application/json");

    print json_encode($bookDao->getBookById($id));
}
else if ($cmd == 'show-authors') {

    header("Content-type: application/json");

    print json_encode($authorDao->getAllAuthors());
}
else if ($cmd == 'save-author') {
    $jsonAsText = file_get_contents('php://input');

    $object = json_decode($jsonAsText);

    $authorDao->saveAuthor(new Author($object->firstName, $object->lastName, $object->grade));

    header("Content-type: application/json");

    print json_encode("saved");
}
else if ($cmd == 'get-author') {
    $id = $_GET['id'];

    error_log($id);

    header("Content-type: application/json");

    print json_encode($authorDao->getAuthorById($id));
}
else if ($cmd == 'delete-author') {
    $id = $_GET['id'];

    $authorDao->deleteAuthorById($id);

    header("Content-type: application/json");

    print json_encode("deleted");
}

