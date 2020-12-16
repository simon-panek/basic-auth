'use-strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const Users = require('../auth/modules/userSchema.js');
const user = new Users ();
const supertest = require('supertest');
const mockRequest = supertest(server);
const agent = supergoose(server);
const auth = require('../auth/middleware/basicAuth.js');

let users = { admin: { username: 'admin', password: 'password' }};

beforeAll(async (done) => {
  await new Users(users.admin).save();
  done();
});

describe ('Auth middleware', () => {

  // admin:password: YWRtaW46cGFzc3dvcmQ=
  // admin:foo: YWRtaW46Zm9v

  it ('The middleware should function if sent a basic header', () => {
    const newUser = { 'username': 'dog', 'password': 'pass' };
    return agent.post('/signup').send(newUser)
      .then ( userInfo => {
        expect(userInfo.body.username).toEqual('dog');
      })
  })

  it ('logs in a user with the correct credentials', () => {
    let req = { headers: { authorization: 'Basic YWRtaW46cGFzc3dvcmQ=',},};
    let res = {};
    let next = jest.fn();
    let middleware = auth;

    return middleware(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith();
      });
    
  })

})


// describe ('Auth middleware', () => {
//   it ('The the singin route should work as intended', () => {
//     const newUser = { 'username': 'dog', 'password': 'pass' };
//     //agent.post('/signup').send(newUser)
//     return agent.post('/singin').send(newUser)
//       .then ( userInfo => {
//         expect(userInfo.body.username).toEqual('dog');
//       })
//   })
// })

