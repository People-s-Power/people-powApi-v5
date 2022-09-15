import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser, GQLoginGuard } from 'src/auth/guards/graphql.guard';
import { UserDocument } from 'src/user/entity/user.schema';
import { OrganizationService } from './organization.service';
import { organizationDocument } from './schema/organization.schema';

@Resolver('Organization')
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    ) {}

    // Queries

    @Query()
    getOrganzations(): Promise<organizationDocument[]> {
      return this.organizationService.getOrganizations()
    }

    // Mutations

    @UseGuards(GQLoginGuard)
    @Mutation()
    createOrg(@Args() payload, @CurrentUser() user: UserDocument): Promise<organizationDocument> {
      const { input } = payload
      return this.organizationService.createOrg(input, user)
    }


}
