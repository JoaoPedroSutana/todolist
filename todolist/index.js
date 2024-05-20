const todoInput = document.querySelector('.input');
const todoButton = document.querySelector('.button');
const todoList = document.querySelector('.ist');
let tasks = [];
function manageTask(action, index) {
    if (action === 'add') {
        const taskText = todoInput.value.trim();
        if (taskText) tasks.push({ text: taskText, completed: false });
        todoInput.value = '';
    } else if (action === 'remove') {
        tasks.splice(index, 1);
    } 
     else if (action === 'toggle') {
        tasks[index].completed = !tasks[index].completed;
    }
    renderTasks();
}
function renderTasks() {
    todoList.innerHTML = tasks.map((task, index) => `
        <li class="todo-item${task.completed ? ' completed' : ''}">
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="manageTask('toggle', ${index})">
            <span>${task.text}</span>
            <button onclick="showEditInput(${index})">&#x270E;</button>
            <button onclick="manageTask('remove', ${index})">&#x2716;</button>
        </li>
    `).join('');
}
function showEditInput(index) {
    const taskItem = todoList.children[index];
    const taskTextSpan = taskItem.querySelector('span');
    const currentText = taskTextSpan.textContent;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = currentText;
    editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            tasks[index].text = editInput.value.trim();
            renderTasks();
        }
    });
    taskItem.replaceChild(editInput, taskTextSpan);
    editInput.focus();
}
todoButton.addEventListener('click', () => manageTask('add'));
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') manageTask('add');
});
renderTasks();