const baseUrl = 'http://localhost:8080/api/api.php';

export default class AuthorDao {

    getAllAuthors() {
        const url = baseUrl + '?cmd=show-authors'

        return fetch(url).then(response => response.json());
    }

    saveAuthor(author) {
        const url = baseUrl + '?cmd=save-author';

        return fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(author)
        });
    }

    deleteAuthor(id) {
        let url = baseUrl + '?cmd=delete-author&id=' + id;

        return fetch(url, {
            method: 'POST'
        });
    }

    getAuthorById(id) {
        let url = baseUrl + '?cmd=get-author&id=' + id;

        return fetch(url).then(response => response.json());
    }
}