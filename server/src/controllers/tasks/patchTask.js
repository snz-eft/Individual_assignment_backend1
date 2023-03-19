const { database } = require('../../db');

exports.patchTask = async (req, res) => {
  try {
    await database().patchTask({
      taskId: req.params.taskId,
      taskName: req.body.name,
      userId: req.loggedInUser.id,
      done: req.body.done,
    });
    return res.status(201).send('Task edited');
  } catch (e) {
    res.status(500).send('Server error');
  }
};
