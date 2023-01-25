import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces/IUser';
import { incorrectEmail,
  correctLoginBody,
  incorrectPassword,
  userCorrect,
  withoutEmail,
  withoutPassword,
  invalidToken
  } from './mocks/user.mock'
 // @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { App } from '../app';
import UserModel from '../database/models/User.Model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test Users and Login', () => {
describe('Login route tests expecting failure', () => {
    beforeEach(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);
    });

    afterEach(()=>(UserModel.findOne as sinon.SinonStub).restore())

  it('login without email', async () => {
    const { body, status } = await chai.request(app).post('/login').send(withoutEmail);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.be.equal(400);
  });
  it('login without password', async () => {
    const { body, status } = await chai.request(app).post('/login').send(withoutPassword);
      expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.be.equal(400);
  });
  it('login wrong email', async () => {
    const { body, status } = await chai.request(app).post('/login').send(incorrectEmail);
      expect(body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.be.equal(401);
  });
  it('login wrong password', async () => {
    const { body, status } = await chai.request(app).post('/login').send(incorrectPassword);
      expect(body).to.be.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.be.equal(401);
  });
});
describe('Login route tests expecting pass', () => {
    beforeEach(async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(userCorrect as UserModel);
    });

  afterEach(()=>(UserModel.findOne as sinon.SinonStub).restore())
  it('login successfully', async () => {
    const { body, status } = await chai.request(app).post('/login').send(correctLoginBody);
      expect(body).to.haveOwnProperty('token');
      expect(body.token).to.be.a('string');
      expect(status).to.equal(200);
  });
});
describe('Test validate route', () => {
    it('validate route without token', async () => {
      const { body, status } = await chai.request(app).get('/login/validate');

      expect(body.message).to.equal('Token not found');
      expect(status).to.equal(401);
    });

    it('Testing invalid Token', async () => {  
      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: invalidToken });

      expect(body.message).to.equal('Token must be a valid token');
      expect(status).to.equal(401);
    });

    it('Testing the correct Token and expecting the role', async () => {
      async () => sinon.stub(UserModel, "findOne").resolves(userCorrect as UserModel);
      () => (UserModel.findOne as sinon.SinonStub).restore();

      const { body: { token } } = await chai.request(app).post('/login').send(correctLoginBody);

      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token });

      expect(body).to.deep.equal({ role: 'admin' });
      expect(status).to.equal(200);
    });
  });
});