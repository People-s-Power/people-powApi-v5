import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Affidavit,
  AffidavitSchema,
} from 'src/applicant/schema/affidavit.schema';
import {
  Applicant,
  ApplicantSchema,
} from 'src/applicant/schema/applicant.shema';
import {
  RepComment,
  RepCommentSchema,
  Report,
  ReportSchema,
} from 'src/applicant/schema/report.schema';
import { ApplicantService } from 'src/applicant/services/applicant.service';
import { RepCommentService } from 'src/applicant/services/rep-comment.service';
import { ReportService } from 'src/applicant/services/report.service';
import { User, UserSchema } from './entity/user.schema';
import { UserController } from './controllers/user.controller';
import { FollowerController } from './controllers/follower.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './services/user.service';
import { FollowersService } from './services/follower.service';
import { Campaign, CampaignSchema } from 'src/campaign/schema/campaign.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Applicant.name,
        schema: ApplicantSchema,
      },
      { name: Report.name, schema: ReportSchema },
      { name: Affidavit.name, schema: AffidavitSchema },
      { name: RepComment.name, schema: RepCommentSchema },
      { name: Campaign.name, schema: CampaignSchema },
    ]),
    CacheModule.register(),
  ],
  providers: [
    UserResolver,
    UserService,
    ApplicantService,
    ReportService,
    RepCommentService,
  ],
  controllers: [UserController],
})
export class UserModule {}
