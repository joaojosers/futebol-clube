import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/UserModel';
import { mockUser }from './mocks/user.mock';
import token from './mocks/token.mock';

import { Response } from 'superagent';
import * as jsonwebtoken from 'jsonwebtoken';
import * as bcript from 'bcryptjs';
chai.use(chaiHttp);

// const { app } = new App();

const { expect } = chai;

describe('Testes da rota /login', () => {

  let response: Response;

  afterEach(function() { sinon.restore() });

  describe('Verifica POST na rota /login', () => {
    it('Verifica se usuário faz login com sucesso', async () => {

      sinon.stub(User, "findOne").resolves(mockUser as unknown as User);
      sinon.stub(bcript, 'compareSync').returns(true);
      sinon.stub(jsonwebtoken, 'sign').resolves(token);


      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@admin.com',
                password: 'secret_admin'
              });


      expect(response.status).to.be.equal(200);
      expect(response.body).to.have.property( 'token' );
      expect(response.body.token).to.be.an('string');

    });

    it('Verifica se usuário não fornece "email"', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                password: 'secret_admin'
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Verifica se usuário não fornece "password"', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@admin.com',
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
    });

    it('Verifica se usuário não fornece email válido', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@mockteste.com',
                password: 'secret_admin'
              });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });

    it('Usuário não informa senha válida', async () => {
      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'admin@admin.com',
                password: 'abcdef'
              });

      expect(response.status).to.be.equal(401);
      expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
    });
  });
});