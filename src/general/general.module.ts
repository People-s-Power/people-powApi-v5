import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralResolver } from './general.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { eventSchema, event } from 'src/event/schema/event';
import { User, UserSchema } from 'src/user/entity/user.schema';
import { orgnaization, orgnaizationSchema } from 'src/organization/schema/organization.schema';
import { Advert, AdvertSchema } from 'src/advert/schema/advert';
import { Petition, PetitionSchema, View, ViewSchema } from 'src/petition/schema/petition.schema';
import { Post, PostSchema } from 'src/post/schema/post.schema';
import { Victory, VictorySchema } from 'src/victory/entities/victory.entity';
import { AdvertService } from 'src/advert/advert.service';
import { EventService } from 'src/event/event.service';
import { PetitionService } from 'src/petition/services/petition.service';
import { PostService } from 'src/post/post.service';
import { VictoryService } from 'src/victory/victory.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import config from 'src/utils/config';
import { Notice, NoticeSchema } from 'src/notification/notification.schema';
import { Update, UpdateSchema } from 'src/petition/schema/update.schema';
import { ReportCamp, ReportCampSchema } from 'src/petition/schema/reportCamp.schema';
import { Endorsement, EndorsementSchema } from 'src/petition/schema/endorsement.schema';
import { PetitionGateway } from 'src/petition/gateway/petition.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: event.name, schema: eventSchema },
      { name: User.name, schema: UserSchema },
      { name: orgnaization.name, schema: orgnaizationSchema },
      { name: Advert.name, schema: AdvertSchema },
      { name: Petition.name, schema: PetitionSchema },
      { name: Post.name, schema: PostSchema },
      { name: Victory.name, schema: VictorySchema },
      { name: Notice.name, schema: NoticeSchema },
      { name: View.name, schema: ViewSchema },
      { name: Update.name, schema: UpdateSchema },
      { name: Endorsement.name, schema: EndorsementSchema },
      { name:ReportCamp.name, schema: ReportCampSchema }
    ]),
    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.RMQ_URL],
          queue: 'mail_queue',
          noAck: false,
          queueOptions: {
            durable: false
          },
        },
      },
    ])
  ],
  providers: [
    GeneralResolver,
    GeneralService,
    AdvertService,
    EventService,
    PetitionService,
    PostService,
    VictoryService,
    PetitionGateway
  ]
})
export class GeneralModule {}
