import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { PetitionStatusEnum, IEndorsement } from '../dto/petition.interface';

export type PetitionDocument = Petition &
  Document & {
    _doc: any;
  };
export type ViewDocument = View & Document;

@ObjectType()
@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      doc.id = doc._id;
      delete ret._id;
      delete doc._id;

      return ret;
    },
  },
})
export class Petition {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true })
  aim: string;
  @Prop({ required: true })
  target: string;
  @Prop({ required: true })
  body: string;
  @Prop({ type: String, slug: 'title' })
  slug: string;
  @Prop()
  excerpt: string;
  @Prop({
    type: String,
    enum: PetitionStatusEnum,
    default: PetitionStatusEnum.Active,
  })
  status: string;
  @Prop({ type: Boolean, default: false })
  featured: boolean;
  @Prop({ required: true })
  authorId: string;
  @Prop({ required: true })
  authorName: string;
  @Prop({ required: true })
  authorImg: string;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
  @Prop()
  addedFrom: string;
  @Prop({ required: true })
  category: string;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Endorsement', autopopulate: true }],
  })
  endorsements: IEndorsement[];
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User', autopopulate: true }],
  })
  endorserIds: string[];
  @Prop({ type: Number, defalut: 0 })
  numberOfPaidEndorsementCount: number;
  @Prop({ type: Number, defalut: 0 })
  numberOfPaidViewsCount: number;
  @Prop()
  likes: string[];
  @Prop()
  shares: string[];
  @Prop({ type: Boolean, default: false })
  promoted: boolean;
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'View', autopopulate: true }],
  })
  views: any[];
  @Prop({ required: true })
  region: string;
}

@Schema()
export class View {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: UserDocument;
}

export const ViewSchema = SchemaFactory.createForClass(View);
export const PetitionSchema = SchemaFactory.createForClass(Petition);
