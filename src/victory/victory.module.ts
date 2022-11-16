import { Module } from '@nestjs/common';
import { VictoryService } from './victory.service';
import { VictoryResolver } from './victory.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Victory, VictorySchema } from './entities/victory.entity';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { orgnaization, orgnaizationSchema } from 'src/organization/schema/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Victory.name, schema: VictorySchema },
      { name: User.name, schema: UserSchema },
      { name: orgnaization.name, schema: orgnaizationSchema }
    ])
  ],
  providers: [VictoryResolver, VictoryService]
})
export class VictoryModule {}
