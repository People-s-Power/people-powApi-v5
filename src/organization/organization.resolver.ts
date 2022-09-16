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

    @Query() 
    getOrganzation(@Args('id') Id): Promise<organizationDocument> {
      return this.organizationService.getOrg(Id)
    }

    @Query()
    getUserOrganizations(@Args('id') Id): Promise<organizationDocument[]> {
      return this.organizationService.userOrgs(Id)
    }

    // Mutations

    @UseGuards(GQLoginGuard)
    @Mutation()
    createOrg(@Args() payload, @CurrentUser() user: UserDocument): Promise<organizationDocument> {
      const { input } = payload
      return this.organizationService.createOrg(input, user)
    }

    @UseGuards(GQLoginGuard)
    @Mutation()
    addOperator(@Args() payload, @CurrentUser() user: UserDocument) {
      const { input } = payload
     return this.organizationService.createOperator(input.role, input.userId, input.orgId, user._id)
    }


}
