import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ioperators, StaffRoleEnum } from './organization.dto';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/entity/user.schema';

export type organizationDocument = orgnaization &
  Document & {
    _id: any;
    _doc: any;
  };

@Schema({
  timestamps: true
})
export class orgnaization {
  @Prop()
  image: string;
  @Prop()
  author: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  description: string;
  @Prop()
  phone: string;
  @Prop()
  followers: string[];
  @Prop()
  following: string[];
  @Prop({ default: 0 })
  followersCount: number;
  @Prop({ default: 0 })
  followingCount: number;
  @Prop()
  operators: Ioperators[];
  @Prop({ default: 'Add social' })
  facebook: string;
  @Prop({ default: 'Add social' })
  linkedIn: string;
  @Prop({ default: 'Add social' })
  instagram: string;
  @Prop({ default: 'Add social' })
  twitter: string;
  @Prop()
  country: string;
  @Prop()
  city: string;
  @Prop()
  website: string;
}

export const orgnaizationSchema = SchemaFactory.createForClass(orgnaization);
