import request from "@/utils/request";

export default {
  //分页查询订单列表
  getBaseManageMenu(params) {
    return request.post("/gms/getBaseManageMenu", params);
  },
  getGame(id) {
    return request.post("/gms/getGame", { pk: id });
  },
  deleteGame(id) {
    return request.post("/gms/deleteGame", { pk: id });
  },
  saveGame(entity) {
    return request.post("/gms/saveGame", entity);
  },
  getQuestion(id) {
    return request.post("/gms/getFullQuestion", { pk: id });
  },
  listQuestionType() {
    return request.post("/gms/list");
  },
  saveQuestion(data) {
    return request.post("/gms/saveQuestion", data);
  },
  updateQuestion(data) {
    return request.post("/gms/updateQuestion", data);
  },
  updateStatus(data) {
    return request.post("/gms/updateStatus", data);
  },
  getDayGift(id) {
    return request.post("/gms/getDayGift", { pk: id });
  },
  deleteDayGift(id) {
    return request.post("/gms/deleteDayGift", { pk: id });
  },
  saveDayGift(entity) {
    return request.post("/gms/saveDayGift", entity);
  },
  saveQuestionType(entity) {
    return request.post("/gms/saveQuestionType", entity);
  },
  getLevel(id) {
    return request.post("/gms/getLevel", { pk: id });
  },
  deleteLevel(id) {
    return request.post("/gms/deleteLevel", { pk: id });
  },
  saveLevel(entity) {
    return request.post("/gms/saveLevel", entity);
  },
  getGrade(id) {
    return request.post("/gms/getGrade", { pk: id });
  },
  deleteGrade(id) {
    return request.post("/gms/deleteGrade", { pk: id });
  },
  saveGrade(entity) {
    return request.post("/gms/saveGrade", entity);
  },
  getGameTool(id) {
    return request.post("/gms/getGameTool", { pk: id });
  },
  deleteGameTool(id) {
    return request.post("/gms/deleteGameTool", { pk: id });
  },
  saveGameTool(entity) {
    return request.post("/gms/saveGameTool", entity);
  },
  listAllGameTool() {
    return request.get("/gms/listAll");
  },
  getGameGoods(id) {
    return request.post("/gms/getGameGoods", { pk: id });
  },
  deleteGameGoods(id) {
    return request.post("/gms/deleteGameGoods", { pk: id });
  },
  saveGameGoods(entity) {
    return request.post("/gms/saveGameGoods", entity);
  },
  getProductList(params) {
    return request.post("/gms/getProductList", params);
  },
  saveMutiGameGoods(params) {
    return request.post("/gms/saveMutiGameGoods", params);
  },
  getGameConfig(id) {
    return request.post("/gms/getGameConfig", { pk: id });
  },
  deleteGameConfig(id) {
    return request.post("/gms/deleteGameConfig", { pk: id });
  },
  saveGameConfig(entity) {
    return request.post("/gms/saveGameConfig", entity);
  },
  getBgmSettings(id) {
    return request.post("/gms/getBgmSettings", { pk: id });
  },
  deleteBgmSettings(id) {
    return request.post("/gms/deleteBgmSettings", { pk: id });
  },
  saveBgmSettings(entity) {
    return request.post("/gms/saveBgmSettings", entity);
  },
  getRoomServer(id) {
    return request.post("/gms/getRoomServer", { pk: id });
  },
  deleteRoomServer(id) {
    return request.post("/gms/deleteRoomServer", { pk: id });
  },
  saveRoomServer(entity) {
    return request.post("/gms/saveRoomServer", entity);
  },
  getGameBalanceDetail(id) {
    return request.post("/gms/getGameBalanceDetails", { pk: id });
  },
  getAllRegister(data) {
    return request.post("/gms/getAllUserCnt", data);
  },
  getUserAnaly(data) {
    return request.post("/gms/getUserAnaly", data);
  },
  getNoAnswerCnt(data) {
    return request.post("/gms/getNoAnswerCnt", data);
  },
  exportAll(data) {
    return request.post("/gms/exportAll", data);
  }
};
