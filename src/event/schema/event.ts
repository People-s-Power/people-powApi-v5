import mongoose, { Schema, Types } from "mongoose";
import { IEvent } from "./event.dto";


export const eventSchema: Schema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  audience: {
    type: String,
    required: true,
    enum: ['Everyone', 'Connections', 'Interest', 'Location'],
    default: 'Everyone'
  },
  authorId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'author'
  },
  author: {
    type: String,
    required: true,
    enum: ['orgnaization', 'User'],
    default: 'User'
  },
  endDate: String,
  image: String,
  interested: [],
  startDate: String,
  time: String,
  type: {
    type: String,
    enum: ['online', 'offline'],
    default: 'offline',
    required: true
  },
  shares: [],
  likes: []
})

export const event = mongoose.model('event', eventSchema) 

export type EventDocument = IEvent &
  Document & {
    _id: any;
    _doc: any;
  };