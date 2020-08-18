import request from "@/utils/request";

export default {
    //取得会员信息
    getMember(id) {
        return request.post("/ums/getMember", { pk: id });
    },
    getMemberDetail(id) {
        return request.post("/ums/getMemberDetail", { pk: id });
    },
    //删除会员信息
    deleteMember(id) {
        return request.post("/ums/deleteMember", { pk: id });
    },
    //保存会员信息
    saveMember(params) {
        return request.post("/ums/saveMember", params);
    },
    getMemberFavorites(params) {
        return request.post("/ums/getMemberFavorites", { pk: params });
    },
    saveMemberFavorites(params) {
        return request.post("/ums/saveMemberFavorites", params);
    },
    deleteMemberFavorites(params) {
        return request.post("/ums/deleteMemberFavorites", { pk: params });
    },
    getMemberDrawApply(params) {
        return request.post("/ums/getMemberDrawApply", { pk: params });
    },
    saveMemberDrawApply(params) {
        return request.post("/ums/saveMemberDrawApply", params);
    },
    deleteMemberDrawApply(params) {
        return request.post("/ums/deleteMemberDrawApply", { pk: params });
    },
    vip2Staff(params) {
        return request.post("/ums/vip2Staff", params);
    },
    pageByMemberId(params) {
        return request.post("/ums/pageByMemberId", params);
    },
    saveCompanyApplyPass(params) {
        return request.post("/ums/saveCompanyApplyPass", params);
    },
    saveCompanyApplyNotPass(params) {
        return request.post("/ums/saveCompanyApplyNotPass", params);
    },
    getMemberRewardList(params) {
        return request.post("/ums/getMemberRewardList", params);
    },
    getAllEmployee(id) {
        return request.post("/ums/getAllEmployee", { pk: id });
    },
    getHealthData(id) {
        return request.post("/ums/getHealthData", { member_id: id });
    },
    getMonitoringData(id) {
        return request.post("/ums/getMonitoringData", { member_id: id });
    },
    getCarePlanDetail(id) {
        return request.post("/ums/getCarePlanDetail", { id: id });
    },
    getCareRecordList(id) {
        return request.post("/ums/getCareRecordList", { id: id });
    },
    saveMemberDeposit(parm) {
        return request.post("/ums/saveMemberDeposit", parm);
    }

}