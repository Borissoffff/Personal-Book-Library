
const baseUrl = 'http://localhost:8080/api/api.php';

export default class BookDao {

    getAllBooks() {
        const url = baseUrl + '?cmd=show-books'

        return fetch(url).then(response => response.json());
    }

    saveBook(book) {
        const url = baseUrl + '?cmd=save-book';

        return fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(book)
        });
    }

    deleteBook(id) {
        let url = baseUrl + '?cmd=delete-book&id=' + id;

        return fetch(url, {
            method: 'POST'
        });
    }

    getBookById(id) {
        let url = baseUrl + '?cmd=get-book&id=' + id;

        return fetch(url).then(response => response.json());
    }
}


