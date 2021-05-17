const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const inputForm = document.getElementById('survey-form');
const container = document.getElementById('container');

let myLibrary = [];

if (localStorage.getItem('books') === null) {
	myLibrary = [];
} else {
	const booksFromStorage = JSON.parse(localStorage.getItem('books'));
	myLibrary = booksFromStorage;
}

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
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

function deleteCard(event) {
	const button = event.target;
	const libraryIndex = button.parentElement.parentElement.dataset.index;
	myLibrary.splice(libraryIndex, 1);
	constructCard();
}

function constructCard() {
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
	localStorage.setItem('books', JSON.stringify(myLibrary));
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
	inputForm.reset();
});

constructCard();

/* 



*/
