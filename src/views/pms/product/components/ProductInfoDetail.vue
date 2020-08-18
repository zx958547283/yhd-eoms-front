<template>
  <div style="margin-top: 50px">
    <el-form :model="value" :rules="rules" label-width="120px" ref="productInfoForm" size="small" style="width: 700px">
      <el-form-item label="商品分类：" prop="productCategoryId">
        <el-cascader :options="productCateOptions" :props="{value:'id', label:'name',children:'childList',checkStrictly: true}" @change="handleChange" v-model="selectProductCateValue"></el-cascader>
      </el-form-item>
      <el-form-item label="商品名称：" prop="name">
        <el-input v-model="value.name"></el-input>
      </el-form-item>
      <el-form-item label="副标题：" prop="subTitle">
        <el-input v-model="value.subTitle"></el-input>
      </el-form-item>
      <!-- <el-form-item label="商品品牌：" prop="brandId">
        <el-select @change="handleBrandChange" placeholder="请选择品牌" v-model="value.brandId">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in brandOptions"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="销售类型：" prop="sale_type">
        <el-select @change="handleBrandChange" placeholder="请选择品牌" v-model="value.sale_type">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in saleTypeOptions"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否分销：" prop="sale_type">
        <el-select  placeholder="是否分销" v-model="value.is_allocation">
          <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in fxTypeOptions"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品介绍：">
        <el-input :autoSize="true" placeholder="请输入内容" type="textarea" v-model="value.description"></el-input>
      </el-form-item>
      <el-form-item label="商品货号：">
        <el-input v-model="value.productSn"></el-input>
      </el-form-item>
      <el-form-item label="现价：">
        <el-input @change="handlePriceChange" v-model="value.price"></el-input>
      </el-form-item>
      <el-form-item label="起购数量：">
        <el-input v-model="value.buy_min_cnt"></el-input>
      </el-form-item>
      <el-form-item label="使用积分：" v-if="value.sale_type === '1' || value.sale_type === '2'">
        <el-input @change="handlePriceChange" v-model="value.points_price"></el-input>
      </el-form-item>
      <el-form-item label="描述：" v-if="show_price_txt">
        <span>现价描述文字：</span>
        <el-input style="width: 150px" v-model="value.price_txt"></el-input>
        <span style="margin-left: 20px">优惠价描述文字：</span>
        <el-input style="width: 150px" v-model="value.real_price_txt"></el-input>
      </el-form-item>
      <el-form-item label="是否展示原价：" v-if="show_price_txt">
        <template>
          <el-radio label="1" v-model="value.show_original">展示</el-radio>
          <el-radio label="0" v-model="value.show_original">不展示</el-radio>
        </template>
      </el-form-item>

      <el-form-item label="原价：">
        <el-input v-model="value.originalPrice"></el-input>
      </el-form-item>

      <el-form-item label="成本价：">
        <el-input v-model="value.cust_price"></el-input>
      </el-form-item>
      <el-form-item label="供应商：">
        <el-input v-model="value.supplier"></el-input>
      </el-form-item>
      <el-form-item label="商品库存：">
        <el-input v-model="value.stock"></el-input>
      </el-form-item>
      <el-form-item label="计量单位：">
        <el-input v-model="value.unit"></el-input>
      </el-form-item>
      <el-form-item label="商品重量：">
        <el-input style="width: 300px" v-model="value.weight"></el-input>
        <span style="margin-left: 20px">克</span>
      </el-form-item>
      <el-form-item label="排序">
        <el-input v-model="value.sort"></el-input>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button @click="handleNext('productInfoForm')" size="medium" type="primary">下一步，填写商品属性</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import pms from "@/api/pms"


export default {
  props: {
    value: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hasEditCreated: false,
      //选中商品分类的值
      selectProductCateValue: [],
      productCateOptions: [],
      brandOptions: [],
      saleTypeOptions: [{ id: '0', name: '现金商品' }, { id: '1', name: '积分商品' }, { id: '2', name: '现金+积分' }],
      fxTypeOptions: [{ id: '0', name: '不参与分销' }, { id: '1', name: '参与分销' }],
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        subTitle: [{ required: true, message: '请输入商品副标题', trigger: 'blur' }],
        productCategoryId: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
        brandId: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
        sale_type: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }],
        description: [{ required: true, message: '请输入商品介绍', trigger: 'blur' }],
        requiredProp: [{ required: true, message: '该项为必填项', trigger: 'blur' }]
      },
      show_price_txt: false
    };
  },
  created() {
    console.log('---- 分类---- ')
    console.log(this.selectProductCateValue)
    this.getProductCateList();
    this.getBrandList();
  },
  computed: {
    //商品的编号
    productId() {
      return this.value.id;
    }
  },
  watch: {
    productId: function (newValue) {
      if (!this.isEdit) return;
      if (this.hasEditCreated) return;
      if (newValue === undefined || newValue == null || newValue === 0) return;
      this.handleEditCreated();
    },
    selectProductCateValue: function (newValue) {
      console.log(newValue)
      if (newValue && newValue.length === 2) {
        this.value.productCategoryId = newValue[1];
        this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId);
      } else if (newValue && newValue.length === 1) {
        this.value.productCategoryId = newValue[0];
        this.value.productCategoryName = this.getCateNameById(this.value.productCategoryId);
      } else {
        this.value.productCategoryId = null;
        this.value.productCategoryName = null;
      }
    }
  },
  methods: {
    //处理编辑逻辑
    handleEditCreated() {
      console.log('222222')
      console.log(this.selectProductCateValue)
      if (this.value.productCategoryId != null) {
        if ('0' !== this.value.cateParentId) {
          this.selectProductCateValue.push(this.value.cateParentId);
        }

        this.selectProductCateValue.push(this.value.productCategoryId);
      }
      this.hasEditCreated = true;
    },
    getProductCateList() {
      pms.productCatWithAll({}).then(res => {
        this.productCateOptions = res;
        console.log('333333')
        console.log(this.productCateOptions)
      });
    },
    getBrandList() {
      pms.brandWithAll({}).then(res => {
        this.brandOptions = res;
      });
    },
    getCateNameById(id) {
      let name = null;
      console.log('------------' + id)
      for (let i = 0; i < this.productCateOptions.length; i++) {
        for (let j = 0; j < this.productCateOptions[i].childList.length; j++) {
          if (this.productCateOptions[i].childList[j].id === id) {
            name = this.productCateOptions[i].childList[j].name;
            return name;
          }
        }
      }
      return name;
    },
    handleNext(formName) {
      this.value.brandId = '1'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('nextStep');
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
      if (this.value.productCategoryId === '307a5333-20af-4352-8324-045db68d2d59' || this.value.productCategoryId === '17c51088-8a34-464e-98c8-a0e51377b97d') {
        this.value.skuStockList[0].price = this.value.price;

      }
    },
    handleBrandChange(val) {
      let brandName = '';
      for (let i = 0; i < this.brandOptions.length; i++) {
        if (this.brandOptions[i].id === val) {
          brandName = this.brandOptions[i].name;
          break;
        }
      }
      this.value.brandName = brandName;
    },
    handleChange(selected) {
      console.log(selected)
      if (selected[0] === '307a5333-20af-4352-8324-045db68d2d59') {
        this.value.skuStockList = [
          {
            stock: '1000',
            price: this.value.price,
            sp1: '默认规格'
          }
        ];
        this.value.productAttributeCategoryId = 'fd9b5ac6-4912-4b13-bfc5-69d6585023e2';
        // 显示价格描述
        this.show_price_txt = true
        this.value.productAttributeValueList = [{
          productAttributeId: 'aae75ea5-5c1a-4210-8546-1ff488414f96', value: '通用'
        }]
      } else if (selected[0] === '17c51088-8a34-464e-98c8-a0e51377b97d') {
        console.log('----- price ----' + this.value.price)
        // 不显示价格描述
        this.show_price_txt = false
        this.value.skuStockList = [
          {
            stock: '1000',
            price: this.value.price,
            sp1: '默认规格'
          }
        ];
        this.value.productAttributeCategoryId = 'fd9b5ac6-4912-4b13-bfc5-69d6585023e2';
        this.value.productAttributeValueList = [{
          productAttributeId: 'aae75ea5-5c1a-4210-8546-1ff488414f96', value: '通用'
        }]
      } else {
        this.value.productAttributeCategoryId = '';
        this.value.productAttributeValueList = [];
        this.value.skuStockList = [];
        // 不显示价格描述
        this.show_price_txt = false
      }
      console.log(this.value.skuStockList)
    },
    handlePriceChange(value) {
      let categray = this.selectProductCateValue[0]
      if (categray === '307a5333-20af-4352-8324-045db68d2d59') {
        this.value.skuStockList[0].price = value
      } else if (categray === '17c51088-8a34-464e-98c8-a0e51377b97d') {
        this.value.skuStockList[0].price = value
      }

    }
  }
}
</script>

<style scoped>
</style>
