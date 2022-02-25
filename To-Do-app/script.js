// UI variables

const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// load items
loadItems();

eventListeners();

function eventListeners() {
    // submit task
    form.addEventListener('submit', addNewItem)

    // delete an item
    taskList.addEventListener('click', deleteItem)

    // delete all items
    btnDeleteAll.addEventListener('click', deleteAllItems)
}

function loadItems() {

    item = getItemsFromLocal();

    items.forEach(function (item) {
        createItem(item);
    })
}

// get items from local storage
function getItemsFromLocal() {
    if (localStorage.getItem('items') === null) {
        items = [];
    } else {
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// set item to local storage
function setItemToLocal(text) {
    items = getItemsFromLocal();
    items.push(text);
    localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromLocal(text) {
    items = getItemsFromLocal();
    items.forEach(function (item, index) {
        if (item === text) {
            items.splice(index, 1);
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}

function createItem(text) {
    // create li
    const li = document.createElement('li')
    li.className = 'list-group-item list-group-item-secondary'
    li.appendChild(document.createTextNode(text))

    // create a
    const a = document.createElement('a')
    a.classList = 'delete-item float-end'
    a.setAttribute('href', '#')
    a.innerHTML = '<i class="fas fa-times"></i>'

    // add a to li
    li.appendChild(a)

    // add li to ul
    taskList.appendChild(li)
}

function addNewItem(e) {
    if (input.value === '') {
        alert('Add New Item!')
    }

    //create item
    createItem(input.value);

    // save to local storage
    setItemToLocal(input.value);

    //clear input field
    input.value = ''

    e.preventDefault()
}

function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        // console.log(e.target)
        e.target.parentElement.parentElement.remove()

        // delete item from local storage
        deleteItemFromLocal(e.target.parentElement.parentElement.textContent);
    }
    e.preventDefault
}

function deleteAllItems(e) {
    // taskList.innerHTML=''
    // console.log(taskList.childNodes)
    if (confirm('Are you sure?')) {
        for (let i = 0; i < taskList.children.length; i) {
            if (taskList.children[i].nodeType === 1) {
                taskList.children[i].remove();
            }
        }
        localStorage.clear();
    };
    e.preventDefault();
}