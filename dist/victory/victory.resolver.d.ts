import { VictoryService } from './victory.service';
export declare class VictoryResolver {
    private readonly victoryService;
    constructor(victoryService: VictoryService);
    createVictory({ body, authorId }: {
        body: any;
        authorId: any;
    }): Promise<any>;
    findAll({ page, limit, filter }: {
        page: any;
        limit: any;
        filter: any;
    }): Promise<any[]>;
    findOne(id: string): Promise<any>;
    myVictories(authorId: any, page: any, limit: any, filter: any): Promise<any[]>;
    remove(id: number): string;
}
