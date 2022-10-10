import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { PetitionDocument } from 'src/petition/schema/petition.schema';
import { IGeo } from 'src/interfaces';
import { User, UserDocument } from '../entity/user.schema';

export enum StaffRoleEnum {
  Admin = 'Admin',
  Rep = 'Rep',
  LegalWorld = 'LegalWorld',
  Lawyer = 'Lawyer',
  Draft = 'Draft',
  Supervisor = 'Supervisor',
  Campaigner = 'Campaigner',
  User = 'User',
}

export enum AccountTypeEnum {
  Campaigner = 'Campaigner',
  Staff = 'Staff',
  Applicant = 'Applicant',
  Contact = 'Contact',
}

export class IUser extends Document {
  _doc: any;
  name: string;
  googleId: string;
  facebookId: string;
  accountType: AccountTypeEnum;
  image: string;
  firstName: string;
  lastName: string;
  otherName: string;
  email: string;
  password: string;
  phone: string;
  emailToken: string;
  emailVerified: boolean;
  isActive: boolean;
  role: StaffRoleEnum;
  address: string;
  admin: IUser;
  userId: IUser;
  reportCount: number;
  applicantCount: number;
  bankName: string;
  accountNumber: string;
  accountName: string;
  country: string;
  state: string;
  city: string;
}

export class RegisterWithEmailDTO {
  image: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  password: string;
  otherName?: string;
  phone?: string;
  country?: string;
  state?: string;
  city?: string;
  location: IGeo;
}

export class RegisterWithGoogleDTO extends PartialType(RegisterWithEmailDTO) {
  googleId: string;
}

export class LoginWithEmailDTO {
  email: string;
  phone: string;
  password: string;
}
export class LoginWithGoogleDTO {
  email: string;
  googleId: string;
}

export class UpdateUserDTO {
  name?: string;
  id: string;
  accountType: AccountTypeEnum;
  image?: string;
  firstName?: string;
  description: string;
  lastName?: string;
  otherName?: string;
  phone?: string;
  address?: string;
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  country?: string;
  state?: string;
  city?: string;
}

export class AssignUserAdminDTO {
  user_id: string;
  admin_id: string;
}

export class ChangeUserRoleDTO {
  user_id: string;
  role: string;
}

export class ChangeUserAccountTypeDTO {
  user_id: string;
  accountType: string;
}

export class ChangePasswordDTO {
  id: string;
  oldPassword: string;
  newPassword: string;
}

export class UserAndCampDTO {
  user: UserDocument;
  campaigns: PetitionDocument;
}