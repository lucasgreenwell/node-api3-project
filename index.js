const express = require('express');
const cors = require("cors");

const server = require('./server')
const usersRouter = require('./users/usersRouter')
const postsRouter = require('./posts/postsRouter')

server.use(express.json());
server.use(cors());

server.use('/users', usersRouter)
server.use('/posts', postsRouter)

const port = 5000;
server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});