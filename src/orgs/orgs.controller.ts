import { Controller, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';

@Controller('api/v3/orgs')
export class OrgsController {
  constructor(
    @Inject('ORG_SERVICE') private client: ClientProxy,
  ){}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrg(@Req() req: ReqWithUser) {
    this.client.emit('create-org', req.user._id)
    return 'sucess'
  }
}
