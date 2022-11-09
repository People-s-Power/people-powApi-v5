import mongoose, { Schema } from "mongoose";
import { IEvent } from "./event.dto";
export declare const eventSchema: Schema;
export declare const event: mongoose.Model<{
    [x: string]: any;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    [x: string]: any;
}>>;
export declare type EventDocument = IEvent & Document & {
    _id: any;
    _doc: any;
};
