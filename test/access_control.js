/* eslint-disable no-console */
/* eslint-disable no-undef */
/*
 *
 * Makes some basic tests using Mocha and Chai
 *
 * Test that test user with role "users" can not acces forbiden api.
 *
 */

import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const url = 'http://localhost:4000';

let token;

describe('Access control - Login with wrong user name: ', () => {
  it('should fail', (done) => {
    chai.request(url)
      .post('/login')
      .send({ user: 'WrongUser', password: 'WrongPassword' })
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Access control - Login: ', () => {
  it('should retrieve token', (done) => {
    chai.request(url)
      .post('/login')
      .send({ user: 'Matias', password: 'clave2' }) // sample user with role "users"
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.contain.property('token');
        token = res.body.token;
        console.log(`Token: ${token}`);
        done();
      });
  });
});

describe('Access control - Get sample clients by id: ', () => {
  it('should get client by id', (done) => {
    chai.request(url)
      .get('/client/id/e8fd159b-57c4-4d36-9bd7-a59ca13057bb')
      .set('access-token', token) // token with role 'users'
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(200); // expects to have access
        done();
      });
  });
});

describe('Access control - Get sample clients by name: ', () => {
  it('should get client by name', (done) => {
    chai.request(url)
      .get('/client/name/Lessie')
      .set('access-token', token) // token with role 'users'
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(200); // expects to have access
        done();
      });
  });
});

describe('Access control - Get policies by user name: ', () => {
  it('should deny access', (done) => {
    chai.request(url)
      .get('/policy/client_name/Manning')
      .set('access-token', token) // token with role 'users'
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(400); // no access expected
        done();
      });
  });
});

describe('Access control - Get clients by policy id: ', () => {
  it('should deny access', (done) => {
    chai.request(url)
      .get('/client/policy_id/56b415d6-53ee-4481-994f-4bffa47b5239')
      .set('access-token', token) // token with role 'users'
      .end((err, res) => {
        console.log(res.body);
        chai.expect(res).to.have.status(400); // no access expected
        done();
      });
  });
});
