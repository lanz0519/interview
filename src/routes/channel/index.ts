import { NextFunction, Request, Response } from 'express';
import create from './create';
import list from'./list'

const router = require('express').Router();
const logger = require('../../utils/wiston/manual_logger')(module);

router.post('/', create);
router.get('/list', list)

router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error({
    rId: req.headers.rId,
    msg: '/channel 路由中间件内部错误',
    detail: err,
  });

  return next(err);
});

export default router;
