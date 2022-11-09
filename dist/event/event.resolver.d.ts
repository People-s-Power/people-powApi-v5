import { UserDocument } from 'src/user/entity/user.schema';
import { EventService } from './event.service';
export declare class EventResolver {
    private readonly eventService;
    constructor(eventService: EventService);
    findAll({ page, limit, filter }: {
        page: any;
        limit: any;
        filter: any;
    }): Promise<any[]>;
    createEvent({ name, description, time, startDate, endDate, imageFile, type }: {
        name: any;
        description: any;
        time: any;
        startDate: any;
        endDate: any;
        imageFile: any;
        type: any;
    }, user: UserDocument): Promise<any>;
    updateEvent({ name, description, time, startDate, endDate, imageFile, type, eventId, authorId }: {
        name: any;
        description: any;
        time: any;
        startDate: any;
        endDate: any;
        imageFile: any;
        type: any;
        eventId: any;
        authorId: any;
    }): Promise<any>;
    deleteEvent(eventId: any, user: UserDocument): Promise<string>;
}
