'use strict';

const mongoose = require('mongoose');
const base64 = require('base-64');
const bcrypt = require('bcrypt');


const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

usersSchema.pre('save', async function() {
  //checks to see if the password has changed
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 10);
  }
})

//this method will only run on the model itself NOT the object instance
usersSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);
  if(valid) { return user; }
  throw new Error('Invalid User');
}

const Users = mongoose.model('users', usersSchema);

module.exports = Users; //export to server.js
