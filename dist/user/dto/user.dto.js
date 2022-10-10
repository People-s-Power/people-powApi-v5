"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAndCampDTO = exports.ChangePasswordDTO = exports.ChangeUserAccountTypeDTO = exports.ChangeUserRoleDTO = exports.AssignUserAdminDTO = exports.UpdateUserDTO = exports.LoginWithGoogleDTO = exports.LoginWithEmailDTO = exports.RegisterWithGoogleDTO = exports.RegisterWithEmailDTO = exports.IUser = exports.AccountTypeEnum = exports.StaffRoleEnum = void 0;
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
var StaffRoleEnum;
(function (StaffRoleEnum) {
    StaffRoleEnum["Admin"] = "Admin";
    StaffRoleEnum["Rep"] = "Rep";
    StaffRoleEnum["LegalWorld"] = "LegalWorld";
    StaffRoleEnum["Lawyer"] = "Lawyer";
    StaffRoleEnum["Draft"] = "Draft";
    StaffRoleEnum["Supervisor"] = "Supervisor";
    StaffRoleEnum["Campaigner"] = "Campaigner";
    StaffRoleEnum["User"] = "User";
})(StaffRoleEnum = exports.StaffRoleEnum || (exports.StaffRoleEnum = {}));
var AccountTypeEnum;
(function (AccountTypeEnum) {
    AccountTypeEnum["Campaigner"] = "Campaigner";
    AccountTypeEnum["Staff"] = "Staff";
    AccountTypeEnum["Applicant"] = "Applicant";
    AccountTypeEnum["Contact"] = "Contact";
})(AccountTypeEnum = exports.AccountTypeEnum || (exports.AccountTypeEnum = {}));
class IUser extends mongoose_1.Document {
}
exports.IUser = IUser;
class RegisterWithEmailDTO {
}
exports.RegisterWithEmailDTO = RegisterWithEmailDTO;
class RegisterWithGoogleDTO extends (0, swagger_1.PartialType)(RegisterWithEmailDTO) {
}
exports.RegisterWithGoogleDTO = RegisterWithGoogleDTO;
class LoginWithEmailDTO {
}
exports.LoginWithEmailDTO = LoginWithEmailDTO;
class LoginWithGoogleDTO {
}
exports.LoginWithGoogleDTO = LoginWithGoogleDTO;
class UpdateUserDTO {
}
exports.UpdateUserDTO = UpdateUserDTO;
class AssignUserAdminDTO {
}
exports.AssignUserAdminDTO = AssignUserAdminDTO;
class ChangeUserRoleDTO {
}
exports.ChangeUserRoleDTO = ChangeUserRoleDTO;
class ChangeUserAccountTypeDTO {
}
exports.ChangeUserAccountTypeDTO = ChangeUserAccountTypeDTO;
class ChangePasswordDTO {
}
exports.ChangePasswordDTO = ChangePasswordDTO;
class UserAndCampDTO {
}
exports.UserAndCampDTO = UserAndCampDTO;
//# sourceMappingURL=user.dto.js.map