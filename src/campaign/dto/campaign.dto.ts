import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Interface } from 'readline';

export class CreateCampaignDTO {
  title: string;
  category: string;
  image: string;
  aim: string;
  target: string;
  body: string;
}

export class UpdateCampaignDTO extends PartialType(CreateCampaignDTO) {
  @ApiProperty()
  id: string;
}

export interface ICreateOrgCamp {
  orgId: string;
  country: string;
  city: string;
  title: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  orgName: string;
  category: string;
}

export class CreateOrgCampDTO {
  orgId: string;
  orgName: string;
  country: string;
  city: string;
  title: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  category: string;
}