import { CreateVictoryInput } from './create-victory.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVictoryInput extends PartialType(CreateVictoryInput) {
  id: number;
}
