// const chai = require('chai');
// const sinon = require('sinon');
// const sinonChai = require('sinon-chai');
// // const { expect } = require('chai');
// const { expect } = chai;
// const productValid = require('../../../src/middlewares/productValid');

// chai.use(sinonChai);

// describe('Testando Middleware productValid', function () {
//   let req;
//   let res;
//   beforeEach(function () {
//     req = {};
//     res = {};
//   });
//   afterEach(function () {
//     sinon.restore();
//   });
//   it('deve chamar a próxima função se o produto for válido', function () {
//     const next = sinon.stub();
//     req = {
//       body: {
//         name: 'Martelo de Thor',
//       },
//     };
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
//     sinon.stub(console, 'error'); // Suprimindo erros de console

//     productValid(req, res, next);
//     expect(next).to.have.been.calledWith();
//   });
//   it('deve enviar uma resposta de produto inválido string menor que 5 caracteres', function () {
//     const next = sinon.stub();
//     req = {
//       body: {
//         name: 'abc',
//       },
//     };
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
    
//     // Aguarde a execução assíncrona do middleware
//     productValid(req, res, next);
//     expect(res.status).to.have.been.calledWith(422);
//     expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
//     // Certifique-se de que a próxima função não foi chamada
//   });
//   it('deve enviar uma resposta de produto inválido se houver outros erros', function () {
//     const next = sinon.stub();
//     req = {
//       body: {
        
//       },
//     };
//     res = {
//       status: sinon.stub().returnsThis(),
//       json: sinon.stub(),
//     };
    
//     // Aguarde a execução assíncrona do middleware
//     productValid(req, res, next);
//     expect(res.status).to.have.been.calledWith(400);
//     expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
//     // Certifique-se de que a próxima função não foi chamada
//   });
// });

// const sinon = require('sinon');
// const { expect } = require('chai');
// const productValid = require('../../../src/middlewares/productValid');

// describe('Testando Middleware productValid', function () {
//   let req;
//   let res;

//   beforeEach(function () {
//     req = {};
//     res = {};
//   });

//   afterEach(function () {
//     sinon.restore();
//   });

//   it('deve chamar a próxima função se o usuário estiver autenticado', function () {
//     const next = sinon.stub();
//     productValid(req, res, next);
//     expect(next).to.have.been.calledOnce;
//   });

//   it('deve enviar uma resposta de não autorizado se o usuário não estiver autenticado', async function () {
//     req = {};
//     res = { status: sinon.stub(), send: sinon.stub() };
//     const next = sinon.stub();
//     res.status.returns(res);

//     // Aguarde a execução assíncrona do middleware
//     await productValid(req, res, next);

//     expect(res.status).to.have.been.calledWith(401);
//     expect(res.send).to.have.been.calledWith('Não autorizado');
    
//     // Certifique-se de que a próxima função não foi chamada
//     expect(next).not.to.have.been.called;
//   });
// });