const { database } = require('../../db');

exports.getTask = async (req, res) => {
  try {
    const tasks = await database().getTask({
      userId: req.loggedInUser.id,
      taskId: req.params.taskId,
    });
    return res.status(200).send(tasks);
  } catch (e) {
    res.status(500).send('Server error');
  }
};
