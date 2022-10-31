import { UserDocument } from 'src/user/entity/user.schema';
import { PostService } from './post.service';
import { PostDocument } from './schema/post.schema';
export declare class PostResolver {
    private readonly postService;
    constructor(postService: PostService);
    getPosts(limit: number): Promise<PostDocument[]>;
    getPost(id: string): Promise<PostDocument>;
    myPosts(user: UserDocument): Promise<import("./schema/post.schema").Post[]>;
    createPost({ body, imageFile }: {
        body: any;
        imageFile: any;
    }, user: UserDocument): Promise<PostDocument>;
    updatePost({ body, postId }: {
        body: any;
        postId: any;
    }, user: UserDocument): Promise<PostDocument>;
    updateImg({ imageFile, postId }: {
        imageFile: any;
        postId: any;
    }, user: UserDocument): Promise<any>;
}
