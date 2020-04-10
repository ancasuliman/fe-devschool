import { append, read, remove } from './storage.js';

export function init() {
    window.addEventListener('DOMContentLoaded', onLoad);
}

function onLoad() {
    document.getElementById('form-delete').addEventListener('submit', onSubmitDelete);
    document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
    render();
}

function onSubmitAdd(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const contact = Object.fromEntries(fd);

    append(contact);
    render();
    event.target.reset();
}

function onSubmitDelete(event) {
    event.preventDefault();
    
    // identify checked checkboxes
    const checkedBoxes = document.querySelectorAll('input[name=delete]:checked');
    
    // build list of li elements that contain checked checkboxes
    if (checkedBoxes !== []) {
        const listItems = []
        checkedBoxes.forEach(checkbox => listItems.push(checkbox.parentNode));
        // build list of contact objects that need to be deleted
        const contactsToDelete = listItems.map(function(liItem) {
            return {
                name: liItem.querySelector('span[name="name"]').textContent,
                email: liItem.querySelector('span[name="email"]').textContent,
                phone: liItem.querySelector('span[name="email"]').textContent
            }
        })
    
        contactsToDelete.forEach(contact => remove(contact));
        render();
    }
}

function onChangeCheckbox() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    const deleteButton = document.getElementById('buttonDelete');
    deleteButton.disabled = !checkedOne;
}

function render() {
    const contacts = read();
    const list = document.getElementById('list');
    const items = contacts.map(
        (contact, index) => `
        <li>
            <input type="checkbox" name="delete" />
            <span name="name">${contact.name}</span> 
            <span name="email">&lt;${contact.email}&gt;</span>
            <span name="phone">(${contact.phone})</span>
        </li>`
    );
    list.innerHTML = items.join('');

    const formDelete = document.getElementById('form-delete');
    formDelete.hidden = contacts.length === 0;
    
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes) {
        checkboxes.forEach(
            checkbox => checkbox.addEventListener('change', onChangeCheckbox)
        );
    }
}
