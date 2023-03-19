const { database } = require('../../db');

exports.postTask = async (req, res) => {
  // TODO: Add body validation name
  try {
    await database().addTask({
      taskName: req.body.name,
      todoId: req.params.todoId,
      userId: req.loggedInUser.id,
    });
    return res.status(201).send('Task added');
  } catch (e) {
    if(e.code === 'ER_NO_REFERENCED_ROW_2'){
      return res.status(400).send('Invalid data');
    }
    return res.status(500).send('Server error');
  }
};
