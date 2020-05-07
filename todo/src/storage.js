export function read() {
  const json = localStorage.getItem('todo-items');
  return json === null ? [] : JSON.parse(json);
}

export function write(todoItems) {
  const json = JSON.stringify(todoItems);
  localStorage.setItem('todo-items', json);
}

export function append(todoItem) {
  const todoItems = read();
  todoItems.push(todoItem);
  write(todoItems);
}

export function remove(todoItem) {
  const todoItems = read();
  const index = todoItems.findIndex(element => element.id === todoItem.id);
  if (index !== -1) {
    todoItems.splice(index, 1);
    write(todoItems);
  }
}
