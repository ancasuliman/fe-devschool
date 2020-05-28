export function read() {
  const json = localStorage.getItem('user-data');
  return json === null ? [] : JSON.parse(json);
}

export function remove() {
  localStorage.removeItem('user-data');
}

export function write(userdata) {
  const json = JSON.stringify(userdata);
  localStorage.setItem('user-data', json);
}

export function append(userdata) {
  const todoItems = read();
  todoItems.push(todoItem);
  write(todoItems);
}

// export function remove(todoItem) {
//   const todoItems = read();
//   const index = todoItems.findIndex(element => element.id === todoItem.id);
//   if (index !== -1) {
//     todoItems.splice(index, 1);
//     write(todoItems);
//   }
// }
