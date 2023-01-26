import * as sinon from 'sinon';
import * as chai from 'chai';
import { IMatchTest } from '../interfaces/IMatch';
import UserModel from '../database/models/User.Model';
import {
  allMatches,
  newMatchBody,
  newMatchCreated,
  nonExistentTeams,
  equalTeamsId,
} from './mocks/matches.mock';
import {
  correctLoginBody,
  userCorrect,
  invalidToken,
  } from './mocks/user.mock'
 // @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { App } from '../app';
import matchesModel from '../database/models/Matches.Model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test matches Routes', () => {
describe('expecting sucess', () => {
  it('get all matches', async () => {
  sinon.stub(matchesModel, "findAll").resolves(allMatches as unknown as matchesModel[]);
    const { body, status } = await chai.request(app).get('/matches').send();
      expect(body).to.be.deep.equal(allMatches);
      expect(status).to.be.equal(200);
      (matchesModel.findAll as sinon.SinonStub).restore();
  });
  it('create a new match with token', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);
  sinon.stub(UserModel, "findOne").resolves(userCorrect as UserModel);

  const { body: { token } } = await chai.request(app).post('/login').send(correctLoginBody);
    const { body, status } = await chai.request(app).post('/matches').send(newMatchBody).set({ authorization: token });
      expect(body).to.be.deep.equal(newMatchCreated);
      expect(status).to.be.equal(201);
      (matchesModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
  });
  it('set the match as finished', async () => {
    sinon.stub(matchesModel, "update").resolves('' as any);
    const { body, status } = await chai.request(app).patch('/matches/2/finish').send(newMatchBody);
      expect(body).to.be.deep.equal({ message: 'Finished'});
      expect(status).to.be.equal(200);
      (matchesModel.update as sinon.SinonStub).restore();
  });
});
describe('expecting failure', () => {
  it('create a new match with invalid token', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);

    const { body, status } = await chai.request(app).post('/matches').send(newMatchBody).set({ authorization: invalidToken });
      expect(body).to.be.deep.equal({ message: 'Token must be a valid token'});
      expect(status).to.be.equal(401);
      (matchesModel.create as sinon.SinonStub).restore();
  });
  it('create a new match without token', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);

    const { body, status } = await chai.request(app).post('/matches').send(newMatchBody);
      expect(body).to.be.deep.equal({ message: 'Token not found'});
      expect(status).to.be.equal(401);
      (matchesModel.create as sinon.SinonStub).restore();
  });
  it('create a new match with two teams that have the same ids', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);
  sinon.stub(UserModel, "findOne").resolves(userCorrect as UserModel);

  const { body: { token } } = await chai.request(app).post('/login').send(correctLoginBody);
    const { body, status } = await chai.request(app).post('/matches').send(equalTeamsId).set({ authorization: token });
      expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      expect(status).to.be.equal(422);
      (matchesModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
  });
  it('create a new match with two teams that have the same ids', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);
  sinon.stub(UserModel, "findOne").resolves(userCorrect as UserModel);

  const { body: { token } } = await chai.request(app).post('/login').send(correctLoginBody);
    const { body, status } = await chai.request(app).post('/matches').send(equalTeamsId).set({ authorization: token });
      expect(body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
      expect(status).to.be.equal(422);
      (matchesModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
  });
  it('try create a new match with two teams that not exists ids', async () => {
  sinon.stub(matchesModel, "create").resolves(newMatchCreated as unknown as matchesModel);
  sinon.stub(UserModel, "findOne").resolves(userCorrect as UserModel);

  const { body: { token } } = await chai.request(app).post('/login').send(correctLoginBody);
    const { body, status } = await chai.request(app).post('/matches').send(nonExistentTeams).set({ authorization: token });
      expect(body).to.be.deep.equal({ message: "There is no team with such id!" });
      expect(status).to.be.equal(404);
      (matchesModel.create as sinon.SinonStub).restore();
      (UserModel.findOne as sinon.SinonStub).restore();
  });
});
});