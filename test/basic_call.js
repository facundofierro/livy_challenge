/*
 *
 * Makes some basic tests using Mocha and Chai
 * 
 * Test that can login with admin test user, get token, an call all api functions.
 * 
 */

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:4000';

var token;

describe('Login: ', () => {
    it('should retrieve token', (done) => {
        chai.request(url)
        .post('/login')
        .send({user: "Facundo", password: "clave1"}) //sample user with role "admin"
        .end( function(err,res){
            console.log(res.body)            
            expect(res).to.have.status(200);
            expect(res.body).to.contain.property('token');
            token = res.body.token;
            console.log('Token: ' + token);
            done();
        });
    });
});
   
   

describe('Get sample clients by id: ', ()=>{
    it('should get client by id', (done) => {
        chai.request(url)
        .get('/client/id/e8fd159b-57c4-4d36-9bd7-a59ca13057bb')
        .set('access-token', token)
        .end( function(err,res) {
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    });
});
   
   

describe('Get sample clients by name: ', ()=>{
    it('should get client by name', (done) => {
        chai.request(url)
        .get('/client/name/Lessie')
        .set('access-token', token)
        .end( function(err,res) {
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Get policies by user name: ', ()=>{
    it('should get policies by user name', (done) => {
        chai.request(url)
        .get('/policy/client_name/Manning')
        .set('access-token', token)
        .end( function(err,res) {
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Get policies by id: ', ()=>{
    it('should get policies by id', (done) => {
        chai.request(url)
        .get('/client/policy_id/56b415d6-53ee-4481-994f-4bffa47b5239')
        .set('access-token', token)
        .end( function(err,res) {
            console.log(res.body)
            expect(res).to.have.status(200);
            done();
        });
    });
});





