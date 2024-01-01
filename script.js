const myLibrary = [];

// test library
let book1 = new Book('Book 1', 'Sam Howell', 81, true);
let book2 = new Book('My Favorite Book 2', 'Underdog', 1032, false);
// myLibrary.push(book1);
// myLibrary.push(book2);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    myLibrary.push(this);
    this.index = myLibrary.length - 1;

    this.info = function() {
        if (read == true) {
            return '${this.title} by ${this.author}, ${this.pages} pages, you read this book';
        } else {
            return '${this.title} by ${this.author}, ${this.pages} pages, you have not read this book';
        }
        // return (this.title + ' by ' + this.author + ', ' + this.pages + ' pages, ' + this.read);  
    };
}

function addBookToLibrary() {
    let newBookTitle = document.getElementsByName('book_title')[0].value;
    let newBookAuthor = document.getElementsByName('book_author')[0].value;
    let newBookPages = document.getElementsByName('book_pages')[0].value;
    let radioButtons = document.getElementsByName('book_read');
    let newBookRead;

    if (!newBookTitle || !newBookAuthor || !newBookPages) {
        alert('Please fill in all required fields.');
        return; // Stop execution if validation fails
    }

    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            newBookRead = radioButtons[i].value;
            break; // Stop iterating once a checked radio button is found
        }
    }

    // if yes true, no false
    console.log(newBookRead);
    newBookRead = (newBookRead === 'Yes');
    let newBook = new Book(newBookTitle, newBookAuthor, newBookPages, newBookRead);

    // myLibrary.push(newBook);

    displayLibrary();
    // console.log(myLibrary);

    // clear form
    document.getElementsByName('book_title')[0].value = '';
    document.getElementsByName('book_author')[0].value = '';
    document.getElementsByName('book_pages')[0].value = '';
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].checked = false;
    }
}

const bookCardsDiv = document.querySelector('.book-cards');
const newBookButton = document.querySelector('.new-book-btn');
const newBookForm = document.querySelector('.new-book-form');

// display library
function displayLibrary() {
    while (bookCardsDiv.firstChild) {
        bookCardsDiv.removeChild(bookCardsDiv.firstChild);
    }

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCardsDiv.appendChild(bookCard);
    
        const title = document.createElement('p');
        title.classList.add('title');
        bookCard.appendChild(title);
        title.textContent = book.title;
        console.log(title.textContent);
    
        const author = document.createElement('p');
        author.classList.add('author');
        bookCard.appendChild(author);
        author.textContent = 'by ' + book.author;
    
        const pages = document.createElement('p');
        pages.classList.add('pages');
        bookCard.appendChild(pages);
        pages.textContent = book.pages + ' pages';
    
        const read = document.createElement('p');
        read.classList.add('read');
        bookCard.appendChild(read);
        if (book.read == true) {
            read.textContent = 'You read this book';
        } else {
            read.textContent = 'You have not read this book';
        }

        // const removeBookBtn = document.createElement('button');
        // const removeBookImg = document.createElement("img");
        // removeBookImg.src = "images/book-remove.svg";
        // removeBookImg.alt = "Remove Book";
        // removeBookBtn.appendChild(removeBookImg);
        // removeBookBtn.classList.add('remove-book-button');
        // bookCard.appendChild(removeBookBtn);
        // removeBookBtn.onclick = function() {
        //     removeBook(book.index);
        // };
        const bookActionsDiv = document.createElement('div');
        bookActionsDiv.classList.add('book-actions');
        bookCard.appendChild(bookActionsDiv);

        const readBookButton = document.createElement('button');
        const readBookImg = document.createElement("img");
        readBookImg.src = "images/read.svg";
        readBookImg.alt = "Read Book";
        readBookButton.appendChild(readBookImg);
        readBookButton.classList.add('read-book-button');
        bookActionsDiv.appendChild(readBookButton);
        readBookButton.onclick = function() {
            changeBookRead(book.index);
        };

        const removeBookBtn = document.createElement('button');
        const removeBookImg = document.createElement("img");
        removeBookImg.src = "images/book-remove.svg";
        removeBookImg.alt = "Remove Book";
        removeBookBtn.appendChild(removeBookImg);
        removeBookBtn.classList.add('remove-book-button');
        // bookCard.appendChild(removeBookBtn);
        bookActionsDiv.appendChild(removeBookBtn);
        removeBookBtn.onclick = function() {
            removeBook(book.index);
        };

        
    });
}

function changeBookRead(index) {
    myLibrary[index].read = !myLibrary[index].read;

    displayLibrary();
    console.log(myLibrary);
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    for (let i = index; i < myLibrary.length; i++) {
        myLibrary[i].index -= 1;
    }
    displayLibrary();
    console.log(myLibrary);
}



displayLibrary();
console.log(myLibrary);

// if button clicked show form
newBookButton.onclick = showForm;
showingForm = false;

newBookForm.style.display = "none";

function showForm() {
    if (showingForm) {
        showingForm = false;
        newBookForm.style.display = "none";
    } else {
        showingForm = true;
        newBookForm.style.display = "flex";    
    }
    
}