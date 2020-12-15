'use-strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const Users = require('../auth/modules/userSchema.js');
const user = new Users ();
const supertest = require('supertest');
const mockRequest = supertest(server);
const agent = supergoose(server);

describe ('Auth middleware', () => {
  it ('The middleware should function if sent a basic header', () => {
    const newUser = { 'username': 'dog', 'password': 'pass' };
    return agent.post('/signup').send(newUser)
      .then ( userInfo => {
        expect(userInfo.body.username).toEqual('dog');
      })
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

