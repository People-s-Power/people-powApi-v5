import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationResolver } from './organization.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { orgnaization, orgnaizationSchema } from './schema/organization.schema';
import { OrganizationController } from './organization.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: orgnaization.name, schema: orgnaizationSchema
        }])
  ],
  providers: [OrganizationResolver, OrganizationService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
