import { ObjectId } from "mongoose"


export class IEvent {
  name: string;
  description: string;
  time: string;
  image: string;
  type: string;
  audience: string;
  startDate: string;
  endDate: string;
  interested: Interested[];
  authorId: ObjectId;
  author: string;
  shares: string[];
  likes: string[];
  promoted: boolean;
}

export class Interested {
  authorId: ObjectId;
  authorImg: string;
  name: string;
}

export class EventInput {
  name: string; 
  description: string;
  time: string;
  startDate: string;
  endDate: string;
  imageFile: string;
  type: string;
}