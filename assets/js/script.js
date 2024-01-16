var searchButton = document.querySelector('#book-call')
var inputSearcher = document.querySelector('#book-search')
var googleKey = 'AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'
var bookName = inputSearcher.value

var requestUrlGoogle = `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&key=${googleKey}`
'https://www.googleapis.com/books/v1/volumes?q=intitle:harry&key=AIzaSyDDK7ZVkv0izkL1bXrc2SrnVlid_RDm9yM'

searchButton.addEventListener('click', function () {

    

    fetch(requestUrlGoogle)
    .then(function (response) {
    return response.json();
    })
    .then(function (data) {
    console.log(data)
    displayTitle(data);
    })

    
})

function displayTitle(data) {
    if (data) {

    } else {
        "No books"
    }
    console.log("Data:", data);

    var bookContainer = $('#display-book-list');

    bookContainer.empty();

    // refer the below line to object fetched from the API
    var mainTitle = data.items[0].volumeInfo.title
    console.log(data.items);
    console.log(data.items[0]);
    console.log(data.items[0].volumeInfo);
    console.log(mainTitle);

    var mainPublisher = $('<li>').text(`Author: ${data.items[0].volumeInfo.publisher}`);

    bookContainer.append(mainTitle, mainPublisher);
}

/////////////////////////////////////////////////////////////////////////////////////////

// Nav functionality

var elem = new Foundation.DropdownMenu(element, options);