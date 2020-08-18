import request from "@/utils/request";

export default {
    getMemberEnrollOffline(params) {
        return request.post("/course/getMemberEnrollOffline", { pk: params });
    },
    saveMemberEnrollOffline(params) {
        return request.post("/course/saveMemberEnrollOffline", params);
    },
    deleteMemberEnrollOffline(params) {
        return request.post("/course/deleteMemberEnrollOffline", { pk: params });
    },
    getApplyTeacher(params) {
        return request.post("/course/getApplyTeacher", { pk: params });
    },
    saveApplyTeacher(params) {
        return request.post("/course/saveApplyTeacher", params);
    },
    deleteApplyTeacher(params) {
        return request.post("/course/deleteApplyTeacher", { pk: params });
    },
    getMemberClockIn(params) {
        return request.post("/course/getMemberClockIn", { pk: params });
    },
    saveMemberClockIn(params) {
        return request.post("/course/saveMemberClockIn", params);
    },
    deleteMemberClockIn(params) {
        return request.post("/course/deleteMemberClockIn", { pk: params });
    },
    getOlcourseHistory(params) {
        return request.post("/course/getOlcourseHistory", { pk: params });
    },
    saveOlcourseHistory(params) {
        return request.post("/course/saveOlcourseHistory", params);
    },
    deleteOlcourseHistory(params) {
        return request.post("/course/deleteOlcourseHistory", { pk: params });
    },
    getOlCourse(params) {
        return request.post("/course/getOlCourse", { pk: params });
    },
    saveOlCourse(params) {
        return request.post("/course/saveOlCourse", params);
    },
    deleteOlCourse(params) {
        return request.post("/course/deleteOlCourse", { pk: params });
    },
    getOlCourseClass(params) {
        return request.post("/course/getOlCourseClass", { pk: params });
    },
    saveOlCourseClass(params) {
        return request.post("/course/saveOlCourseClass", params);
    },
    deleteOlCourseClass(params) {
        return request.post("/course/deleteOlCourseClass", { pk: params });
    },
    getOlcourseHistoryDetail(params) {
        return request.post("/course/getOlcourseHistoryDetail", { pk: params });
    },
    saveOlcourseHistoryDetail(params) {
        return request.post("/course/saveOlcourseHistoryDetail", params);
    },
    deleteOlcourseHistoryDetail(params) {
        return request.post("/course/deleteOlcourseHistoryDetail", { pk: params });
    },
    getMemberClass(params) {
        return request.post("/course/getMemberClass", { pk: params });
    },
    saveMemberClass(params) {
        return request.post("/course/saveMemberClass", params);
    },
    deleteMemberClass(params) {
        return request.post("/course/deleteMemberClass", { pk: params });
    },
    getOfflineCourseStore(params) {
        return request.post("/course/getOfflineCourseStore", { pk: params });
    },
    saveOfflineCourseStore(params) {
        return request.post("/course/saveOfflineCourseStore", params);
    },
    deleteOfflineCourseStore(params) {
        return request.post("/course/deleteOfflineCourseStore", { pk: params });
    },
    getOfflineCourse(params) {
        return request.post("/course/getOfflineCourse", { pk: params });
    },
    saveOfflineCourse(params) {
        return request.post("/course/saveOfflineCourse", params);
    },
    deleteOfflineCourse(params) {
        return request.post("/course/deleteOfflineCourse", { pk: params });
    },
    getWhSign(params) {
        return request.post("/wh/getWhSign", params);
    },
    getOffLineList(params) {
        return request.post("/course/getOffLineList", params);
    },
    getAllOffLineList(params) {
        return request.post("/course/getAllOffLineList", params);
    },
    saveAllCourseStore(params) {
        return request.post("/course/saveAllCourseStore", params);
    },
    getRecommentCourse(params) {
        return request.post("/course/getRecommentCourse", params);
    },
    saveRecommentCourseList(params) {
        return request.post("/course/saveRecommentCourseList", params);
    },
    getLiveVideo(params) {
        return request.post("/course/getLiveVideo", { pk: params });
    },
    saveLiveVideo(params) {
        return request.post("/course/saveLiveVideo", params);
    },
    deleteLiveVideo(params) {
        return request.post("/course/deleteLiveVideo", { pk: params });
    },
    saveHomeTopCourse(params) {
        return request.post("/course/saveHomeTopCourse", { pk: params });
    },
    getLiveCourse(params) {
        return request.post("/course/getLiveCourse", { pk: params });
    },
    saveLiveCourse(params) {
        return request.post("/course/saveLiveCourse", params);
    },
    deleteLiveCourse(params) {
        return request.post("/course/deleteLiveCourse", { pk: params });
    },
    getRecommentNewCourse(params) {
        return request.post("/course/getRecommentNewCourse", params);
    }
};
