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

  const response = await request(app)
    .post('/message')
    .send({ content, channel, title });
  t.is(response.status, 200);

  t.is(response.body.message.content, 'ava_test_content');
})

test('02', async t => {
  const content = "ava_test_content"
  const channel = 'xxxxxxxxxx'
  const title = "ava_test_title"

  const response = await request(app)
    .post('/message')
    .send({ content, channel, title });
  t.is(response.status, 400);

  t.deepEqual(response.body, {
    error: {
      detail: {
        msg: 'channel not existed',
      },
      msg: '请求失败，请重试',
    }
  });
})