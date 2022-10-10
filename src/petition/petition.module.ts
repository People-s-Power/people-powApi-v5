import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PetitionController } from './controllers/petition.controller';
import { EndorsementController } from './controllers/endorsement.controller';
import { PetitionGateway } from './gateway/petition.gateway';
import { PetitionResolver } from './resolvers/petition.resolver';
import { EndorsementResolver } from './resolvers/endorsement.resolver';
import {
  Petition,
  PetitionSchema,
  View,
  ViewSchema,
} from './schema/petition.schema';
import { Endorsement, EndorsementSchema } from './schema/endorsement.schema';
import { PetitionService } from './services/petition.service';

import { EndorsementService } from './services/endorsement.service';

import mongooseSlug = require('mongoose-slug-generator');
import { User, UserSchema } from 'src/user/entity/user.schema';
import { Notice, NoticeSchema } from 'src/notification/notification.schema';
import config from 'src/utils/config';
import { ClientsModule, Transport } from  "@nestjs/microservices"
import { UpdateService } from './services/update.service';
import { UpdateController } from './controllers/update.controller'
import { Update, UpdateSchema } from './schema/update.schema';
import { ReportCamp, ReportCampSchema } from './schema/reportCamp.schema';
import { ReportCampController } from './controllers/report.controller';
import { ReportCampService } from './services/reportCamp.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      ,
      { name: Endorsement.name, schema: EndorsementSchema },
      { name: User.name, schema: UserSchema },
      { name: Notice.name, schema: NoticeSchema },
      { name: View.name, schema: ViewSchema },
      { name: Update.name, schema: UpdateSchema },
      { name:ReportCamp.name, schema: ReportCampSchema }
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Petition.name,
        useFactory: () => {
          const schema = PetitionSchema;
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
    PetitionResolver,
    PetitionService,
    ReportCampService,
    EndorsementService,
    EndorsementResolver,
    PetitionGateway,
  ],
  controllers: [PetitionController, EndorsementController, UpdateController, ReportCampController],
})
export class PetitionModule {}
