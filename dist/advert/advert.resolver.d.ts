import { UserDocument } from 'src/user/entity/user.schema';
import { AdvertService } from './advert.service';
export declare class AdvertResolver {
    private readonly advertService;
    constructor(advertService: AdvertService);
    adverts({ page, limit, filter }: {
        page: any;
        limit: any;
        filter: any;
    }): Promise<any[]>;
    advert(advertId: any): Promise<any>;
    myAdverts({ authorId, page, limit, filter }: {
        authorId: any;
        page: any;
        limit: any;
        filter: any;
    }): Promise<any[]>;
    createdAd({ caption, message, email, duration, link, action, audience, imageFile }: {
        caption: any;
        message: any;
        email: any;
        duration: any;
        link: any;
        action: any;
        audience: any;
        imageFile: any;
    }, user: UserDocument): Promise<any>;
    createdAdOrg({ caption, message, email, duration, link, action, audience, imageFile, authorId }: {
        caption: any;
        message: any;
        email: any;
        duration: any;
        link: any;
        action: any;
        audience: any;
        imageFile: any;
        authorId: any;
    }): Promise<any>;
    updateAd({ caption, message, email, duration, link, action, audience, imageFile, advertId, authorId }: {
        caption: any;
        message: any;
        email: any;
        duration: any;
        link: any;
        action: any;
        audience: any;
        imageFile: any;
        advertId: any;
        authorId: any;
    }): Promise<any>;
}
