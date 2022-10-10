import { User } from 'src/user/entity/user.schema';
import { Document } from 'mongoose';
export declare enum PetitionStatusEnum {
    Active = "Active",
    Pending = "Pending",
    Finished = "Finished",
    Draft = "Draft",
    Promoted = "Promoted"
}
export declare enum PetitionSocketEnum {
    Created = "created-Petition",
    Endorsed = "endorsed-Petition",
    Liked = "liked-Petition",
    Shared = "shared-Petition",
    Promoted = "promoted-Petition",
    Deleted = "deleted-Petition",
    Get = "get-Petitions",
    Send = "send-endorsements"
}
export interface ISendEndorsement {
    petitionId: string;
    endorserId: string;
    endorserName: string;
}
export interface IPetition extends Document {
    _doc: any;
    title: string;
    video: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    slug: string;
    excerpt: string;
    status: PetitionStatusEnum;
    author: User;
    createdAt: Date;
    updatedAt: Date;
    addedFrom: string;
    category: string;
    endorsements: IEndorsement[];
    endorsementCount: number;
    likes: string[];
    likeCount: number;
}
export interface IEndorsement extends Document {
    _doc: any;
    author: User;
    petition: IPetition | string;
    likes: string[];
    body: string;
    createdAt: Date;
    updatedAt: Date;
    likeCount: number;
}
export interface IPetitionNotice {
    action: string;
    author: User;
    data: IPetition;
    createdAt: Date;
    read: boolean;
}
