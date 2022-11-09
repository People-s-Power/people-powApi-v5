import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import console from 'console';
import { Model } from 'mongoose';
import { IOrg } from 'src/organization/schema/organization.dto';
import { organizationDocument } from 'src/organization/schema/organization.schema';
import { Petition, PetitionDocument } from 'src/petition/schema/petition.schema';
import { IUser } from 'src/user/dto/user.dto';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreatePostDTO, IPostDTO, UpdatePostDTO } from './schema/post.dto';
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

        // const author: Partial<IUser | IOrg> = post.author || post.org

        return posts.map(post => {
          return {
            ...post._doc,
            author: {
              _id: post.author._id || post.org._id,
              name: post.author.name || post.org.name,
              email: post.author.email || post.org.email,
              image: post.author.image || post.org.image
            },
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


  async user(userId): Promise<Post[]> {
    try {
      const posts = await this.postModel.find()
      const userPost = await posts.filter(item => item.author._id.toString() === userId)
      return userPost
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

  async update({ body, postId, authorId }: UpdatePostDTO) {
    try {
      const post = await this.postModel.findById(postId)
        .populate('author')
        .populate('petition')

        const author: Partial<UserDocument | organizationDocument> = post.author || post.org
      if(author?._id.toString() !== authorId) throw new UnauthorizedException('Your not allowed to update')
      

      post.body = body

      await post.save()

      return {
        ...post._doc,
        author: {
          _id: author._id,
          name: author.name,
          email: author.email,
          image: author.image
        },
        shares: post.shares.length,
        likes: post.likes.length
      }

    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async image(imageFile: string, postId, authorId) {
    try {

      const post = await this.postModel.findById(postId)
        .populate('author')
        .populate('org')
        .populate('petition')

      const author: Partial<UserDocument | organizationDocument> = post.author || post.org
      console.log({
        author: author._id,
        authorId
      })
      if(author?._id.toString() !== authorId) throw new UnauthorizedException('Your not allowed to update')

      const image = await cloudinaryUpload(imageFile).catch((err) => {
        throw err;
      });

      post.image = image

      await post.save()

      return {
        ...post._doc,
        author: {
          _id: author._id,
          name: author.name,
          email: author.email,
          image: author.image
        },
        shares: post.shares.length,
        likes: post.likes.length
      }

    } catch (error) {
      console.log(error)
      throw error
    }
  }


  async delete(postId, authorId) {
    try {
      const post = await this.postModel.findById(postId)
      if(!post) throw new BadRequestException(`Post don't exist`)

      const author: Partial<UserDocument | organizationDocument> = post.author || post.org
      if(author?._id.toString() !== authorId) throw new UnauthorizedException('Your not allowed to delete')

      const del = await this.postModel.deleteOne({_id: postId})
      return del
    } catch (error) {
      throw error
    }
  }

}
