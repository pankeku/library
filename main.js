const input = document.querySelector('#book');
const content = document.querySelector('.content');
const button = document.querySelector('.book-add');
const form = document.querySelector('#book-form');
const checkbox = document.querySelector('#read');
const overlay = document.querySelector('.overlay');
const headerCounter = document.querySelector('.header-counter');

let library = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.getRead = function () {
  return this.read;
};

Book.prototype.toggleRead = function () {
  this.read === true ? (this.read = false) : (this.read = true);

  return this.read;
};

initialBooks();

function initialBooks() {
  library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, true));
  library.push(new Book('Lapvona', 'Ottessa Moshfegh', 313, false));
  library.push(new Book('Frontier', 'Can Xue', 361, false));

  displayBooks();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  addBookToLibrary(
    new Book(
      form.title.value,
      form.author.value,
      form.pages.value,
      checkbox.checked
    )
  );
  form.classList.remove('form--show');
  overlay.classList.remove('overlay--active');
  clearForm();
});

function displayBooks() {
  while (content.firstChild) {
    content.firstChild.remove();
  }

  createBookCards();
  createAddCard();
  updateCounter();
}

function createBookCards() {
  for (book of library) {
    const bookCard = document.createElement('div');
    const title = document.createElement('div');
    const author = document.createElement('div');
    const pages = document.createElement('div');
    const status = document.createElement('button');
    const remove = document.createElement('input');

    bookCard.classList.add('card');
    content.appendChild(bookCard);

    title.classList.add('title');
    title.textContent = book.title;
    title.id = 'title';
    author.classList.add('author');
    author.textContent = book.author;
    pages.classList.add('pages');
    pages.textContent = book.pages;

    status.classList.add('toggle-read');
    status.classList.add('status');
    remove.classList.add('delete');
    remove.setAttribute('type', 'image');
    remove.setAttribute('src', 'images/delete.png');
    remove.textContent = 'Delete';

    bookCard.append(title, author, pages, status, remove);

    wrapper(title);
    wrapper(author);
    wrapper(pages);

    buttonState(status);

    status.addEventListener('click', function () {
      toggleStatusAndButton(status);
    });

    remove.addEventListener('click', function () {
      removeBook(bookCard);
    });
  }
}

function wrapper(element) {
  const label = document.createElement('label');
  label.textContent =
    element.className[0].toUpperCase() + element.className.substring(1);
  element.parentElement.append(label);
  label.append(element);
}

function createAddCard() {
  const add = document.createElement('button');

  add.classList.add('card');
  add.classList.add('add');
  add.textContent = '+';
  content.appendChild(add);

  add.addEventListener('click', function (e) {
    form.classList.add('form--show');
    overlay.classList.add('overlay--active');
  });
}

function toggleStatusAndButton(item) {
  const card = item.parentElement;
  const book = library[card.getAttribute('data-number')];

  book.toggleRead();
  buttonState(item);
}

function buttonState(item) {
  updateDataNumbers();

  const card = item.parentElement;
  const book = library[card.getAttribute('data-number')];
  const bookStatus = book.getRead();

  console.log(book.title + ' ' + bookStatus);

  if (bookStatus === true) {
    item.classList.add('toggle-read--active');
    item.textContent = 'Read';
  }

  if (bookStatus === false) {
    item.classList.remove('toggle-read--active');
    item.textContent = 'Mark as read';
  }
}

function removeBook(item) {
  const index = item.getAttribute('data-number');
  library.splice(index, 1);
  item.remove();
  updateDataNumbers();
  updateCounter();
}

function updateDataNumbers() {
  let index = 0;
  content.childNodes.forEach(function (card) {
    card.setAttribute('data-number', index);
    index++;
  });
}

function addBookToLibrary(book) {
  library.push(book);
  displayBooks();
}

overlay.addEventListener('click', () => {
  form.classList.remove('form--show');
  overlay.classList.remove('overlay--active');
  clearForm();
});

function clearForm() {
  form.title.value = '';
  form.author.value = '';
  form.pages.value = '';
  checkbox.checked = false;
}

function updateCounter() {
  headerCounter.textContent = `LIBRARY OF ${library.length} ${
    library.length === 1 ? 'BOOK' : 'BOOKS'
  }`;
}
