import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { Petition } from 'src/petition/schema/petition.schema';
import { PostCommentDTO } from './post.dto';
import { organizationDocument, orgnaization } from 'src/organization/schema/organization.schema';

export type PostDocument = Post & Document & {
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
  author: UserDocument;
  @Prop({ type: Types.ObjectId, ref: 'orgnaization', autopopulate: true })
  org: organizationDocument;
  @Prop({ required: true })
  body: string;
  @Prop()
  likes: string[];
  @Prop()
  comments: PostCommentDTO[];
  @Prop()
  shares: string[];
  @Prop({default: false})
  isPetition: boolean
  @Prop({ default: '//fsdsdf' })
  image: string;

}


export const PostSchema = SchemaFactory.createForClass(Post);
