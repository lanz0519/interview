const router = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';

const Message = mongoose.model('Message');

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { pageIndex = 1, pageSize = 5 }: { pageIndex: number, pageSize: number } = req.query as any
    const { channel_id } = req.params
    let findQuery: any = {}
    if (channel_id) {
      findQuery.channel = channel_id
    }

    const messages = await Message.find(findQuery, '-__v').sort({ createdAt: -1 }).skip((pageIndex - 1) * pageSize)
      .limit(pageSize)

    const count =  await Message.find(findQuery, '-__v').count()

    res.send({ messages,count })
  } catch (err) {
    return next(err)
  }
};