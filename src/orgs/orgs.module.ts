import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrgsController } from './orgs.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RMQ_URL],
          queue: 'org_queue',
          noAck: false,
          queueOptions: {
            durable: false
          }
        }
      }
    ])
  ],
  controllers: [OrgsController]
})
export class OrgsModule {}
