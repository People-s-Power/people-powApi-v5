/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
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
