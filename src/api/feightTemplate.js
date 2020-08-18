import request from "@/utils/request";

export default {
    getFeightTemplate(params) {
        return request.post("/pms/getFeightTemplate", { pk: params });
    },
    saveFeightTemplate(params) {
        return request.post("/pms/saveFeightTemplate", params);
    },
    deleteFeightTemplate(params) {
        return request.post("/pms/deleteFeightTemplate", { pk: params });
    }
};
