import { connect, connection,set } from 'mongoose';
const logger = require('./utils/wiston/manual_logger')(module);
let config = require('./config/main');

if (!process.env.NODE_ENV) {
  set('debug', true); // 本地环境，开启 mongodb debug 模式
}

if (config.DATABASE) {
  connect(config.DATABASE, {
    // @ts-ignore
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  const db = connection;

  db.once('open', function () {
    logger.info('mongo open');
  });

  db.on('error', function (error: any) {
    logger.info(error);
  });
  db.on('connected', () => {
    logger.info('mongo connected');
  });
  db.on('disconnected', () => {
    logger.info('mongo disconnected');
  });
  module.exports = db;
} else {
  logger.error({
    msg: 'mongodb connection fail',
    detail: {
      msg: 'production env mongodbUrl no exist',
    },
  });
  process.exit(101); //未提供mongo连接地址
}
