import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrgsController } from 'src/orgs/orgs.controller';
import { UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { CreateOrgDTO } from './schema/organization.dto';
import { organizationDocument, orgnaization } from './schema/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(orgnaization.name) private readonly OrganizationModel: Model<organizationDocument>,
  ) {}

  // Qurries
  async getOrganizations(): Promise<organizationDocument[]> {
    const orgs = await this.OrganizationModel.find()
    return orgs
  }

  async getOrg(id: string): Promise<organizationDocument> {
    try {
      const organization = await this.OrganizationModel.findById(id)
      if (!organization) {
        throw new BadRequestException(`Organization don't exist`)
      }
      return organization
    } catch (error) {
      throw error
    }
  }

 async userOrgs(id:string) {
    try {
      const orgs = await this.OrganizationModel.find({ author: id })

      return orgs
    } catch (error) {
      throw error
    }
 }

//  Mutations

  // Create organization

 async createOrg(payload: CreateOrgDTO, user: UserDocument): Promise<organizationDocument> {

  try {

    const nameExist = await this.OrganizationModel.findOne({ name: payload.name })
    if (nameExist) {
      throw new BadRequestException('Name already exists')
    } 

    const image = await cloudinaryUpload(payload.uploadImage).catch((err) => {
      throw err;
    });

    const organization = await this.OrganizationModel.create({
      ...payload,
      image,
      author: user._id,
      country: user.country,
      city: user.city
    })

    return organization
  } catch (error) {
    throw error
  }
 }

  async updateOrganization(payload, userId) {
    try {
      // const { orgId } payload
      // Check if user is qulified to update
      // const org = this.OrganizationModel.findById()
      
    } catch (error) {
      throw error
    }
  }

  async updateImage(uploadedImg, orgId): Promise<organizationDocument> {
    try {
      const organization = await this.OrganizationModel.findById(orgId)
      if (!organization) {
        throw new BadRequestException(`Organization doesn't exist`)
      }
      const image = await cloudinaryUpload(uploadedImg).catch((err) => {
        throw err;
      });
      

      organization.image = image
      await organization.save()

      return organization
    } catch (error) {
     throw error 
    }
  }
}
