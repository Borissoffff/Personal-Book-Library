<?php

require_once '../db_connection.php';
require_once '../classes/Author.php';

class AuthorDao
{
    public function __construct()
    {
    }

    function saveAuthor(Author $author): void
    {
        $connection = getConnection();

        $firstName = $author->firstName;
        $lastName = $author->lastName;
        $grade = $author->grade;

        $query = "insert into author (first_name, last_name, grade) values (:fn, :ln, :gr)";

        $stmt = $connection->prepare($query);

        $stmt->bindParam(":fn", $firstName);
        $stmt->bindParam(":ln", $lastName);
        $stmt->bindParam(":gr", $grade);

        $stmt->execute();
    }

    function getAllAuthors(): array
    {
        $connection = getConnection();

        $query = "select * from author";
        $stmt = $connection->prepare($query);

        $stmt->execute();

        $authors = [];
        foreach ($stmt as $row) {
            $id = $row['author_id'];
            $firstName = $row['first_name'];
            $lastName = $row['last_name'];
            $grade = $row['grade'];

            $author = new Author($firstName, $lastName, $grade);
            $author->id = $id;
            $authors[] = $author;
        }
        return $authors;
    }

    function getAuthorById($id): Author {
        $connection = getConnection();

        $query = "select * from author where author_id=:id";
        $stmt = $connection->prepare($query);

        $stmt->bindValue(":id", $id);

        $stmt->execute();

        $a = null;
        foreach ($stmt as $row) {
            $id = $row['author_id'];
            $firstName = $row['first_name'];
            $lastName = $row['last_name'];
            $grade = $row['grade'];

            $author = new Author($firstName, $lastName, $grade);
            $author->id = $id;
            $a = $author;
        }
        return $a;
    }

        function getAuthorFullNameById(string $id): string
        {
            $connection = getConnection();

            $query = "select first_name, last_name from author where author_id=:id";
            $stmt = $connection->prepare($query);

            $stmt->bindValue(":id", $id);

            $stmt->execute();

            $name = '';
            foreach ($stmt as $row) $name = $row['first_name'] . ' ' . $row['last_name'];
            return $name;

        }

        function deleteAuthorById(string $id): void
        {
            $connection = getConnection();

            $query = "delete from author where author_id=:id";
            $stmt = $connection->prepare($query);

            $stmt->bindParam(":id", $id);

            $stmt->execute();
        }

        function updateAuthorById(string $id, string $firstName, string $lastName, string $grade): void
        {
            $connection = getConnection();

            $query = "update author set first_name = :fn, last_name=:ln, grade=:gr where author_id=:id";
            $stmt = $connection->prepare($query);

            $stmt->bindParam("fn", $firstName);
            $stmt->bindParam("ln", $lastName);
            $stmt->bindParam("gr", $grade);
            $stmt->bindParam("id", $id);

            $stmt->execute();
        }
}