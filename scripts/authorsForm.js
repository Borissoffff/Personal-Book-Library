import AuthorDao from './DAO/AuthorDao.js'
import Author from './Author.js'
import {addDeleteButton, getGrade, getUrlParamValue, setRadioButton} from './functions.js'
import { updateContent } from "./index.js";

export async function authorForm() {

    let id = getUrlParamValue('id');

    const submitButton = document.getElementById('submit-btn')

    const authorDao = new AuthorDao();

    if (id !== null) {

        addDeleteButton();

        let authorToUpdate = await new AuthorDao().getAuthorById(id);

        //set author's first name
        document.getElementById('author-name')
            .setAttribute("value", authorToUpdate.firstName);

        //set author's last name
        document.getElementById('author-surname')
            .setAttribute("value", authorToUpdate.lastName);

        //set the radio button value if there is
        if (authorToUpdate.grade !== null) setRadioButton('grade', authorToUpdate.grade);

        //deleting author
        const deleteButton = document.getElementById('delete-btn');
        deleteButton.addEventListener('click', async (e) => {

            e.preventDefault();

            await authorDao.deleteAuthor(id);

            window.history.replaceState(null, null, "?page=authors");

            updateContent();
        })

        //updating book
        submitButton.addEventListener('click', async (e) => {

            e.preventDefault();

            let author = createAuthorObject();

            if (author.firstName !== null && author.lastName !== null) {
                await Promise.all([
                    authorDao.deleteAuthor(id),
                    authorDao.saveAuthor(author)
                ]);
                window.history.replaceState(null, null, "?page=authors");

                updateContent();
            }
        })
    }
    else {
        submitButton.addEventListener('click', async (e) => {

            e.preventDefault();

            let author = createAuthorObject();

            if (author.firstName !== null && author.lastName !== null) {

                await authorDao.saveAuthor(
                    new Author(author.firstName, author.lastName, author.grade)
                );
                window.history.replaceState(null, null, "?page=authors");

                updateContent();
            }
        })
    }
}

function createAuthorObject() {
    let firstName = document.getElementById('author-name').value;
    let lastName = document.getElementById('author-surname').value;
    let grade = getGrade('grade');

    return new Author(firstName, lastName, grade);
}
