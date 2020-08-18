import request from "@/utils/request";

export default {
    getComment(params) {
        return request.post("/pms/getComment", { pk: params });
    },
    saveComment(params) {
        return request.post("/pms/saveComment", params);
    },
    deleteComment(params) {
        return request.post("/pms/deleteComment", { pk: params });
    }
};
