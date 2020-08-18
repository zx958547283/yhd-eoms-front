<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>发货列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="deliverOrderTable" style="width: 100%;">
        <el-table-column align="center" label="订单编号" width="180">
          <template slot-scope="scope">{{scope.row.order_sn}}</template>
        </el-table-column>
        <el-table-column align="center" label="收货人" width="180">
          <template slot-scope="scope">{{scope.row.receiver_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="手机号码" width="160">
          <template slot-scope="scope">{{scope.row.receiver_phone}}</template>
        </el-table-column>
        <el-table-column align="center" label="邮政编码" width="160">
          <template slot-scope="scope">{{scope.row.receiver_post_code}}</template>
        </el-table-column>
        <el-table-column align="center" label="收货地址">
          <template slot-scope="scope">{{scope.row.receiver_province + scope.row.receiver_city + scope.row.receiver_region + scope.row.receiver_detail_address}}</template>
        </el-table-column>
        <el-table-column align="center" label="配送方式" width="160">
          <template slot-scope="scope">
            <el-select placeholder="请选择物流公司" size="small" v-model="scope.row.delivery_company">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in companyOptions"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="物流单号" width="180">
          <template slot-scope="scope">
            <el-input size="small" v-model="scope.row.delivery_sn"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 15px;text-align: center">
        <el-button @click="cancel">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import oms from '@/api/oms'
import utility from '@/utils/utility';

const defaultLogisticsCompanies = [{
  value: 'yunda',
  label: '韵达快递'
}, {
  value: 'youzhengguonei',
  label: '邮政快递包裹'
}, {
  value: 'zhongtong',
  label: '中通快递'
}, {
  value: 'shentong',
  label: '申通快递'
}, {
  value: 'yuantong',
  label: '圆通速递'
}, {
  value: 'huitongkuaidi',
  label: '百世快递'
}, {
  value: 'shunfeng',
  label: '顺丰速运'
}, {
  value: 'jd',
  label: '京东物流'
}, {
  value: 'ems',
  label: 'EMS'
}, {
  value: 'debangwuliu',
  label: '德邦'
}];
export default {
  data() {
    return {
      list: [],
      order_ids: [],
      companyOptions: defaultLogisticsCompanies
    }
  },
  mounted() {
    this.order_ids = utility.getpageparmas(this);
    oms.getOrderByIds({
      ids: this.order_ids.join(",")
    }).then(res => {
      this.list = res;
    });
  },
  methods: {
    cancel() {
      this.$router.back();
    },
    confirm() {
      let that = this

      this.$confirm('是否要进行发货操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        let exc_keys = [];
        let listDelivery_company = [];
        let listDelivery_sn = [];
        let listOrder_sn = [];

        for (var i = 0; i < this.list.length; i++) {
          ids.push(this.list[i].id);
          exc_keys.push(String(this.list[i].exc_key));
          listDelivery_company.push(this.list[i].delivery_company);
          listDelivery_sn.push(String(this.list[i].delivery_sn));
          listOrder_sn.push(String(this.list[i].order_sn));
        }
        oms.doDeliveryOrder({
          ids: ids,
          exc_keys: exc_keys,
          listDelivery_company: listDelivery_company,
          listDelivery_sn: listDelivery_sn,
          listOrder_sn: listOrder_sn
        }).then(response => {
          // this.$router.back();
          this.$message({
            type: 'success',
            message: '发货成功!'
          });
          utility.deltagview(this, "发货", "deliverOrderList", '');
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发货'
        });
      });
    }
  }
}
</script>
<style></style>


