import { Body, Controller, Inject, Post, Req, UseGuards, BadRequestException, Get, Param, Put } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreateOrgDTO, IOrg, UpdateOrgDTO} from './dto/org.dto';
import { OrgDocument } from './dto/org.schema';

@Controller('api/v3/orgs')
export class OrgsController {
  constructor(
    @Inject('ORG_SERVICE') private client: ClientProxy,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ){}
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrg(@Req() req: ReqWithUser, @Body() data: CreateOrgDTO) {
    
    const user = req.user

    // Chaeck if user already has an org
    if(user.createdOrg) throw new BadRequestException(`User already has an organsation`)

    user.createdOrg = true
    await user.save()

    const payload = {...data, country: user.country, city: user.city, author: user._id }


    this.client.emit('create-org', payload)
    return 'sucess'
  }

  @Get()
  getOrgs(): Observable<OrgDocument[]> {
    const pattern = { cmd: 'getOrgs' };
    return this.client.send(pattern, 'getorgs');
  }

  // 62debb6df2e456a82112b5fe

  @Get('/:orgId')
  getOrg(@Param() param): Observable<OrgDocument> {
    const { orgId } = param
    const pattern = { cmd: 'getOrg' };
    return this.client.send<OrgDocument>(pattern, orgId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/user-org')
  getUserOrg(@Req() req: ReqWithUser): Observable<OrgDocument[]> {
    const { user } = req
    const author = user._id
    const pattern = { cmd: 'user-orgs' };
    return this.client.send<OrgDocument[]>(pattern, author);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:orgId')
  async uploadImage(@Body() data: { file: string }, @Param() param) {
    const image = await cloudinaryUpload(data.file).catch((err) => {
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

  @UseGuards(JwtAuthGuard)
  @Put('/:orgId')
  async updateOrg(@Body() data: UpdateOrgDTO, @Param() param) {
    const { orgId } = param
    const payload = { ...data, orgId }
    this.client.emit('update-org', payload)
    return 'Success'
  }


}
