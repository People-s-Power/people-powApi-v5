import { ObjectId } from "mongoose";
export declare class IEvent {
    name: string;
    description: string;
    time: string;
    image: string;
    type: string;
    audience: string;
    startDate: string;
    endDate: string;
    interested: Interested[];
    authorId: ObjectId;
}
export declare class Interested {
    authorId: ObjectId;
    authorImg: string;
    name: string;
}
