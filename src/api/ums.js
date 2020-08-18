import request from "@/utils/request";

export default {
  getOrgTree() {
    return request.post("/ums/getCompanyTree");
  },
  getDepartTree() {
    return request.post("/ums/getDepartTree");
  },
  saveOrganization(entity) {
    return request.post("/ums/saveOrganization", entity);
  },
  getOraganization(id) {
    return request.post("/ums/getOrganization", { pk: id });
  },
  delOraganization(id) {
    return request.post("/ums/deleteOrganization", { pk: id });
  },
  saveAdmin(entity) {
    return request.post("/ums/saveAdmin", entity);
  },
  getAdmin(id) {
    return request.post("/ums/getAdmin", { pk: id });
  },
  delAdmin(id) {
    return request.post("/ums/deleteAdmin", { pk: id });
  },
  savePermission(entity) {
    return request.post("/ums/savePermission", entity);
  },
  getPermission(id) {
    return request.post("/ums/getPermission", { pk: id });
  },
  delPermission(id) {
    return request.post("/ums/deletePermission", { pk: id });
  },
  getMypower() {
    return request.post("/ums/getMypower");
  },
  getPowerlist(node_id, role_id) {
    return request.post("/ums/getPowerlist", { node_id: node_id, role_id: role_id });
  },
  saveRolePermission(params) {
    return request.post("/ums/saveRolePermission", params);
  },
  searchAdminRoleByUserId(params) {
    return request.post("/ums/searchAdminRoleByUserId", params);
  },
  doAuthRole(params) {
    return request.post("/ums/doAuthRole", params);
  },
  updateAdminPass(params) {
    return request.post("/ums/updateAdminPass", params);
  },
  doDelockAdmin(params) {
    return request.post("/ums/doDelockAdmin", params);
  },
  getPermissionTree(params) {
    return request.post("/ums/getPermissionTree", params);
  },
  saveButtonPermission(params) {
    return request.post("/ums/saveButtonPermission", params);
  },
  deleteButtonPermission(params) {
    return request.post("/ums/deleteButtonPermission", params);
  },
  getButtonPermission(params) {
    return request.post("/ums/getButtonPermission", { pk: params });
  },
  doAuthRoleButtonRelation(params) {
    return request.post("/ums/doAuthRoleButtonRelation", params);
  },
  updateAuthData(params) {
    return request.post("/ums/updateAuthData", params);
  },
  searchDataPermissionGroup(params) {
    return request.post("/ums/searchDataPermissionGroup", params);
  },
  doChangeDataPermission(params) {
    return request.post("/ums/doChangeDataPermission", params);
  },
  getMemberBankCard(params) {
    return request.post("/ums/getMemberBankCard", { pk: params });
  },
  saveMemberBankCard(entity) {
    return request.post("/ums/saveMemberBankCard", entity);
  },
  getMemberLevel(params) {
    return request.post("/ums/getMemberLevel", { pk: params });
  },
  deleteMemberLevel(params) {
    return request.post("/ums/deleteMemberLevel", params);
  },
  saveMemberLevel(entity) {
    return request.post("/ums/saveMemberLevel", entity);
  },
  getJudges(params) {
    return request.post("/ums/getJudges", { pk: params });
  },
  saveJudges(params) {
    return request.post("/ums/saveJudges", params);
  },
  deleteJudges(params) {
    return request.post("/ums/deleteJudges", { pk: params });
  },
  getMemberLlcxExt(params) {
    return request.post("/ums/getMemberLlcxExt", { pk: params });
  },
  saveMemberLlcxExt(params) {
    return request.post("/ums/saveMemberLlcxExt", params);
  },
  deleteMemberLlcxExt(params) {
    return request.post("/ums/deleteMemberLlcxExt", { pk: params });
  },
  getMemberLlcxExtDetail(params) {
    return request.post("/ums/getMemberLlcxExtDetail", { pk: params });
  },
  saveMemberExchageJxs(params) {
    return request.post("/ums/updateEmployeeFlg", params);
  },
  getDeptBook(params) {
    return request.post("/ums/getDeptBook", { pk: params });
  },
  saveDeptBook(params) {
    return request.post("/ums/saveDeptBook", params);
  },
  deleteDeptBook(params) {
    return request.post("/ums/deleteDeptBook", { pk: params });
  },
  getMemberBooking(params) {
    return request.post("/ums/getMemberBooking", { pk: params });
  },
  saveMemberBooking(params) {
    return request.post("/ums/saveMemberBooking", params);
  },
  deleteMemberBooking(params) {
    return request.post("/ums/deleteMemberBooking", { pk: params });
  }
};
