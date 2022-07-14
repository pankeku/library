const input = document.querySelector('#book');
const content = document.querySelector('.content');
const button = document.querySelector('.book-add');
const form = document.querySelector('#book-form');
const checkbox = document.querySelector('#read');
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
  this.read === 'has read' ? (this.read = 'to read') : (this.read = 'has read');

  return this.read;
};

initialBooks();

function initialBooks() {
  library.push(new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'has read'));
  library.push(new Book('Lapvona', 'Ottessa Moshfegh', 313, 'to read'));
  library.push(new Book('Frontier', 'Can Xue', 361, 'to read'));

  displayBooks();
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addBookToLibrary(
    new Book(
      form.title.value,
      form.author.value,
      form.pages.value,
      checkbox.checked === true ? 'has read' : 'to read'
    )
  );
});

function displayBooks() {
  while (content.firstChild) {
    content.firstChild.remove();
  }
  createBookCards();
}

function createBookCards() {
  for (book of library) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('card');
    content.appendChild(bookCard);

    createBookCardContent().forEach((item) => {
      bookCard.append(item);
    });

    createCardButtons().forEach((item) => {
      bookCard.append(item);

      buttonState(item);
    });
  }

  updateDataNumbers();
}

function createBookCardContent() {
  const info = {
    title: 'title',
    author: 'author',
    pages: 'pages',
    read: 'read',
  };

  let array = [];

  for (item in info) {
    const element = document.createElement('div');
    element.classList.add(item);
    element.textContent = book[item];
    array.push(element);
  }

  return array;
}

function createCardButtons() {
  let buttons = [
    { class: 'toggle-read', text: 'Mark as read' },
    { class: 'delete', text: 'Delete' },
  ];

  let array = [];

  for (let i = 0; i < buttons.length; i++) {
    const element = document.createElement('button');
    element.classList.add(buttons[i].class);
    element.textContent = buttons[i].text;

    array.push(element);
  }

  addEventListeners(array);

  return array;
}

function addEventListeners(array) {
  array.forEach((item) => {
    item.addEventListener('click', function () {
      if (item.classList[0] === 'toggle-read') {

        const card = item.parentElement;
        const book = library[card.getAttribute('data-number')];

        book.toggleRead();

        buttonState(item);
      }

      if (item.className === 'delete') {
        removeBook(item);
      }
    });
  });
}

function buttonState(item) {
  updateDataNumbers();

  if (item.classList[0] !== 'toggle-read') {
    return;
  }

  const card = item.parentElement;
  const book = library[card.getAttribute('data-number')];

  console.log(book);

  const status = book.getRead();

  console.log(book);

  if (status === 'has read') {
    item.classList.add('toggle-read--active');
    item.textContent = 'Read';
  }

  if (status === 'to read') {
    item.classList.remove('toggle-read--active');
    item.textContent = 'Mark as read';
  }
}

function removeBook(item) {
  const index = item.parentElement.getAttribute('data-number');
  library.splice(index, 1);

  item.parentElement.remove();

  updateDataNumbers();
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
