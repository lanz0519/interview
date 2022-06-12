import * as mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    channel: {
      type: String,
      required: true
    },
  },
  { timestamps: true, toJSON: { getters: true } }
);

mongoose.model('Message', MessageSchema);
