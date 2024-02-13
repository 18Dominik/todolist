async function fetchTodos() {
    const response = await fetch('https://3000-18dominik-todolist-8vzmwfch90l.ws-eu108.gitpod.io/todolist'); //localhost is gitpod-url
    const todos = await response.json();
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = ''; // Clear current todos
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;
      listElement.appendChild(li);
    });
    console.log('Success to fetch todo:')
  }
  
  async function addTodo() {
    try{
    const inputElement = document.getElementById('todo-input');
    const task = inputElement.value;
    await fetch('https://3000-18dominik-todolist-8vzmwfch90l.ws-eu108.gitpod.io/todolist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ task }),
    });
    inputElement.value = ''; // Clear input
    fetchTodos(); // Refresh the list
    console.log('Success to add todo:');
  } catch (error) { // Added 'error' parameter
    console.error('Failed to add todo:', error);
  }
}  


  fetchTodos();
  