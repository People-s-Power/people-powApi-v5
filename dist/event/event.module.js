"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventModule = void 0;
const common_1 = require("@nestjs/common");
const event_service_1 = require("./event.service");
const event_resolver_1 = require("./event.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const event_1 = require("./schema/event");
const user_schema_1 = require("../user/entity/user.schema");
const organization_schema_1 = require("../organization/schema/organization.schema");
let EventModule = class EventModule {
};
EventModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: event_1.event.name, schema: event_1.eventSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: organization_schema_1.orgnaization.name, schema: organization_schema_1.orgnaizationSchema }
            ])
        ],
        providers: [event_resolver_1.EventResolver, event_service_1.EventService]
    })
], EventModule);
exports.EventModule = EventModule;
//# sourceMappingURL=event.module.js.map