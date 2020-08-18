import request from "@/utils/request";

export default {
  //商品列表查询
  getProductList(params) {
    return request.post("/common/getProductList", params);
  },
  //品牌下拉查询
  brandWithAll(params) {
    return request.post("/common/brandWithAll", params);
  },
  //查询商品分类，用于级联下拉
  productCatWithAll(params) {
    return request.post("/common/productCatWithAll", params);
  },
  //根据层级查询商品分类,用于下拉
  getProductCatByParent(params) {
    return request.post("/pms/getProductCatByParent", params);
  },
  //会员等级查询
  memberLevelWithAll(params) {
    return request.post("/common/memberLevelWithAll", params);
  },
  //查询所有商品属性分类，用于级联下拉
  productAttrCatWithAll(params) {
    return request.post("/common/productAttrCatWithAll", params);
  },
  //根据商品属性分类查询商品属性
  getProductAttributeByCatgory(params) {
    return request.post("/common/getProductAttributeByCatgory", params);
  },
  //查询商品属性分类和分类参数属性，用于级联下拉
  getProductAttrCatWithAttr(params) {
    return request.post("/pms/getProductAttrCatWithAttr", params);
  },
  //保存商品
  createProduct(params) {
    return request.post("/common/createProduct", params);
  },
  //更新商品发布状态
  updateProductPublish(params) {
    return request.post("/common/updateProductPublish", params);
  },
  //更新商品新品状态
  updateProductNewStatus(params) {
    return request.post("/common/updateProductNewStatus", params);
  },
  //更新商品推荐状态
  updateProductRecommendStatus(params) {
    return request.post("/common/updateProductRecommendStatus", params);
  },
  //根据商品ID取得SKU库存
  getSkuByProductId(params) {
    return request.post("/common/getSkuByProductId", params);
  },
  //根据商品ID更新SKU库存
  updateSkuByProduct(params) {
    return request.post("/common/updateSkuByProduct", params);
  },
  //删除产品
  deleteProduct(params) {
    return request.post("/pms/deleteProduct", params);
  },
  //查询商品所有信息，包含SKU, 属性，等
  getProductFull(params) {
    return request.post("/common/getProductFull", params);
  },
  //查询商品基本信息
  getProduct(params) {
    return request.post("/pms/getProduct", { pk: params });
  },
  //更新商品所有信息
  updateProductAll(params) {
    return request.post("/common/updateProductAll", params);
  },
  //分页查询商品分类
  searchProductCategory(params) {
    return request.post("/pms/searchProductCategory", params);
  },
  //更新商品分类导航状态
  updateProductCatNavStatus(params) {
    return request.post("/pms/updateProductCatNavStatus", params);
  },
  //更新商品分类显示状态
  updateProductCatShowStatus(params) {
    return request.post("/pms/updateProductCatShowStatus", params);
  },
  //删除商品分类
  deleteProductCategory(params) {
    return request.post("/pms/deleteProductCategory", params);
  },
  //保存商品分类，以及商品筛选属性
  createProductCategory(params) {
    return request.post("/pms/createProductCategory", params);
  },
  //根据产品分类ID取得产品分类
  getProductCategory(params) {
    return request.post("/pms/getProductCategory", params);
  },
  //根据产品分类ID取得产品分类属性关系
  getProuctCatAttrRelationByPID(params) {
    return request.post("/pms/getProuctCatAttrRelationByPID", params);
  },
  //更新产品分类所有信息
  updateProductCategoryFull(params) {
    return request.post("/pms/updateProductCategoryFull", params);
  },
  //分页查询产品属性分类列表
  getAttributeCategoryList(params) {
    return request.post("/pms/getAttributeCategoryList", params);
  },
  //查询所有产品属性分类列表,用于下拉
  getAttributeCategoryListAll(params) {
    return request.post("/pms/getAttributeCategoryListAll", params);
  },
  //更新产品属性分类
  updateAttributetCategory(params) {
    return request.post("/pms/saveProductAttributeCategory", params);
  },
  //删除产品属性分类
  deleteAttributetCategory(params) {
    return request.post("/pms/deleteProductAttributeCategory", params);
  },
  //根据产品属性分类，分页查询产品属品列表
  getAttributeListByCategory(params) {
    return request.post("/pms/getAttributeListByCategory", params);
  },
  //删除产品属性，并更新产品属性分类中的属性数量
  deleteProductAttributeFull(params) {
    return request.post("/pms/deleteProductAttributeFull", params);
  },
  //添加或修改产品属性
  saveProductAttribute(params) {
    return request.post("/pms/saveProductAttribute", params);
  },
  //添加或修改产品属性，并更新产品属性分类中的属性数量
  saveAttributeFull(params) {
    return request.post("/pms/saveAttributeFull", params);
  },
  //根据id取得产品属性
  getProductAttribute(params) {
    return request.post("/pms/getProductAttribute", params);
  },
  //分页查询品牌列表
  getBrandList(params) {
    return request.post("/pms/getBrandList", params);
  },
  //更新品牌制造商状态
  updateBrandFactoryStatus(params) {
    return request.post("/pms/updateBrandFactoryStatus", params);
  },
  updateBrandShowStatus(params) {
    return request.post("/pms/updateBrandShowStatus", params);
  },
  deleteBrand(params) {
    return request.post("/pms/deleteBrand", params);
  },
  saveBrand(params) {
    return request.post("/pms/saveBrand", params);
  },
  getBrand(params) {
    return request.post("/pms/getBrand", params);
  },
  getProductListByKeyword(params) {
    return request.post("/common/getProductListByKeyword", params);
  },
  updateVerifyStatus(params) {
    return request.post("/pms/updateVerifyStatus", params);
  },
  savePublishStatus(params) {
    return request.post("/pms/savePublishStatus", params);
  },
  getProductListByDeleted(params) {
    return request.post("/pms/getProductListByDeleted", params);
  },
  saveDrStatus(params) {
    return request.post("/pms/saveDrStatus", params);
  },
  deleteProductAttribute(params) {
    return request.post("/pms/deleteProductAttribute", params);
  },
  getFxConfig(params) {
    return request.post("/pms/getFxConfig", params);
  },
  saveFxConfig(params) {
    return request.post("/pms/saveFxConfig", params);
  }
};
