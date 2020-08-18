import request from "@/utils/request";

export default {
  //分页查询订单列表
  getOrderList(params) {
    return request.post("/oms/getOrderList", params);
  },
  //根据订单ID，排它键，备注，关闭订单
  doCloseOrder(params) {
    return request.post("/oms/doCloseOrder", params);
  },
  //删除订单所有信息，包含订单商品项
  doDeleteOrderFull(params) {
    return request.post("/oms/doDeleteOrderFull", params);
  },
  //根据订单ID组数查询订单
  getOrderByIds(params) {
    return request.post("/oms/getOrderByIds", params);
  },
  //订单发货
  doDeliveryOrder(params) {
    return request.post("/oms/doDeliveryOrder", params);
  },
  //获取订单详情
  getOrderDetail(params) {
    return request.post("/oms/getOrderDetail", params);
  },
  //更新订单收货信息
  updateOrderReceiverInfo(params) {
    return request.post("/oms/updateOrderReceiverInfo", params);
  },
  //更新订单费用信息
  updateOrderMoneyInfo(params) {
    return request.post("/oms/updateOrderMoneyInfo", params);
  },
  //发送订单站内信
  sendOrderMessage(params) {
    return request.post("/oms/sendOrderMessage", params);
  },
  //修改订单备注
  updateOrderNote(params) {
    return request.post("/oms/updateOrderNote", params);
  },
  //取消订单
  doCancleOrder(params) {
    return request.post("/oms/doCancleOrder", params);
  },
  //以行的形式取得订单配置信息
  rowWithOrderSetting(params) {
    return request.post("/oms/rowWithOrderSetting", params);
  },
  //以行的形式取得订单配置信息
  saveOrderSetting(params) {
    return request.post("/oms/saveOrderSetting", params);
  },
  //分页查询订单退货申请列表
  getOrderReturnApplyList(params) {
    return request.post("/oms/getOrderReturnApplyList", params);
  },
  //删除订单退货申请
  deleteOrderReturnApply(params) {
    return request.post("/oms/deleteOrderReturnApply", params);
  },
  //取得订单退货详情，包含收货公司地址列表
  getOrderReturnApplyDetail(params) {
    return request.post("/oms/getOrderReturnApplyDetail", params);
  },
  //确认退货
  doOperateOrderReturnApply(params) {
    return request.post("/oms/doOperateOrderReturnApply", params);
  },
  //分页查询退货原因
  getOrderReturnReasonList(params) {
    return request.post("/oms/getOrderReturnReasonList", params);
  },
  //更新退货原因开启状态
  doUpdateReturnReasonStatus(params) {
    return request.post("/oms/doUpdateReturnReasonStatus", params);
  },
  //删除退货原因,批量，单删。
  deleteOrderReturnReason(params) {
    return request.post("/oms/deleteOrderReturnReason", params);
  },
  //新增或修改退货原因
  saveOrderReturnReason(params) {
    return request.post("/oms/saveOrderReturnReason", params);
  },
  //取得退货原因详情
  getOrderReturnReason(params) {
    return request.post("/oms/getOrderReturnReason", params);
  },
  // 首页数据获取
  getHomePageInfo(params) {
    return request.post("/eoms/getHomepageInfo", params);
  },
  listMembersByGroupFountId(params) {
    return request.post("/oms/listMembersByGroupFountId", params)
  },
  // 获取地址详情
  getStoreAddress(params) {
    return request.post("/oms/getStoreAddress", { pk: params });
  },
  // 保存地址
  saveStoreAddress(params) {
    return request.post("/oms/saveStoreAddress", params);
  },
  deleteStoreAddress(params) {
    return request.post("/oms/deleteStoreAddress", { pk: params });
  },
  getLogisticsDetails(params) {
    return request.post("/oms/getLogisticsDetails", { id: params });
  },
  export(params) {
    return request.post("/oms/export", params);
  },
  savePayPackOrder(params) {
    return request.post("/oms/savePayPackOrder", { pk: params });
  },
  queryKuaidi(params) {
    return request.post("/oms/queryKuaidi", { orderId: params });
  }
};
