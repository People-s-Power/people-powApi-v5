export declare class CreatePetitionDTO {
    title: string;
    category: string;
    image: string;
    aim: string;
    target: string;
    body: string;
}
export declare class CreatePetitionOrgDTO {
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
declare const UpdatePetitionDTO_base: import("@nestjs/common").Type<Partial<CreatePetitionDTO>>;
export declare class UpdatePetitionDTO extends UpdatePetitionDTO_base {
    id: string;
}
export {};
