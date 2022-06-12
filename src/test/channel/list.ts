import test from 'ava';
const request = require('supertest');
const app = require('../../index');

test('01', async t => {
  const name = "ava_test"

  const createRes = await request(app)
  .post('/channel')
  .send({name});

  const channel = createRes.body.channel

  delete channel.__v

  const response = await request(app)
    .get(`/channel/list?_id=${channel.id}`)
  t.is(response.status, 200);

  t.deepEqual(response.body.channels, [{...channel}]);
})