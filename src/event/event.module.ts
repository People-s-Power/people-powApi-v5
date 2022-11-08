import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventResolver } from './event.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { event, eventSchema } from './schema/event';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: event.name, schema: eventSchema }
    ])
  ],
  providers: [EventResolver, EventService]
})
export class EventModule {}
