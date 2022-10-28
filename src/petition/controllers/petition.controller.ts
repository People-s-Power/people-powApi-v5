import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
// import { JwtAuthGuard } from 'src/auth/guards/local.guard';
import { ReqWithUser } from 'src/typings';
import { CreatePetitionDTO, CreatePetitionOrgDTO, UpdatePetitionDTO } from '../dto/petition.dto';
import { PetitionGateway } from '../gateway/petition.gateway';
import {
  PetitionService,
  ISessionResponseData,
} from '../services/petition.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PetitionDocument } from '../schema/petition.schema';

@Controller('api/v3/petition')
export class PetitionController {
  constructor(
    private readonly petitionService: PetitionService,
    private readonly petitionGateway: PetitionGateway,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() data: CreatePetitionDTO, @Req() req: ReqWithUser) {
    return this.petitionService.create(data, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/org')
  createCampForOrg(@Body() data: CreatePetitionOrgDTO, @Param() param) {
    return this.petitionService.createForOrg(data);
  }

  // @Get('notice')
  // getAllnotice() {
  //   console.log('hello from controller');
  //   return this.petitionService.findAllNotice();
  // }

  @Get()
  findAll() {
    return this.petitionService.findAll();
  }
  @Get('notice')
  findAllNotice(@Query('model') model: string) {
    return this.petitionService.findAllNotice(model);
  }
  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.petitionService.findOne(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mypetition')
  async mypetition(@Req() req: ReqWithUser) {
    return this.petitionService.myPetitions(req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('orgpetition/:orgId')
  async orgpetition(@Param() param) {
    const { orgId } = param
    return this.petitionService.myPetitions(orgId);
  }

  @Put()
  update(@Body() data: UpdatePetitionDTO) {
    return this.petitionService.update(data);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/single/:id')
  async delete(@Param('id') id: string) {
    const petition = await this.petitionService.delete(id);
    return petition.id;
  }
  @UseGuards(JwtAuthGuard)
  @Post('like')
  async like(@Body('id') id: string, @Req() req: ReqWithUser) {
    return await this.petitionService.like(id, req.user);
  }
  @Post('approve')
  async approvepetition(@Body() data: { Petition_id: string }) {
    return await this.petitionService.approvePetition(data.Petition_id);
  }
  
  @Put('/viewCamp/:id')
  async viewCamp(
    @Param('id') id: string,
    @Body() data: { userId: string; }
    ): Promise<PetitionDocument | string> {
    const userId = data.userId
    const result = await this.petitionService.viewPetition(
      id,
      userId
    )

    return result;
  }
}
