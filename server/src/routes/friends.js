const { deleteFriend } = require('../controllers/friends/deleteFriend');
const { getFriends } = require('../controllers/friends/getFriends');
const { getFriendTasks } = require('../controllers/friends/getFriendTasks');
const { getFriendTodos } = require('../controllers/friends/getFriendTodos');
const { postFriend } = require('../controllers/friends/postFriend');
const { bodyValidation } = require('../middlewares/bodyValidation');

const friends = require('express').Router();

friends.post('/add', bodyValidation.friend, postFriend);
friends.get('/', getFriends);
friends.get('/:friendId/todos', getFriendTodos);
friends.get('/:friendId/todos/:todoId/tasks', getFriendTasks);
friends.delete('/:friendId/delete', deleteFriend);

exports.friends = friends;
