const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    exc_key: state => state.user.exc_key,
    userId: state => state.user.userId,
    userAu: state => state.user.au,
    companyName: state => state.user.companyName,
    roles: state => state.user.roles,
    tpParams: state => state.tagsView.tpParams,
    permissionId: state => state.app.permissionId,
    visitedViews: state => state.tagsView.visitedViews,
    permission_routes: state => state.permission.routes,
    activeTagView: state => state.tagsView.activeTagView //当前激活的tag
};
export default getters;