<template>
  <div style="margin-top: 50px">
    <el-form :model="value" label-width="120px" ref="productSaleForm" size="small" style="width: 600px">
      <el-form-item label="赠送积分：">
        <el-input v-model="value.giftPoint"></el-input>
      </el-form-item>
      <el-form-item label="赠送成长值：">
        <el-input v-model="value.giftGrowth"></el-input>
      </el-form-item>
      <el-form-item label="积分购买限制：">
        <el-input v-model="value.usePointLimit"></el-input>
      </el-form-item>
      <el-form-item label="预告商品：">
        <el-switch :active-value="1" :inactive-value="0" v-model="value.previewStatus"></el-switch>
      </el-form-item>
      <el-form-item label="商品上架：">
        <el-switch :active-value="1" :inactive-value="0" v-model="value.publishStatus"></el-switch>
      </el-form-item>
      <el-form-item label="商品推荐：">
        <span style="margin-right: 10px">新品</span>
        <el-switch :active-value="1" :inactive-value="0" v-model="value.newStatus"></el-switch>
        <span style="margin-left: 10px;margin-right: 10px">推荐</span>
        <el-switch :active-value="1" :inactive-value="0" v-model="value.recommandStatus"></el-switch>
      </el-form-item>
      <el-form-item label="服务保证：">
        <el-checkbox-group v-model="selectServiceList">
          <el-checkbox :label="1">无忧退货</el-checkbox>
          <el-checkbox :label="2">快速退款</el-checkbox>
          <el-checkbox :label="3">免费包邮</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="详细页标题：">
        <el-input v-model="value.detailTitle"></el-input>
      </el-form-item>
      <el-form-item label="详细页描述：">
        <el-input v-model="value.detailDesc"></el-input>
      </el-form-item>
      <el-form-item label="商品关键字：">
        <el-input v-model="value.keywords"></el-input>
      </el-form-item>
      <el-form-item label="商品备注：">
        <el-input :autoSize="true" type="textarea" v-model="value.note"></el-input>
      </el-form-item>
      <el-form-item label="选择优惠方式：">
        <el-radio-group @change="changePromoType" size="small" v-model="value.promotionType">
          <el-radio-button :label="0">无优惠</el-radio-button>
          <el-radio-button :label="1">特惠促销</el-radio-button>
          <el-radio-button :label="2">会员价格</el-radio-button>
          <el-radio-button :label="3">阶梯价格</el-radio-button>
          <el-radio-button :label="4">满减价格</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="value.promotionType===1">
        <div>
          开始时间：
          <el-date-picker :picker-options="pickerOptions1" placeholder="选择开始时间" type="datetime" v-model="value.promotionStartTime" value-format="timestamp"></el-date-picker>
        </div>
        <div class="littleMargin">
          结束时间：
          <el-date-picker :picker-options="pickerOptions1" placeholder="选择结束时间" type="datetime" v-model="value.promotionEndTime" value-format="timestamp"></el-date-picker>
        </div>
        <div class="littleMargin">
          促销价格：
          <el-input placeholder="输入促销价格" style="width: 220px" v-model="value.promotionPrice"></el-input>
        </div>
      </el-form-item>
      <el-form-item v-show="value.promotionType===2">
        <div :class="{littleMargin:index!==0}" v-for="(item, index) in value.memberPriceList">
          {{item.memberLevelName}} >>
          金额：
          <el-input @change="priceChange(index)" style="width: 100px" v-model="item.memberPrice"></el-input>
          <span style="margin-left:20px;">折扣率：</span>
          <el-input @change="propChange(index)" style="width: 80px;" v-model="item.memberProp"></el-input>&nbsp;折
        </div>
      </el-form-item>
      <el-form-item v-show="value.promotionType===3">
        <el-table :data="value.productLadderList" border style="width: 80%">
          <el-table-column align="center" label="数量" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="折扣" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.discount"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleRemoveProductLadder(scope.$index, scope.row)" type="text">删除</el-button>
              <el-button @click="handleAddProductLadder(scope.$index, scope.row)" type="text">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-show="value.promotionType===4">
        <el-table :data="value.productFullReductionList" border style="width: 80%">
          <el-table-column align="center" label="满" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fullPrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="立减" width="120">
            <template slot-scope="scope">
              <el-input v-model="scope.row.reducePrice"></el-input>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleRemoveFullReduction(scope.$index, scope.row)" type="text">删除</el-button>
              <el-button @click="handleAddFullReduction(scope.$index, scope.row)" type="text">添加</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button @click="handlePrev" size="medium">上一步，填写商品属性</el-button>
        <el-button @click="handleNext" size="medium" type="primary">下一步，选择关联商品</el-button>
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
      //日期选择器配置
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      }

    }
  },
  created() {
    if (this.isEdit) {
      // this.handleEditCreated();
    } else {
      pms.memberLevelWithAll({ default_status: 0 }).then(res => {
        this.value.memberPriceList = res;
      });
    }
  },
  computed: {

    //选中的服务保证
    selectServiceList: {
      get() {
        let list = [];
        if (this.value.serviceIds === undefined || this.value.serviceIds == null || this.value.serviceIds === '') return list;
        let ids = this.value.serviceIds.split(',');
        for (let i = 0; i < ids.length; i++) {
          list.push(Number(ids[i]));
        }
        return list;
      },
      set(newValue) {
        let serviceIds = '';
        if (newValue != null && newValue.length > 0) {
          for (let i = 0; i < newValue.length; i++) {
            serviceIds += newValue[i] + ',';
          }
          if (serviceIds.endsWith(',')) {
            serviceIds = serviceIds.substr(0, serviceIds.length - 1)
          }
          this.value.serviceIds = serviceIds;
        } else {
          this.value.serviceIds = null;
        }
      }
    }
  },
  methods: {
    priceChange(index) {
      this.$set(this.value.memberPriceList[index], "memberProp", this.value.memberPriceList[index].memberPrice / this.value.basePrice * 10)
    },
    propChange(index) {
      this.$set(this.value.memberPriceList[index], "memberPrice", this.value.memberPriceList[index].memberProp * this.value.basePrice / 10)
    },
    changePromoType(value) {
      if (2 === value) {
        console.log('111111111')
        console.log(this.value.basePrice)
        this.$set(this.value.memberPriceList[0], "memberPrice", this.value.basePrice)
        this.$set(this.value.memberPriceList[0], "memberProp", this.value.basePrice / this.value.basePrice * 10)
      }
    },
    handleEditCreated() {
      let ids = this.value.serviceIds.split(',');
      console.log('handleEditCreated', ids);
      for (let i = 0; i < ids.length; i++) {
        this.selectServiceList.push(Number(ids[i]));
      }
    },
    handleRemoveProductLadder(index, row) {
      let productLadderList = this.value.productLadderList;
      if (productLadderList.length === 1) {
        productLadderList.pop();
        productLadderList.push({
          count: 0,
          discount: 0,
          price: 0
        })
      } else {
        productLadderList.splice(index, 1);
      }
    },
    handleAddProductLadder(index, row) {
      let productLadderList = this.value.productLadderList;
      if (productLadderList.length < 3) {
        productLadderList.push({
          count: 0,
          discount: 0,
          price: 0
        })
      } else {
        this.$message({
          message: '最多只能添加三条',
          type: 'warning'
        });
      }
    },
    handleRemoveFullReduction(index, row) {
      let fullReductionList = this.value.productFullReductionList;
      if (fullReductionList.length === 1) {
        fullReductionList.pop();
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        });
      } else {
        fullReductionList.splice(index, 1);
      }
    },
    handleAddFullReduction(index, row) {
      let fullReductionList = this.value.productFullReductionList;
      if (fullReductionList.length < 3) {
        fullReductionList.push({
          fullPrice: 0,
          reducePrice: 0
        });
      } else {
        this.$message({
          message: '最多只能添加三条',
          type: 'warning'
        });
      }
    },
    handlePrev() {
      this.$emit('prevStep')
    },
    handleNext() {
      console.log(this.value)

      if (this.value.productCategoryId === '307a5333-20af-4352-8324-045db68d2d59') {
        if (this.value.promotionType !== 2) {
          this.$message.error('请选择并填写会员价格');
          return;
        }
      }
      if (this.value.promotionType === 2) {
        for (let i = 0; i < this.value.memberPriceList.length; i++) {
          if (undefined === this.value.memberPriceList[i].memberPrice || null === this.value.memberPriceList[i].memberPrice || '' === this.value.memberPriceList[i].memberPrice) {
            this.$message.error('请输入会员价格');
            return;
          }
        }
      }

      this.$emit('nextStep')
    }
  }
}
</script>

<style scoped>
.littleMargin {
  margin-top: 10px;
}
</style>
