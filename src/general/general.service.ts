import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Advert, AdvertDocument } from 'src/advert/schema/advert';
import { EventDocument, event } from 'src/event/schema/event';
import { organizationDocument, orgnaization } from 'src/organization/schema/organization.schema';
import { Petition, PetitionDocument } from 'src/petition/schema/petition.schema';
import { Update, UpdateDocument } from 'src/petition/schema/update.schema';
import { PostDocument, Post} from 'src/post/schema/post.schema';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { Victory, VictoryDocument } from 'src/victory/entities/victory.entity'
@Injectable()
export class GeneralService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Update.name)
    private readonly UpdateModel: Model<UpdateDocument>,
    @InjectModel(Advert.name) private readonly advertModel: Model<AdvertDocument>,
    @InjectModel(orgnaization.name) private readonly orgModel: Model<organizationDocument>,
    @InjectModel(event.name) private readonly eventModel: Model<EventDocument>,
    @InjectModel(Petition.name) private readonly PetitionModel: Model<PetitionDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Victory.name) private readonly VictoryModel: Model<VictoryDocument>,
    
  ){}

  findAll() {
    return `This action returns all general`;
  }

  async like(itemId, authorId) {
    const [
      petition,
      victory,
      advert,
      event,
      post,
      update
    ] = await Promise.all([
      this.PetitionModel.findById(itemId),
      this.VictoryModel.findById(itemId),
      this.advertModel.findById(itemId),
      this.eventModel.findById(itemId),
      this.postModel.findById(itemId),
      this.UpdateModel.findById(itemId)
    ]).catch((e) => {
      throw new Error(`Can't find activity`);
    });

    if (petition) {
      const liked = this.checkIfLiked(petition.likes, authorId, itemId)
      if (liked) return liked
      petition.likes.push(authorId)
      await petition.save()
      return 'Sucess'
    }

    if (victory) {
      const liked = this.checkIfLiked(victory.likes, authorId, itemId)
      if (liked) return liked
      victory.likes.push(authorId)
      await victory.save()
      return 'Sucess'
    }

    if (advert) {
      const liked = this.checkIfLiked(advert.likes, authorId, itemId)
      if (liked) return liked
      advert.likes.push(authorId)
      await advert.save()
      return 'Sucess'
    }

    if (event) {
      const liked = this.checkIfLiked(event.likes, authorId, itemId)
      if (liked) return liked
      event.likes.push(authorId)
      await event.save()
      return 'Sucess'
    }

    if (post) {
      const liked = this.checkIfLiked(post.likes, authorId, itemId)
      if (liked) return liked
      post.likes.push(authorId)
      await post.save()
      return 'Sucess'
    }

    if (update) {
      const liked = this.checkIfLiked(update.likes, authorId, itemId)
      if (liked) return liked
      update.likes.push(authorId)
      await update.save()
      return 'Sucess'
    }

    return 'Failed'


  }

  async unlike(itemId, authorId) {
    const [
      petition,
      victory,
      advert,
      event,
      post,
      update
    ] = await Promise.all([
      this.PetitionModel.findById(itemId),
      this.VictoryModel.findById(itemId),
      this.advertModel.findById(itemId),
      this.eventModel.findById(itemId),
      this.postModel.findById(itemId),
      this.UpdateModel.findById(itemId)
    ]).catch((e) => {
      throw new Error(`Can't find activity`);
    });

    console.log('Unliked')
    if (petition) {
      const updatedLikes = this.updateLikes(petition.likes, authorId)
      petition.likes = updatedLikes
      await petition.save()
      return 'Unliked!!'
    }

    if (victory) {
      const updatedLikes = this.updateLikes(victory.likes, authorId)
      victory.likes = updatedLikes
      await victory.save()
      return 'Unliked!!'
    }

    if (advert) {
      const updatedLikes = this.updateLikes(advert.likes, authorId)
      advert.likes = updatedLikes
      await advert.save()
      return 'Unliked!!'
    }

    if (event) {
      const updatedLikes = this.updateLikes(event.likes, authorId)
      event.likes = updatedLikes
      await event.save()
      return 'Unliked!!'
    }

    if (post) {
      const updatedLikes = this.updateLikes(post.likes, authorId)
      post.likes = updatedLikes
      await post.save()
      return 'Unliked!!'
    }

    if (update) {
      const liked = this.updateLikes(update.likes, authorId)
      if (liked) return liked
      update.likes.push(authorId)
      await update.save()
      return 'Sucess'
    }

    return 'Failed!'
  }

  checkIfLiked(list: string[], authorId, itemId): string {
    const liked = list.find(item => item.toString() === authorId.toString())
    if (liked) {
      this.unlike(itemId, authorId)
    }
    return liked
  }
  updateLikes(list: string[], authorId: string): string[] {
    const unliked = list.filter(item => item.toString() !== authorId.toString())
    return unliked
  }


  async addFollowers(id, userId) {
    try {

      // Find user
      // const user = await this.userModel.findById(userId)
      const [user, org] = await Promise.all([
        this.userModel.findById(userId),
        this.orgModel.findById(userId)
      ]).catch(e => {
        throw new NotFoundException('User or org not found')
      }) 

      if (user) {
        
        // Check if user is already following
        const res = user.followers.find(item => item.toString() === id.toString())
        if(res) {
          this.unFollow(id, userId)
          return
        }
        
        // Add the followed user to the followers following Array
        const [userFollower, orgFollower] = await Promise.all([
          this.userModel.findById(id),
          this.orgModel.findById(id)
        ]).catch(e => {
          throw new NotFoundException('User or org not found')
        }) 

        if (userFollower) {
          let { following } = userFollower
          following.push(userId)
          await userFollower.save()
        }

        if (orgFollower) {
          let { following } = orgFollower
          following.push(userId)
          await orgFollower.save()
        }
  
        // Push in new follower
        const { followers } = user
        const fx = followers
        fx.push(id)
  
        // Save new follower
        user.followers = fx
        await user.save()
      
        return 'Followed'
      }

      if (org) {
        
        // Check if user is already following
        const res = org.followers.find(item => item.toString() === id.toString())
        if(res) throw new BadRequestException('User already following')
        
        // Add the followed user to the followers following Array
        const [userFollower, orgFollower] = await Promise.all([
          this.userModel.findById(id),
          this.orgModel.findById(id)
        ]).catch(e => {
          throw new NotFoundException('User or org not found')
        }) 
        
        if (userFollower) {
          let { following } = userFollower
          following.push(userId)
          await userFollower.save()
        }

        if (orgFollower) {
          let { following } = orgFollower
          following.push(userId)
          await orgFollower.save()
        }
  
        // Push in new follower
        const { followers } = org
        const fx = followers
        fx.push(id)
  
        // Save new follower
        org.followers = fx
        await org.save()
      
        return 'Followed'
      }
      return 'Failed'
    } catch (error) {
      throw error
    }
  }


  async unFollow(id, userId) {
    try {
      
      // Check if user exists Allways!!!
      const [user, org] = await Promise.all([
        this.userModel.findById(userId),
        this.orgModel.findById(userId)
      ]).catch(e => {
        throw new NotFoundException('User or org not found')
      })

      // Unfollow the user
      const userIsFollowing =  user.followers.filter(item => item !== id)
      user.followers = userIsFollowing
      await user.save()

      // Remove user from following
      const unFollowedUser = await this.userModel.findById(id)
      const followers = unFollowedUser.following.filter(item => item !== userId)
      unFollowedUser.following = followers

      await unFollowedUser.save() 

      return 'payload'
    } catch (error) {
      throw error
    }

  }


  // '636b50787cfaa1ad9a32be9b',
  // '636b50787cfaa1ad9a32be9b',
  // '636bb418317398fb86032f42',
  // '634424f8f59e9b33f6eaa1e8'


  async timeLine(authorId) {
    console.log(authorId)
    const [user, org] = await Promise.all([
      this.userModel.findById(authorId),
      this.orgModel.findById(authorId)
    ]).catch(e => {
      throw new NotFoundException('User or org not found')
    })

    try {

      if (user) {
        const following = [...user.following, authorId]
        console.log(following)
        const [
          victoriesItems,
          advertsItems,
          postsItems,
          petitionsItems,
          eventsItems,
          updates
        ] = await Promise.all([
          this.VictoryModel.find({authorId: { $in: following }})
          .sort({ createdAt: 'desc' }),
          this.advertModel.find({authorId: { $in: following }}),
          this.postModel.find({author: { $in: following }}).populate('author', 'petition'),
          this.PetitionModel.find({authorId: { $in: following }}),
          this.eventModel.find({authorId: { $in: following }}),
          this.UpdateModel.find({authorId: { $in: following }}).populate('petition')
        ])
        const posts = postsItems.map(post => {
          console.log(post)
          return {
            ...post._doc,
            author: {
              _id: post.author._id || post.org._id,
              name: post.author.name || post.org.name,
              email: post.author.email || post.org.email,
              image: post.author.image || post.org.image
            },
            shares: post.shares,
            likes: post.likes
          }
        })
        const petitions = petitionsItems.map(petition => {
          return {
            ...petition._doc,
            author: {
              _id: petition.authorId,
              name: petition.authorName,
              email: '',
              image: petition.authorImg
            },
            shares: petition.shares,
            likes: petition.likes
          }
        })
        const adverts = await Promise.all(
          advertsItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares,
              likes: item.likes
            }
          })
        )
        const events = await Promise.all(
          eventsItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares.length,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares.length,
              likes: item.likes
            }
          })
        )

        const victories = await Promise.all(
          victoriesItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares.length,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares.length,
              likes: item.likes
            }
          })
        )



        return  {
          adverts,
          events,
          petitions,
          posts,
          victories,
          updates
        }
      }
  
      if (org) {
        const following = [...org.following, authorId]
        const [
          victoriesItems,
          advertsItems,
          postsItems,
          petitionsItems,
          eventsItems,
          updates
        ] = await Promise.all([
          this.VictoryModel.find({authorId: { $in: following }})
          .sort({ createdAt: 'desc' }),
          this.advertModel.find({authorId: { $in: following }}),
          this.postModel.find({author: { $in: following }}).populate('author', 'petition'),
          this.PetitionModel.find({authorId: { $in: following }}),
          this.eventModel.find({authorId: { $in: following }}),
          this.UpdateModel.find({authorId: { $in: following }}).populate('petition')
        ])
        const posts = postsItems.map(post => {
          return {
            ...post._doc,
            author: {
              _id: post.author._id || post.org._id,
              name: post.author.name || post.org.name,
              email: post.author.email || post.org.email,
              image: post.author.image || post.org.image
            },
            shares: post.shares,
            likes: post.likes
          }
        })
        const petitions = petitionsItems.map(petition => {
          return {
            ...petition._doc,
            author: {
              _id: petition.authorId,
              name: petition.authorName,
              email: '',
              image: petition.authorImg
            },
            shares: petition.shares,
            likes: petition.likes
          }
        })
        const adverts = await Promise.all(
          advertsItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares,
              likes: item.likes
            }
          })
        )
        const events = await Promise.all(
          eventsItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares.length,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares.length,
              likes: item.likes
            }
          })
        )

        const victories = await Promise.all(
          victoriesItems.map(async item => {
            if (item.author === 'User') {
              const user = await this.userModel.findById(item.authorId)
              return {
                ...item._doc,
                author: {
                  _id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image
                },
                shares: item.shares.length,
                likes: item.likes
              }
            }
            const org = await this.orgModel.findById(item.authorId)
            return {
              ...item._doc,
              author: {
                _id: org._id,
                name: org.name,
                email: org.email,
                image: org.image
              },
              shares: item.shares.length,
              likes: item.likes
            }
          })
        )



        return  {
          adverts,
          events,
          petitions,
          posts,
          victories,
          updates
        }
      }
      
    } catch (error) {
      console.log(error)
    }
  }

}

