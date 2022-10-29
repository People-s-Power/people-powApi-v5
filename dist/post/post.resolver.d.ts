import { UserDocument } from 'src/user/entity/user.schema';
import { PostService } from './post.service';
import { PostDocument } from './schema/post.schema';
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(limit: number): Promise<PostDocument[]>;
    getPost(id: string): Promise<PostDocument>;
    createPost({ body, imageFile }: {
        body: any;
        imageFile: any;
    }, user: UserDocument): Promise<PostDocument>;
}
