'use-strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server.js');
const Users = require('../auth/modules/userSchema.js');
const supertest = require('supertest');
const mockRequest = supergoose(server);
const auth = require('../auth/middleware/basicAuth.js');

let user = { username: 'user', password: 'password' };

describe ('Auth router', () => {
  it('can create one', async () => {

    const res = await mockRequest.post('/signup').send(user);
    const userResponse = res.body;

    expect(res.status).toBe(201);
    expect(userResponse._id).toBeDefined();
    expect(userResponse.username).toEqual(user.username);
  });

  it('can sign in with basic auth', async () => {
    //const signUP = await mockRequest.post('/signup').send(user);

    const response = await mockRequest.post('/signin').auth(user.username, user.password);
    const userResponse = response.body;
    expect(response.status).toBe(200);
   
  });

})