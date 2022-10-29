import { Document } from 'mongoose';
import { IEndorsement } from './endorsement.dto';
export declare class CreatePetitionDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
}
export declare class IPetition extends Document {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    slug: string;
    status: string;
    authorId: string;
    authorName: string;
    authorImg: string;
    addedFrom: string;
    numberOfPaidViewsCount: number;
    numberOfPaidEndorsementCount: number;
    endorsements: IEndorsement[];
    likes: string[];
    promoted: boolean;
    views: string[];
    region: string;
}
export declare class CreatePetitionOrgDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    authorId: string;
    authorName: string;
    authorImg: string;
    country: string;
}
declare const UpdatePetitionDTO_base: import("@nestjs/common").Type<Partial<CreatePetitionDTO>>;
export declare class UpdatePetitionDTO extends UpdatePetitionDTO_base {
    id: string;
}
export {};
