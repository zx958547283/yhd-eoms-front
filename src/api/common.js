import request from "@/utils/request";

export default {
  //根据关键字查询商品
  getProductListByKeyword(params) {
    return request.post("/common/getProductListByKeyword", params);
  },
  //分页查询专题
  getSubjectList(params) {
    return request.post("/common/getSubjectList", params);
  },
  //取得所有城市
  getAllCity(params) {
    return request.post("/common/getAllCity", params);
  }
};
