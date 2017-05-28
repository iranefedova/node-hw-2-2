const expect = require('chai').expect;
const supertest = require('supertest');

describe('REST API', () => {
  var server;

  before(() => {
    server = supertest.agent("http://localhost:3000/api");
  });

  describe('create user', () => {
    it("создание пользователя со всеми полями",function(done){
      server
      .post("/users")
      .send({name : 'Ivan', score : 20})
      .expect(200, 'User was successfully added!')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("создание пользователя без поля score",function(done){
      server
      .post("/users")
      .send({name : 'Ivan'})
      .expect(200, 'User was successfully added!')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("создание пользователя без имени",function(done){
      server
      .post("/users")
      .send({score : 30})
      .expect(400, 'Username is required!')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("создание пустого пользователя",function(done){
      server
      .post("/users")
      .send({})
      .expect(400, 'Username is required!')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });

  describe('delete user', () => {

    it("удаление существующего пользователя",function(done){
      server
      .delete("/users/0")
      .expect(200, 'Successfully deleted')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
    it("удаление несуществующего пользователя",function(done){
      server
      .delete("/users/qwerty")
      .expect(400, 'User not found')
      .end(function(err, res) {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
    });
  });
});
