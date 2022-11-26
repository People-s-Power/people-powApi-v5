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
    audience: {
        type: String,
        required: true,
        enum: ['Everyone', 'Connections', 'Interest', 'Location'],
        default: 'Everyone'
    },
    authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        refPath: 'author'
    },
    author: {
        type: String,
        required: true,
        enum: ['orgnaization', 'User'],
        default: 'User'
    },
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
    },
    shares: [],
    likes: [],
    promoted: { type: Boolean, default: false }
});
exports.event = mongoose_1.default.model('event', exports.eventSchema);
//# sourceMappingURL=event.js.map