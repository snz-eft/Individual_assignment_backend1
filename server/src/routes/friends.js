const { getFriends } = require('../controllers/friends/getFriends');
const { getFriendTasks } = require('../controllers/friends/getFriendTasks');
const { getFriendTodos } = require('../controllers/friends/getFriendTodos');
const { postFriend } = require('../controllers/friends/postFriend');

const friends = require('express').Router();

friends.post('/add', postFriend);
friends.get('/', getFriends);
friends.get('/:friendId/todos', getFriendTodos);
friends.get('/:friendId/todos/:todoId/tasks', getFriendTasks);
// friends.delete("/:friendId");

exports.friends = friends;
