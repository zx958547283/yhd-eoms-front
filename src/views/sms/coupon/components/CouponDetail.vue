<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="coupon" :rules="rules" label-width="150px" ref="couponFrom" size="small">
      <el-form-item label="优惠券类型：">
        <el-select v-model="coupon.type">
          <el-option
            :key="type.value"
            :label="type.label"
            :value="type.value"
            v-for="type in typeOptions"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称：" prop="name">
        <el-input class="input-width" v-model="coupon.name"></el-input>
      </el-form-item>
      <el-form-item label="适用平台：">
        <el-select v-model="coupon.platform">
          <el-option
            :key="item.value"
            :label="item.label"
            :value="item.value"
            v-for="item in platformOptions"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总发行量：" prop="publish_count">
        <el-input class="input-width" placeholder="只能输入正整数" v-model.number="coupon.publish_count"></el-input>
      </el-form-item>
      <el-form-item label="面额：" prop="amount">
        <el-input class="input-width" placeholder="面值只能是数值，限2位小数" v-model.number="coupon.amount">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="每人限领：">
        <el-input class="input-width" placeholder="只能输入正整数" v-model="coupon.per_limit">
          <template slot="append">张</template>
        </el-input>
      </el-form-item>
      <el-form-item label="使用门槛：" prop="min_point">
        <el-input class="input-width" placeholder="只能输入正整数" v-model.number="coupon.min_point">
          <template slot="prepend">满</template>
          <template slot="append">元可用</template>
        </el-input>
      </el-form-item>
      <el-form-item label="有效期：">
        <el-date-picker
          placeholder="选择日期"
          style="width: 150px"
          type="date"
          v-model="coupon.start_time"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <span style="margin-left: 20px;margin-right: 20px">至</span>
        <el-date-picker
          placeholder="选择日期"
          style="width: 150px"
          type="date"
          v-model="coupon.end_time"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="可使用商品：">
        <el-radio-group v-model="coupon.use_type">
          <el-radio-button :label="0">全场通用</el-radio-button>
          <el-radio-button :label="1">指定分类</el-radio-button>
          <el-radio-button :label="2">指定商品</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="coupon.use_type == 1">
        <el-cascader
          :options="productCateOptions"
          :props="{value:'id', label:'name',children:'childList'}"
          clearable
          placeholder="请选择分类名称"
          v-model="selectProductCate"
        ></el-cascader>
        <el-button @click="handleAddProductCategoryRelation()">添加</el-button>
        <el-table
          :data="coupon.productCategoryRelationList"
          border
          ref="productCateRelationTable"
          style="width: 100%;margin-top: 20px"
        >
          <el-table-column align="center" label="分类名称">
            <template
              slot-scope="scope"
            >{{scope.row.parentCategoryName}}>{{scope.row.productCategoryName}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleDeleteProductCateRelation(scope.$index, scope.row)"
                size="mini"
                type="text"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-show="coupon.use_type==2">
        <el-select
          :loading="selectProductLoading"
          :remote-method="searchProductMethod"
          filterable
          placeholder="商品名称/商品货号"
          remote
          reserve-keyword
          v-model="selectProduct"
        >
          <el-option
            :key="item.id"
            :label="item.name"
            :value="item.id"
            v-for="item in selectProductOptions"
          >
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">NO.{{ item.product_sn }}</span>
          </el-option>
        </el-select>
        <el-button @click="handleAddProductRelation()">添加</el-button>
        <el-table
          :data="coupon.productRelationList"
          border
          ref="productRelationTable"
          style="width: 100%;margin-top: 20px"
        >
          <el-table-column align="center" label="商品名称">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column align="center" label="货号" width="120">
            <template slot-scope="scope">NO.{{scope.row.product_sn}}</template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click="handleDeleteProductRelation(scope.$index, scope.row)"
                size="mini"
                type="text"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="备注：">
        <el-input
          :rows="5"
          class="input-width"
          placeholder="请输入内容"
          type="textarea"
          v-model="coupon.note"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit('couponFrom')" type="primary">提交</el-button>
        <el-button @click="resetForm('couponFrom')" v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import sms from '@/api/sms';
import pms from '@/api/pms';
import common from '@/api/common';
import utility from '@/utils/utility';
const defaultCoupon = {
  type: '0',
  name: null,
  platform: '0',
  amount: null,
  per_limit: 1,
  min_point: null,
  start_time: null,
  end_time: null,
  use_type: '0',
  note: null,
  publish_count: null,
  productRelationList: [],
  productCategoryRelationList: []
};
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: '0'
  },
  {
    label: '会员赠券',
    value: '1'
  },
  {
    label: '购物赠券',
    value: '2'
  },
  {
    label: '注册赠券',
    value: '3'
  }
];
const defaultPlatformOptions = [
  {
    label: '全平台',
    value: '0'
  },
  {
    label: '移动平台',
    value: '1'
  },
  {
    label: 'PC平台',
    value: '2'
  }
];
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      coupon: Object.assign({}, defaultCoupon),
      typeOptions: Object.assign({}, defaultTypeOptions),
      platformOptions: Object.assign({}, defaultPlatformOptions),
      rules: {
        name: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' },
          { min: 2, max: 140, message: '长度在 2 到 140 个字符', trigger: 'blur' }
        ],
        publishCount: [
          { type: 'number', required: true, message: '只能输入正整数', trigger: 'blur' }
        ],
        amount: [
          { pattern: /^([0-9]+)|([0-9]+\.[0-9]{1,2})$/, required: true, message: '面值只能是数值，0.01-10000，限2位小数', trigger: 'blur' }
        ],
        minPoint: [
          { type: 'number', required: true, message: '只能输入正整数', trigger: 'blur' }
        ]
      },
      selectProduct: null,
      selectProductLoading: false,
      selectProductOptions: [],
      selectProductCate: null,
      productCateOptions: []
    }
  },
  created() {
    if (this.isEdit) {
      sms.getCouponFull({ pk: utility.getpageparmas(this)[0] }).then(res => {
        this.coupon = res.coupon;
        this.coupon.productRelationList = res.productRelationList;
        this.coupon.productCategoryRelationList = res.productCategoryRelationList;
      });
    }
    this.getProductCateList();
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否提交数据', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if (this.isEdit) {
              sms.saveCouponFull(this.coupon).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '修改成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            } else {
              sms.saveCouponFull(this.coupon).then(response => {
                this.$refs[formName].resetFields();
                this.$message({
                  message: '提交成功',
                  type: 'success',
                  duration: 1000
                });
                this.$router.back();
              });
            }
          });
        } else {
          this.$message({
            message: '验证失败',
            type: 'error',
            duration: 1000
          });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.coupon = Object.assign({}, defaultCoupon);
    },
    searchProductMethod(query) {
      if (query !== '') {
        this.loading = true;
        common.getProductListByKeyword({ keyword: query }).then(res => {
          this.loading = false;
          this.selectProductOptions = res;
        });
      } else {
        this.selectProductOptions = [];
      }
    },
    handleAddProductRelation() {
      if (this.selectProduct === null) {
        this.$message({
          message: '请先选择商品',
          type: 'warning'
        });
        return
      }
      this.coupon.productRelationList.push(this.getProductById(this.selectProduct));
      this.selectProduct = null;
    },
    handleDeleteProductRelation(index, row) {
      this.coupon.productRelationList.splice(index, 1);
    },
    handleAddProductCategoryRelation() {
      if (this.selectProductCate === null || this.selectProductCate.length === 0) {
        this.$message({
          message: '请先选择商品分类',
          type: 'warning'
        });
        return
      }
      this.coupon.productCategoryRelationList.push(this.getProductCateByIds(this.selectProductCate));
      this.selectProductCate = [];
    },
    handleDeleteProductCateRelation(index, row) {
      this.coupon.productCategoryRelationList.splice(index, 1);
    },
    getProductById(id) {
      for (let i = 0; i < this.selectProductOptions.length; i++) {
        if (id === this.selectProductOptions[i].id) {
          return this.selectProductOptions[i];
        }
      }
      return null;
    },
    getProductCateList() {
      pms.productCatWithAll().then(res => {
        this.productCateOptions = res;
      });
    },
    getProductCateByIds(ids) {
      let name;
      let parentName;
      for (let i = 0; i < this.productCateOptions.length; i++) {
        if (this.productCateOptions[i].id == ids[0]) {
          parentName = this.productCateOptions[i].name;
          for (let j = 0; j < this.productCateOptions[i].childList.length; j++) {
            if (this.productCateOptions[i].childList[j].id == ids[1]) {
              name = this.productCateOptions[i].childList[j].name;
            }
          }
        }
      }
      return { productCategoryId: ids[1], productCategoryName: name, parentCategoryName: parentName };
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 60%;
}
</style>


