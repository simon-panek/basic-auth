'use strict';
require ('dotenv').config(); //bring in dotenv
const mongoose = require('mongoose'); //bring in mongoose
const server = require('./src/server.js'); //import server.js
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGOOSE_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(PORT); //start the server
  })
  .catch(e => console.error('Could not start server', e.message));

