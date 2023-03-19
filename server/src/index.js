const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { authenticationRoute } = require('./routes/authenticationRoute');
const { checkAuthentication } = require('./middlewares/checkAuthentication');
// const { globalErrorHandler } = require('./middlewares/globalErrorHandler');
const { todos } = require('./routes/todos');
const { friends } = require('./routes/friends');

const server = express();
require('dotenv').config();

const PORT = 5050;

server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

server.use(express.json());
server.use(cookieParser());


server.use('/auth', authenticationRoute);
server.use('/todos', checkAuthentication, todos);
server.use('/friends', checkAuthentication, friends);

// server.use(globalErrorHandler);

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on ${PORT}`);
});
