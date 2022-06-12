import express from 'express';
import { NextFunction, Request, Response } from 'express';
const logger = require('./utils/wiston/manual_logger')(module);
import loggerMiddleware = require('./middleware/logger');
import  cors from 'cors';
import * as path from 'path';

// Create global app object
const app = express();

logger.info({
  msg: '系统环境变量NODE_ENV',
  detail: {
    NODE_ENV: process.env.NODE_ENV,
  },
});

app.use(cors());

// Request Logging
app.use(loggerMiddleware.logger);

app.use(express.static(path.join(__dirname, '../public')));

app.use('/test',(req: Request,res: Response) => {
  res.send('test11')
})

app.use(express.json({ limit: '20mb' })); // for parsing application/json
app.use(express.urlencoded({ limit: '20mb', extended: true, parameterLimit: 1000 })); // for parsing application/x-www-form-urlencoded

// load model
require('./models/index.')()

// Load Routes
app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req: Request, _res: Response, next: NextFunction) {
  logger.info({
    rId: req.headers.rId,
    msg: '请求失败，请求所希望得到的资源未被在服务器上发现。',
    detail: {
      url: req.url,
      status: 404,
    },
  });

  next({
    code: 404,
    msg: '请求失败，请求所希望得到的资源未被在服务器上发现。',
    detail: {
      url: req.url,
    },
  });
});

let isProduction = false

// error handler
app.use(function (error: any, req: Request, res: Response, _next: NextFunction): void {
  const { msg = error.name || '服务器错误', detail = { msg: error.message, stack: error.stack } } = error;

  let code = error.code || 500;

  logger.error({
    rId: req.headers.rId,
    msg,
    detail,
  });

  res.status(code < 600 ? code : 500).json({
    error: {
      msg,
      // 生产环境不返回 stack
      detail: isProduction ? { msg: detail.msg } : detail,
    },
  });
});


module.exports = app;