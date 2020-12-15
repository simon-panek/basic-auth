'use strict';

//dependencies
const express = require('express');
const app = express();
const router = require('../auth/modules/routes.js');

//middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

module.exports = {
  server: app,
  start: PORT => {
    if(!PORT) {throw new Error ('Port is missing');}
    app.listen( PORT, () => {
      console.log(`Port ${PORT} is the address of today's meeting`);
    })
  }
}
