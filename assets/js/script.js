
// VARIABLES /////////////////////////////////////////////////

var input = document.querySelector('input');
var button = document.querySelector('button');
var booksList = document.getElementById('display-book-list');

var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'



///  CREATING AND GRABBING HTML ELEMENTS AND LINKING THEM TO VARIABLES ////////////////////////////////////

var createBookList = function(book) {        
var li = document.createElement('li');        
var div = document.createElement('div');
var singleBookRow = document.createElement('div');        
var bookTitle = document.createElement('h2');
var bookAuthors = document.createElement('h3');
var bookDescription = document.createElement('p');
var bookThumbnail = document.createElement('img');      

/// INSERTING THE FETCHED BOOK DATA (e.g. title, author) and putting that info into the variables, which goes into the linked the HTML document

      bookTitle.textContent = book.volumeInfo.title;
      bookAuthors.textContent = book.volumeInfo.authors;
      bookDescription.textContent = book.volumeInfo.description ? book.volumeInfo.description: " Description unavailable";
      bookThumbnail.src = book.volumeInfo.imageLinks ? 
      book.volumeInfo.imageLinks.thumbnail : 
      

 ///// below attaches the result data (book title, author, description, img) to the created div 
 // and list html elements          
      div.appendChild(bookTitle);
      div.appendChild(bookAuthors);
      div.appendChild(bookDescription);
      singleBookRow.appendChild(bookThumbnail);
      singleBookRow.appendChild(div);
      li.appendChild(singleBookRow);

      li.classList.add('list-group-item');
      singleBookRow.classList.add('row');
      div.classList.add('columns-large-4');
      bookThumbnail.classList.add('columns-small-3', 'rwd');
          
      booksList.appendChild(li);
  }

// FETCH REQUEST FOR BOOK INFORMATION /////////////////////////////////////////////////

var fetchRequest = function() {
      if(input.value.length === 0) {
  /////////// alert if user tries to search without entering a search word, i.e. text area is empty
          alert('Please enter a search term');
////////////////////////////////                                          ////////////////////////////////
//////////////////   above is an alert and needs to be changed to a modal somehow  ////////////////////////////////
////////////////////////////////                                         ////////////////////////////////
      } else {
          booksList.innerHTML = "";
          var searchBook = input.value;
          var searchURL = `https://www.googleapis.com/books/v1/volumes?q=${searchBook}&key=${googleKey}&printType=books`; 
          
          fetch(searchURL)
          .then(function(response) {
              return response.json();
          })
          .then(function(response2) {
              return response2.items.map(function(book) {
                createBookList(book)
              })   

            })  
          .catch( function()  {
              console.log(`There was an error`);       
              //////// possibly insert an error message for user here using modals  ////////////////////////////////
          }); 
      }                 
    
  }

  button.addEventListener("click", function() {
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

  button.addEventListener("click", recordBookData, function() {
    fetchRequest();
  });


///////////////////////////////////////////////////////////////////////////////////////////

