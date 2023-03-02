import { showBooks } from './showBooks.js';
import { showAuthors } from './showAuthors.js';
import { bookForm } from './bookForm.js';
import { authorForm } from "./authorsForm.js";

window.addEventListener("popstate", updateContent);

updateContent();

//event listeners for every navigation point
for (const each of document.querySelectorAll('nav > a')) {

    each.addEventListener('click', event => {

        event.preventDefault();

        const href = event.target.getAttribute('href');

        history.pushState(null, null, href);

        updateContent();
    });
}


export function updateContent() {

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const pageId = urlParams.get('page');

    applyTemplate(pageId);
}

export async function applyTemplate(templateName) {

    if (templateName === null) templateName = 'books';

    document.getElementById('content').innerHTML =
        await fetch(`pages/${templateName}.html`)
            .then(response => response.text());

    if (templateName === 'books') {

        await showBooks();
    }
    else if (templateName === 'authors') {

        await showAuthors();
    }
    else if (templateName === 'book-form') {

        await bookForm();
    }
    else if (templateName === 'author-form') {

        await authorForm();
    }
}
