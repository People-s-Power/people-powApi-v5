import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


export type VictoryDocument = Victory &
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
export class Victory {
  @Prop()
  body: string;
  @Prop({
    default: 'https://www.pngitem.com/pimgs/m/494-4949881_colorful-dream-balloons-png-download-colorful-balloons-png.png'
  })
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

export const VictorySchema = SchemaFactory.createForClass(Victory)