import request from "@/utils/request";

export default {
  getAllSubject(params) {
    return request.post("/common/getAllSubject", params);
  },
  getAllPrefrenceArea(params) {
    return request.post("/common/getAllPrefrenceArea", params);
  }
};
