
// VARIABLES /////////////////////////////////////////////////

var input = document.querySelector('input');
var button = document.querySelector('button');
// var checkAvailability = document.querySelector('input[type="button" i]');
var booksList = document.getElementById('display-book-list');    /// Google Books API generates into here


var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'

  // Initialize local storage array of searched books
  var searchBookStore = [];
  

///////////////////////////////////////////////// FETCH (1) TO GOOGLE BOOKS ///////////////////////////////////////////////////

//////////////////////////////////////// FETCH REQUEST (1) FOR BOOK OBJECT DATA BY SEARCH TERM ////////////////////////////////

var fetchRequest = function() {
  /// modal: if the search bar is empty //////////////////////
  if(input.value.length === 0) {
       $(function() {
         modal.style.display = "block";
       });

////////////////////////////////     ////////////////////////////////                                       ////////////////////////////////
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
              //////// possibly insert an error message for user here using modals  ////////////////////////////////
          }); 
      }                  
  }

// (1) ON FETCH 1, HTML ELEMENTS ARE CREATED AND ASSIGNED VARIABLES:

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
    } else {
        openLibraryAvailability.textContent = "Not available on Open Library";
    }

  // (2) VARIABLES ARE FILLED WITH FETCHED GOOGLE DATA:
  // textContent means it will display the data as text
  //            VARIABLE      =       fetched data
        bookTitle.textContent = book.volumeInfo.title;   //    <= title
        bookAuthors.textContent = `Author: ${book.volumeInfo.authors}`;  // <= author
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
     
/// BUTTON: 'Check availability' button creation => making button an event listener => attaching event listener to function (book) call
//        var checkAvailability = document.createElement('input');   
//        checkAvailability.type='button';   
//        checkAvailability.onclick=(book);    
//        div.append(checkAvailability); 

    // Creates button and sets text
 //   var availableBtn = document.createElement('button');
 //   availableBtn.innerText = 'Check Availability';

     // Styles the button as its generated
//     availableBtn.style.backgroundColor = '#4CAF50';
 //    availableBtn.style.color = 'white';
 //    availableBtn.style.padding = '10px';
 //    availableBtn.style.border = 'none';
 //    availableBtn.style.borderRadius = '5px';
  //   availableBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';


        // HR / DIVISION: between each list entry
        
        div.append(separator);  
        
    } // end of createBookList function
                  

        // Event Listener on 'Check Availability' btn
     //   availableBtn.addEventListener('click', function () {
     //   });

    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

button.addEventListener("click", function () {
    fetchRequest();
});





/// SEARCH HISTORY / LOCAL STORAGE //////////////////////////////////////////////////////

// Sets the book search term in localStorage
var bookName = localStorage.getItem('searchBookStore');

// Sets the input value (search bar info) in localStorage
function recordBookData() {
  localStorage.setItem('searchBookStore', input.value);
}

// Appends the search input from localStorage to the book list
for (var i = 0; i < localStorage.length; i++) {
  $(".saved-books").append("<li>" + localStorage.getItem(localStorage.key(i)) + "</li>");
}


// EVENT LISTENERS /////////////////////////////////////////////////////////////////////////////////////////////////////////

// Although there is only one button, there are two event listeners because the 'search' button is performing 2 event listening jobs on a button click:

//                (I tried combining them but it caused the search to stop working)

// (1) this event listener enables the search button to run the function(book) fetch request
button.addEventListener("click", function() {
  fetchRequest();
});


// this event listener is saving the search to local storage
  button.addEventListener("click", recordBookData, function() {
    fetchRequest();
  });


  searchOpenLibrary(bookTitle, isbnData);
  console.log(bookTitle)
  console.log(isbnData);



  // event listener for the check availability buttons
//        button2.addEventListener("click", function() {
  //      fetchRequest2();
//        });
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

