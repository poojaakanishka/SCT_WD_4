/* ===== DOM Elements ===== */
const form  = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList  = document.getElementById('task-list');

/* ===== Event: Add Task ===== */
form.addEventListener('submit', e => {
  e.preventDefault();
  addTask(taskInput.value.trim(), dateInput.value);
  form.reset();
});

/* ===== Add Task Function ===== */
function addTask(text, dateTime) {
  if (!text) return;

  // Create task li
  const li = document.createElement('li');
  li.className = 'task';

  // Task info (title + optional date)
  const infoDiv = document.createElement('div');
  infoDiv.className = 'task-info';
  const title = document.createElement('span');
  title.textContent = text;
  infoDiv.appendChild(title);

  if (dateTime) {
    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = new Date(dateTime).toLocaleString();
    infoDiv.appendChild(dateSpan);
  }

  li.appendChild(infoDiv);

  // Action buttons
  li.appendChild(createBtn('✔', () => toggleComplete(li)));
  li.appendChild(createBtn('✎', () => editTask(li, title)));
  li.appendChild(createBtn('🗑', () => li.remove()));

  taskList.appendChild(li);
}

/* ===== Helpers ===== */
function createBtn(text, handler) {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.addEventListener('click', handler);
  return btn;
}
function toggleComplete(li) {
  li.classList.toggle('completed');
}
function editTask(li, titleEl) {
  const newText = prompt('Edit task:', titleEl.textContent);
  if (newText) titleEl.textContent = newText.trim();
}
