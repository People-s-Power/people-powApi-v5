import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IUser } from 'src/user/dto/user.dto';
import { IPetition } from './petition.interface';

export class CreateEndorsementDTO {
  @ApiProperty()
  petition: string;
  @ApiProperty()
  body: string;
}

export class UpdateEndorsementDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  body: string;
}

export class LikeEndorsementDTO {
  @ApiProperty()
  id: string;
}

export class IEndorsement extends Document {
  author: IUser
  petition: IPetition;
  body: string;
  likes: string[];
}