<?php

class Author
{
    public string $id = '';
    public string $firstName;
    public string $lastName;
    public string $grade;

    public function __construct(string $firstName, string $lastName, string $grade)
    {
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->grade = $grade;
    }

    public function __toString(): string
    {
        return sprintf('Id: %s, firstName: %s, lastName: %s, Grade: %s' . PHP_EOL,
            $this->id, $this->firstName, $this->lastName, $this->grade);
    }


}