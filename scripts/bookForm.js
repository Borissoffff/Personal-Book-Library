import BookDao from './DAO/BookDao.js'
import Book from './Book.js'
import { addDeleteButton, getGrade, getUrlParamValue, setRadioButton } from './functions.js'
import { updateContent } from './index.js';
import AuthorDao from "./DAO/AuthorDao.js";

export async function bookForm() {

    await addAuthorsToSelectSection();

    const id = getUrlParamValue('id');

    const submitButton = document.getElementById('btn')

    const bookDao = new BookDao();

    if (id !== null) {

        addDeleteButton();

        let bookToUpdate = await new BookDao().getBookById(id);

        //set title of the book
        const titleInputField = document.getElementById('title-name');
        titleInputField.setAttribute("value", bookToUpdate.title);

        //set the radio button value if there is
        if (bookToUpdate.grade !== null) setRadioButton('grade', bookToUpdate.grade);

        //set is read checkbox
        if (bookToUpdate.isRead !== 0) {
            document.getElementById('loetud').checked = true;
        }

        //deleting book
        const deleteButton = document.getElementById('delete-btn');
        deleteButton.addEventListener('click', async (e) => {

            e.preventDefault();

            await bookDao.deleteBook(id);

            window.history.replaceState(null, null, "?page=books");

            updateContent();
        })

        //updating book
        submitButton.addEventListener('click', async (e) => {

            e.preventDefault();

            let book = createBookObject();

            if (book.title !== null) {
                await Promise.all([
                    bookDao.deleteBook(id),
                    bookDao.saveBook(book)
                ]);
                window.history.replaceState(null, null, "?page=books");

                updateContent();
            }
        })

    }
    else {
        submitButton.addEventListener('click', async (e) => {

            e.preventDefault();

            let book = createBookObject();

            if (book.title !== null) {
                await bookDao.saveBook(book);

                window.history.replaceState(null, null, "?page=books");

                updateContent();
            }
        })
    }
}

async function addAuthorsToSelectSection() {
    let authors = await new AuthorDao().getAllAuthors();

    for (const author of authors) {
        let option = document.createElement('option');
        option.setAttribute('value', author.id);
        option.innerText = author.firstName + ', ' + author.lastName;
        document.getElementById('firstAuthor').appendChild(option);

        option = document.createElement('option');
        option.setAttribute('value', author.id);
        option.innerText = author.firstName + ', ' + author.lastName;
        document.getElementById('secondAuthor').appendChild(option);
    }
}

function createBookObject() {
    let title = document.getElementById('title-name').value;
    let grade = getGrade('grade');
    let isRead = document.getElementById('loetud').checked === true ? 1 : 0;

    let firstAuthorSelector = document.getElementById('firstAuthor');
    let firstAuthor = firstAuthorSelector.options[firstAuthorSelector.selectedIndex].value;

    let secondAuthorSelector = document.getElementById('secondAuthor');
    let secondAuthor = secondAuthorSelector.options[secondAuthorSelector.selectedIndex].value;

    let book = new Book(title, isRead, grade);

    book.authorIds.push(secondAuthor, firstAuthor);

    return book;
}