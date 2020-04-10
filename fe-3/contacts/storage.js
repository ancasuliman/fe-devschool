export function read() {
    const data = window.localStorage.getItem('ds-contacts');
    return data === null ? [] : JSON.parse(data);
}

function write(contacts) {
    const data = JSON.stringify(contacts);
    window.localStorage.setItem('ds-contacts', data);
}

export function append(contact) {
    const contacts = read();
    contacts.push(contact);
    write(contacts);
}

export function remove(contact) {
    let contacts = read();
    contacts = contacts.filter(function(element) {
        return (element.name !== contact.name) &&
            (element.email !== contact.email) &&
            (element.phone !== contact.phone);
    });
    write(contacts);
}