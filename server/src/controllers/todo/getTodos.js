const { database } = require('../../db');

exports.getTodos = async (req, res) => {
  try {
    const todos = await database().getTodos({ userId: req.loggedInUser.id });
    return res.status(200).json(todos);
  } catch (e) {
    res.status(500).send('Server error');
  }
};
