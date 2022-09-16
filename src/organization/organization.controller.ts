import { Body, Controller, Inject, Post, Req, UseGuards, BadRequestException, Get, Param, Put, Delete, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';

@Controller('api/v3/organization')
export class OrgsController {
  logger: Logger;
  constructor(
  
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    // @InjectModel(Campaign.name) private readonly CampModel: Model<CampaignDocument>
  ){
    this.logger = new Logger()
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
    return 'Success'
  }
}
