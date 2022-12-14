import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notice, NoticeSchema } from './notification.schema';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationGateway } from './notification.gateway';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notice.name, schema: NoticeSchema },
    ]),
  ],
  providers: [NotificationService, NotificationGateway],
  controllers: [NotificationController],
})
export class NotificationModule {}
