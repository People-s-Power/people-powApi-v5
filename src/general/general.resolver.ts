import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GeneralService } from './general.service';
import { VictoryService } from 'src/victory/victory.service';
import { PostService } from 'src/post/post.service';
import { PetitionService } from 'src/petition/services/petition.service';
import { EventService } from 'src/event/event.service';
import { AdvertService } from 'src/advert/advert.service';
import { locationGLQ } from 'src/auth/guards/graphql.guard';

@Resolver('General')
export class GeneralResolver {
  constructor(
    private readonly generalService: GeneralService,
    private readonly victoryService: VictoryService,
    private readonly postService: PostService,
    private readonly petitionService: PetitionService,
    private readonly eventService: EventService,
    private readonly advertService: AdvertService
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
  async like(@Args() { authorId, itemId }) {
    const like = await this.generalService.like(itemId, authorId)
    return like
  }

}
