import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GQLGuard, GQLoginGuard } from 'src/auth/guards/graphql.guard';
import { ReqWithUser } from 'src/typings';
import { CreateEndorsementDTO } from '../dto/endorsement.dto';
import { EndorsementService } from '../services/endorsement.service';

@Resolver()
export class EndorsementResolver {
  constructor(private readonly endorsementService: EndorsementService) {}
  @Query()
  async getEndorsementsByPetition(@Args('petition_id') petition_id: string) {
    return await this.endorsementService.findBypetition(petition_id);
  }
  @Query()
  async getEndorsements() {
    return await this.endorsementService.findAll();
  }
  @UseGuards(GQLoginGuard)
  @Mutation()
  async createEndorsement(
    @Args('input') input: CreateEndorsementDTO,
    @Context('req') req: ReqWithUser,
  ) {
    return await this.endorsementService.create(input, req.user);
  }
  @Mutation()
  async deleteEndorsement(@Args('id') id: string) {
    return await this.endorsementService.delete(id);
  }
}
