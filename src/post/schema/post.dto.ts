import { Document, ObjectId } from "mongoose";
import { IPetition } from "src/petition/dto/petition.dto";
import { IUser } from "src/user/dto/user.dto";

export class IPostDTO  extends Document{
  body: string;
  petition: IPetition;
  author: IUser;
  likes: number;
  comments: PostCommentDTO[]
  shares: number;
  isPetition: boolean
  image: string;
}

export class CreatePostDTO {
  body: string;
  imageFile: string;
  user: IUser;
}

export class PostCommentDTO {
  author: string;
  body: string;
}