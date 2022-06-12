import * as mongoose from 'mongoose';

const ChannelSchema = new mongoose.Schema(
  {
    _id: {
      type: String
    },
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true, toJSON: { getters: true } }
);

mongoose.model('Channel', ChannelSchema);
