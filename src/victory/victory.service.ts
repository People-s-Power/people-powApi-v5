import { Injectable } from '@nestjs/common';
import { CreateVictoryInput } from './dto/create-victory.input';
import { UpdateVictoryInput } from './dto/update-victory.input';

@Injectable()
export class VictoryService {
  create(createVictoryInput: CreateVictoryInput) {
    return 'This action adds a new victory';
  }

  findAll() {
    return `This action returns all victory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} victory`;
  }

  update(id: number, updateVictoryInput: UpdateVictoryInput) {
    return `This action updates a #${id} victory`;
  }

  remove(id: number) {
    return `This action removes a #${id} victory`;
  }
}
