import request from "@/utils/request";

export default {
  //分页查询限时秒杀列表
  getFlashPromotionList(params) {
    return request.post("/sms/getFlashPromotionList", params);
  },
  //删除限时秒杀活动
  deleteFlashPromotion(params) {
    return request.post("/sms/deleteFlashPromotion", params);
  },
  //新增或修改限时秒杀活动
  saveFlashPromotion(params) {
    return request.post("/sms/saveFlashPromotion", params);
  },
  //修改限时秒杀活动开启状态
  updateFlashPromotionStatus(params) {
    return request.post("/sms/updateFlashPromotionStatus", params);
  },
  //查询所有秒杀活动场次
  getFlashSessionListAll(params) {
    return request.post("/sms/getFlashSessionListAll", params);
  },
  //新增或修改秒杀活动场次
  saveFlashPromotionSession(params) {
    return request.post("/sms/saveFlashPromotionSession", params);
  },
  //删除秒杀活动场次
  deleteFlashPromotionSession(params) {
    return request.post("/sms/deleteFlashPromotionSession", params);
  },
  //删除秒杀活动场次
  updateFlashSessionStatus(params) {
    return request.post("/sms/updateFlashSessionStatus", params);
  },
  //取得秒杀活动场次设置列表
  getFlashSelectSessionList(params) {
    return request.post("/sms/getFlashSelectSessionList", params);
  },
  //分页查询秒杀活动场次与商品关联的列表
  getFlashProductRelationList(params) {
    return request.post("/sms/getFlashProductRelationList", params);
  },
  //分页查询秒杀活动场次与商品关联的列表
  // getFlashProductRelationList(params) {
  //   return request.post("/sms/getFlashProductRelationList", params);
  // },
  //新增或修改秒杀活动场次与商品关联
  // saveFlashPromotionProductRelation(params) {
  //   return request.post("/sms/saveFlashPromotionProductRelation", params);
  // },
  //删除秒杀活动场次与商品关联
  saveFlashPromotionProductRelation(params) {
    return request.post("/sms/saveFlashPromotionProductRelation", params);
  },
  //批量增加秒杀活动场次与商品关联
  deleteFlashPromotionProductRelation(params) {
    return request.post("/sms/deleteFlashPromotionProductRelation", params);
  },
  //分页查询优惠券
  getCouponList(params) {
    return request.post("/sms/getCouponList", params);
  },
  //删除优惠券
  deleteCoupon(params) {
    return request.post("/sms/deleteCoupon", params);
  },
  //完整保存或修改优惠券，包括产品关联，分类关联
  saveCouponFull(params) {
    return request.post("/sms/saveCouponFull", params);
  },
  //取得优惠券完整信息，包含分类关联和产品关联
  getCouponFull(params) {
    return request.post("/sms/getCouponFull", params);
  },
  //分页查询首页品牌推荐列表
  getBrandRecommendList(params) {
    return request.post("/sms/getBrandRecommendList", params);
  },
  //更新首页品牌推荐排序
  updateBrandRecommendSort(params) {
    return request.post("/sms/updateBrandRecommendSort", params);
  },
  //批量更新首页品牌推荐状态
  updateBrandRecommendStatus(params) {
    return request.post("/sms/updateBrandRecommendStatus", params);
  },
  //删除首页品牌推荐
  deleteHomeBrand(params) {
    return request.post("/sms/deleteHomeBrand", params);
  },
  //批量添加首页品牌推荐
  addHomeBrandRecommendBatch(params) {
    return request.post("/sms/addHomeBrandRecommendBatch", params);
  },
  //分页查询首页新品推荐
  getHomeNewProductList(params) {
    return request.post("/sms/getHomeNewProductList", params);
  },
  //更新首页新品产品推荐排序
  updateNewProductRecommendSort(params) {
    return request.post("/sms/updateNewProductRecommendSort", params);
  },
  //批量更新首页新品产品推荐状态
  updateNewProductRecommendStatus(params) {
    return request.post("/sms/updateNewProductRecommendStatus", params);
  },
  //删除首页新品产品推荐
  deleteHomeNewProduct(params) {
    return request.post("/sms/deleteHomeNewProduct", params);
  },
  //批量添加首页产品推荐
  addHomeNewProductRecommendBatch(params) {
    return request.post("/sms/addHomeNewProductRecommendBatch", params);
  },
  //分页查询首页人气商品推荐
  getHomeHotProductList(params) {
    return request.post("/sms/getHomeHotProductList", params);
  },
  //更新首页人气商品推荐排序
  updateHotProductRecommendSort(params) {
    return request.post("/sms/updateHotProductRecommendSort", params);
  },
  //批量更新首页人气商品推荐状态
  updateHotProductRecommendStatus(params) {
    return request.post("/sms/updateHotProductRecommendStatus", params);
  },
  //删除首页人气商品推荐
  deleteHomeRecommendProduct(params) {
    return request.post("/sms/deleteHomeRecommendProduct", params);
  },
  //批量添加首页人气商品推荐
  addHomeHotProductRecommendBatch(params) {
    return request.post("/sms/addHomeHotProductRecommendBatch", params);
  },
  //分页查询首页专题推荐
  getHomeSubjectRecommendList(params) {
    return request.post("/sms/getHomeSubjectRecommendList", params);
  },
  //更新首页首页专题推荐排序
  updateSubjectRecommendSort(params) {
    return request.post("/sms/updateSubjectRecommendSort", params);
  },
  //批量更新首页专题推荐状态
  updateSubjectRecommendStatus(params) {
    return request.post("/sms/updateSubjectRecommendStatus", params);
  },
  //删除首页专题推荐推荐
  deleteSubjectRecommendProduct(params) {
    return request.post("/sms/deleteHomeRecommendSubject", params);
  },
  //批量添加首页专题推荐
  addHomeSubjectRecommendBatch(params) {
    return request.post("/sms/addHomeSubjectRecommendBatch", params);
  },
  //分页查询图片广告
  getAdvertiseList(params) {
    return request.post("/sms/getAdvertiseList", params);
  },
  //更新图片广告上下线状态
  updateAdvertiseStatus(params) {
    return request.post("/sms/updateAdvertiseStatus", params);
  },
  //删除图片广告
  deleteAdvertise(params) {
    return request.post("/sms/deleteAdvertise", params);
  },
  //删除图片广告
  saveAdvertise(params) {
    return request.post("/sms/saveAdvertise", params);
  },
  //删除图片广告
  getAdvertise(params) {
    return request.post("/sms/getAdvertise", params);
  },
  //添加拼团
  addGroupActivity(params) {
    return request.post("/sms/saveGroupShopping", params);
  },
  getGroupShopoingList(params) {
    return request.post("/sms/getGroupShopoingList", params);
  },
  updateGroupStatus(params) {
    return request.post("/sms/updateGroupStatus", params);
  },
  saveGroupActivity(params) {
    return request.post("/sms/saveGroupShopping", params);
  },
  deleteGroupActivity(params) {
    return request.post("/sms/deleteGroupShopping", params);
  },
  getProductList(params) {
    return request.post("/sms/getProductList", params);
  },
  saveGroupProductByOne(params) {
    return request.post("/sms/saveGroupProductByOne", params);
  },
  updateGroupPrice(params) {
    return request.post("/sms/updateGroupPrice", params);
  },
  saveGroupProductList(params) {
    return request.post("/sms/saveGroupProductList", params);
  },
  getProductListBySelect(params) {
    return request.post("/sms/getProductListBySelect", params);
  },
  deleteGroupProduct(params) {
    return request.post("/sms/deleteGroupProductBySelect", params);
  },
  addFlashProductRelationBatch(params) {
    return request.post("/sms/addFlashProductRelationBatch", params);
  },
  saveMemberCouponApply(params) {
    return request.post("/sms/saveMemberCouponApply", params);
  },
  getMemberCouponApply(params) {
    return request.post("/sms/getMemberCouponApply", { pk: params });
  },
  saveApplyPass(params) {
    return request.post("/sms/saveApplyPass", params);
  },
  saveApplyNotPass(params) {
    return request.post("/sms/saveApplyNotPass", params);
  }
};
