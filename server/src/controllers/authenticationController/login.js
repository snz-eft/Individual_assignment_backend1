const jwt = require('jsonwebtoken');
const { database } = require('../../db');
const bcrypt = require('bcrypt');

const COOKIE_AGE = 24 * 60 * 60 * 60;

exports.login = async (req, res) => {
  const secret = process.env.SECRET;
  const { username, password } = req.body;

  const foundUser = await database().getUser(username);
  if (foundUser) {
    const isPasswordEqual = bcrypt.compareSync(password, foundUser.password);
    if (isPasswordEqual) {
      const authToken = jwt.sign({ username, id: foundUser.user_id }, secret, {
        expiresIn: COOKIE_AGE,
      });
      res.cookie('authToken', authToken, {
        maxAge: COOKIE_AGE,
        httpOnly: true,
      });
      return res.status(200).send('Login success');
    }
  }
  return res.status(401).send('Invalid username/password');
};
