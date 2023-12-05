import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app }  from '../app';
import {teamsMock}from './mocks/teams.mock';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';

chai.use(chaiHttp);



const { expect } = chai;

describe('Testa a rota /teams', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Testa método GET na rota /teams', () => {
    it('Verifica se é possível obter todos os "teams"', async () => {

      sinon.stub(Team, "findAll").resolves(teamsMock as unknown as Team[]);

      const response = await chai
              .request(app)
              .get('/teams');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock);

    });

    it('Verifica se é possível retormar um "team" pelo Id', async () => {

      sinon.stub(Team, "findByPk").resolves(teamsMock[0] as unknown as Team);

      const response = await chai
              .request(app)
              .get('/teams/1');


      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(teamsMock[0]);

    });
  });
});