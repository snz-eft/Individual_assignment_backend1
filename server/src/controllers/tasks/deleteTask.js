const { database } = require('../../db');

exports.deleteTask = async (req, res) => {
  try {
    await database().deleteTask({
      taskId: req.params.taskId,
      userId: req.loggedInUser.id,
    });
    return res.status(200).send('Task deleted');
  } catch (e) {
    return res.status(500).send('Server error');
  }
};
