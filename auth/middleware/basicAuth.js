'user-strict';

const bcrypt = require('bcrypt'); //bring in bcrypt
const base64 = require('base-64'); //bring in base64

const Users = require('../modules/userSchema.js'); //import user 

async function basicAuth (req, res, next) {

 let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
 let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
 let decodedString = base64.decode(encodedString); // "username:password"
 let [username, password] = decodedString.split(':'); // username, password

//  try {
//    req.user = await Users.authenticateBasic(username, password);
//    const user = await Users.findOne({ username: username })
//    const valid = await bcrypt.compare(password, user.password);
//    if (valid) {
//      res.status(200).json(user);
//    }
//    else {
//      throw new Error('Invalid User')
//    }
//  } catch (error) { res.status(403).send("Invalid Login"); }

 next();
}

 module.exports = basicAuth;