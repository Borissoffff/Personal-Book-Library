<?php

class Book
{
    public string $id = '';
    public string $title;
    public int $isRead;
    public string $grade;
    public array $authors = [];
    public array $authorsIds = [];

    public function __construct(string $title, int $isRead, string $grade)
    {
        $this->title = $title;
        $this->isRead = $isRead;
        $this->grade = $grade;
    }

    public function addAuthor(Author $author) : void {
        $this->authors[] = $author;
    }

    public function addAuthorId(string $id) : void {
        $this->authorsIds[] = $id;
    }

    public function getAuthors() : array {
        return $this->authors;
    }

    public function getAuthorsAsString() : string {
        $res = [];
        foreach ($this->getAuthors() as $author) {
            $res[] = $author->firstName . " " . $author->lastName;
        }
        return join(', ', $res);
    }

/*    public function __toString(): string
    {
        return sprintf('Id: %s, Title: %s, IsRead: %s, Grade: %s, Authors: %s' . PHP_EOL,
            $this->id, $this->title, $this->isRead, $this->grade, $this->getAuthors());
    }*/
}