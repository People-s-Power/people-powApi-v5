export declare class CreateCampaignDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
}
export declare class CreateCampaignOrgDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
    authorId: string;
    authorName: string;
    authorImg: string;
    country: string;
}
declare const UpdateCampaignDTO_base: import("@nestjs/common").Type<Partial<CreateCampaignDTO>>;
export declare class UpdateCampaignDTO extends UpdateCampaignDTO_base {
    id: string;
}
export {};
