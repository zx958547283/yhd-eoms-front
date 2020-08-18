import request from "@/utils/request";

export default {
    getContentCategory(params) {
        return request.post("/cont/getContentCategory", { pk: params });
    },
    saveContentCategory(params) {
        return request.post("/cont/saveContentCategory", params);
    },
    deleteContentCategory(params) {
        return request.post("/cont/deleteContentCategory", { pk: params });
    },
    getContentCatTree(params) {
        return request.post("/common/getContentCatTree", { pk: params });
    },
    getContent(params) {
        return request.post("/cont/getContent", { pk: params });
    },
    saveContent(params) {
        return request.post("/cont/saveContent", params);
    },
    deleteContent(params) {
        return request.post("/cont/deleteContent", { pk: params });
    },
    getQrcode(params) {
        return request.post("/cont/getQrcode", { pk: params });
    },
    saveQrcode(params) {
        return request.post("/cont/saveQrcode", params);
    },
    deleteQrcode(params) {
        return request.post("/cont/deleteQrcode", { pk: params });
    },
    getWxmp(params) {
        return request.post("/cont/getWxmp", { pk: params });
    },
    saveWxmp(params) {
        return request.post("/cont/saveWxmp", params);
    },
    deleteWxmp(params) {
        return request.post("/cont/deleteWxmp", { pk: params });
    },
    deleteWXMPMenu(params) {
        return request.post("/cont/deleteWXMPMenu", params);
    },
    saveWxmpMenu(params) {
        return request.post("/cont/saveWxmpMenu", params);
    },
    deleteWxmpMenu(params) {
        return request.post("/cont/deleteWxmpMenu", { pk: params });
    },
    doSynWXMPMenu(params) {
        return request.post("/cont/doSynWXMPMenu", params);
    },
    searchWXMPMaterialList(params) {
        return request.post("/wx/searchWXMPMaterialList", params);
    },
    getWXMPGroupMsg(params) {
        return request.post("/cont/getWXMPGroupMsg", params);
    },
    getContentDetailByPage(params) {
        return request.post("/eomsCont/getContentDetailByPage", params);
    },
    getAllContents(params) {
        return request.post("/eomsCont/getAllContents", params);
    },
    savePageInfo(params) {
        return request.post("/eomsCont/savePageInfo", params);
    },
    saveContentDelete(params) {
        return request.post("/eomsCont/saveContentDelete", params);
    },
    getSignPageType(param) {
        return request.post("/eomsCont/getSignPageType", param);
    },
    saveSinglePage(param) {
        return request.post("/cont/saveSinglePage", param);
    },
    getSinglePage(param) {
        return request.post("/cont/getSinglePage", { pk: param });
    },
    deleteSinglePage(param) {
        return request.post("/cont/deleteSinglePage", { pk: param });
    },
    histories(param) {
        return request.post("/cont/histories", param);
    },
    getTeamStory(params) {
        return request.post("/cont/getTeamStory", { pk: params });
    },
    saveTeamStory(params) {
        return request.post("/cont/saveTeamStory", params);
    },
    deleteTeamStory(params) {
        return request.post("/cont/deleteTeamStory", { pk: params });
    },
    saveDetails(params) {
        return request.post("/cont/saveDetails", params);
    },
    getMatchRankDetail(params) {
        return request.post("/cont/getMatchRankDetail", { pk: params });
    },
    deleteByType(params) {
        return request.post("/cont/deleteByType", { pk: params });
    },
    getMemberMessage(params) {
        return request.post("/cont/getMemberMessage", { pk: params });
    },
    saveMemberMessage(params) {
        return request.post("/cont/saveMemberMessage", params);
    },
    deleteMemberMessage(params) {
        return request.post("/cont/deleteMemberMessage", { pk: params });
    },
    getRecommend(params) {
        return request.post("/cont/getRecommend", { pk: params });
    },
    saveRecommend(params) {
        return request.post("/cont/saveRecommend", params);
    },
    deleteRecommend(params) {
        return request.post("/cont/deleteRecommend", { pk: params });
    },
    getShare(params) {
        return request.post("/cont/getShare", { pk: params });
    },
    saveShare(params) {
        return request.post("/cont/saveShare", params);
    },
    deleteShare(params) {
        return request.post("/cont/deleteShare", { pk: params });
    },
    publishContent(params) {
    return request.post("/cont/publishContent", { pk: params });
  }
};
