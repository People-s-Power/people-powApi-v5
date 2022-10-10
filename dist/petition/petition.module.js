"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const petition_controller_1 = require("./controllers/petition.controller");
const endorsement_controller_1 = require("./controllers/endorsement.controller");
const petition_gateway_1 = require("./gateway/petition.gateway");
const petition_resolver_1 = require("./resolvers/petition.resolver");
const endorsement_resolver_1 = require("./resolvers/endorsement.resolver");
const petition_schema_1 = require("./schema/petition.schema");
const endorsement_schema_1 = require("./schema/endorsement.schema");
const petition_service_1 = require("./services/petition.service");
const endorsement_service_1 = require("./services/endorsement.service");
const mongooseSlug = require("mongoose-slug-generator");
const user_schema_1 = require("../user/entity/user.schema");
const notification_schema_1 = require("../notification/notification.schema");
const config_1 = require("../utils/config");
const microservices_1 = require("@nestjs/microservices");
const update_service_1 = require("./services/update.service");
const update_controller_1 = require("./controllers/update.controller");
const update_schema_1 = require("./schema/update.schema");
const reportCamp_schema_1 = require("./schema/reportCamp.schema");
const report_controller_1 = require("./controllers/report.controller");
const reportCamp_service_1 = require("./services/reportCamp.service");
let PetitionModule = class PetitionModule {
};
PetitionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                ,
                { name: endorsement_schema_1.Endorsement.name, schema: endorsement_schema_1.EndorsementSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: notification_schema_1.Notice.name, schema: notification_schema_1.NoticeSchema },
                { name: petition_schema_1.View.name, schema: petition_schema_1.ViewSchema },
                { name: update_schema_1.Update.name, schema: update_schema_1.UpdateSchema },
                { name: reportCamp_schema_1.ReportCamp.name, schema: reportCamp_schema_1.ReportCampSchema }
            ]),
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: petition_schema_1.Petition.name,
                    useFactory: () => {
                        const schema = petition_schema_1.PetitionSchema;
                        schema.plugin(mongooseSlug);
                        return schema;
                    },
                },
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
            update_service_1.UpdateService,
            petition_resolver_1.PetitionResolver,
            petition_service_1.PetitionService,
            reportCamp_service_1.ReportCampService,
            endorsement_service_1.EndorsementService,
            endorsement_resolver_1.EndorsementResolver,
            petition_gateway_1.PetitionGateway,
        ],
        controllers: [petition_controller_1.PetitionController, endorsement_controller_1.EndorsementController, update_controller_1.UpdateController, report_controller_1.ReportCampController],
    })
], PetitionModule);
exports.PetitionModule = PetitionModule;
//# sourceMappingURL=petition.module.js.map