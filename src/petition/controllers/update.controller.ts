import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';
import { UpdateService } from '../services/update.service';

@Controller('api/v3/petition/update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addUpdate(@Body() data, @Req() req: ReqWithUser) {
    const { petitionId, body, image, authorId } = data
    return this.updateService.addUpdates(petitionId, body, image, authorId)
  }

  @Get('/:petitionId')
  getCampUpdates(@Param() param) {
    const { petitionId } = param
    return this.updateService.getPetitionUpdates(petitionId)
  }

}
