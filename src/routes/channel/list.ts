const router = require('express').Router();
import { NextFunction, Request, Response } from 'express';
import * as mongoose from 'mongoose';
const Channel = mongoose.model('Channel');

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query } = req

    const channels = await (await Channel.find(query, '-__v'))

    res.send({ channels })
  } catch (err) {
    return next(err)
  }
};