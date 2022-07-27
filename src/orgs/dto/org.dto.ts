import { Document } from 'mongoose';
// import { CampaignDocument } from 'src/campaign/schema/campaign.schema';

export enum StaffRoleEnum {
  Admin = 'Admin',
  Editor = 'Editor'
}

export class IOrg extends Document {
  _doc: any;
  author: string;
  orgName: string;
  linkedIn: string;
  facebook: string;
  image: string;
  email: string;
  password: string;
  phone: string;
  instagram: string;
  twitter: string;
  following: string[];
  followers: string[];
  followersCount: number;
  followingCount: number;
  operators: Ioperators[];
  country: string;
  state: string
}

export interface Ioperators {
  userId: string;
  role: StaffRoleEnum;
}


export class CreateOrgDTO {
  image: string;
  orgName: string;
  email: string;
  phone: string;
  description: string;
}

export interface ICreateOrgDTO {
  image: string;
  orgName: string;
  email: string;
  phone: string;
  description: string;
}

export class createOperators {
  userId: string;
  role: StaffRoleEnum;
}

export class UpdateOrgDTO {
  orgName: string;
  linkedIn: string;
  facebook: string;
  email: string;
  phone: string;
  instagram: string;
  twitter: string;
  country: string;
  state: string
}