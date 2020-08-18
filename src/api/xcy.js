import request from "@/utils/request";

export default {
    getEnterpriseList(params) {
        return request.post("/xcy/getEnterpriseList", params);
    },
    exportEnterpriseList(params) {
        return request.post("/xcy/exportEnterpriseList", params);
    },
    getEnterprise(params) {
        return request.post("/xcy/getEnterprise", { pk: params });
    },
    saveEnterprise(params) {//update
        return request.post("/xcy/saveEnterprise", params);
    },
    saveEnterpriseInfo(params) { //添加
        return request.post("/xcy/saveEnterpriseInfo", params);
    },
    deleteEnterprise(params) {
        return request.post("/xcy/deleteEnterprise", { pk: params });
    },
    getProductAttachment(params) {
        return request.post("/xcy/getProductAttachment", { pk: params });
    },
    saveProductAttachment(params) {
        return request.post("/xcy/saveProductAttachment", params);
    },
    deleteProductAttachment(params) {
        return request.post("/xcy/deleteProductAttachment", { pk: params });
    },
    getOrgList(params) {
        return request.post("/xcy/getOrgList", params);
    },
    getQcOrg(params) {
        return request.post("/xcy/getQcOrg", { pk: params });
    },
    saveOrg(params) { //添加
        return request.post("/xcy/saveOrg", params);
    },
    saveQcOrg(params) { //更新
        return request.post("/xcy/saveQcOrg", params);
    },
    deleteQcOrg(params) {
        return request.post("/xcy/deleteQcOrg", { pk: params });
    },
    // getSinglePage(params) {
    //     return request.post("/xcy/getSinglePage", { pk: params });
    // },
    saveSingPage(params) {
        return request.post("/xcy/saveSingPage", params);
    },
    deleteSingPage(params) {
        return request.post("/xcy/deleteSingPage", { pk: params });
    },
    getSysParm(params) {
        return request.post("/xcy/getSysParm", { pk: params });
    },
    getMySysParm() {
        return request.post("/xcy/getAllSysParm");
    },
    saveSysParm(params) {
        return request.post("/xcy/saveSysParm", params);
    },
    deleteSysParm(params) {
        return request.post("/xcy/deleteSysParm", { pk: params });
    },
    getXcyProduct(params) {
        return request.post("/xcy/getXcyProduct", { pk: params });
    },
    saveXcyProduct(params) { // 不用
        return request.post("/xcy/saveXcyProduct", params);
    },
    deleteXcyProduct(params) {
        return request.post("/xcy/deleteXcyProduct", { pk: params });
    },
    getProductList(params) {
        return request.post("/xcy/getProductList", params);
    },
    getImgs(params) {
        return request.post("/xcy/getImgs", params); //product_id type=0产品 type=1质检
    },
    saveXcyProductInfo(params) {
        return request.post("/xcy/saveXcyProductInfo", params);
    },
    showExcelFile(params) {
        return request.post("/xcy/showExcelFile", params);
    },
    saveExcelFile(params) {
        return request.post("/xcy/saveExcelFile", params);
    },
    getProductType() {
        return request.post("/xcy/getProductType"); // 获取所有可以选择的产品类别数组
    },
    getProductLevel() {
        return request.post("/xcy/getProductLevel"); // 获取所有可以选择的等级数组
    },
    saveProductStatus(params) {
        return request.post("/xcy/saveProductStatus", params); // 质检信息界面修改审核状态
    },
    exportProductList(params) {
        return request.post("/xcy/exportProductList", params); // 产品筛选excel导出
    },
    getSingPages(params) {
        return request.post("/xcy/getSingPages", params); // 产品筛选excel导出
    },
    getXcyProductInfo(params) {
        return request.post("/xcy/getXcyProductInfo", params); // 产品筛选excel导出
    }
};
