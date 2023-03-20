const { database } = require('../../db');

exports.deleteTodo = async (req, res) => {
  try {
    await database().deleteTodo({
      todoId: req.params.todoId,
      userId: req.loggedInUser.id,
    });
    return res.status(200).send('Todo deleted');
  } catch (e) {
    return res.status(500).send('Server error');
  }
};
