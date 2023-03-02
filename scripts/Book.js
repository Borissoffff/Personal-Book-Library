export default class Book{

    constructor(title, isRead, grade) {
        this.title = title;
        this.isRead = isRead;
        this.grade = grade;
        this.authorIds = [];
    }
}