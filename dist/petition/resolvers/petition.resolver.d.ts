import { UserDocument } from 'src/user/entity/user.schema';
import { PetitionService } from '../services/petition.service';
import { EndorsementService } from '../services/endorsement.service';
export declare class PetitionResolver {
    private readonly petitionService;
    private readonly endorsementService;
    constructor(petitionService: PetitionService, endorsementService: EndorsementService);
    myPetition(user: UserDocument): Promise<import("../schema/petition.schema").Petition[]>;
    getPetitions(limit: number, location: any): Promise<import("../schema/petition.schema").Petition[]>;
    getPetitionsOtherRegion(): Promise<import("../schema/petition.schema").Petition[]>;
    getPetition(slug: string): Promise<import("../schema/petition.schema").PetitionDocument>;
    getActivePetitions(limit: number, location: any): Promise<import("../schema/petition.schema").Petition[]>;
    getActivePetitionsOtherRegion(limit: number, location: any): Promise<(region: string, limit?: number) => Promise<import("../schema/petition.schema").Petition[]>>;
    deletePetition(id: string): Promise<import("../schema/petition.schema").PetitionDocument>;
}
