import { Document } from "mongoose";
import { IPetition } from "src/petition/dto/petition.dto";
import { IUser } from "src/user/dto/user.dto";
export declare class IPostDTO extends Document {
    body: string;
    petition: IPetition;
    author: IUser;
    likes: number;
    comments: PostCommentDTO[];
    shares: number;
    isPetition: boolean;
    image: string;
}
export declare class CreatePostDTO {
    body: string;
    imageFile: string;
    user: IUser;
}
export declare class UpdatePostDTO {
    body: string;
    userId: string;
    postId: string;
}
export declare class PostCommentDTO {
    author: string;
    body: string;
}
