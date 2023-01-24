import * as sinon from 'sinon';
import * as chai from 'chai';
import {
  allTeams,
  correctTeam
  } from './mocks/teams.mock'
 // @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { App } from '../app';
import teamModel from '../database/models/Teams.Model';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Test teams Route', () => {
describe('team route tests expecting all teams and by Id', () => {
  it('get all teams', async () => {
  sinon.stub(teamModel, "findAll").resolves(allTeams as teamModel[]);
    const { body, status } = await chai.request(app).get('/teams').send();
      expect(body).to.be.deep.equal(allTeams);
      expect(status).to.be.equal(200);
      (teamModel.findAll as sinon.SinonStub).restore();
  });
  it('get team by id', async () => {
  sinon.stub(teamModel, "findByPk").resolves(correctTeam as teamModel);
    const { body, status } = await chai.request(app).get('/teams/4').send();
      expect(body).to.be.deep.equal(correctTeam);
      expect(status).to.be.equal(200);
      (teamModel.findByPk as sinon.SinonStub).restore();
  });
});
});