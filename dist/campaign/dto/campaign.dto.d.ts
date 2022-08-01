export declare class CreateCampaignDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
}
declare const UpdateCampaignDTO_base: import("@nestjs/common").Type<Partial<CreateCampaignDTO>>;
export declare class UpdateCampaignDTO extends UpdateCampaignDTO_base {
    id: string;
}
export interface ICreateOrgCamp {
    orgId: string;
    country: string;
    city: string;
    title: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    orgName: string;
    category: string;
}
export declare class CreateOrgCampDTO {
    orgId: string;
    orgName: string;
    country: string;
    city: string;
    title: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    category: string;
}
export {};
