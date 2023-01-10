import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CurrentUser, GQLoginGuard } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { AdvertService } from './advert.service';

@Resolver('Advert')
export class AdvertResolver {
  constructor(private readonly advertService: AdvertService) {}

  @Query()
  async adverts(@Args() { page, limit, filter }) {
    const adverts = await this.advertService.findAll(page, limit, filter)
    return adverts
  }

  @Query()
  async advert(@Args('advertId') advertId) {
    const advert = await this.advertService.findOne(advertId)
    return advert
  }
  
  @UseGuards(GQLoginGuard)
  @Query()
  async myAdverts(@Args() {authorId, page, limit, filter}) {
    console.log(authorId, page, limit, filter)
    const events = await this.advertService.findAll(page, limit, filter, authorId)
    return events
  }



  @UseGuards(GQLoginGuard)
  @Mutation()
  async createdAd(@Args() { caption, message, email, duration, link, action, audience, imageFile }, @CurrentUser() user: UserDocument) {
    const advert = await this.advertService.create({ caption, message, email, duration, link, action, audience, imageFile }, user)

    return advert
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async createdAdOrg(@Args() { caption, message, email, duration, link, action, audience, imageFile, authorId }) {
    const advert = await this.advertService.createOrg({ caption, message, email, duration, link, action, audience, imageFile }, authorId)

    return advert
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async updateAd(@Args() { caption, message, email, duration, link, action, audience, imageFile, advertId, authorId }) {
    const advert = await this.advertService.update({ caption, message, email, duration, link, action, audience, imageFile }, advertId, authorId)

    return advert
  }
}
