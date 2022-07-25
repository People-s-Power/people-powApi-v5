import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';

@Controller('orgs')
export class OrgsController {
  
  @UseGuards(JwtAuthGuard)
  @Post()
  createOrg(@Req() req: ReqWithUser) {
    console.log(req.user)
  }
}
