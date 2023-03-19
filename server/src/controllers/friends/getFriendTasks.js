const { database } = require('../../db');

exports.getFriendTasks = async (req, res) => {
  try {
    const tasks = await database().getFriendTasks({
      userId: req.loggedInUser.id,
      todoId: req.params.todoId,
      friendId: req.params.friendId
    });
    return res.status(200).json(tasks);
  } catch (e) {
    res.status(500).send('Server error');
  }
};
