import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Interface } from 'readline';
import { IEndorsement } from './endorsement.dto';

export class CreatePetitionDTO {
  title: string;
  category: string;
  image: string;
  aim: string;
  target: string;
  body: string;
}

export class IPetition extends Document {
  title: string;
  category: string;
  image: string;
  aim: string;
  target: string;
  body: string;
  slug: string;
  status: string;
  authorId: string;
  authorName: string;
  authorImg: string;
  addedFrom: string;
  numberOfPaidViewsCount: number
  numberOfPaidEndorsementCount: number
  endorsements: IEndorsement[];
  likes: string[];
  promoted: boolean;
  views: string[];
  region: string;
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
  id: string;
}
