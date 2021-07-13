//add item controls
const addItemsAction = document.querySelector('.addItems-action');
const input = document.querySelector('.addItems-input');
const submit = document.querySelector('.addItems-submit');

//display items controls
const list = document.querySelector('.grocery-list');
const displayItemsAction = document.querySelector('.displayItems-action');
const clear = document.querySelector('.displayItems-clear');

//When page is fully loaded, check for localStorage, iterate over it and add to list of grocery items
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('groceryList')) {
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(createItem);
    }
});
//remove all items from the grocery list
clear.addEventListener('click', () => {
    //first, delete from localStorage
    localStorage.removeItem('groceryList');
    list.innerHTML = '';
    showAction(displayItemsAction, 'All items deleted');
});
//remove single item
list.addEventListener('click', e => {
    e.preventDefault();
    let link = e.target.parentElement;
    if (link.classList.contains('grocery-item__link')) { //making sure we clicked at the right spot!
        let text = link.previousElementSibling.textContent;
        let groceryItem = e.target.parentElement.parentElement;

        list.removeChild(groceryItem);
        showAction(displayItemsAction, `${ text } removed.`, true);

        //delete from localStorage
        let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
        let index = groceryItems.indexOf(text);
        groceryItems.splice(index, 1);
        localStorage.setItem('groceryList', JSON.stringify(groceryItems));
    }

});




//add an item
submit.addEventListener('click', e => {
    e.preventDefault();
    let value = input.value;
    if (value == '')
        showAction(addItemsAction, 'Please add grocery item', false);
    else {
        showAction(addItemsAction, `${ value } added`, true);
        createItem(value);
        updateStorage(value);
    }
});

function createItem(item) {

    let parent = document.createElement('div');
    parent.classList.add('grocery-item');
    parent.innerHTML = `<h4 class="grocery-item__title">${ item }</h4>
            <a href="#" class="grocery-item__link">
                <i class="far fa-trash-alt"></i>
            </a>`;
    list.appendChild(parent);
}

function updateStorage(item) {
    let groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')) : [];

    groceryList.push(item);
    localStorage.setItem('groceryList', JSON.stringify(groceryList));
}

function showAction(element, text, value) {
    if (value == true) {
        element.classList.add('success');
        element.innerText = text;
        input.value = '';
        setTimeout(() => element.classList.remove('success'), 3000)
    }
    else {
        element.classList.add('alert');
        element.innerText = text;
        input.value = '';
        setTimeout(function () {
            element.classList.remove('alert');
        }, 3000)
    }
}


