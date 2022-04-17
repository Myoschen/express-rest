const { expect } = require('chai');
const request = require('supertest');
require('../dist/index.bundle');

const api = request('http://localhost:3000/api');

let APItoken;

before((done) => {
  // 登入測試
  api.post('/users/login')
    .set('Accept', 'application/json')
    .send({
      user_mail: 'MUUUU@myos.api.com',
      user_password: 'MUUUUU0530',
    })
    .expect(200)
    .end((err, res) => { // 取得 Token
      APItoken = res.body.token;
      done();
    });
});

describe('Article', () => {
  it('Article should be an object with keys and values', (done) => {
    // 測試取得所有文章
    api.get('/articles')
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        }
        // 斷言做資料驗證(文章id、用戶id、文章標題、文章標籤、文章內容)
        expect(res.body[0]).to.have.property('article_id');
        expect(res.body[0].article_id).to.be.a('number');
        expect(res.body[0]).to.have.property('user_id');
        expect(res.body[0].user_id).to.be.a('number');
        expect(res.body[0]).to.have.property('article_title');
        expect(res.body[0].article_title).to.be.a('string');
        expect(res.body[0]).to.have.property('article_id');
        expect(res.body[0]).to.have.property('article_tag');
        expect(res.body[0].article_tag).to.be.a('string');
        expect(res.body[0]).to.have.property('article_content');
        expect(res.body[0].article_content).to.be.a('string');
        done();
      });
  });
  it('should return a 200 response', (done) => {
    // 取得某使用者的所有文章
    api.get('/articles/personal')
      .set('Authorization', `Bearer ${APItoken}`) // 將 Bearer Token 放入 Header 中的 Authorization
      .expect(200, done);
  });
});
