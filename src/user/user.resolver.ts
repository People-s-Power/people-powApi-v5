import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/guards/graphql.guard';
import { AccountTypeEnum, StaffRoleEnum } from './dto/user.dto';
import { User, UserDocument } from './entity/user.schema';
import { UserService } from './services/user.service';

@Resolver('User')
export class UserResolver {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Query()
  async getUsers(
    @CurrentUser() user: UserDocument,
    @Args('role') role: StaffRoleEnum,
    @Args('accountType') accountType: AccountTypeEnum,
  ) {
    return await this.userService.getUsers(accountType, role, user);
  }
  @Mutation()
  async deleteUser(@Args('id') id: string): Promise<User> {
    return await this.userService.delete(id);
  }
  @Mutation()
  async deleteManyUser(): Promise<UserDocument[]> {
    return await this.userService.deleteMany();
  }
  @Query()
  async getUser(@Args('id') id: string) {
    return await this.userService.findOne(id);
  }
  
  @Query()
  async seedUsers() {
    return await this.userService.seedUsers();
  }
}
