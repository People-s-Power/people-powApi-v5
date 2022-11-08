import mongoose, { Schema, Types } from "mongoose";
import { IEvent } from "./event.dto";


export const eventSchema: Schema = new Schema<IEvent>({
  name: {
    type: String,
    required: true,
  },
  description: String,
  audience: String,
  authorId: String,
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
  }
})

export const event = mongoose.model('event', eventSchema) 