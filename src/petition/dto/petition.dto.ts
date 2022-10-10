import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Interface } from 'readline';

export class CreatePetitionDTO {
  title: string;
  category: string;
  image: string;
  aim: string;
  target: string;
  body: string;
}
export class CreatePetitionOrgDTO {
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

export class UpdatePetitionDTO extends PartialType(CreatePetitionDTO) {
  @ApiProperty()
  id: string;
}
