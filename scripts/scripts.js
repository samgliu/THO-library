let myLibrary = [];
let book1 = new Book("The Time Traveler's Wife", "Audrey Niffenegger", 424, true);

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(newBook, index) {
    let conDiv = document.getElementById('bookscontainer');
    let tempDiv = document.createElement("div");
    tempDiv.setAttribute("class", "books");
    tempDiv.setAttribute("id", "book-" + index);
    tempDiv.innerHTML = '<p>Title: ' + newBook.title + '</p><p>Author: ' + newBook.author 
                        + '</p><p>Pages: ' + newBook.pages + '</p><p>'
                        + ((newBook.isRead) ? "Read" : "NotRead") + '</p>';
    let rbtn = document.createElement("BUTTON");
    rbtn.innerHTML = "Change";
    rbtn.setAttribute("id", index);
    rbtn.setAttribute('onclick','changeRead(this.id)');
    let dbtn = document.createElement("BUTTON");
    dbtn.setAttribute('class','cancel');
    dbtn.setAttribute("id", index);
    dbtn.setAttribute('onclick','deleteDiv(this.id)');
    dbtn.innerHTML = "Remove";
    tempDiv.appendChild(rbtn);
    tempDiv.appendChild(dbtn);
    conDiv.appendChild(tempDiv);
}

function addBook(){
    let tempbook = new Book(document.getElementById("Title").value, 
                            document.getElementById("author").value, 
                            document.getElementById("pages").value,
                            document.getElementById("isRead").checked);
    myLibrary.push(tempbook);
    addBookToLibrary(tempbook, myLibrary.length);
    updateDom(); 
}

function updateDom(){
    let conDiv = document.getElementById('bookscontainer');
    conDiv.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++){
        addBookToLibrary(myLibrary[i], i);
    }
    if (storageAvailable){
        saveBooks();
    }
    
}

function idToIndex(bookid){
    return parseInt(bookid.substring(6));
}

function deleteDiv(bookid){
    let index = parseInt(bookid);
    myLibrary.splice(index, 1);
    updateDom();
}

function changeRead(bookid){
    let index = parseInt(bookid);
    myLibrary[index].isRead = (myLibrary[index].isRead) ? false : true;
    updateDom();
}

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

function saveBooks(){
    if (myLibrary.length > 0){
        clearLocal();
    }
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

function clearLocal(){
    localStorage.removeItem('myLibrary');
}

function getBooks(){
    if (storageAvailable){
        const myArrayFromLocalStorage = localStorage.getItem('myLibrary');
        if (myArrayFromLocalStorage && myArrayFromLocalStorage.length) {
            myLibrary = JSON.parse(myArrayFromLocalStorage);
        }
        updateDom();
    }
    
}