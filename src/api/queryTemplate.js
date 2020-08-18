import request from '@/utils/request'

export default {
  query(templateParams) {
    return request.post('/sys/templateQuery', templateParams);
  },
  queryAll(templateParams) {
    return request.post("/sys/templateQueryAll", templateParams);
  },
  queryDefList(reqParams) {
    return request.post("/common/queryDefList", reqParams);
  }
}
