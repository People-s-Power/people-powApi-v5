import { Document } from 'mongoose';
export declare enum StaffRoleEnum {
    Admin = "Admin",
    Editor = "Editor"
}
export declare class IOrg extends Document {
    _doc: any;
    author: string;
    name: string;
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
    state: string;
}
export interface Ioperators {
    userId: string;
    role: StaffRoleEnum;
}
export declare class createOperator {
    userId: string;
    role: StaffRoleEnum;
    orgId: string;
}
export interface IcreateOperator {
    userId: string;
    role: StaffRoleEnum;
    orgId: string;
}
export interface Ioperators {
    userId: string;
    role: StaffRoleEnum;
}
export declare class CreateOrgDTO {
    uploadImage: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    country: string;
    city: string;
    website: string;
    author: string;
}
export interface ICreateOrgDTO {
    uploadImage: string;
    name: string;
    email: string;
    phone: string;
    description: string;
    country: string;
    city: string;
    website: string;
}
export declare class createOperators {
    userId: string;
    role: StaffRoleEnum;
}
export declare class UpdateOrgDTO {
    name: string;
    linkedIn: string;
    facebook: string;
    orgId: string;
    email: string;
    phone: string;
    instagram: string;
    twitter: string;
    country: string;
    state: string;
}
export interface IUploadImage {
    img: string;
    orgId: string;
}
