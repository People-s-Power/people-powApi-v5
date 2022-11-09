import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { event, eventSchema } from './schema/event';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { orgnaization, orgnaizationSchema } from 'src/organization/schema/organization.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: event.name, schema: eventSchema },
      { name: User.name, schema: UserSchema },
      { name: orgnaization.name, schema: orgnaizationSchema }
    ])
  ],
  providers: [EventResolver, EventService]
})
export class EventModule {}
