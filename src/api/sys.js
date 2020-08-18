import request from "@/utils/request";

export default {
  saveQueryTemplate(entity) {
    return request.post("/sys/saveQueryTemplate", entity);
  },
  getQueryTemplate(id) {
    return request.post("/sys/getQueryTemplate", { pk: id });
  },
  deleteQueryTemplate(id) {
    return request.post("/sys/deleteQueryTemplate", { pk: id });
  },
  saveQueryWhere(entity) {
    return request.post("/sys/saveQueryWhere", entity);
  },
  getQueryWhere(id) {
    return request.post("/sys/getQueryWhere", { pk: id });
  },
  deleteQueryWhere(id) {
    return request.post("/sys/deleteQueryWhere", { pk: id });
  },
  saveDef(entity) {
    return request.post("/sys/saveDef", entity);
  },
  getDef(id) {
    return request.post("/sys/getDef", { pk: id });
  },
  deleteDef(id) {
    return request.post("/sys/deleteDef", { pk: id });
  },
  saveDefList(entity) {
    return request.post("/sys/saveDefList", entity);
  },
  getDefList(id) {
    return request.post("/sys/getDefList", { pk: id });
  },
  deleteDefList(id) {
    return request.post("/sys/deleteDefList", { pk: id });
  },
  getDefTree() {
    return request.post("/common/getDefTree");
  },
  getDefListTree(id) {
    return request.post("/common/getDefListTree", { def_id: id });
  },
  templatePrintData(param) {
    return request.post("/sys/templatePrintData", param);
  },
  getActiveUserList(param) {
    return request.post("/sys/getActiveUserList", param);
  },
  removeLoginUser(param) {
    return request.post("/sys/removeLoginUser", param);
  },
  getTaskList(param) {
    return request.post("/sys/getTaskList", param);
  },
  addtask(param) {
    return request.post("/sys/addJob", param);
  },
  pauseJob(param) {
    return request.post("/sys/pauseJob", param);
  },
  resumejob(param) {
    return request.post("/sys/resumejob", param);
  },
  deletejob(param) {
    return request.post("/sys/deleteJob", param);
  },
  updateTask(param) {
    return request.post("/sys/updateJob", param);
  },
  getJavaFileInfo(param) {
    return request.post("/sys/getJavaFileInfo", param);
  },
  doCompilerFile(param) {
    return request.post("/sys/compilerToClass", param);
  },
  doSaveFileEdit(param) {
    return request.post("/sys/doSaveFileEdit", param);
  },
  stopScheduler(param) {
    return request.post("/sys/closeScheduler", param);
  },
  startScheduler(param) {
    return request.post("/sys/startScheduler", param);
  },
  runNow(param) {
    return request.post("/sys/runNow", param);
  },
  getLevelUpInfo(param) {
    return request.post("/sys/getLevelUpInfo", param);
  },
  saveLevelUpInfo(param) {
    return request.post("/sys/saveLevelUpInfo", param);
  },
  getSaleRewardParm(param) {
    return request.post("/sys/getSaleRewardParm", param);
  },
  saveSaleReward(param) {
    return request.post("/sys/saveSaleReward", param);
  },
  saveTeamReward(param) {
    return request.post("/sys/saveTeamReward", param);
  },
  listTask(param) {
    return request.post("/sys/listTask", param);
  },
  updateOneTask(param) {
    return request.post("/sys/updateTask", param);
  },
  deleteTask(param){
    return request.post("wx/deleteMessage", param);
  },
  getOneTask(param){
    return request.post("cont/getMessageLog", param);
  },
  getMembers(param){
    return request.post("ums/members", param);
  }
};
