<?php

const USERNAME = 'user';
const PASSWORD = 'pass';

function getConnection(): PDO
{
    $host = 'db.mkalmo.eu';

    $address = sprintf('mysql:host=%s;port=3306;dbname=%s',
        $host, USERNAME);

    return new PDO($address, USERNAME, PASSWORD);
}
