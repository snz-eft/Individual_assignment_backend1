const { database } = require('../../db');

exports.deleteFriend = async (req, res) => {
  try {
    await database().deleteFriend({
      userId: req.loggedInUser.id,
      friendId:req.params.friendId
    });
    return res.status(200).send('Friend deleted');
  }
  catch (e) {
    return res.status(500).send('Server error');
  }
};
