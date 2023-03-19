const { deleteTask } = require('../controllers/tasks/deleteTask');
const { patchTask } = require('../controllers/tasks/patchTask');
const { postTask } = require('../controllers/tasks/postTask');
const { getTasks } = require('../controllers/tasks/getTasks');
const { getTodos } = require('../controllers/todo/getTodos');
const { postTodo } = require('../controllers/todo/postTodo');

const todos = require('express').Router();

// Get all todos
todos.get('/', getTodos);
todos.post('/add', postTodo);
// todos.patch('/:todoId/edit');
// todos.delete('/:todoId/delete');
// Get all tasks
todos.get('/:todoId/tasks', getTasks);
// Handle single task actions
todos.post('/:todoId/tasks/add', postTask);
todos.delete('/:todoId/tasks/:taskId/delete', deleteTask);
todos.patch('/:todoId/tasks/:taskId/edit', patchTask);

exports.todos = todos;
