import request from "@/utils/request";

export default {
    getMalady(params) {
        return request.post("/mady/getMalady", { pk: params });
    },
    saveMalady(params) {
        return request.post("/mady/saveMalady", params);
    },
    deleteMalady(params) {
        return request.post("/mady/deleteMalady", { pk: params });
    },
    getMaladyAcupoint(params) {
        return request.post("/mady/getMaladyAcupoint", { pk: params });
    },
    saveMaladyAcupoint(params) {
        return request.post("/mady/saveMaladyAcupoint", params);
    },
    deleteMaladyAcupoint(params) {
        return request.post("/mady/deleteMaladyAcupoint", { pk: params });
    }
};
