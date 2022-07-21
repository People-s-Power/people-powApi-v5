import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampaignController } from './controllers/campaign.controller';
import { EndorsementController } from './controllers/endorsement.controller';
import { CampaignGateway } from './gateway/campaign.gateway';
import { CampaignResolver } from './resolvers/campaign.resolver';
import { EndorsementResolver } from './resolvers/endorsement.resolver';
import {
  Campaign,
  CampaignSchema,
  View,
  ViewSchema,
} from './schema/campaign.schema';
import { Endorsement, EndorsementSchema } from './schema/endorsement.schema';
import { CampaignService } from './services/campaign.service';

import { EndorsementService } from './services/endorsement.service';

import mongooseSlug = require('mongoose-slug-generator');
import { User, UserSchema } from 'src/user/entity/user.schema';
import { Notice, NoticeSchema } from 'src/notification/notification.schema';
import config from 'src/utils/config';
import { ClientsModule, Transport } from  "@nestjs/microservices"
import { UpdateService } from './services/update.service';
import { UpdateController } from './controllers/update.controller'
import { Update, UpdateSchema } from './schema/update.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: Endorsement.name, schema: EndorsementSchema },
      { name: User.name, schema: UserSchema },
      { name: Notice.name, schema: NoticeSchema },
      { name: View.name, schema: ViewSchema },
      { name: Update.name, schema: UpdateSchema }
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Campaign.name,
        useFactory: () => {
          const schema = CampaignSchema;
          schema.plugin(mongooseSlug);
          return schema;
        },
      },
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
    UpdateService,
    CampaignResolver,
    CampaignService,
    EndorsementService,
    EndorsementResolver,
    CampaignGateway,
  ],
  controllers: [CampaignController, EndorsementController, UpdateController],
})
export class CampaignModule {}
