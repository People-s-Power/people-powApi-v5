import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AccountTypeEnum, StaffRoleEnum } from '../dto/user.dto';
import { Document, Types } from 'mongoose';

export type UserDocument = User &
  Document & {
    _id: any;
    _doc: any;
  };

@Schema({
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      doc.id = doc._id;
      delete ret._id;
      delete doc._id;
      ret.name = ret.firstName + ' ' + ret.lastName;
      doc.name = doc.firstName + ' ' + doc.lastName;

      return ret;
    },
  },
})
export class User {
  @Prop()
  name: string;
  @Prop()
  googleId: string;
  @Prop()
  facebookId: string;
  @Prop({
    type: String,
    enum: AccountTypeEnum,
    default: AccountTypeEnum.Campaigner,
  })
  accountType: AccountTypeEnum;
  @Prop({ default: 'https://static.vecteezy.com/system/resources/previews/002/002/427/large_2x/man-avatar-character-isolated-icon-free-vector.jpg' })
  image: string;
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
  @Prop({ required: true, default: 'Fill this in!!!' })
  description: string;
  @Prop()
  otherName: string;
  @Prop({ require: true, unique: true })
  email: string;
  @Prop({ require: true })
  password: string;
  @Prop()
  phone: string;
  @Prop()
  emailToken: string;
  @Prop()
  emailVerified: boolean;
  @Prop({ default: true })
  isActive: boolean;
  @Prop({
    type: String,
    enum: StaffRoleEnum,
    default: StaffRoleEnum.User,
  })
  role: StaffRoleEnum;
  @Prop()
  address: string;
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  reps: User[];
  @Prop({ type: Types.ObjectId, ref: 'User' })
  suppervisor: User;
  @Prop()
  reportCount: number;
  @Prop()
  applicantCount: number;
  @Prop()
  bankName: string;
  @Prop()
  accountNumber: string;
  @Prop()
  accountName: string;
  @Prop({ require: true })
  country: string;
  @Prop({ require: true })
  state: string;
  @Prop({ require: true })
  city: string;
  @Prop({ type: Date, default: Date.now })
  lastSeen: Date;
  @Prop()
  followers: string[];
  @Prop()
  following: string[];
  @Prop({ default: [] }) //Organsations user is gonna be an editor or admin
  orgOperating: string[];
  @Prop({ default: 0 })
  followersCount: number;
  @Prop({ default: 0 })
  followingCount: number;
  @Prop({ default: false })
  createdOrg: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
