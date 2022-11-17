import { GeneralService } from './general.service';
import { VictoryService } from 'src/victory/victory.service';
import { PostService } from 'src/post/post.service';
import { PetitionService } from 'src/petition/services/petition.service';
import { EventService } from 'src/event/event.service';
import { AdvertService } from 'src/advert/advert.service';
export declare class GeneralResolver {
    private readonly generalService;
    private readonly victoryService;
    private readonly postService;
    private readonly petitionService;
    private readonly eventService;
    private readonly advertService;
    constructor(generalService: GeneralService, victoryService: VictoryService, postService: PostService, petitionService: PetitionService, eventService: EventService, advertService: AdvertService);
    general(): Promise<{
        adverts: any[];
        events: any[];
        petitions: import("../petition/schema/petition.schema").Petition[];
        posts: import("../post/schema/post.schema").PostDocument[];
        victories: any[];
    }>;
    like({ authorId, itemId }: {
        authorId: any;
        itemId: any;
    }): Promise<"Sucess" | "Failed">;
    unlike({ authorId, itemId }: {
        authorId: any;
        itemId: any;
    }): Promise<"Unliked!!" | "Failed!">;
}
