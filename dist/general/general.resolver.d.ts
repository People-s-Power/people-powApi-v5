import { GeneralService } from './general.service';
import { CreateGeneralInput } from './dto/create-general.input';
import { UpdateGeneralInput } from './dto/update-general.input';
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
    create(createGeneralInput: CreateGeneralInput): string;
    testOFGen(): Promise<{
        adverts: any[];
        events: any[];
        petitions: import("../petition/schema/petition.schema").Petition[];
        posts: import("../post/schema/post.schema").PostDocument[];
        victories: any[];
    }>;
    general(): Promise<{
        adverts: any[];
        events: any[];
        petitions: import("../petition/schema/petition.schema").Petition[];
        posts: import("../post/schema/post.schema").PostDocument[];
        victories: any[];
    }>;
    update(updateGeneralInput: UpdateGeneralInput): string;
    remove(id: number): string;
}
