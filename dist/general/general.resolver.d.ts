import { GeneralService } from './general.service';
import { VictoryService } from 'src/victory/victory.service';
import { PostService } from 'src/post/post.service';
import { PetitionService } from 'src/petition/services/petition.service';
import { EventService } from 'src/event/event.service';
import { AdvertService } from 'src/advert/advert.service';
import { UserService } from 'src/user/services/user.service';
import { OrganizationService } from 'src/organization/organization.service';
export declare class GeneralResolver {
    private readonly generalService;
    private readonly victoryService;
    private readonly postService;
    private readonly petitionService;
    private readonly eventService;
    private readonly advertService;
    private readonly userService;
    private readonly orgService;
    constructor(generalService: GeneralService, victoryService: VictoryService, postService: PostService, petitionService: PetitionService, eventService: EventService, advertService: AdvertService, userService: UserService, orgService: OrganizationService);
    general(): Promise<{
        adverts: any[];
        events: any[];
        petitions: import("../petition/schema/petition.schema").Petition[];
        posts: import("../post/schema/post.schema").PostDocument[];
        victories: any[];
    }>;
    connections(): Promise<(import("../user/entity/user.schema").UserDocument | import("../organization/schema/organization.schema").organizationDocument)[]>;
    like({ authorId, itemId }: {
        authorId: any;
        itemId: any;
    }): Promise<string>;
    unlike({ authorId, itemId }: {
        authorId: any;
        itemId: any;
    }): Promise<"Unliked!!" | "Failed!">;
    follow({ followerId, followId }: {
        followerId: any;
        followId: any;
    }): Promise<"Failed" | "Followed">;
    timeline(authorId: any): Promise<(import("../post/schema/post.schema").Post & import("mongoose").Document<any, any, any> & {
        _doc: any;
    } & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
}
