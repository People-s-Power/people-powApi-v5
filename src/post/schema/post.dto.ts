import { IPetition } from "src/petition/dto/petition.dto";
import { IUser } from "src/user/dto/user.dto";

export class PostDTO {
  body: string;
  petition: IPetition;
  author: IUser;
  
  likes: number;
  comments: PostCommentDTO[]
  shares: number;
  isPetition: boolean
  image: string;
}

export class PostCommentDTO {
  author: IUser;
  body: string;
}