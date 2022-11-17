import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { GeneralService } from './general.service';
import { CreateGeneralInput } from './dto/create-general.input';
import { UpdateGeneralInput } from './dto/update-general.input';
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

  @Mutation('createGeneral')
  create(@Args('createGeneralInput') createGeneralInput: CreateGeneralInput) {
    return this.generalService.create(createGeneralInput);
  }

  @Query('testOFGen')
  async testOFGen() {
    console.log('Fires cool')
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
    console.log(
      {
        victories: victories.length,
        adverts: adverts.length,
        petitions: petitions.length,
        events: events.length,
        posts: posts.length
      }
    )

    return {
      adverts,
      events,
      petitions,
      posts,
      victories
    }
  }

  @Query('general')
  async general() {
    console.log('Fires cool')
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
    console.log(
      {
        victories: victories.length,
        adverts: adverts.length,
        petitions: petitions.length,
        events: events.length,
        posts: posts.length
      }
    )

    return {
      adverts,
      events,
      petitions,
      posts,
      victories
    }
  }

  @Mutation('updateGeneral')
  update(@Args('updateGeneralInput') updateGeneralInput: UpdateGeneralInput) {
    return this.generalService.update(updateGeneralInput.id, updateGeneralInput);
  }

  @Mutation('removeGeneral')
  remove(@Args('id') id: number) {
    return this.generalService.remove(id);
  }
}
