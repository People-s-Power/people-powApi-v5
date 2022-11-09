"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_guard_1 = require("../auth/guards/graphql.guard");
const event_service_1 = require("./event.service");
let EventResolver = class EventResolver {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async findAll({ page, limit, filter }) {
        const events = await this.eventService.findAll(page, limit, filter);
        return events;
    }
    async createEvent({ name, description, time, startDate, endDate, imageFile, type }, user) {
        const event = await this.eventService.create({ name, description, time, startDate, endDate, imageFile, type }, user);
        return event;
    }
    async updateEvent({ name, description, time, startDate, endDate, imageFile, type, eventId, authorId }) {
        const event = await this.eventService.update({ name, description, time, startDate, endDate, imageFile, type }, eventId, authorId);
        return event;
    }
    async deleteEvent(eventId, user) {
        const event = await this.eventService.remove(eventId, user._id);
        return 'Removed';
    }
};
__decorate([
    (0, graphql_1.Query)('events'),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)('createEvent'),
    __param(0, (0, graphql_1.Args)()),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "createEvent", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "updateEvent", null);
__decorate([
    (0, common_1.UseGuards)(graphql_guard_1.GQLoginGuard),
    (0, graphql_1.Mutation)('deleteEvent'),
    __param(0, (0, graphql_1.Args)('eventId')),
    __param(1, (0, graphql_guard_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EventResolver.prototype, "deleteEvent", null);
EventResolver = __decorate([
    (0, graphql_1.Resolver)('Event'),
    __metadata("design:paramtypes", [event_service_1.EventService])
], EventResolver);
exports.EventResolver = EventResolver;
//# sourceMappingURL=event.resolver.js.map