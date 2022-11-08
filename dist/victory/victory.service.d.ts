import { CreateVictoryInput } from './dto/create-victory.input';
import { UpdateVictoryInput } from './dto/update-victory.input';
export declare class VictoryService {
    create(createVictoryInput: CreateVictoryInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateVictoryInput: UpdateVictoryInput): string;
    remove(id: number): string;
}
