import request from "@/utils/request";

export default {
    tmCloundLogin(params) {
        return request.post("/auth/tmCloundLogin", params);
    },
    changeCompany(params) {
        return request.post("/auth/changeCompany", params);
    }
};
