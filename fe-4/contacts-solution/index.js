import { read, append, remove, replace } from './storage.js';

export function init() {
  document.getElementById('form-add').addEventListener('submit', onSubmitAdd);
  document.getElementById('form-edit').addEventListener('submit', onSubmitDelete);
  document.getElementById('form-edit').addEventListener('change', onChangeDelete);
  // navigator.serviceWorker.register('sw.js');
  render();
}

function onSubmitAdd(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  data.set('id', Date.now());
  const contact = Object.fromEntries(data);
  append(contact);
  render();
}

function onClickEdit(event) {
  event.preventDefault();
  const fieldset = event.target.parentNode;
  const saveButton = fieldset.querySelector('button[name="save-contact"]');
  const cancelButton = fieldset.querySelector('button[name="cancel-contact"]')
  
  event.target.hidden = true;
  saveButton.hidden = false;
  cancelButton.hidden = false;

  fieldset.childNodes.forEach(
    input => input.readOnly = false
  );
}

function onClickSave(event) {
  event.preventDefault();
  const fieldset = event.target.parentNode;
  const contactId = fieldset.getAttribute('name');
  const contactName = fieldset.querySelector('input[name="name"]').value;
  const contactEmail = fieldset.querySelector('input[name="email"]').value;
  const contactPhone = fieldset.querySelector('input[name="phone"]').value;

  const contact = {
    id: contactId,
    name: contactName,
    email: contactEmail,
    phone: contactPhone
  };

  replace(contact);
  render();
}

function onClickCancel(event) {
  event.preventDefault();

  render();
}

function onSubmitDelete(event) {
  event.preventDefault();
  const form = event.target;
  const data = new FormData(form);
  const contacts = read();
  data.getAll('id').forEach(id => {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      remove(contact);
    }
  });
  render();
}

function onChangeDelete(event) {
  const { form } = event.target;
  // const form = event.target.form;
  const data = new FormData(form);
  const hasChecked = data.getAll('id').length > 0;
  form.elements.delete.disabled = !hasChecked;
}

function render() {
  const contacts = read();
  const items = contacts.map(
    contact => `
      <li>
        <fieldset name="${contact.id}">
            <input type="checkbox" name="id" value="${contact.id}">
            <input type="text" name="name" value="${contact.name}" readonly>
            <input type="email" name="email" value="${contact.email}" readonly>
            <input type="tel" name="phone" value="${contact.phone}" readonly>
            <button type="button" name="edit-contact">Edit</button>
            <button type="button" name="save-contact" hidden>Save</button>
            <button type="button" name="cancel-contact" hidden>Cancel</button>
        </fieldset>
      </li>
    `
  );
  document.getElementById('list').innerHTML = items.join('');
  document.getElementById('form-edit').hidden = contacts.length === 0;
  
  let editButtons = document.getElementsByName('edit-contact');
  let saveButtons = document.getElementsByName('save-contact');
  let cancelButtons = document.getElementsByName('cancel-contact');

  if (editButtons) {
    editButtons.forEach(
      editButton => editButton.addEventListener('click', onClickEdit)
    );
  }

  if (saveButtons) {
    saveButtons.forEach(
      saveButton => saveButton.addEventListener('click', onClickSave)
    );
  }
  
  if (cancelButtons) {
    cancelButtons.forEach(
      cancelButton => cancelButton.addEventListener('click', onClickCancel)
    );
  }
}
