import test from 'ava';
const request = require('supertest');
const app = require('../../index');

test('01', async t => {
  const name = "ava_test"

  const channelCreateRes = await request(app)
    .post('/channel')
    .send({ name });
  t.is(channelCreateRes.status, 200);

  const channel = channelCreateRes.body.channel

  t.is(channel.name, 'ava_test');


  const content = "ava_test_content"
  const title = "ava_test_title"

  const createRes = await request(app)
    .post('/message')
    .send({ content, channel: channel.id, title });

  t.is(createRes.status, 200);

  delete createRes.body.message.__v

  const messages = [].concat(createRes.body.message)

  const response = await request(app)
    .get(`/message/list/${channel.id}`)
  t.is(response.status, 200);

  t.deepEqual(response.body.messages, messages);
})