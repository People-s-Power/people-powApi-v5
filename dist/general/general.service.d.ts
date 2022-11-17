import { CreateGeneralInput } from './dto/create-general.input';
import { UpdateGeneralInput } from './dto/update-general.input';
export declare class GeneralService {
    create(createGeneralInput: CreateGeneralInput): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGeneralInput: UpdateGeneralInput): string;
    remove(id: number): string;
}
