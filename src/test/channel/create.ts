import test from 'ava';
const request = require('supertest');
const app = require('../../index');

test('01', async t => {
  const name = "ava_test"

  const response = await request(app)
    .post('/channel')
    .send({name});
    t.is(response.status, 200);
    
    t.is(response.body.channel.name, 'ava_test');
})