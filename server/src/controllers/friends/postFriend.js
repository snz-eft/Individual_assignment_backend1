const { database } = require('../../db');

exports.postFriend = async (req, res) => {
  try {
    const result = await database().addFriend({
      friendUsername: req.body.friend_username,
      userId: req.loggedInUser.id,
    });
    if(result){
      return res.status(201).send('Friend added');
    } else {
      return res.status(404).send('User not found');
    }
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      res.status(409).send('Friend is already added');
    } else {
      res.status(500).send('Server error');
    }
  }
};
