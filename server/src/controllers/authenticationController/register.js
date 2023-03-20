const bcrypt = require('bcrypt');
const { database } = require('../../db');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await database().getUser(username);

  if (!foundUser) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
      await database().addUser({ username, password: hashedPassword });
      return res.status(201).send('User added');
    } catch (e) {
      return res.status(500).send('Server error');
    }
  } else {
    return res.status(409).send('Username already exist');
  }
};
