import request from "@/utils/request";

export default {
    getMemberJob(params) {
        return request.post("/job/getMemberJob", { pk: params });
    },
    saveMemberJob(params) {
        return request.post("/job/saveMemberJob", params);
    },
    deleteMemberJob(params) {
        return request.post("/job/deleteMemberJob", { pk: params });
    },
    getScoreJob(params) {
        return request.post("/job/getScoreJob", { pk: params });
    },
    saveScoreJob(params) {
        return request.post("/job/saveScoreJob", params);
    },
    deleteScoreJob(params) {
        return request.post("/job/deleteScoreJob", { pk: params });
    }
};
