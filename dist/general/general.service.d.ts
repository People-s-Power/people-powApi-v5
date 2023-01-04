import { Model } from 'mongoose';
import { Advert, AdvertDocument } from 'src/advert/schema/advert';
import { EventDocument } from 'src/event/schema/event';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { Petition, PetitionDocument } from 'src/petition/schema/petition.schema';
import { UpdateDocument } from 'src/petition/schema/update.schema';
import { PostDocument, Post } from 'src/post/schema/post.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { Victory, VictoryDocument } from 'src/victory/entities/victory.entity';
export declare class GeneralService {
    private readonly userModel;
    private readonly UpdateModel;
    private readonly advertModel;
    private readonly orgModel;
    private readonly eventModel;
    private readonly PetitionModel;
    private readonly postModel;
    private readonly VictoryModel;
    constructor(userModel: Model<UserDocument>, UpdateModel: Model<UpdateDocument>, advertModel: Model<AdvertDocument>, orgModel: Model<organizationDocument>, eventModel: Model<EventDocument>, PetitionModel: Model<PetitionDocument>, postModel: Model<PostDocument>, VictoryModel: Model<VictoryDocument>);
    findAll(): string;
    like(itemId: any, authorId: any): Promise<string>;
    unlike(itemId: any, authorId: any): Promise<string[] | "Sucess" | "Unliked!!" | "Failed!">;
    checkIfLiked(list: string[], authorId: any, itemId: any): string;
    updateLikes(list: string[], authorId: string): string[];
    addFollowers(id: any, userId: any): Promise<"Failed" | "Followed">;
    unFollow(id: any, userId: any): Promise<string>;
    timeLine(authorId: any): Promise<{
        adverts: (Advert & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        events: (import("mongoose").Document<unknown, any, EventDocument> & import("../event/schema/event.dto").IEvent & Document & {
            _id: any;
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        petitions: (Petition & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        posts: (Post & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
        victories: (Victory & import("mongoose").Document<any, any, any> & {
            _doc: any;
        } & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
