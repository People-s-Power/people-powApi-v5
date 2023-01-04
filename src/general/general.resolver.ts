import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GeneralService } from './general.service';
import { VictoryService } from 'src/victory/victory.service';
import { PostService } from 'src/post/post.service';
import { PetitionService } from 'src/petition/services/petition.service';
import { EventService } from 'src/event/event.service';
import { AdvertService } from 'src/advert/advert.service';
import { GQLoginGuard, locationGLQ } from 'src/auth/guards/graphql.guard';
import { UserService } from 'src/user/services/user.service';
import { OrganizationService } from 'src/organization/organization.service';
import { UseGuards } from '@nestjs/common';

@Resolver('General')
export class GeneralResolver {
  constructor(
    private readonly generalService: GeneralService,
    private readonly victoryService: VictoryService,
    private readonly postService: PostService,
    private readonly petitionService: PetitionService,
    private readonly eventService: EventService,
    private readonly advertService: AdvertService,
    private readonly userService: UserService,
    private readonly orgService: OrganizationService
    ) {}

  @Query('general')
  async general() {
    const [
      victories,
      adverts,
      posts,
      petitions,
      events
    ] = await Promise.all([
      this.victoryService.findAll(),
      this.advertService.findAll(),
      this.postService.findAll(),
      this.petitionService.findAll(),
      this.eventService.findAll(),
    ])

    return {
      adverts,
      events,
      petitions,
      posts,
      victories
    }
  }


  @Mutation()
  async connections(){
    const [users, orgs] = await Promise.all([
      this.userService.getUsers(),
      this.orgService.getOrganizations()
    ])

    const results = [...users, ...orgs]
    return results
  }


  @Mutation()
  async like(@Args() { authorId, itemId }) {
    const like = await this.generalService.like(itemId, authorId)
    return like
  }

  @Mutation()
  async unlike(@Args() { authorId, itemId }) {
    const like = await this.generalService.unlike(itemId, authorId)
    return like
  }

  @Mutation()
  async follow(@Args() { followerId, followId }){
    const res = await this.generalService.addFollowers(followerId, followId)
    return res
  }

  @UseGuards(GQLoginGuard)
  @Mutation()
  async timeline(@Args() authorId) {
    const res = await this.generalService.timeLine(authorId)
    return res
  }

}
