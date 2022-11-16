import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VictoryService } from './victory.service';

@Resolver('Victory')
export class VictoryResolver {
  constructor(private readonly victoryService: VictoryService) {}

  @Mutation('createVictory')
  async createVictory(@Args() { body, authorId }) {
    const victory =  await this.victoryService.create(body, authorId);
    return victory
  }

  @Query('victories')
  async findAll(@Args() { page, limit, filter }) {
    const victories = await this.victoryService.findAll(page, limit, filter);
    return victories
  }

  @Query('victory')
  async findOne(@Args('id') id: string) {
    const victory = await this.victoryService.findOne(id);
    return victory
  }

  @Query('myVictories')
  async myVictories(authorId, page, limit, filter) {
    console.log(authorId, page, limit, filter)
    const victories = await this.victoryService.findAll(page, limit, filter, authorId)
    return victories
  }

  // @Mutation('updateVictory')
  // update(@Args('updateVictoryInput') updateVictoryInput: UpdateVictoryInput) {
  //   return this.victoryService.update(updateVictoryInput.id, updateVictoryInput);
  // }

  @Mutation('removeVictory')
  remove(@Args('id') id: number) {
    return this.victoryService.remove(id);
  }
}
