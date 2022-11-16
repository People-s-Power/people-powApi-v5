"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VictoryModule = void 0;
const common_1 = require("@nestjs/common");
const victory_service_1 = require("./victory.service");
const victory_resolver_1 = require("./victory.resolver");
const mongoose_1 = require("@nestjs/mongoose");
const victory_entity_1 = require("./entities/victory.entity");
const user_schema_1 = require("../user/entity/user.schema");
const organization_schema_1 = require("../organization/schema/organization.schema");
let VictoryModule = class VictoryModule {
};
VictoryModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: victory_entity_1.Victory.name, schema: victory_entity_1.VictorySchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: organization_schema_1.orgnaization.name, schema: organization_schema_1.orgnaizationSchema }
            ])
        ],
        providers: [victory_resolver_1.VictoryResolver, victory_service_1.VictoryService]
    })
], VictoryModule);
exports.VictoryModule = VictoryModule;
//# sourceMappingURL=victory.module.js.map