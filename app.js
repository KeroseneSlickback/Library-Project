/*

A library app that takes in user input for books including the titles, author, page number, and if read or not.

This app both allows for form input from the user, logs these books, then displays them back on the page. There's a toggle for read/no read on each book. 

The main structure:

- An array of books
- A constructor function that sorts information
- A basic function to take book information, route through the constructor, then push it into the books array

Interaction structure:

- DOM connections from HTML form input upon submit to create new books
- Display back the collected books to the user
  - Each book is given the same style class, but a different style for read or not read
- Delete button, delete function

Later:

- Have the app save this info on local machine


First steps:

- DOM form input to pull information from HTML form
- This input then calls a function to create new Book for info given, then calls pushes this info to myLibrary
- Then this same function pulls that info into a separate function that sorts it into a HTML template that's applied to the webpage

*/

const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const inputForm = document.getElementById('survey-form');
const container = document.getElementById('container');

let myLibrary = [
	{
		title: 'The Hobbit',
		author: 'J.R.R. Tolkien',
		pages: 310,
		read: true,
	},
	{
		title: 'The Second Hobbit',
		author: 'J.R.R. Tolkien',
		pages: 534,
		read: false,
	},
	{
		title: 'The Third Hobbit',
		author: 'J.R.R. Tolkien',
		pages: 211,
		read: true,
	},
];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	// remove function here?
}

function toggleRead(event) {
	const button = event.target;
	const libraryIndex = button.parentElement.parentElement.dataset.index;

	if (button.classList[1] === 'read') {
		button.classList.remove('read');
		button.classList.add('notRead');
		button.innerText = 'Not Read';
		myLibrary[libraryIndex].read = false;
	} else {
		button.classList.remove('notRead');
		button.classList.add('read');
		button.innerText = 'Read';
		myLibrary[libraryIndex].read = true;
	}
}

function deleteCard() {
	console.log('Delete?');
}

function constructCard(book) {
	clearBooks();

	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement('div');
		const titleElem = document.createElement('h1');
		const authorElem = document.createElement('h2');
		const pagesElem = document.createElement('h3');
		const buttonDiv = document.createElement('div');
		const readButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		bookCard.classList.add('book');
		bookCard.dataset.index = index;
		titleElem.innerText = book.title;
		authorElem.innerText = `by ${book.author}`;
		pagesElem.innerText = `Pages: ${book.pages}`;
		buttonDiv.classList.add('buttons');
		readButton.innerText = 'Read';
		readButton.classList.add('readButton');
		readButton.addEventListener('click', toggleRead);
		deleteButton.innerText = 'Delete';
		deleteButton.classList.add('deleteButton');
		deleteButton.addEventListener('click', deleteCard);

		bookCard.appendChild(titleElem);
		bookCard.appendChild(authorElem);
		bookCard.appendChild(pagesElem);
		bookCard.appendChild(buttonDiv);
		buttonDiv.appendChild(readButton);
		buttonDiv.appendChild(deleteButton);
		container.appendChild(bookCard);

		if (book.read === true) {
			readButton.classList.add('read');
			readButton.innerText = 'Read';
		} else {
			readButton.classList.add('notRead');
			readButton.innerText = 'Not Read';
		}
	});
}

function clearBooks() {
	container.innerHTML = '';
}

function addBookToLibrary(title, author, pages, read) {
	if (myLibrary.some(book => book.title === title)) return;
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
	constructCard();
}

inputForm.addEventListener('submit', e => {
	e.preventDefault();
	addBookToLibrary(title.value, author.value, pages.value, read.checked);
});

// delete button - addEventListener => search array, delete match of title
// toggle read/not-read - addEventListener => swap classes of current element (but how?)
// local storage wakaranai~~~
