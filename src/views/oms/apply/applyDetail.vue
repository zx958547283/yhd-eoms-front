<template>
  <div class="detail-container">
    <el-card shadow="never">
      <span class="font-title-medium">退货商品</span>
      <el-table :data="productList" border class="standard-margin" ref="productTable">
        <el-table-column align="center" label="商品图片" width="160">
          <template slot-scope="scope">
            <img :src="scope.row.productPic" style="height:80px" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <span class="font-small">{{scope.row.product_name}}</span>
            <br />
            <span class="font-small">品牌：{{scope.row.product_brand}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格/货号" width="180">
          <template slot-scope="scope">
            <span class="font-small">价格：￥{{scope.row.product_real_price}}</span>
            <br />
            <span class="font-small">货号：NO.{{scope.row.product_id}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性" width="180">
          <template slot-scope="scope">{{scope.row.product_attr}}</template>
        </el-table-column>
        <el-table-column align="center" label="数量" width="100">
          <template slot-scope="scope">{{scope.row.product_count}}</template>
        </el-table-column>
        <el-table-column align="center" label="小计" width="100">
          <template slot-scope="scope">￥{{totalAmount}}</template>
        </el-table-column>
      </el-table>
      <div style="float:right;margin-top:15px;margin-bottom:15px">
        <span class="font-title-medium">合计：</span>
        <span class="font-title-medium color-danger">￥{{totalAmount}}</span>
      </div>
    </el-card>
    <el-card class="standard-margin" shadow="never">
      <span class="font-title-medium">服务单信息</span>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">服务单号</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.service_no}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">申请状态</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.status | formatStatus}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:50px;line-height:30px">订单编号</el-col>
          <el-col :span="18" class="form-border font-small" style="height:50px">
            {{orderReturnApply.order_sn}}
            <el-button @click="handleViewOrder" size="small" type="text">查看</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">申请时间</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.create_time | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">用户账号</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.member_username}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">联系人</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.return_name}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">联系电话</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.return_phone}}</el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">退货原因</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.reason}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">问题描述</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.description}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:100px;line-height:80px">凭证图片</el-col>
          <el-col :span="18" class="form-border font-small" style="height:100px">
            <img :src="item" style="width:80px;height:80px" v-for="item in proofPics">
          </el-col>
        </el-row>-->
      </div>
      <div class="form-container-border">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">订单金额</el-col>
          <el-col :span="18" class="form-border font-small">￥{{totalAmount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:52px;line-height:32px">确认退款金额</el-col>
          <el-col :span="18" class="form-border font-small" style="height:52px">
            ￥
            <el-input :disabled="orderReturnApply.status !== 0" size="small" style="width:200px;margin-left: 10px" v-model="updateStatusParam.return_amount"></el-input>
          </el-col>
        </el-row>
        <div v-show="orderReturnApply.status !== 3">
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small" style="height:52px;line-height:32px">选择收货点</el-col>
            <el-col :span="18" class="form-border font-small" style="height:52px">
              <el-select :disabled="orderReturnApply.status !== 0" size="small" style="width:200px" v-model="updateStatusParam.companyAddressId">
                <el-option :key="address.id" :label="address.address_name" :value="address.id" v-for="address in companyAddressList"></el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">收货人姓名</el-col>
            <el-col :span="18" class="form-border font-small">{{currentAddress.name}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">所在区域</el-col>
            <el-col :span="18" class="form-border font-small">{{currentAddress | formatRegion}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">详细地址</el-col>
            <el-col :span="18" class="form-border font-small">{{currentAddress.detail_address}}</el-col>
          </el-row>
          <el-row>
            <el-col :span="6" class="form-border form-left-bg font-small">联系电话</el-col>
            <el-col :span="18" class="form-border font-small">{{currentAddress.phone}}</el-col>
          </el-row>
        </div>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status!==0">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">处理人员</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.handle_man}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">处理时间</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.handle_time | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">处理备注</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.handle_note}}</el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status===2">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">收货人员</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.receive_man}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">收货时间</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.receive_time | formatTime}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small">收货备注</el-col>
          <el-col :span="18" class="form-border font-small">{{orderReturnApply.receive_note}}</el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status === 0">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:52px;line-height:32px">处理备注</el-col>
          <el-col :span="18" class="form-border font-small">
            <el-input size="small" style="width:200px;margin-left: 10px" type="textarea" v-model="updateStatusParam.handle_note"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="form-container-border" v-show="orderReturnApply.status === 1">
        <el-row>
          <el-col :span="6" class="form-border form-left-bg font-small" style="height:52px;line-height:32px">收货备注</el-col>
          <el-col :span="18" class="form-border font-small">
            <el-input size="small" style="width:200px;margin-left: 10px" v-model="updateStatusParam.receive_note"></el-input>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status === 0">
        <el-button @click="handleUpdateStatus(1)" size="small" type="primary">确认退货</el-button>
        <el-button @click="handleUpdateStatus(3)" size="small" type="danger">拒绝退货</el-button>
      </div>
      <div style="margin-top:15px;text-align: center" v-show="orderReturnApply.status === 1">
        <el-button @click="handleUpdateStatus(2)" size="small" type="primary">确认收货</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
import oms from '@/api/oms'
import utility from '@/utils/utility';
const defaultUpdateStatusParam = {
  companyAddressId: null,
  handle_man: 'admin',
  handle_note: null,
  receive_man: 'admin',
  receive_note: null,
  return_amount: 0,
  status: 0
};
const defaultOrderReturnApply = {
  id: null,
  orderId: null,
  companyAddressId: null,
  productId: null,
  orderSn: null,
  createTime: null,
  memberUsername: null,
  returnAmount: null,
  returnName: null,
  returnPhone: null,
  status: null,
  handleTime: null,
  productPic: null,
  productName: null,
  productBrand: null,
  productAttr: null,
  productCount: null,
  productPrice: null,
  productRealPrice: null,
  reason: null,
  description: null,
  proofPics: null,
  handleNote: null,
  handleMan: null,
  receiveMan: null,
  receiveTime: null,
  receiveNote: null
};
export default {
  name: 'returnApplyDetail',
  data() {
    return {
      id: null,
      orderReturnApply: Object.assign({}, defaultOrderReturnApply),
      productList: null,
      proofPics: null,
      updateStatusParam: Object.assign({}, defaultUpdateStatusParam),
      companyAddressList: null
    }
  },
  created() {

  },
  mounted() {
    this.id = utility.getpageparmas(this);
    this.getDetail();
  },
  computed: {
    totalAmount() {
      return this.orderReturnApply.return_amount
      // if (this.orderReturnApply != null) {
      //   return this.orderReturnApply.product_real_price * this.orderReturnApply.product_count;
      // } else {
      //   return 0;
      // }
    },
    currentAddress() {
      console.log("currentAddress()");
      console.log(this.updateStatusParam);
      let id = this.updateStatusParam.companyAddressId;
      if (!this.companyAddressList) return {};
      for (let i = 0; i < this.companyAddressList.length; i++) {
        let address = this.companyAddressList[i];
        if (address.id === id) {
          return address;
        }
      }
      return {};
    }
  },
  filters: {
    formatStatus(status) {
      if (status === 0) {
        return "待处理";
      } else if (status === 1) {
        return "退货中";
      } else if (status === 2) {
        return "已完成";
      } else {
        return "已拒绝";
      }
    },
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatRegion(address) {
      let str = address.province;
      if (address.city != null) {
        str += "  " + address.city;
      }
      str += "  " + address.region;
      return str;
    }
  },
  methods: {
    handleViewOrder() {
      this.$router.push({ path: '/oms/orderDetail', query: { id: this.orderReturnApply.order_id } });
    },
    getDetail() {
      console.log('detail' + this.id)
      oms.getOrderReturnApplyDetail({ id: this.id[0] }).then(res => {
        console.log(res)
        this.orderReturnApply = res.orderReturnApply;
        this.orderReturnApply.status = Number(this.orderReturnApply.status);
        this.productList = [];
        this.productList.push(this.orderReturnApply);

        if (this.orderReturnApply.proof_pics) {
          this.proofPics = this.orderReturnApply.proof_pics.split(",")
        }
        //退货中和完成
        if (this.orderReturnApply.status === 1 || this.orderReturnApply.status === 2) {
          this.updateStatusParam.return_Amount = this.orderReturnApply.return_amount;
          this.updateStatusParam.companyAddressId = this.orderReturnApply.company_address_id;
        }
        this.companyAddressList = res.listAddress;
        for (let i = 0; i < this.companyAddressList.length; i++) {
          if (this.companyAddressList[i].receive_status === 1 && this.orderReturnApply.status === 0) {
            this.updateStatusParam.companyAddressId = this.companyAddressList[i].id;
          }
        }
      });
    },
    handleUpdateStatus(status) {
      this.updateStatusParam.status = status;
      this.updateStatusParam.id = this.orderReturnApply.id;
      this.updateStatusParam.exc_key = this.orderReturnApply.exc_key;
      this.$confirm('是否要进行此操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.doOperateOrderReturnApply(this.updateStatusParam).then(response => {
          this.$message({
            type: 'success',
            message: '操作成功!',
            duration: 1000
          });
          this.$router.back();
        });
      });
    }
  }
}
</script>
<style scoped>
.detail-container {
  position: absolute;
  left: 0;
  right: 0;
  width: 1080px;
  padding: 35px 35px 15px 35px;
  margin: 20px auto;
}

.standard-margin {
  margin-top: 15px;
}
.form-border {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
}

.form-container-border {
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
  margin-top: 15px;
}

.form-left-bg {
  background: #f2f6fc;
}
</style>


