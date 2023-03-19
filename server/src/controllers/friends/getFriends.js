const { database } = require('../../db');

exports.getFriends = async (req, res) => {
  try {
    const friends = await database().getFriends({
      userId: req.loggedInUser.id,
    });
    return res.status(200).send(friends);
  } catch (e) {
    res.status(500).send('Server error');
  }
};
