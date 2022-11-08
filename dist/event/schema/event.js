"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = exports.eventSchema = void 0;
const mongoose_1 = require("mongoose");
exports.eventSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    audience: String,
    authorId: String,
    endDate: String,
    image: String,
    interested: [],
    startDate: String,
    time: String,
    type: {
        type: String,
        enum: ['online', 'offline'],
        default: 'offline',
        required: true
    }
});
exports.event = mongoose_1.default.model('event', exports.eventSchema);
//# sourceMappingURL=event.js.map