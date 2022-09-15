import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreateOrgDTO } from './schema/organization.dto';
import { organizationDocument, orgnaization } from './schema/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(orgnaization.name) private readonly OrganizationModel: Model<organizationDocument>,
  ) {}

  async getOrganizations(): Promise<organizationDocument[]> {
    const orgs = await this.OrganizationModel.find()
    return orgs
  }

 async createOrg(payload: CreateOrgDTO, user: UserDocument): Promise<organizationDocument> {

  try {

    const nameExist = await this.OrganizationModel.findOne({ name: payload.name })
    if (nameExist) {
      throw new BadRequestException('Name already exists')
    }

    // const image = await cloudinaryUpload(payload.uploadImage).catch((err) => {
    //   throw err;
    // });

    const organization = await this.OrganizationModel.create({
      ...payload,
      image: 'payload.image',
      author: user._id,
      country: user.country,
      city: user.city
    })

    return organization
  } catch (error) {
    throw error
  }
 }
}
