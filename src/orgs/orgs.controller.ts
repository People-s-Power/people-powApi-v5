import { Body, Controller, Inject, Post, Req, UseGuards, BadRequestException, Get, Param, Put, Delete, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Campaign, CampaignDocument } from 'src/campaign/schema/campaign.schema';
import { ReqWithUser } from 'src/typings';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { createOperator, CreateOrgDTO, IcreateOperator, IOrg, UpdateOrgDTO} from './dto/org.dto';
import { OrgDocument } from './dto/org.schema';

@Controller('api/v3/orgs')
export class OrgsController {
  logger: Logger;
  constructor(
    @Inject('ORG_SERVICE') private client: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // @InjectModel(Campaign.name) private readonly CampModel: Model<CampaignDocument>
  ){
    this.logger = new Logger()
  }
  
  // Promise<Observable<OrgDocument[]>>

  // @UseGuards(JwtAuthGuard)
  // @Post()
  // async createOrg(@Req() req: ReqWithUser, @Body() data: CreateOrgDTO) {
    
  //   const user = req.user

  //   // Chaeck if user already has an org
  //   // if(user.createdOrg) throw new BadRequestException(`User already has an organsation`)

  //   user.createdOrg = true
  //   await user.save()

  //   const payload = {...data, country: user.country, city: user.city, author: user._id }


  //   const result = this.client.emit('create-org', payload)
  //   return 'sucess'
  // }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req: ReqWithUser, @Body() data: CreateOrgDTO): Promise<Observable<OrgDocument>> {
    try {
      const user = req.user
      user.createdOrg = true
      await user.save()
      
      const payload = {...data, country: user.country, city: user.city, author: user._id }
      console.log('Fired')
      const pattern = { cmd: 'create-org' };

      return this.client.send<OrgDocument>(pattern, payload);
    } catch (error) {
      throw error
    }
  }

  // Get organisations

  @Get()
  getOrgs(): Observable<OrgDocument[]> {
    const pattern = { cmd: 'getOrgs' };
    return this.client.send(pattern, 'getorgs');
  }

  // Get a single organisation

  @Get('/:orgId')
  getOrg(@Param() param): Observable<OrgDocument> {
    const { orgId } = param
    const pattern = { cmd: 'getOrg' };
    return this.client.send<OrgDocument>(pattern, orgId);
  }

  // User orgs
  @UseGuards(JwtAuthGuard)
  @Post('/user/orgs')
  getUserOrg(@Req() req: ReqWithUser): Observable<OrgDocument[]> {
    const { user } = req
    const author = user._id
    const pattern = { cmd: 'user-orgs' };
    const userOrgs = this.client.send<OrgDocument[]>(pattern, author);
    console.log(userOrgs)
    this.logger.log(userOrgs)
    return userOrgs
  }


  // upload orgs Image
  @UseGuards(JwtAuthGuard)
  @Post('/uploadimg/:orgId')
  async uploadImage(@Body() data: { image: string }, @Param() param) {

    const image = await cloudinaryUpload(data.image).catch((err) => {
      console.log(err);
      throw new Error('Problem with uploading image');
    });
    const payload = {
      img: image,
      orgId: param.orgId
    }
    this.client.emit('upload-image', payload)
    return 'Success'
  }

  // Update orgs data
  @UseGuards(JwtAuthGuard)
  @Put('/:orgId')
  async updateOrg(@Body() data: UpdateOrgDTO, @Param() param) {
    const { orgId } = param
    const payload = { ...data, orgId }
    this.client.emit('update-org', payload)
    return 'Success'
  }

  @UseGuards(JwtAuthGuard)
  @Post('/follow')
  follow (@Body() body, @Req() req: ReqWithUser) {
    const { orgId } = body 
    const { _id } = req.user
    const payload = {
      _id, orgId
    }
    this.client.emit('follow-org', payload)
    return 'Success'
  }

  @UseGuards(JwtAuthGuard)
  @Put('/unfollow')
  unfollow(@Body() body, @Req() req: ReqWithUser) {
    const { orgId } = body 
    const { _id } = req.user
    const payload = {
      _id, orgId
    }
    this.client.emit('unfollow-org', payload)
    return 'Success'
  }

  // Add Editor or Admin

  @UseGuards(JwtAuthGuard)
  @Post('/operator')
  async createOperator(@Body() data: createOperator) {
    const Idata: IcreateOperator =  data
    const { userId, orgId } = Idata
    const user = await this.userModel.findById(userId)
    if(!user) throw new BadRequestException(`User don't exists`)

    user.orgOperating.push(orgId)
    await user.save()
    this.client.emit('create-operator', Idata)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/operator')
  async updateOperator(@Body() data: createOperator) {
    const Idata: IcreateOperator =  data
    const { userId, orgId, role } = Idata
    const user = await this.userModel.findById(userId)
    if(!user) throw new BadRequestException(`User don't exists`)

    // user.orgOperating.push(orgId)
    // await user.save()
    this.client.emit('update-operator', Idata)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/operator')
  async deleteOperator(@Body() data: { userId: string, orgId: string }) {
    const { userId, orgId } = data
    const user = await this.userModel.findById(userId)
    if(!user) throw new BadRequestException(`User don't exists`)
    const orgIndex = user.orgOperating.findIndex(item => item === userId)
    user.orgOperating.splice(orgIndex, 1)
    await user.save()
    this.client.emit('delete-operator', data)
  }
}
