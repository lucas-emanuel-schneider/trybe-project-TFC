import * as sinon from 'sinon';
import * as chai from 'chai';
import {
  fullBoard,
  homeBoard,
  awayBoard
  } from './mocks/leaderBoard.mock'
  import {
    allMatches
  } from './mocks/matches.mock';
  import { allTeams } from './mocks/teams.mock';
  import LeaderBoardService from '../services/leaderBoardService';
 // @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

import { App } from '../app';
import teamModel from '../database/models/Teams.Model';
import matchesModel from '../database/models/Matches.Model';

import { Response } from 'superagent';
import { IBoard } from '../interfaces/IScore';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

const leaderBoardService = new LeaderBoardService();

describe('Test leaderBoard Route', () => {
describe('getting the LeaderBoard', () => {
  it('get fullLeaderBoard', async () => {
    sinon.stub(leaderBoardService, 'getAllTeamsScore').resolves(fullBoard as unknown as IBoard[]);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(fullBoard);
    sinon.restore();
  });
    it('get homeBoard', async () => {
    sinon.stub(leaderBoardService, 'getHomeTeamsScore').resolves(homeBoard as unknown as IBoard[]);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(homeBoard);
    sinon.restore();
  });
    it('get awayBoard', async () => {
    sinon.stub(leaderBoardService, 'getAwayTeamsScore').resolves(awayBoard as unknown as IBoard[]);

    const chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.deep.equal(awayBoard);
    sinon.restore();
  });
});
});