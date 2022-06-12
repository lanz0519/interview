const router = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
const Channel = mongoose.model('Channel');
import { v4 as uuidv4 } from 'uuid';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { body:data } = req
    
    let strUUID = uuidv4();
    let strUUID2 = strUUID.replace(/-/g, '');  

    let channel = new Channel({ name: data.name, _id: `chan_${strUUID2}`})

    await channel.save()

    res.send({ channel })
  } catch (err) {
    return next(err)
  }
};
