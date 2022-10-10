"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetitionSocketEnum = exports.PetitionStatusEnum = void 0;
var PetitionStatusEnum;
(function (PetitionStatusEnum) {
    PetitionStatusEnum["Active"] = "Active";
    PetitionStatusEnum["Pending"] = "Pending";
    PetitionStatusEnum["Finished"] = "Finished";
    PetitionStatusEnum["Draft"] = "Draft";
    PetitionStatusEnum["Promoted"] = "Promoted";
})(PetitionStatusEnum = exports.PetitionStatusEnum || (exports.PetitionStatusEnum = {}));
var PetitionSocketEnum;
(function (PetitionSocketEnum) {
    PetitionSocketEnum["Created"] = "created-Petition";
    PetitionSocketEnum["Endorsed"] = "endorsed-Petition";
    PetitionSocketEnum["Liked"] = "liked-Petition";
    PetitionSocketEnum["Shared"] = "shared-Petition";
    PetitionSocketEnum["Promoted"] = "promoted-Petition";
    PetitionSocketEnum["Deleted"] = "deleted-Petition";
    PetitionSocketEnum["Get"] = "get-Petitions";
    PetitionSocketEnum["Send"] = "send-endorsements";
})(PetitionSocketEnum = exports.PetitionSocketEnum || (exports.PetitionSocketEnum = {}));
//# sourceMappingURL=petition.interface.js.map