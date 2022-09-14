import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors, } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

import { ReqWithUser } from 'src/typings';
import {
  AssignUserAdminDTO,
  ChangeUserAccountTypeDTO,
  ChangeUserRoleDTO,
  UpdateUserDTO,
} from '../dto/user.dto'
import { FollowersService } from '../services/follower.service';

@Controller('api/v3/user/follow')
export class FollowerController {
  constructor(private readonly followerService: FollowersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  follow (@Body() body, @Req() req: ReqWithUser) {
    const { userId } = body 
    const { _id } = req.user
    return this.followerService.addFollowers(_id, userId)
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  unfollow(@Body() body, @Req() req: ReqWithUser) {
    const { userId } = body 
    const { _id } = req.user
    const currentUser:string = _id.toString()

    return this.followerService.unFollow(currentUser, userId)
  }

}
