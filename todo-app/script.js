async function fetchTodos() {
    const response = await fetch('./todolist'); //localhost is gitpod-url
    const todos = await response.json();
    const listElement = document.getElementById('todo-list');
    listElement.innerHTML = ''; // Clear current todos
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo.task;
      listElement.appendChild(li);

              // Create a delete button for each todo
              const deleteBtn = document.createElement('button');
              deleteBtn.textContent = 'X'; // Text for the delete button
              deleteBtn.onclick = function() { deleteTodo(todo._id); }; // Assuming each todo has a unique ID
      
              // Append the delete button to each todo item
              li.appendChild(deleteBtn);
              listElement.appendChild(li);
    });
    console.log('Success to fetch todo:')
  }
  
  async function addTodo() {
    try{
    const inputElement = document.getElementById('todo-input');
    const task = inputElement.value;
    await fetch('./todolist', {
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

// Function to delete todo by ID
async function deleteTodo(todoId) {
  try {
      const response = await fetch(`./todolist/${todoId}`, { // Adjust if necessary to match your API endpoint
          method: 'DELETE', // Method type for deletion
      });
      if (response.ok) {
          fetchTodos(); // Refresh the list after deletion
      } else {
          console.error('Failed to delete todo');
      }
  } catch (error) {
      console.error('Error:', error);
  }
}

  fetchTodos();

  //when working with gitpod, instead of using localhost:3000, use gitpod url with port at the beginning, like: 'https://3000-18dominik-todolist-8vzmwfch90l.ws-eu108.gitpod.io/todolist'
  