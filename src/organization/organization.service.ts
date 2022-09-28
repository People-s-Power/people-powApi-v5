import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async updateOrganization(data, operatorId) {
    try {
      const payload = data?.input
      const org = await this.OrganizationModel.findById(payload.orgId)
      if (!org) {
        throw new BadRequestException(`Organization doesn't exist`)
      }

      // Check if user is allowed to do task
      const authObj = {
        userId: org.author,
        role: 'Author'
      }
      const operators = org.operators
      const allowedList = [...operators, authObj]
      console.log(allowedList)
      const isAllowed = allowedList.find(e => e.userId === operatorId.toString())
      if(!isAllowed) throw new UnauthorizedException('Not Allowed')

      await org.set({...payload})
      await org.save()

      return org
      
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


  // Create operator
  async createOperator(role: StaffRoleEnum, userId, orgId, operatorId) {
    try {
      const org = await this.OrganizationModel.findById(orgId)
      if (!org) {
        throw new BadRequestException(`Organization doesn't exist`)
      }

      // Check if user is allowed to do task
      const authObj = {
        userId: org.author,
        role: 'Author'
      }
      const operators = org.operators
      const allowedList = [...operators, authObj]
      console.log(allowedList)
      const isAllowed = allowedList.find(e => e.userId === operatorId.toString())
      if(!isAllowed) throw new UnauthorizedException('Not Allowed')


      const operatorList = org.operators
      const alreadyExist = allowedList.find(e => e.userId === userId)
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

  async deleteOperator(orgId, user, operatorId) {
    try {
      const org = await this.OrganizationModel.findById(orgId)
      if (!org) {
        throw new BadRequestException(`Organization doesn't exist`)
      }

      const operatorList = org.operators
      const alreadyExistIndex = operatorList.findIndex(e => e.userId === user._id.toString)
      operatorList.splice(alreadyExistIndex, 1)
      org.operators = operatorList

      await org.save()

      // Remove org from user 
      
      const orgList = user.orgOperating
      const orgIndex = orgList.findIndex(e => e === orgId.toString)
      orgList.splice(orgIndex, 1)
      user.orgOperating = orgList
      await user.save()

      return org
    } catch (error) {
      throw error
    }
  }

}
