import { Body, Controller, Inject, Post, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { ReqWithUser } from 'src/typings';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { CreateOrgDTO } from './dto/org.dto';

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
}
