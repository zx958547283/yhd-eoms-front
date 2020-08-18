import request from "@/utils/request";

export default {
    searchWXMPMaterialList(params) {
        return request.post("/wx/searchWXMPMaterialList", params);
    },
    getWXMPMaterialNewsById(params) {
        return request.post("/wx/getWXMPMaterialNewsById", params);
    },
    sendGroupMsg(params) {
        return request.post("/wx/sendGroupMsg", params);
    },
    getTemplate(params) {
        return request.post("/wx/templates", params);
    },
    sendTemplateMessage(params) {
        return request.post("/wx/sendMessage", params);
    },
  
    listTask(params) {
        return request.post("/cont/histories", {});
    }
};
