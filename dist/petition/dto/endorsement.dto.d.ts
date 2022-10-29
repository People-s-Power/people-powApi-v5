import { Document } from 'mongoose';
import { IUser } from 'src/user/dto/user.dto';
import { IPetition } from './petition.interface';
export declare class CreateEndorsementDTO {
    petition: string;
    body: string;
}
export declare class UpdateEndorsementDTO {
    id: string;
    body: string;
}
export declare class LikeEndorsementDTO {
    id: string;
}
export declare class IEndorsement extends Document {
    author: IUser;
    petition: IPetition;
    body: string;
    likes: string[];
}
