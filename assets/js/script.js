
// VARIABLES /////////////////////////////////////////////////

var input = document.querySelector('input');
var button = document.querySelector('button');
var booksList = document.getElementById('display-book-list');
var isbnData = document.getElementById('print-isbn');

var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'


///  CREATING AND GRABBING HTML ELEMENTS AND LINKING THEM TO VARIABLES ////////////////////////////////////

var createBookList = function (book, openLibraryInfo) {
    var li = document.createElement('li');
    var div = document.createElement('div');
    var singleBookRow = document.createElement('div');
    var bookTitle = document.createElement('h2');
    var bookAuthors = document.createElement('h3');
    var bookDescription = document.createElement('p');
    var bookThumbnail = document.createElement('img');
    var isbnData = document.createElement('p');

    // Creates button and sets text
    var availableBtn = document.createElement('button');
    availableBtn.innerText = 'Check Availability';


    // Styles the button as its generated
    availableBtn.style.backgroundColor = '#4CAF50';
    availableBtn.style.color = 'white';
    availableBtn.style.padding = '10px';
    availableBtn.style.border = 'none';
    availableBtn.style.borderRadius = '5px';
    availableBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';






    // Creates variable and element, adds text content and determines wether the book is available or not
    var openLibraryAvailability = document.createElement('p');
    // This checks that the there is information returned from the API on the book that is searched. Using an if/else statement.
    if (openLibraryInfo.length > 0) {
        openLibraryAvailability.textContent = "Available on Open Library";
    } else {
        openLibraryAvailability.textContent = "Not available on Open Library";
    }

    div.appendChild(openLibraryAvailability);

    /// INSERTING THE FETCHED BOOK DATA (e.g. title, author) and putting that info into the variables, which goes into the linked the HTML document

    bookTitle.textContent = book.volumeInfo.title;
    bookAuthors.textContent = book.volumeInfo.authors;
    bookDescription.textContent = book.volumeInfo.description ? book.volumeInfo.description : " Description unavailable";
    bookThumbnail.src = book.volumeInfo.imageLinks ?
        book.volumeInfo.imageLinks.thumbnail :

        isbnData.textContent = `ISBN: ${book.volumeInfo.industryIdentifiers[0].identifier}`;
    console.log(isbnData.textContent);


    ///// below attaches the result data (book title, author, description, img) to the created div 
    // and list html elements          
    div.appendChild(bookTitle);
    div.appendChild(bookAuthors);
    div.appendChild(bookDescription);
    singleBookRow.appendChild(bookThumbnail);
    singleBookRow.appendChild(div);
    li.appendChild(singleBookRow);

    div.appendChild(availableBtn);
    div.appendChild(isbnData);


    li.classList.add('list-group-item');
    singleBookRow.classList.add('row');
    div.classList.add('columns-large-4');
    bookThumbnail.classList.add('columns-small-3', 'rwd');
    booksList.appendChild(li);


  


    // Event Listener on 'Check Availability' btn
    availableBtn.addEventListener('click', function () {



        searchOpenLibrary(bookTitle, isbnData);
        console.log(bookTitle)
        console.log(isbnData);

    });


}

// FETCH REQUEST FOR BOOK INFORMATION /////////////////////////////////////////////////

var fetchRequest = function () {
    if (input.value.length === 0) {
        alert('Please enter a search term');
    } else {
        booksList.innerHTML = "";
        var searchBook = input.value;
        var searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=${googleKey}&printType=books`;

        fetch(searchURL)
            .then(function (response) {
                return response.json();
            })
            .then(function (response2) {
                response2.items.map(function (book) {
                    searchOpenLibrary(book.volumeInfo.title)
                        .then(openLibraryInfo => {
                            createBookList(book, openLibraryInfo);
                            console.log(book); // logs to console 
                        });
                });
            })
            .catch(function () {
                console.log(`There was an error`);
                // Handle error
            });
    }
}


button.addEventListener("click", function () {
    fetchRequest();
});

/// SEARCH HISTORY / LOCAL STORAGE //////////////////////////////////////////////////////


// Sets the book search term in localStorage
var bookName = localStorage.getItem('searchBookStore');

// Sets the input value in localStorage
function recordBookData() {
    localStorage.setItem('searchBookStore', input.value);
}

// Appends the search input from localStorage to the book list
for (var i = 0; i < localStorage.length; i++) {
    $(".saved-books").append("<p>" + localStorage.getItem(localStorage.key(i)) + "</p>");
}

button.addEventListener("click", recordBookData, function () {
    fetchRequest();
});


///////////////////////////////////////////////////////////////////////////////////////////


// Open Library Api  & Fetch request - revised
function searchOpenLibrary(bookTitle, isbnData) {
    // The URI component takes in a string and returns a new string so that it can be included in the URL
     var openLibraryTitle = `http://openlibrary.org/search.json?q=${bookTitle}`;
  //  var openLibraryIsbn = `https://openlibrary.org/isbn.json?q=${isbnData}`;
  //  console.log(openLibraryIsbn)
    return fetch(openLibraryTitle)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            return data.docs
        })

        .catch(function (error) {

            console.error('Error fetching data from Open Library:', error);
            return [];
        });

}

var result = searchOpenLibrary();
console.log(result);

