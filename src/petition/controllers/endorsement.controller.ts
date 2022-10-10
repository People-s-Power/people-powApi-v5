import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';
import {
  CreateEndorsementDTO,
  LikeEndorsementDTO,
  UpdateEndorsementDTO,
} from '../dto/endorsement.dto';
import { EndorsementService } from '../services/endorsement.service';

@Controller('api/v3/endorsement')
export class EndorsementController {
  constructor(private readonly endorsementService: EndorsementService) {}

  @Get()
  findAll() {
    return this.endorsementService.findAll();
  }
  @Get('/single/:id')
  findOne(@Param('id') id: string) {
    return this.endorsementService.findOne(id);
  }
  @Get('/petition/:id')
  findByPetition(@Param('id') id: string) {
    return this.endorsementService.findBypetition(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreateEndorsementDTO, @Req() req: ReqWithUser) {
    console.log(data)
    return this.endorsementService.create(data, req.user);
  }
  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() data: UpdateEndorsementDTO) {
    return this.endorsementService.update(data);
  }
  @UseGuards(JwtAuthGuard)
  @Post('like')
  like(@Body() data: LikeEndorsementDTO, @Req() req: ReqWithUser) {
    return this.endorsementService.like(data, req.user);
  }
}
