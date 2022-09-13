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
export class CreateCampaignOrgDTO {
  title: string;
  category: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  authorId: string;
  authorName: string;
  authorImg: string;
  country: string;
}

export class UpdateCampaignDTO extends PartialType(CreateCampaignDTO) {
  @ApiProperty()
  id: string;
}
