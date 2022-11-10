import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type AdvertDocument = Advert &
  Document & {
    _doc: any;
  };
@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      return ret;
    },
  },
})
export class Advert {
  @Prop()
  caption: string;
  @Prop()
  message: string;
  @Prop()
  email: string;
  @Prop()
  duration: string;
  @Prop()
  link: string;
  @Prop()
  action: string;
  @Prop()
  audience: string;
  @Prop()
  image: string;
  @Prop()
  shares: string[];
  @Prop()
  likes: string[];
  @Prop({
    type: String,
    enum: ['User', 'orgnaization'],
    default: 'User'
  })
  author: string;
  @Prop()
  authorId: string;
}

export const AdvertSchema = SchemaFactory.createForClass(Advert)