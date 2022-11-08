import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VictoryService } from './victory.service';
import { CreateVictoryInput } from './dto/create-victory.input';
import { UpdateVictoryInput } from './dto/update-victory.input';

@Resolver('Victory')
export class VictoryResolver {
  constructor(private readonly victoryService: VictoryService) {}

  @Mutation('createVictory')
  create(@Args('createVictoryInput') createVictoryInput: CreateVictoryInput) {
    return this.victoryService.create(createVictoryInput);
  }

  @Query('victories')
  findAll() {
    return this.victoryService.findAll();
  }

  @Query('victory')
  findOne(@Args('id') id: number) {
    return this.victoryService.findOne(id);
  }

  @Mutation('updateVictory')
  update(@Args('updateVictoryInput') updateVictoryInput: UpdateVictoryInput) {
    return this.victoryService.update(updateVictoryInput.id, updateVictoryInput);
  }

  @Mutation('removeVictory')
  remove(@Args('id') id: number) {
    return this.victoryService.remove(id);
  }
}
