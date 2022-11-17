import { Injectable } from '@nestjs/common';
import { CreateGeneralInput } from './dto/create-general.input';
import { UpdateGeneralInput } from './dto/update-general.input';

@Injectable()
export class GeneralService {
  create(createGeneralInput: CreateGeneralInput) {
    return 'This action adds a new general';
  }

  findAll() {
    return `This action returns all general`;
  }

  findOne(id: number) {
    return `This action returns a #${id} general`;
  }

  update(id: number, updateGeneralInput: UpdateGeneralInput) {
    return `This action updates a #${id} general`;
  }

  remove(id: number) {
    return `This action removes a #${id} general`;
  }
}
