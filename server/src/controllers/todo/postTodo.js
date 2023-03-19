const { database } = require('../../db');

exports.postTodo = async (req, res) => {
  try {
    await database().addTodo({
      todoName: req.body.name,
      userId: req.loggedInUser.id,
    });
    return res.status(201).send('Todo added');
  } catch (e) {
    res.status(500).send('Server error');
  }
};
