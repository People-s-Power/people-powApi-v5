import { Resolver } from '@nestjs/graphql';
import { AdvertService } from './advert.service';

@Resolver('Advert')
export class AdvertResolver {
  constructor(private readonly advertService: AdvertService) {}
}
