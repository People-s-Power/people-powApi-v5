import { Model } from 'mongoose';
import { UserDocument } from 'src/user/entity/user.schema';
import { CreateEndorsementDTO, LikeEndorsementDTO, UpdateEndorsementDTO } from '../dto/endorsement.dto';
import { PetitionGateway } from '../gateway/petition.gateway';
import { PetitionDocument } from '../schema/petition.schema';
import { Endorsement, EndorsementDocument } from '../schema/endorsement.schema';
import { ClientProxy } from '@nestjs/microservices';
export declare class EndorsementService {
    private client;
    private readonly userModel;
    private readonly endorsementModel;
    private readonly petitionModel;
    private petitionGateway;
    constructor(client: ClientProxy, userModel: Model<UserDocument>, endorsementModel: Model<EndorsementDocument>, petitionModel: Model<PetitionDocument>, petitionGateway: PetitionGateway);
    create(data: CreateEndorsementDTO, user: UserDocument): Promise<Endorsement>;
    findAll(): Promise<Endorsement[]>;
    findBypetition(petition: any): Promise<Endorsement[]>;
    findOne(id: string): Promise<Endorsement>;
    update(data: UpdateEndorsementDTO): Promise<Endorsement>;
    like(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean>;
    unLike(data: LikeEndorsementDTO, user: UserDocument): Promise<boolean>;
    delete(id: string): Promise<Endorsement>;
    deleteMany(): Promise<number>;
}
