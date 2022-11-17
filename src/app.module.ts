import { CacheModule, Inject, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { AppService } from './app.service';
import config from './utils/config';
import { join } from 'path';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PetitionModule } from './petition/petition.module';
import { TransactionModule } from './transaction/transaction.module';
import { ClientsModule, Transport } from  "@nestjs/microservices"
import { View, ViewSchema } from './petition/schema/petition.schema';
import {corsOptions} from "./cors"
import { OrganizationModule } from './organization/organization.module';
import { PostModule } from './post/post.module';
import { EventModule } from './event/event.module';
import { AdvertModule } from './advert/advert.module';
import { VictoryModule } from './victory/victory.module';
import { GeneralModule } from './general/general.module';

@Module({

  imports: [
    MongooseModule.forRoot(config.MONGO_URI, {
      // connectionFactory: (connection: Connection) => {
      //   connection.useDb('test');

      //   console.log(connection);
      //   return connection;
      // },
    }),

    ClientsModule.register([
      {
        name: 'MAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [config.RMQ_URL],
          queue: 'mail_queue',
          queueOptions: {
            durable: false
          },
        },
      },
    ]),
    MongooseModule.forFeature([{ name: View.name, schema: ViewSchema }]),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      
      installSubscriptionHandlers: true,
      path: '/graphql',
      cors: {
        origin:  ['https://www.peoplespow.com', 'http://localhost:3000'],
        credentials: true,
      },
      playground: true,
      buildSchemaOptions: {
        dateScalarMode: 'timestamp',
      },
    }),

    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({ ttl: 500 }),

    AuthModule,
    UserModule,
    PetitionModule,
    TransactionModule,
    OrganizationModule,
    PostModule,
    EventModule,
    AdvertModule,
    VictoryModule,
    GeneralModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
