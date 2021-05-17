const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const inputForm = document.getElementById('survey-form');
const container = document.getElementById('container');

// the array to save books
let myLibrary = [];

// checks for localstorage called "books" on local machine
// if found, populates array; if not found, creates localstorage
if (localStorage.getItem('books') === null) {
	myLibrary = [];
} else {
	const booksFromStorage = JSON.parse(localStorage.getItem('books'));
	myLibrary = booksFromStorage;
}

// constructor function
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// changes the read/not-read button upon click
// event is brought in from the addEventListener
function toggleRead(event) {
	// event.target selects the parent object
	const button = event.target;
	// find's the button's parent's parent's dataset set with index to alter this in the library
	const libraryIndex = button.parentElement.parentElement.dataset.index;

	// checks the button's class list, index[1] because it's the second class listed for the button
	if (button.classList[1] === 'read') {
		// flip-flops styles and text
		button.classList.remove('read');
		button.classList.add('notRead');
		button.innerText = 'Not Read';
		// switches the read key from the found index
		myLibrary[libraryIndex].read = false;
	} else {
		button.classList.remove('notRead');
		button.classList.add('read');
		button.innerText = 'Read';
		myLibrary[libraryIndex].read = true;
	}
}

// same as the read/not-read button, targets event and target
// but instead uses the index to splice it away
// then invokes constructCard to refresh
function deleteCard(event) {
	const button = event.target;
	const libraryIndex = button.parentElement.parentElement.dataset.index;
	myLibrary.splice(libraryIndex, 1);
	constructCard();
}

// builds the cards and appends them to the page
function constructCard() {
	// invokes to clear page before setting cards
	clearBooks();

	// relists all the books in myLibrary
	myLibrary.forEach((book, index) => {
		const bookCard = document.createElement('div');
		const titleElem = document.createElement('h1');
		const authorElem = document.createElement('h2');
		const pagesElem = document.createElement('h3');
		const buttonDiv = document.createElement('div');
		const readButton = document.createElement('button');
		const deleteButton = document.createElement('button');

		// had to break everything down to allow for more flexibility over plain string-literal expressions that turned out harder to deal with
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

		// if/else reading from the array object to set read/not-read button
		if (book.read === true) {
			readButton.classList.add('read');
			readButton.innerText = 'Read';
		} else {
			readButton.classList.add('notRead');
			readButton.innerText = 'Not Read';
		}
	});
	// localstorage saved here as this constantly updates the library
	localStorage.setItem('books', JSON.stringify(myLibrary));
}

function clearBooks() {
	container.innerHTML = '';
}

// runs through checks before creating new Book and activating the library functionality
function addBookToLibrary(title, author, pages, read) {
	// .some searches through the array for matching title, if matching does nothing
	if (myLibrary.some(book => book.title === title)) return;
	// similar to do nothing if no title is entered
	if (title === '') return;
	// sends info to constructor, pushes to array, then constructs cards
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
	constructCard();
}

// a single addEventListener for the for following submit
inputForm.addEventListener('submit', e => {
	// prevents the page from refreshing on submit
	e.preventDefault();
	addBookToLibrary(title.value, author.value, pages.value, read.checked);
	// resets the form for cleaner new input
	inputForm.reset();
});

//invokes the cards to start with localstorage array
constructCard();
