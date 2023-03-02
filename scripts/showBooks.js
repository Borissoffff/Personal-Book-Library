import BookDao from "./DAO/BookDao.js";
import { updateContent } from "./index.js";


export async function showBooks() {
    const booksTable = document.getElementById('main-table');

    while (booksTable !== null && booksTable.hasChildNodes()) {
        booksTable.removeChild(booksTable.lastChild);
    }

    let books = await new BookDao().getAllBooks();

    for (const book of books) {
        addBookDiv(book);
    }

    for (const each of document.querySelectorAll('table > tr > td > a')) {

        each.addEventListener('click', event => {

            event.preventDefault();

            const href = event.target.getAttribute('href');

            history.pushState(null, null, href);

            updateContent();
        });
    }
}

function addBookDiv(book) {
    const table = document.getElementById('main-table');
    const tr = document.createElement('tr');
    tr.innerHTML =
        '<td class="book-title">' +
            '<a href="?page=book-form&id=' + book.id + '">' + book.title + '</a>' +
        '</td>' +
        '<td>' + parseAuthors(book.authors) + '</td>' +
        '<td class="rating-category">' +
            displayGrade(book.grade) +
        '</td>';
    table.appendChild(tr);
}

function parseAuthors(authors) {
    let names = [];
    for (const author of authors) {
        let tmp = [];
        tmp.push(author.firstName);
        tmp.push(author.lastName);
        names.push(tmp.join(" "));
    }
    return names.join(", ");
}

function displayGrade(grade) {
    let str = "";
    for (let i = 1; i < 6; i++) {
        if (i <= grade) {
            str += '<span class="fa fa-star checked"></span>'
        } else {
            str += '<span class="fa fa-star"></span>'
        }
    }
    return str;
}