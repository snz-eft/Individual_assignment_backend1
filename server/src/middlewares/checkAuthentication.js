const jwt = require('jsonwebtoken');

exports.checkAuthentication = (req, res, next) => {
  const secret = process.env.SECRET;
  const authToken = req.cookies.authToken;

  try {
    const loggedInUser = jwt.verify(authToken, secret);
    req.loggedInUser = loggedInUser;
    next();
  } catch (e) {
    res.status(401).send('Forbidden Access');
  }
};
