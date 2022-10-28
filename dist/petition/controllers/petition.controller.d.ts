import { ReqWithUser } from 'src/typings';
import { CreatePetitionDTO, CreatePetitionOrgDTO, UpdatePetitionDTO } from '../dto/petition.dto';
import { PetitionGateway } from '../gateway/petition.gateway';
import { PetitionService } from '../services/petition.service';
import { PetitionDocument } from '../schema/petition.schema';
export declare class PetitionController {
    private readonly petitionService;
    private readonly petitionGateway;
    constructor(petitionService: PetitionService, petitionGateway: PetitionGateway);
    create(data: CreatePetitionDTO, req: ReqWithUser): Promise<import("../schema/petition.schema").Petition>;
    createCampForOrg(data: CreatePetitionOrgDTO, param: any): Promise<import("../schema/petition.schema").Petition>;
    findAll(): Promise<import("../schema/petition.schema").Petition[]>;
    findAllNotice(model: string): Promise<Omit<import("../../notification/notification.schema").Notice & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    findOne(slug: string): Promise<PetitionDocument>;
    mypetition(req: ReqWithUser): Promise<import("../schema/petition.schema").Petition[]>;
    orgpetition(param: any): Promise<import("../schema/petition.schema").Petition[]>;
    update(data: UpdatePetitionDTO): Promise<import("../schema/petition.schema").Petition>;
    delete(id: string): Promise<any>;
    like(id: string, req: ReqWithUser): Promise<PetitionDocument>;
    approvepetition(data: {
        Petition_id: string;
    }): Promise<PetitionDocument>;
    viewCamp(id: string, data: {
        userId: string;
    }): Promise<PetitionDocument | string>;
}
