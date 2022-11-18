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
exports.GeneralResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const general_service_1 = require("./general.service");
const victory_service_1 = require("../victory/victory.service");
const post_service_1 = require("../post/post.service");
const petition_service_1 = require("../petition/services/petition.service");
const event_service_1 = require("../event/event.service");
const advert_service_1 = require("../advert/advert.service");
let GeneralResolver = class GeneralResolver {
    constructor(generalService, victoryService, postService, petitionService, eventService, advertService) {
        this.generalService = generalService;
        this.victoryService = victoryService;
        this.postService = postService;
        this.petitionService = petitionService;
        this.eventService = eventService;
        this.advertService = advertService;
    }
    async general() {
        const [victories, adverts, posts, petitions, events] = await Promise.all([
            this.victoryService.findAll(),
            this.advertService.findAll(),
            this.postService.findAll(),
            this.petitionService.findAll(),
            this.eventService.findAll(),
        ]);
        return {
            adverts,
            events,
            petitions,
            posts,
            victories
        };
    }
    async like({ authorId, itemId }) {
        const like = await this.generalService.like(itemId, authorId);
        return like;
    }
    async unlike({ authorId, itemId }) {
        const like = await this.generalService.unlike(itemId, authorId);
        return like;
    }
    async follow({ followerId, followId }) {
        const res = await this.generalService.addFollowers(followerId, followId);
        return res;
    }
};
__decorate([
    (0, graphql_1.Query)('general'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "general", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "like", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "unlike", null);
__decorate([
    (0, graphql_1.Mutation)(),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "follow", null);
GeneralResolver = __decorate([
    (0, graphql_1.Resolver)('General'),
    __metadata("design:paramtypes", [general_service_1.GeneralService,
        victory_service_1.VictoryService,
        post_service_1.PostService,
        petition_service_1.PetitionService,
        event_service_1.EventService,
        advert_service_1.AdvertService])
], GeneralResolver);
exports.GeneralResolver = GeneralResolver;
//# sourceMappingURL=general.resolver.js.map