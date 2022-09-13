import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './controllers/user.controller';
import { FollowerController } from './controllers/follower.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './services/user.service';
import { FollowersService } from './services/follower.service';
import { Campaign, CampaignSchema } from 'src/campaign/schema/campaign.schema';
import { Follower, FollowerSchema } from './entity/followers.schema';
import { User, UserSchema} from './entity/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      { name: Campaign.name, schema: CampaignSchema },
      { name: Follower.name, schema: FollowerSchema }
    ]),
    CacheModule.register(),
  ],
  providers: [
    UserResolver,
    UserService,
    FollowersService
  ],
  controllers: [UserController, FollowerController],
})
export class UserModule {}
