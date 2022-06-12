const router = require('express').Router();
import { throws } from 'assert';
import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
const Message = mongoose.model('Message');
import { v4 as uuidv4 } from 'uuid';
const Channel = mongoose.model('Channel');

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { body: data } = req

    /* vail data.channel */
    const channel = await Channel.findById(data.channel)
    if (!channel) {
      return res.status(400).json({
        error: {
          rId: req.headers.rId,
          msg: '请求失败，请重试',
          detail: {
            msg: 'channel not existed',
          },
        },
      });
    }

    let strUUID = uuidv4();
    let strUUID2 = strUUID.replace(/-/g, '');

    let message = new Message({ title: data.title, _id: `msg_${strUUID2}`, channel: data.channel, content: data.content })

    await message.save()

    res.send({ message })
  } catch (err) {
    return next(err)
  }
};