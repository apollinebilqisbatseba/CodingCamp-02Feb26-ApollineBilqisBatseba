let todos = [];
let currentFilter = 'all';


const todoInput = document.getElementById('todoInput');
const dateInput = document.getElementById('dateInput');
const todoList = document.getElementById('todoList');
const addBtn = document.getElementById('addBtn');
const clearBtn = document.getElementById('clearBtn');
const filterBtns = document.querySelectorAll('.filter-btn');


addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearTodos);
filterBtns.forEach(btn => {
btn.addEventListener('click', () => filterTodos(btn.dataset.filter));
});


document.addEventListener('keydown', (e) => {
if (e.key === 'Enter') addTodo();
});


function addTodo() {
const text = todoInput.value.trim();
const date = dateInput.value;
if (!text) return alert('Todo tidak boleh kosong!');


todos.push({ text, date, done: false });
todoInput.value = '';
dateInput.value = '';
renderTodos();
}


function toggleTodo(index) {
todos[index].done = !todos[index].done;
renderTodos();
}


function deleteTodo(index) {
todos.splice(index, 1);
renderTodos();
}


function clearTodos() {
if (confirm('Yakin ingin menghapus semua todo?')) {
todos = [];
renderTodos();
}
}


function filterTodos(type) {
currentFilter = type;
renderTodos();
}


function renderTodos() {
todoList.innerHTML = '';


let filtered = todos;
if (currentFilter === 'active') filtered = todos.filter(t => !t.done);
if (currentFilter === 'done') filtered = todos.filter(t => t.done);


filtered.forEach((todo, index) => {
const li = document.createElement('li');
li.className = `todo-item ${todo.done ? 'done' : ''} flex items-center justify-between p-5 rounded-2xl border bg-white border-gray-200`;


li.innerHTML = `
<div class="flex items-center gap-4">
<input type="checkbox" ${todo.done ? 'checked' : ''} class="w-5 h-5 accent-indigo-600" />
<div>
<p class="font-semibold text-gray-800 ${todo.done ? 'todo-title-done' : ''}">${todo.text}</p>
${todo.date ? `<p class="text-xs text-gray-500 mt-1">📅 ${todo.date}</p>` : ''}
</div>
</div>
<button class="text-red-500 hover:text-red-700 text-xl">🗑</button>
`;


li.querySelector('input').addEventListener('change', () => toggleTodo(index));
li.querySelector('button').addEventListener('click', () => deleteTodo(index));


todoList.appendChild(li);
});
}