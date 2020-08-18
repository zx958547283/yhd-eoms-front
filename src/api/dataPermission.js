import request from "@/utils/request";

export default {
    getDataPermission(params) {
        return request.post("/ums/getDataPermission", { pk: params });
    },
    saveDataPermission(params) {
        return request.post("/ums/saveDataPermission", params);
    },
    deleteDataPermission(params) {
        return request.post("/ums/deleteDataPermission", { pk: params });
    }
};
