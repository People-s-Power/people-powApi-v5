import { Module } from '@nestjs/common';
import { AdvertService } from './advert.service';
import { AdvertResolver } from './advert.resolver';

@Module({
  providers: [AdvertResolver, AdvertService]
})
export class AdvertModule {}
