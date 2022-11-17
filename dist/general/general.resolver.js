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
const create_general_input_1 = require("./dto/create-general.input");
const update_general_input_1 = require("./dto/update-general.input");
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
    create(createGeneralInput) {
        return this.generalService.create(createGeneralInput);
    }
    async testOFGen() {
        console.log('Fires cool');
        const [victories, adverts, posts, petitions, events] = await Promise.all([
            this.victoryService.findAll(),
            this.advertService.findAll(),
            this.postService.findAll(),
            this.petitionService.findAll(),
            this.eventService.findAll(),
        ]);
        console.log({
            victories: victories.length,
            adverts: adverts.length,
            petitions: petitions.length,
            events: events.length,
            posts: posts.length
        });
        return {
            adverts,
            events,
            petitions,
            posts,
            victories
        };
    }
    async general() {
        console.log('Fires cool');
        const [victories, adverts, posts, petitions, events] = await Promise.all([
            this.victoryService.findAll(),
            this.advertService.findAll(),
            this.postService.findAll(),
            this.petitionService.findAll(),
            this.eventService.findAll(),
        ]);
        console.log({
            victories: victories.length,
            adverts: adverts.length,
            petitions: petitions.length,
            events: events.length,
            posts: posts.length
        });
        return {
            adverts,
            events,
            petitions,
            posts,
            victories
        };
    }
    update(updateGeneralInput) {
        return this.generalService.update(updateGeneralInput.id, updateGeneralInput);
    }
    remove(id) {
        return this.generalService.remove(id);
    }
};
__decorate([
    (0, graphql_1.Mutation)('createGeneral'),
    __param(0, (0, graphql_1.Args)('createGeneralInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_general_input_1.CreateGeneralInput]),
    __metadata("design:returntype", void 0)
], GeneralResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('testOFGen'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "testOFGen", null);
__decorate([
    (0, graphql_1.Query)('general'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GeneralResolver.prototype, "general", null);
__decorate([
    (0, graphql_1.Mutation)('updateGeneral'),
    __param(0, (0, graphql_1.Args)('updateGeneralInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_general_input_1.UpdateGeneralInput]),
    __metadata("design:returntype", void 0)
], GeneralResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('removeGeneral'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GeneralResolver.prototype, "remove", null);
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