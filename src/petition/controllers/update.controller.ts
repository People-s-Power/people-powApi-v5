import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateService } from '../services/update.service';

@Controller('api/v3/petition/update')
export class UpdateController {
  constructor(private readonly updateService: UpdateService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addUpdate(@Body() data) {
    const { campaignId, body, image } = data
    return this.updateService.addUpdates(campaignId, body, image)
  }

  @Get('/:campaignId')
  getCampUpdates(@Param() param) {
    const { campaignId } = param
    return this.updateService.getCampUpdates(campaignId)
  }

}
