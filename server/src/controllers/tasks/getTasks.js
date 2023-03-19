const { database } = require('../../db');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await database().getTasks({
      userId: req.loggedInUser.id,
      todoId: req.params.todoId,
    });
    return res.status(200).send(tasks);
  } catch (e) {
    return res.status(500).send('Server error');
  }
};
