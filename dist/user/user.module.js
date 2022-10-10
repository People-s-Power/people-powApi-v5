"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_controller_1 = require("./controllers/user.controller");
const follower_controller_1 = require("./controllers/follower.controller");
const user_resolver_1 = require("./user.resolver");
const user_service_1 = require("./services/user.service");
const follower_service_1 = require("./services/follower.service");
const petition_schema_1 = require("../petition/schema/petition.schema");
const followers_schema_1 = require("./entity/followers.schema");
const user_schema_1 = require("./entity/user.schema");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                { name: petition_schema_1.Petition.name, schema: petition_schema_1.PetitionSchema },
                { name: followers_schema_1.Follower.name, schema: followers_schema_1.FollowerSchema }
            ]),
            common_1.CacheModule.register(),
        ],
        providers: [
            user_resolver_1.UserResolver,
            user_service_1.UserService,
            follower_service_1.FollowersService
        ],
        controllers: [user_controller_1.UserController, follower_controller_1.FollowerController],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map