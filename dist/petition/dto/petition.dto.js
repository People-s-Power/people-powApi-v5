"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePetitionDTO = exports.CreatePetitionOrgDTO = exports.CreatePetitionDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreatePetitionDTO {
}
exports.CreatePetitionDTO = CreatePetitionDTO;
class CreatePetitionOrgDTO {
}
exports.CreatePetitionOrgDTO = CreatePetitionOrgDTO;
class UpdatePetitionDTO extends (0, swagger_1.PartialType)(CreatePetitionDTO) {
}
exports.UpdatePetitionDTO = UpdatePetitionDTO;
//# sourceMappingURL=petition.dto.js.map