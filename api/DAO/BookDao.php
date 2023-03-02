<?php

require_once '../db_connection.php';
require_once '../classes/Book.php';

class BookDao
{
    public function __construct()
    {
    }

    function saveBook(Book $book) : void {
        $connection = getConnection();

        $title = $book->title;
        $grade = $book->grade;
        $isRead = $book->isRead;
        $authors = $book->authorsIds;

        $query = "insert into book (title, grade, isRead) values (:t, :gr, :isr)";
        $stmt = $connection->prepare($query);

        $stmt->bindParam(":t", $title);
        $stmt->bindParam(":gr", $grade);
        $stmt->bindParam(":isr", $isRead);
        $stmt->execute();

        $lastBookId = $connection->lastInsertId();

        if (empty($authors)) $this->connectBookWithAuthors($lastBookId, 0);
        else foreach ($authors as $authorId) $this->connectBookWithAuthors($lastBookId, $authorId);

    }

    function getAllBooks() : array {
        $connection = getConnection();

        $query = "select book.book_id, title, book.grade, isRead, first_name, last_name, a.grade as agrade from book
                left join book_author ba on book.book_id = ba.book_id
                left join author a on ba.author_id = a.author_id";
        $stmt = $connection->prepare($query);

        $stmt->execute();

        $bookIds = [];
        $books = [];
        foreach ($stmt as $row) {
            $title = $row['title'];
            $grade = $row['grade'];
            $isRead = $row['isRead'];
            $book = new Book($title, $isRead, $grade);
            $id = $row['book_id'];

            $author = null;
            if ($row['first_name'] !== null and $row['last_name'] != null) {
                $author = new Author($row['first_name'], $row['last_name'], $row['agrade']);
            }
            if (!in_array($row['book_id'], $bookIds)) {
                $book->id = $id;
                if ($author) $book->addAuthor($author);
                $books[] = $book;
                $bookIds[] = $id;
            } else {
                $b = $this->findBookById($id, $books);
                if ($author) $b->addAuthor($author);
            }
        }
        return $books;
    }

    function findBookById($id, $arr) : ?Book {
        foreach ($arr as $book) {
            if ($book->id == $id) {
                return $book;
            }
        }
        return null;
    }

    function getBookById($id) : Book {
        $connection = getConnection();

        $query = "select book.book_id, title, book.grade, isRead, first_name, last_name, a.author_id, a.grade as agrade from book
                left join book_author ba on book.book_id = ba.book_id
                left join author a on ba.author_id = a.author_id
                where book.book_id=:id";
        $stmt = $connection->prepare($query);
        $stmt->bindValue(':id', $id);

        $stmt->execute();

        $tmp = [];
        $flag = false;
        foreach ($stmt as $row) {
            if ($flag) {
                $book = $tmp[0];

                if ($row['author_id'] != null) {
                    $firstName = $row['first_name'];
                    $lastName = $row['last_name'];
                    $aGrade = $row['agrade'];

                    $author = new Author($firstName, $lastName, $aGrade);
                    $author->id = $row['author_id'];

                    $book->addAuthor($author);
                }

            } else {
                $title = $row['title'];
                $grade = $row['grade'];
                $isRead = $row['isRead'];
                $book = new Book($title, $isRead, $grade);
                $book->id = $row['book_id'];

                if ($row['author_id'] !== null){
                    $firstName = $row['first_name'];
                    $lastName = $row['last_name'];
                    $aGrade = $row['agrade'];

                    $author = new Author($firstName, $lastName, $aGrade);
                    $author->id = $row['author_id'];

                    $book->addAuthor($author);
                }
                $tmp[] = $book;
                $flag = !$flag;
            }
        }
        return $tmp[0];

    }

    function deleteBookById(string $id) : void {
        $connection = getConnection();

        $query = "delete from book where book_id=:id";
        $stmt = $connection->prepare($query);

        $stmt->bindParam(":id", $id);

        $stmt->execute();

        $this->deleteRowFromBookAuthor($id);
    }

    function connectBookWithAuthors($bookId, $authorId) : void {
        $connection = getConnection();

        $query = "insert into book_author (book_id, author_id) values (:bid, :aid)";
        $stmt = $connection->prepare($query);

        $stmt->bindValue(":bid", $bookId);
        $stmt->bindValue(":aid", $authorId);

        $stmt->execute();
    }

    function deleteRowFromBookAuthor(string $id) : void {
        $connection = getConnection();

        $query = "delete from book_author where book_id=:id";
        $stmt = $connection->prepare($query);

        $stmt->bindParam(":id", $id);

        $stmt->execute();
    }
}