import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { Petition } from 'src/petition/schema/petition.schema';

export type PostDocument = Post & Document & {
  _doc: any;
};

export type CommentDocument = Comment & Document & {
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
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'Petition' })
  petition: Record<string, Petition>;
  @Prop({ type: Types.ObjectId, ref: 'User', autopopulate: true  })
  author: User;
  @Prop({ required: true })
  body: string;
  @Prop()
  likes: string[];
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Comment', autopopulate: true }],
  })
  comments: Comment[];
  @Prop()
  shares: string[];
  @Prop({default: false})
  isPetition: boolean
  @Prop({ default: '//fsdsdf' })
  image: string;

}

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
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'User', autopopulate: true })
  author: User;
  @Prop({ required: true })
  body: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

export const PostSchema = SchemaFactory.createForClass(Post);
