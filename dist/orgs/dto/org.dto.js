"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrgDTO = exports.createOperators = exports.CreateOrgDTO = exports.IOrg = exports.StaffRoleEnum = void 0;
const mongoose_1 = require("mongoose");
var StaffRoleEnum;
(function (StaffRoleEnum) {
    StaffRoleEnum["Admin"] = "Admin";
    StaffRoleEnum["Editor"] = "Editor";
})(StaffRoleEnum = exports.StaffRoleEnum || (exports.StaffRoleEnum = {}));
class IOrg extends mongoose_1.Document {
}
exports.IOrg = IOrg;
class CreateOrgDTO {
}
exports.CreateOrgDTO = CreateOrgDTO;
class createOperators {
}
exports.createOperators = createOperators;
class UpdateOrgDTO {
}
exports.UpdateOrgDTO = UpdateOrgDTO;
//# sourceMappingURL=org.dto.js.map