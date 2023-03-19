const { database } = require('../../db');

exports.postFriend = async (req, res) => {
  try {
    await database().addFriend({
      friendUsername: req.body.friend_username,
      userId: req.loggedInUser.id,
    });
    return res.status(201).send('Friend added');
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      res.status(409).send('Friend is already added.');
    } else {
      res.status(500).send('Server error');
    }
  }
};
