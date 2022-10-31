import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLoginGuard } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { PostService } from './post.service';
import { PostDocument } from './schema/post.schema';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query()
  async getPosts(@Args('limit') limit: number): Promise<PostDocument[]> {
    const posts = await this.postService.findAll(limit)
    return posts
  }

  @Query()
  async getPost(@Args('id') id: string): Promise<PostDocument> {
    const post = await this.postService.findOne(id)

    return post
  }

  @UseGuards()
  @Query()
  async myPosts(@CurrentUser() user: UserDocument) {
    const userId = user._id.toString()
    const posts = await this.postService.user(userId)
    return posts
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async createPost(@Args() { body, imageFile }, @CurrentUser() user: UserDocument): Promise<PostDocument> {
    const post = await this.postService.create({ body, imageFile, user })
    return post
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async updatePost(@Args() { body, postId }, @CurrentUser() user: UserDocument): Promise<PostDocument> {
    const userId = user._id.toString()
    const post = await this.postService.update({ body, postId, userId })
    return post
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async updateImg(@Args() { imageFile, postId }, @CurrentUser() user: UserDocument) {
    const post = await this.postService.image(imageFile, postId, user._id)
    return post
  }
}
