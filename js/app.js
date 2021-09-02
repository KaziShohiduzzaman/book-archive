//spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
// website body function 
const togglebodyContent = displayStyle => {
    document.getElementById('website-body').style.display = displayStyle;
}
// onclick function for search button 
const loadBook = () => {
    document.getElementById('error-field').style.display = 'none';
    const searchText = document.getElementById('input-section');
    toggleSpinner('block'); //Show spinner
    togglebodyContent('none') // none body content
    const searchInput = searchText.value;
    // input text empty value error handler
    if (searchInput === '') {
        alert('PLEASE TYPE A BOOK NAME');
        toggleSpinner('none') //none spinner

    }
    else {
        searchText.value = '';
        const url = `https://openlibrary.org/search.json?q=${searchInput}`; //search api link 
        fetch(url)
            .then(res => res.json())
            .then(data => displayBookData(data))
    }

}

// display all data function 
const displayBookData = info => {
    const bookDetails = document.getElementById('book-data');
    // search result found section 
    const foundId = document.getElementById('found-id');
    foundId.textContent = '';
    bookDetails.textContent = '';
    const divfound = document.createElement('div');
    divfound.innerHTML = `
    <p class="text-center">Search result found: ${info.numFound}</p>
    `
    foundId.appendChild(divfound);
    const bookList = info.docs;
    /* Details show section */
    const books = bookList.slice(0, 21) //for display on 21 card if search
    if (info.numFound === 0) {   //for error handling
        document.getElementById('error-field').style.display = 'block';
        toggleSpinner('none')  //none spinner
    }
    else {
        books.forEach(book => {
            const newDiv = document.createElement('div');
            newDiv.innerHTML = `
            <div class="col">
                <div class="card">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top img-fluid img-size" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${book.title ? book.title : 'No name found'}</h5>
                        <p class="card-text">Author Name: ${book.author_name ? book.author_name : 'No author Name found'}</p>
                        <p class="card-text">First Published: ${book.first_publish_year ? book.first_publish_year : 'No date found'}</p>
                    </div>
                </div>
            </div>
            `
            bookDetails.appendChild(newDiv);
        });
        toggleSpinner('none') //none spinner
        togglebodyContent('block') //show body content
    }
}

