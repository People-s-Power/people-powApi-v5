import { Model } from 'mongoose';
import { AdvertDocument } from 'src/advert/schema/advert';
import { EventDocument } from 'src/event/schema/event';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { PetitionDocument } from 'src/petition/schema/petition.schema';
import { PostDocument } from 'src/post/schema/post.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { VictoryDocument } from 'src/victory/entities/victory.entity';
export declare class GeneralService {
    private readonly userModel;
    private readonly advertModel;
    private readonly orgModel;
    private readonly eventModel;
    private readonly PetitionModel;
    private readonly postModel;
    private readonly VictoryModel;
    constructor(userModel: Model<UserDocument>, advertModel: Model<AdvertDocument>, orgModel: Model<organizationDocument>, eventModel: Model<EventDocument>, PetitionModel: Model<PetitionDocument>, postModel: Model<PostDocument>, VictoryModel: Model<VictoryDocument>);
    findAll(): string;
    like(itemId: any, authorId: any): Promise<string>;
    unlike(id: number): string;
    checkIfLiked(list: string[], authorId: any): string;
    remove(id: number): string;
}
