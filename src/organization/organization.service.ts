import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrgsController } from 'src/orgs/orgs.controller';
import { User, UserDocument } from 'src/user/entity/user.schema';
import { cloudinaryUpload } from 'src/utils/cloudinary';
import { OrganizationController } from './organization.controller';
import { CreateOrgDTO, StaffRoleEnum } from './schema/organization.dto';
import { organizationDocument, orgnaization } from './schema/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(orgnaization.name) private readonly OrganizationModel: Model<organizationDocument>,
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
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

    const organization = await this.OrganizationModel.create({
      ...payload,
      image: 'Upload Image',
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

  async updateImage(image, orgId): Promise<organizationDocument> {
    try {
      const organization = await this.OrganizationModel.findById(orgId)
      if (!organization) {
        throw new BadRequestException(`Organization doesn't exist`)
      }
      

      organization.image = image
      await organization.save()

      return organization
    } catch (error) {
     throw error 
    }
  }

  async checkIfAllowed(adderId): Promise<boolean> {
    console.log(adderId)
    return true
  }

  // Create operator
  async createOperator(role: StaffRoleEnum, userId, orgId, adderId) {
    try {
      const org = await this.OrganizationModel.findById(orgId)
      if (!org) {
        throw new BadRequestException(`Organization doesn't exist`)
      }
      this.checkIfAllowed(adderId)
      const operatorList = org.operators
      const alreadyExist = operatorList.find(e => e.userId === userId)
      if (alreadyExist) {
        throw new BadRequestException('User already added')
      }
      operatorList.push({
        userId: userId,
        role: role
      })

      org.operators = operatorList

      await org.save()

      // Add the organization to the user object
      const user = await this.UserModel.findById(userId)
      const orgList = user.orgOperating
      orgList.push(org._id)
      user.orgOperating = orgList
      await user.save()


      return org
    } catch (error) {
      throw error
    }
  }

  async deleteOperator(orgId, userId, adderId) {
    try {
      const org = await this.OrganizationModel.findById(orgId)
      const user = await this.UserModel.findById(userId)
      if (!user) {
        throw new BadRequestException(`User doesn't exist`)
      }
      if (!org) {
        throw new BadRequestException(`Organization doesn't exist`)
      }

      const operatorList = org.operators
      const alreadyExistIndex = operatorList.findIndex(e => e.userId === userId)
      operatorList.splice(alreadyExistIndex, 1)
      org.operators = operatorList

      await org.save()

      // Remove org from user 
      
      const orgList = user.orgOperating
      const orgIndex = orgList.findIndex(e => e === orgId)
      orgList.splice(orgIndex, 1)
      user.orgOperating = orgList
      await user.save()

      return org
    } catch (error) {
      throw error
    }
  }

}
