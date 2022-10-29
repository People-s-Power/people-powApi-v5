import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { Petition, PetitionSchema } from 'src/petition/schema/petition.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: User.name, schema: UserSchema },
      { name: Petition.name, schema: PetitionSchema }
    ])
  ],
  providers: [PostResolver, PostService]
})
export class PostModule {}
