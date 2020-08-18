<template>
  <el-card class="form-container" shadow="never">
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="填写商品信息"></el-step>
      <el-step title="填写商品属性"></el-step>
      <el-step title="填写商品促销"></el-step>
      <el-step title="选择商品关联"></el-step>
    </el-steps>
    <product-info-detail :is-edit="isEdit" @nextStep="nextStep" v-model="productParam" v-show="showStatus[0]"></product-info-detail>
    <product-attr-detail :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep" v-model="productParam" v-show="showStatus[1]"></product-attr-detail>
    <product-sale-detail :is-edit="isEdit" @nextStep="nextStep" @prevStep="prevStep" v-model="productParam" v-show="showStatus[2]"></product-sale-detail>
    <product-relation-detail :is-edit="isEdit" @finishCommit="finishCommit" @prevStep="prevStep" v-model="productParam" v-show="showStatus[3]"></product-relation-detail>
  </el-card>
</template>
<script>
import ProductInfoDetail from './ProductInfoDetail';
import ProductSaleDetail from './ProductSaleDetail';
import ProductAttrDetail from './ProductAttrDetail';
import ProductRelationDetail from './ProductRelationDetail';
import pms from "@/api/pms"
import utility from '@/utils/utility';
const defaultProductParam = {
  albumPics: '',
  brandId: null,
  brandName: '',
  deleteStatus: 0,
  description: '',
  detailDesc: '',
  detailHtml: '',
  detailMobileHtml: '',
  detailTitle: '',
  feightTemplateId: 0,
  flashPromotionCount: 0,
  flashPromotionId: 0,
  flashPromotionPrice: 0,
  flashPromotionSort: 0,
  giftPoint: 0,
  giftGrowth: 0,
  keywords: '',
  lowStock: 0,
  name: '',
  newStatus: 0,
  note: '',
  originalPrice: 0,
  pic: '',
  //会员价格{memberLevelId: 0,memberPrice: 0,memberLevelName: null}
  memberPriceList: [],
  //商品满减
  productFullReductionList: [{ fullPrice: 0, reducePrice: 0 }],
  //商品阶梯价格
  productLadderList: [{ count: 0, discount: 0, price: 0 }],
  previewStatus: 0,
  price: 0,
  points_price: '',
  productAttributeCategoryId: null,
  //商品属性相关{productAttributeId: 0, value: ''}
  productAttributeValueList: [],
  //商品sku库存信息{lowStock: 0, pic: '', price: 0, sale: 0, skuCode: '', sp1: '', sp2: '', sp3: '', stock: 0}
  skuStockList: [],
  //商品相关专题{subjectId: 0}
  subjectProductRelationList: [],
  //商品相关优选{prefrenceAreaId: 0}
  prefrenceAreaProductRelationList: [],
  productCategoryId: null,
  productCategoryName: '',
  productSn: '',
  promotionEndTime: '',
  promotionPerLimit: 0,
  promotionPrice: null,
  promotionStartTime: '',
  promotionType: 0,
  publishStatus: 0,
  recommandStatus: 0,
  sale: 0,
  serviceIds: '',
  sort: 0,
  stock: 0,
  subTitle: '',
  unit: '',
  usePointLimit: 0,
  verifyStatus: 0,
  weight: 0,
  basePrice: 0,
  cust_price: 0,
  supplier: '',
  price_txt: '',
  real_price_txt: '',
  show_original: '1',
  is_allocation: '0',
  buy_min_cnt: 0

};
export default {
  components: { ProductInfoDetail, ProductSaleDetail, ProductAttrDetail, ProductRelationDetail },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: 0,
      productParam: Object.assign({}, defaultProductParam),
      showStatus: [true, false, false, false],
      preProductId: ''
    }
  },
  mounted() {
    // this.id = utility.getpageparmas(this);
    let id = utility.getpageparmas(this)[0]
    console.log('id is =====' + id)
    if (this.isEdit) {
      this.preProductId = id;
      pms.getProductFull({ id: id }).then(res => {
        this.productParam = res;
        console.log(res)
      });
    }
  },
  created() {
    // if (this.isEdit) {
    //   pms.getProductFull({ id: this.$route.query.id }).then(res => {
    //     this.productParam = res;
    //   });
    // }
  },
  methods: {
    hideAll() {
      for (let i = 0; i < this.showStatus.length; i++) {
        this.showStatus[i] = false;
      }
    },
    prevStep() {
      if (this.active > 0 && this.active < this.showStatus.length) {
        this.active--;
        this.hideAll();
        this.showStatus[this.active] = true;
      }
    },
    nextStep() {
      if (this.active < this.showStatus.length - 1) {
        this.active++;
        this.hideAll();
        this.showStatus[this.active] = true;
        if (this.active === 2 && this.productParam.productAttributeCategoryId === 'fd9b5ac6-4912-4b13-bfc5-69d6585023e2') {
          this.productParam.basePrice = this.productParam.skuStockList[0].price
          if (null !== this.productParam.memberPriceList && 0 !== this.productParam.memberPriceList.length) {
            for (let i = 0; i < this.productParam.memberPriceList.length; i++) {
              if (undefined !== this.productParam.memberPriceList[i].memberPrice && null !== this.productParam.memberPriceList[i].memberPrice && '' !== this.productParam.memberPriceList[i].memberPrice) {
                this.$set(this.productParam.memberPriceList[i], "memberProp", this.productParam.memberPriceList[i].memberPrice / this.productParam.basePrice * 10)

                if (0 === i) {
                  this.$set(this.productParam.memberPriceList[i], "memberPrice", this.productParam.basePrice)
                  this.$set(this.productParam.memberPriceList[i], "memberProp", this.productParam.basePrice / this.productParam.basePrice * 10)
                } else {
                  this.$set(this.productParam.memberPriceList[i], "memberProp", this.productParam.memberPriceList[i].memberPrice / this.productParam.basePrice * 10)
                }
                this.productParam.promotionType = 2
              }
            }
          }
        }
      }
    },
    finishCommit(isEdit) {
      this.$confirm('是否要提交该产品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (isEdit) {
          this.productParam.id = this.preProductId;
          pms.updateProductAll(this.productParam).then(response => {
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            // this.$router.push("/pms/product");
            utility.addtagview(this, "商品列表", "productList", '');
          });
        } else {
          pms.createProduct(this.productParam).then(res => {
            console.log(this.productParam)
            this.$message({
              type: 'success',
              message: '提交成功',
              duration: 1000
            });
            // this.$router.push("/pms/product");
            utility.addtagview(this, "商品列表", "productList", '');
          });
        }
      })
    }
  }
}
</script>
<style>
.form-container {
  width: 800px;
}
</style>


