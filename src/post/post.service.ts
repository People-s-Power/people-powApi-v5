import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Petition, PetitionDocument } from 'src/petition/schema/petition.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreatePostDTO, IPostDTO } from './schema/post.dto';
import { Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Petition.name)
    private readonly PetitionModel: Model<PetitionDocument>,
  ){}


  async findAll(limit?: number): Promise<PostDocument[]> {
    try {
      const posts = await this.postModel
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('author')
        .populate('petition')

        return posts.map(post => {
          return {
            ...post._doc,
            shares: post.shares.length,
            likes: post.likes.length
          }
        })
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async findOne(postId) {
    try {
      const post = await this.postModel.findById(postId)
      .populate('author')
      .populate('petition')

      if (!post) throw new NotFoundException('Post not Found')

      return {
        ...post._doc,
        shares: post.shares.length,
        likes: post.likes.length
      }
    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async create({ body, user, imageFile }: CreatePostDTO): Promise<PostDocument> {
    const image = await cloudinaryUpload(imageFile).catch((err) => {
      throw err;
    });
    try {
        const petition = await this.PetitionModel.create({
          title: 'fill',
          category: 'fill',
          aim: 'fill',
          target: 'fill',
          body: 'fill',
          authorId: user.id,
          authorName: user.name,
          authorImg: user.image || 'No img',
          excerpt: 'Fill',
          image,
          slug: body.split(" ").join("-").toLowerCase(),
          numberOfPaidEndorsementCount: 0,
          numberOfPaidViewsCount: 0,
          region: user.country,
        })

        const post = await this.postModel.create({
          body,
          image,
          author: user,
          petition: petition,
        })

        return post
    } catch (error) {
      console.log()
      throw error
    }
  }
}
