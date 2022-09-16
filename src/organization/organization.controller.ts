import { Body, Controller, Inject, Post, Req, UseGuards, BadRequestException, Get, Param, Put, Delete, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { OrganizationService } from './organization.service';

@Controller('api/v3/organization')
export class OrganizationController {
  logger: Logger;
  constructor(
    private readonly organizationService: OrganizationService,
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
    return this.organizationService.updateImage(image, param.orgId)
  }
}
