"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetitionDTO = exports.CreatePetitionOrgDTO = exports.IPetition = exports.CreatePetitionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
class CreatePetitionDTO {
}
exports.CreatePetitionDTO = CreatePetitionDTO;
class IPetition extends mongoose_1.Document {
}
exports.IPetition = IPetition;
class CreatePetitionOrgDTO {
}
exports.CreatePetitionOrgDTO = CreatePetitionOrgDTO;
class UpdatePetitionDTO extends (0, swagger_1.PartialType)(CreatePetitionDTO) {
}
exports.UpdatePetitionDTO = UpdatePetitionDTO;
//# sourceMappingURL=petition.dto.js.map