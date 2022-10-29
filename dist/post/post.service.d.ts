import { Model } from 'mongoose';
import { PetitionDocument } from 'src/petition/schema/petition.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreatePostDTO } from './schema/post.dto';
import { PostDocument } from './schema/post.schema';
export declare class PostService {
    private readonly postModel;
    private readonly userModel;
    private readonly PetitionModel;
    constructor(postModel: Model<PostDocument>, userModel: Model<UserDocument>, PetitionModel: Model<PetitionDocument>);
    findAll(limit?: number): Promise<PostDocument[]>;
    findOne(postId: any): Promise<any>;
    create({ body, user, imageFile }: CreatePostDTO): Promise<PostDocument>;
}
