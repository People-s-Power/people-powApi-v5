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
    updatePost({ body, postId, authorId }: {
        body: any;
        postId: any;
        authorId: any;
    }, user: UserDocument): Promise<PostDocument>;
    updateImg({ imageFile, postId, authorId, }: {
        imageFile: any;
        postId: any;
        authorId: any;
    }): Promise<any>;
    deletePost({ postId, authorId, }: {
        postId: any;
        authorId: any;
    }): Promise<import("mongodb").DeleteResult>;
}
