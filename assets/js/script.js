
// VARIABLES 

var input = document.querySelector('input');
var button = document.querySelector('#button');
// var checkAvailability = document.querySelector('input[type="button" i]');
var booksList = document.getElementById('display-book-list');    /// Google Books API generates into here
// variable is of local storage in either state; containing history, or empty:
var searchHistory = JSON.parse(localStorage.getItem(i)) || [];
var searchHist = document.querySelector(".saved-books");

var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'


//-------------------------------------------------------- FETCH (1) TO GOOGLE BOOKS ---------------------------------------------------

//-------------------------------------- FETCH REQUEST (1) FOR BOOK OBJECT DATA BY SEARCH TERM -----------------------------------------

var fetchRequest = function() {
  //--- modal: if the search bar is empty ----
  if(input.value.length === 0) {
       $(function() {
         modal.style.display = "block";
       });
//---

      } else {
          booksList.innerHTML = "";
          var searchBook = input.value;
          var searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=${googleKey}&printType=books`; 
          
          fetch(searchURL)
          .then(function(response) {
              return response.json();
          })
          .then(function(data) {
              return data.items.map(function(book) {
                createBookList(book)
              })   

            })  
          .catch( function()  {
              console.log(`There was an error`);       
              
          }); 
      }                  
  }

// (1) ON FETCH 1, HTML ELEMENTS ARE CREATED AND ASSIGNED VARIABLES -------------------------------------------

var createBookList = function (book, openLibraryInfo) { 
//  VARIABLE =      created HTML element 
      var li = document.createElement('li');        
      var div = document.createElement('div');
      var singleBookRow = document.createElement('div');        
      var bookTitle = document.createElement('h2');
      var bookAuthors = document.createElement('h3');
      var bookDescription = document.createElement('p');
      var bookThumbnail = document.createElement('img');  
      var separator = document.createElement('hr');   

          // Creates variable and element, adds text content and determines wether the book is available or not
    var isbnData = document.createElement('p');
    var openLibraryAvailability = document.createElement('p');

    openLibraryAvailability.textContent = openLibraryInfo;

    // This checks that the there is information returned from the API on the book that is searched. Using an if/else statement.
    if (openLibraryInfo.length > 0) {
        openLibraryAvailability.textContent = "Available on Open Library";
        openLibraryAvailability.style.color = "green";
        openLibraryAvailability.style.fontSize = "x-large";
    } else {
        openLibraryAvailability.textContent = "Not available on Open Library";
        openLibraryAvailability.style.color = "red";
        openLibraryAvailability.style.fontSize = "x-large";
    }

  // (2) VARIABLES ARE FILLED WITH FETCHED GOOGLE DATA:
  // textContent means it will display the data as text
  //            VARIABLE      =       fetched data
        bookTitle.textContent = book.volumeInfo.title;   //    <= title
        bookAuthors.textContent = book.volumeInfo.authors;  // <= author
        bookDescription.textContent = book.volumeInfo.description ? book.volumeInfo.description: " Description unavailable";    // <= book summary/description
        bookThumbnail.src = book.volumeInfo.imageLinks ?    // <= thumbnail
        book.volumeInfo.imageLinks.thumbnail : // <= placeholder thumbnail if there is no book image, currently blank
  
        isbnData.textContent = `ISBN: ${book.volumeInfo.industryIdentifiers[0].identifier}`;
    console.log(isbnData.textContent);


  // (3) FETCH 1 DATA IS PUT INTO THE CREATED HTML ELEMENTS IN SEPARATE SECTIONS
        div.appendChild(bookTitle);
        div.appendChild(bookAuthors);
        div.appendChild(bookDescription);
        singleBookRow.appendChild(bookThumbnail);
        singleBookRow.appendChild(div);
        li.appendChild(singleBookRow);

        div.appendChild(openLibraryAvailability);
        div.appendChild(isbnData);

      
        // attaching created HTML elements to pre-made HTML area in the document
        li.classList.add('list-group-item');
        singleBookRow.classList.add('row');
        div.classList.add('columns-large-4');
        bookThumbnail.classList.add('columns-small-3', 'rwd');
        separator.classList.add('separator');
        booksList.appendChild(li);
        
        div.append(separator); 
        

    } // end of createBookList function
                  

    
//---------------------------------------------------------------------------------------

// FETCH REQUEST FOR BOOK INFORMATION 

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
                    searchOpenLibrary(book.volumeInfo.title, book.volumeInfo.industryIdentifiers[0].identifier)
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


//-------------------------------- SEARCH HISTORY / LOCAL STORAGE ------------------------------------------------------------------

// puts the book search term in localStorage

// puts the input value (search bar info) in localStorage
function recordBookData() {
  localStorage.setItem('searchBookStore', JSON.stringify(input.value));
  //add to list on html
  $(".saved-books").append("<li>"+ input.value + "</li>");
}

// Appends the search input from localStorage to the book list
for (var i = 0; i < localStorage.length; i++) {
  $(".saved-books").append("<li>" + localStorage.getItem(localStorage.key(i)) + "</li>");
}

// delete history
// function to delete search history for delete search button

function deleteSearchHistory() {
  searchHist.innerHTML = "";
}







// EVENT LISTENERS --------------------------------------------------------------------------------

// (1) to run fetch request
// (2) to save to local storage
// (3) run modal (if no search terms)
// (4) delete search history button
 
button.addEventListener("click", function () {
  fetchRequest();
});

button.addEventListener("click", function() {
  preventDefault();
  fetchRequest();
});

// this event listener is saving the search to local storage
  button.addEventListener("click", recordBookData, function() {
    fetchRequest();
  });

  // delete button click handler
document.getElementById('delete').addEventListener("click", function () {
  ((i)) = [];
   localStorage.clear();
   deleteSearchHistory();
 
 });

  searchOpenLibrary(bookTitle, isbnData);
  console.log(bookTitle)
  console.log(isbnData);


//-------------------------------------------------------------------------------------------

// Open Library Api  & Fetch request - revised


function searchOpenLibrary(bookTitle, isbnData) {
  // The URL component takes in a string and returns a new string so that it can be included in the URL
   var openLibraryTitle = `http://openlibrary.org/search.json?q=${bookTitle}`;

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

