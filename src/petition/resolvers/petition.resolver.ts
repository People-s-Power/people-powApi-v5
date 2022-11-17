import { UseGuards,
  Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLGuard, GQLoginGuard, locationGLQ } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { PetitionService } from '../services/petition.service';
import { EndorsementService } from '../services/endorsement.service';
// import { RealIP } from 'nestjs-real-ip';
import { Req } from '@nestjs/common'
import { Request } from 'express'

@Resolver('Petition')
export class PetitionResolver {
  constructor(
    private readonly petitionService: PetitionService,
    private readonly endorsementService: EndorsementService,
  ) {}
  @UseGuards(GQLoginGuard)
  @Query()
  async myPetition(@CurrentUser() user: UserDocument) {
    // console.log(user)
    return await this.petitionService.myPetitions(user?.id);
  }

  @Query()
  async getPetitions(@Args('limit') limit: number, @locationGLQ() location) {

    const region = location.country_name

    return await this.petitionService.findAll(region);
  }

  @Query()
  async getPetitionsOtherRegion() {
    return await this.petitionService.findAllOtherRegions()
  }

  @Query()
  async getPetition(@Args('slug') slug: string) {
    return await this.petitionService.findOne(slug);
  }
  @Query()
  async getActivePetitions(@Args('limit') limit: number, ) {
    return await this.petitionService.findAllActive();
  }

  @Query()
  async getActivePetitionsOtherRegion(@Args('limit') limit: number, @locationGLQ() location) {
    const region = location.country_name
    return await this.petitionService.findAllActiveOtherRegions;
  }

  @Mutation()
  async deletePetition(@Args('id') id: string) {
    return await this.petitionService.delete(id);
  }
}
