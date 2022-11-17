import { CreateGeneralInput } from './create-general.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGeneralInput extends PartialType(CreateGeneralInput) {
  id: number;
}
