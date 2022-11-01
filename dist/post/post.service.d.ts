import { Model } from 'mongoose';
import { PetitionDocument } from 'src/petition/schema/petition.schema';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreatePostDTO, UpdatePostDTO } from './schema/post.dto';
import { Post, PostDocument } from './schema/post.schema';
export declare class PostService {
    private readonly postModel;
    private readonly userModel;
    private readonly PetitionModel;
    constructor(postModel: Model<PostDocument>, userModel: Model<UserDocument>, PetitionModel: Model<PetitionDocument>);
    findAll(limit?: number): Promise<PostDocument[]>;
    findOne(postId: any): Promise<any>;
    user(userId: any): Promise<Post[]>;
    create({ body, user, imageFile }: CreatePostDTO): Promise<PostDocument>;
    update({ body, postId, authorId }: UpdatePostDTO): Promise<any>;
    image(imageFile: string, postId: any, authorId: any): Promise<any>;
    delete(postId: any, authorId: any): Promise<import("mongodb").DeleteResult>;
}
