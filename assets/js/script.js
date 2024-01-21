
// VARIABLES /////////////////////////////////////////////////

var input = document.querySelector('input');
var button = document.querySelector('button');
var booksList = document.getElementById('display-book-list');

var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'


// FETCH REQUEST FOR BOOK INFORMATION /////////////////////////////////////////////////

var fetchRequest = function() {
  /// pulls modal up if the search bar is empty 
  if(input.value.length === 0) {
    ////// 
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


// (1) ON FETCH, HTML ELEMENTS ARE CREATED AND ASSIGNED VARIABLES:

var createBookList = function(book) {   
//  VARIABLE =      created HTML element 
      var li = document.createElement('li');        
      var div = document.createElement('div');
      var singleBookRow = document.createElement('div');        
      var bookTitle = document.createElement('h2');
      var bookAuthors = document.createElement('h3');
      var bookDescription = document.createElement('p');
      var bookThumbnail = document.createElement('img');    

  // (2) VARIABLES ARE FILLED WITH FETCHED GOOGLE DATA:
  // textContent means it will display the data as text
  //            VARIABLE      =       fetched data
        bookTitle.textContent = book.volumeInfo.title;   //    <= title
        bookAuthors.textContent = book.volumeInfo.authors;  // <= author
        bookDescription.textContent = book.volumeInfo.description ? book.volumeInfo.description: " Description unavailable";    // <= book summary/description
        bookThumbnail.src = book.volumeInfo.imageLinks ?    // <= thumbnail
        book.volumeInfo.imageLinks.thumbnail : // <= placeholder thumbnail if there is no book image, currently blank
        

  // (3) FETCH DATA IS PUT INTO THE CREATED HTML ELEMENTS IN SEPARATE SECTIONS
        div.appendChild(bookTitle);
        div.appendChild(bookAuthors);
        div.appendChild(bookDescription);
        singleBookRow.appendChild(bookThumbnail);
        singleBookRow.appendChild(div);
        li.appendChild(singleBookRow);
        booksList.appendChild(li);
  
        // attaching created HTML elements to pre-made HTML area in the document
        li.classList.add('list-group-item');
        singleBookRow.classList.add('row');
        div.classList.add('columns-large-4');
        bookThumbnail.classList.add('columns-small-3', 'rwd');
     
        /// BUTTON: 'Check availability' button creation => making button an event listener => attaching event listener to function (book) call
        var checkAvailability = document.createElement('input');   
        checkAvailability.type='button';   
        checkAvailability.onclick=(book);    
        div.append(checkAvailability);     
        
    } // end of createBookList function
                  
    
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


///////////////////////////////////////////////////////////////////////////////////////////

