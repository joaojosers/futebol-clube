import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';


import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcript from 'bcryptjs';
import UserModel from '../database/models/UserModel';
import Team from '../database/models/TeamModel';
import MatchService from '../services/match.service';
chai.use(chaiHttp);



const { expect } = chai;

describe('Testando authMiddleware', () => {
  afterEach(function() { sinon.restore() });
  it('Verifica se usuário não fornece "token"', async () => {
    const response = await chai
            .request(app)
            .post('/matches')
            .set('Authorization', '');
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token not found');
    
  });
  it('Verifica se usuário envia "token" inválido', async () => {
    const response = await chai
            .request(app)
            .post('/matches')
            .set('Authorization', 'token');
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token must be a valid token');
  });
  it('Verifica se usuário envia "token" com email inválido', async () => {
    sinon.stub(jsonwebtoken, 'verify').returns({ email: 'email' } as any);
    sinon.stub(UserModel, 'findOne').resolves(null);
    const response = await chai
            .request(app)
            .post('/matches')
            .set('Authorization', 'token token');
    expect(response.status).to.be.equal(401);
    expect(response.body.message).to.be.equal('Token must be a valid token');
  });
  it('Verifica se o usuário consegue se autenticar', async () => {
    const service = new MatchService();
    sinon.stub(jsonwebtoken, 'verify').returns({ email: 'email' } as any);
    sinon.stub(UserModel, 'findOne').resolves({ email: 'email' } as any);
    sinon.stub(service, 'create').resolves({ email: 'email' } as any);
    // sinon.stub(Team, 'findByPk').calledTwice.
    const response = await chai
            .request(app)
            .post('/matches')
            .set('Authorization', 'Bearer token')
            .send({
              "homeTeamId": 9, 
              "awayTeamId": 1, 
              "homeTeamGoals": 2,
              "awayTeamGoals": 2
            });
    expect(response.status).to.be.equal(201);
  });

});