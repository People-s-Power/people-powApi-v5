import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertResolver } from './advert.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Advert, AdvertSchema } from './schema/advert';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { orgnaization, orgnaizationSchema } from 'src/organization/schema/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Advert.name, schema: AdvertSchema },
      { name: User.name, schema: UserSchema },
      { name: orgnaization.name, schema: orgnaizationSchema }
    ])
  ],
  providers: [AdvertResolver, AdvertService]
})
export class AdvertModule {}
