import { VictoryService } from './victory.service';
import { CreateVictoryInput } from './dto/create-victory.input';
import { UpdateVictoryInput } from './dto/update-victory.input';
export declare class VictoryResolver {
    private readonly victoryService;
    constructor(victoryService: VictoryService);
    create(createVictoryInput: CreateVictoryInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(updateVictoryInput: UpdateVictoryInput): string;
    remove(id: number): string;
}
