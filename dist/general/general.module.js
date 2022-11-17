"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralModule = void 0;
const common_1 = require("@nestjs/common");
const general_service_1 = require("./general.service");
const general_resolver_1 = require("./general.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const event_1 = require("../event/schema/event");
const user_schema_1 = require("../user/entity/user.schema");
const organization_schema_1 = require("../organization/schema/organization.schema");
const advert_1 = require("../advert/schema/advert");
const petition_schema_1 = require("../petition/schema/petition.schema");
const post_schema_1 = require("../post/schema/post.schema");
const victory_entity_1 = require("../victory/entities/victory.entity");
const advert_service_1 = require("../advert/advert.service");
const event_service_1 = require("../event/event.service");
const petition_service_1 = require("../petition/services/petition.service");
const post_service_1 = require("../post/post.service");
const victory_service_1 = require("../victory/victory.service");
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("../utils/config");
const notification_schema_1 = require("../notification/notification.schema");
const update_schema_1 = require("../petition/schema/update.schema");
const reportCamp_schema_1 = require("../petition/schema/reportCamp.schema");
const endorsement_schema_1 = require("../petition/schema/endorsement.schema");
const petition_gateway_1 = require("../petition/gateway/petition.gateway");
let GeneralModule = class GeneralModule {
};
GeneralModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_1.event.name, schema: event_1.eventSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: organization_schema_1.orgnaization.name, schema: organization_schema_1.orgnaizationSchema },
                { name: advert_1.Advert.name, schema: advert_1.AdvertSchema },
                { name: petition_schema_1.Petition.name, schema: petition_schema_1.PetitionSchema },
                { name: post_schema_1.Post.name, schema: post_schema_1.PostSchema },
                { name: victory_entity_1.Victory.name, schema: victory_entity_1.VictorySchema },
                { name: notification_schema_1.Notice.name, schema: notification_schema_1.NoticeSchema },
                { name: petition_schema_1.View.name, schema: petition_schema_1.ViewSchema },
                { name: update_schema_1.Update.name, schema: update_schema_1.UpdateSchema },
                { name: endorsement_schema_1.Endorsement.name, schema: endorsement_schema_1.EndorsementSchema },
                { name: reportCamp_schema_1.ReportCamp.name, schema: reportCamp_schema_1.ReportCampSchema }
            ]),
            microservices_1.ClientsModule.register([
                {
                    name: 'MAIL_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [config_1.default.RMQ_URL],
                        queue: 'mail_queue',
                        noAck: false,
                        queueOptions: {
                            durable: false
                        },
                    },
                },
            ])
        ],
        providers: [
            general_resolver_1.GeneralResolver,
            general_service_1.GeneralService,
            advert_service_1.AdvertService,
            event_service_1.EventService,
            petition_service_1.PetitionService,
            post_service_1.PostService,
            victory_service_1.VictoryService,
            petition_gateway_1.PetitionGateway
        ]
    })
], GeneralModule);
exports.GeneralModule = GeneralModule;
//# sourceMappingURL=general.module.js.map