'use strict';
const express = require('express'); //bring in express
const bcrypt = require('bcrypt'); //bring in bcrypt
const base64 = require('base-64'); //bring in base64
const basicAuth = require('../middleware/basicAuth.js');
const router = express.Router();

const Users = require('./userSchema.js'); //import user schema
//const user = new UserSchema(userModel);

router.get('/test', (req, res) => {
  res.status(200).send('Hello world.');
})

router.post('/signup', async (req, res) => {

  try {
    // console.log('1.req.body', req.body);
    // console.log('2.req.body.password', req.body.password);
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new Users(req.body);
    // console.log('3.user ', user);
    const record = await user.save(req.body);
    // console.log('4.record', record);
    res.status(200).json(record);
  } catch (e) { console.log(e); res.status(403).send("Error Creating User"); }
});

router.post('/signin', basicAuth, async (req, res) => {

});
module.exports = router;