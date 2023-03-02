import AuthorDao from "./DAO/AuthorDao.js";
import { updateContent } from "./index.js";

export async function showAuthors() {
    const authorsTable = document.getElementById('main-table');

    while (authorsTable.hasChildNodes()) {
        authorsTable.removeChild(authorsTable.lastChild);
    }

    let authors = await new AuthorDao().getAllAuthors();

    for (const author of authors) {
        addAuthor(author);
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

function addAuthor(author) {
    const table = document.getElementById('main-table');
    const tr = document.createElement('tr');
    tr.innerHTML =
        '<td>' +
        '<a href="?page=author-form&id=' + author.id + '">' + author.firstName + '</a>' +
        '</td>' +
        '<td>' + author.lastName + '</td>' +
        '<td class="rating-category">' +
        displayGrade(author.grade) +
        '</td>';
    table.appendChild(tr);
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