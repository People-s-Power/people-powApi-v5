import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Interface } from 'readline';

export class CreateCampaignDTO {
  @ApiProperty()
  title: string;
  @ApiProperty({ description: 'this is must be uploaded' })
  image: string;
  @ApiProperty()
  aim: string;
  @ApiProperty()
  target: string;
  @ApiProperty()
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
}