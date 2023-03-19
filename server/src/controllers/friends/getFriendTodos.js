const { database } = require('../../db');

exports.getFriendTodos = async (req, res) => {
  try {
    const todos = await database().getFriendTodos({
      userId: req.loggedInUser.id,
      friendId: req.params.friendId
    });
    return res.status(200).json(todos);
  } catch (e) {
    res.status(500).send('Server error');
  }
};
