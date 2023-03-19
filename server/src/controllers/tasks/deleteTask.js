const { database } = require('../../db');

exports.deleteTask = async (req, res) => {
  try {
    const task = await database().getTask({
      userId: req.loggedInUser.id,
      taskId: req.params.taskId,
    });
    if (task) {
      await database().deleteTask({
        taskId: req.params.taskId,
      });
      return res.status(200).send('Task deleted');
    } else {
      return res.status(403).send('Access denied');
    }
  } catch (e) {
    return res.status(500).send('Server error');
  }
};
