<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button @click="handleExport()" size="small" style="float:right" type="primary">导出</el-button>
        <el-button @click="handleSearchList()" size="small" style="float:right;margin-right: 15px" type="primary">查询搜索</el-button>
        <el-button @click="handleResetSearch()" size="small" style="float:right;margin-right: 15px">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="输入搜索：">
            <el-input class="input-width" placeholder="订单编号" v-model="listQuery.order_sn"></el-input>
          </el-form-item>
          <el-form-item label="收货人：">
            <el-input class="input-width" placeholder="收货人姓名/手机号码" v-model="listQuery.receiverKeyword"></el-input>
          </el-form-item>
          <el-form-item label="提交时间：">
            <el-date-picker class="input-width" placeholder="请选择时间" type="date" v-model="listQuery.create_time" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="订单状态：">
            <el-select class="input-width" clearable placeholder="全部" v-model="listQuery.status">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in statusOptions"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input class="input-width" placeholder="订单编号" v-model="listQuery.member_name"></el-input>
          </el-form-item>
          <el-form-item label="订单来源：">
            <el-select class="input-width" clearable placeholder="全部" v-model="listQuery.source_type" @change="sourceTypeChange">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in sourceTypeOptions"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单分类：">
            <el-select class="input-width" clearable placeholder="全部" v-model="listQuery.order_type">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in orderTypeDefult"></el-option>
            </el-select>
          </el-form-item>
          
          
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" @selection-change="handleSelectionChange" border ref="orderTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="订单编号" width="180">
          <template slot-scope="scope">{{scope.row.order_sn}}</template>
        </el-table-column>
        <el-table-column align="center" label="提交时间" width="180">
          <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="用户账号">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column align="center" label="订单金额" width="120">
          <template slot-scope="scope">￥{{scope.row.total_amount}}</template>
        </el-table-column>
        <el-table-column align="center" label="实付金额" width="120">
          <template slot-scope="scope">￥{{scope.row.pay_amount}}</template>
        </el-table-column>
        <el-table-column align="center" label="支付方式" width="120">
          <template slot-scope="scope">{{scope.row.pay_type | formatPayType}}</template>
        </el-table-column>
        <el-table-column align="center" label="订单来源" width="120">
          <template slot-scope="scope">{{scope.row.source_type | formatSourceType}}</template>
        </el-table-column>
        <el-table-column align="center" label="订单状态" width="120">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleViewOrder(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;">查看订单</el-button>
            <el-button @click="handleCloseOrder(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;" v-show="scope.row.status===0">关闭订单</el-button>
            <el-button @click="handleDeliveryOrder(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;" v-show="scope.row.status===1">订单发货</el-button>
            <el-button @click="handleViewLogistics(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;" v-show="scope.row.status===2||scope.row.status===3">订单跟踪</el-button>
            <el-button @click="handlePrintOrder(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;">打印订单</el-button>
            <el-button @click="handleDeleteOrder(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;" type="danger" v-show="scope.row.status===4">删除订单</el-button>
            <el-button @click="handlePayBack(scope.$index, scope.row)" size="mini" style="margin-bottom:10px;" type="danger" v-show="scope.row.status===1">退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select placeholder="批量操作" size="small" v-model="operateType">
        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in operateOptions"></el-option>
      </el-select>
      <el-button @click="handleBatchOperate()" class="search-button" size="small" style="margin-left: 20px" type="primary">确定</el-button>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="closeOrder.dialogVisible" title="关闭订单" width="30%">
      <span style="vertical-align: top">操作备注：</span>
      <el-input :rows="5" placeholder="请输入内容" style="width: 80%" type="textarea" v-model="closeOrder.content"></el-input>
      <span class="dialog-footer" slot="footer">
        <el-button @click="closeOrder.dialogVisible = false">取 消</el-button>
        <el-button @click="handleCloseOrderConfirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <logistics-dialog v-model="logisticsDialogVisible" :logisticsDetail=kuaidi></logistics-dialog>
  </div>
</template>
<script>
import oms from '@/api/oms'
import { formatDate } from '@/utils/date';
import utility from '@/utils/utility';
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  order_sn: null,
  receiverKeyword: null,
  status: null,
  order_type: null,
  source_type: null,
  create_time: null,
};
export default {
  components: { LogisticsDialog },
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: true,
      list: null,
      total: null,
      operateType: null,
      multipleSelection: [],
      closeOrder: {
        dialogVisible: false,
        content: null,
        orderIds: [],
        exc_keys: []
      },
      statusOptions: [
        {
          label: '待付款',
          value: 0
        },
        {
          label: '待发货',
          value: 1
        },
        {
          label: '已发货',
          value: 2
        },
        {
          label: '已完成',
          value: 3
        },
        {
          label: '已关闭',
          value: 4
        },
        {
          label: '无效订单',
          value: 5
        },
        {
          label: '退款中',
          value: 6
        },
        {
          label: '退款完成',
          value: 7
        },
        {
          label: '购买未领取',
          value: 8
        },
        {
          label: '已领取',
          value: 9
        }
      ],
      orderTypeDefult: [
        {
          label: '请先选择订单来源',
          value: 0
        }
      ],
      orderTypeByJkdt: [
        {
          label: '积分兑换',
          value: 1
        },
        {
          label: '奖励订单',
          value: 3
        }
      ],
      orderTypeOptions: [
        {
          label: '正常订单',
          value: 0
        },
        {
          label: '积分兑换',
          value: 1
        },
        {
          label: '会员大礼包',
          value: 2
        },
        {
          label: '团购订单',
          value: 3
        },
        {
          label: '秒杀订单',
          value: 4
        },
        {
          label: '老好玩积分兑换',
          value: 5
        },
        {
          label: '1级会员核销订单',
          value: 6
        },
        {
          label: '购买精品课程',
          value: 7
        },
        {
          label: '购买线下课程',
          value: 8
        }
      ],
      sourceTypeOptions: [
        {
          label: '前贝课堂公众号',
          value: 0
        },
        {
          label: '前贝学堂小程序',
          value: 1
        },
        {
          label: '乐龄唱响',
          value: 2
        },
        {
          label: '健康答题小游戏',
          value: 3
        }
      ],
      operateOptions: [
        {
          label: "批量发货",
          value: 1
        },
        {
          label: "关闭订单",
          value: 2
        },
        {
          label: "删除订单",
          value: 3
        }
      ],
      logisticsDialogVisible: false,
      logistics: {},
      logisticsDetail: [],
      kuaidi: []
    }
  },
  created() {
    // let groupFountId = this.$route.query.id;
    // if (groupFountId) {
    //   this.listQuery = { groupFountId };
    // }
    // this.getList();
  },
  mounted() {
    let groupFountId = utility.getpageparmas(this)[0];
    if (groupFountId) {
      this.listQuery = { groupFountId };
    }
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatPayType(value) {
      if (value === 1) {
        return '支付宝';
      } else if (value === 2) {
        return '微信';
      } else {
        return '未支付';
      }
    },
    formatSourceType(value) {
      if (value === 0) {
        return '前贝课堂公众号';
      } else if (value === 1) {
        return '前贝学堂小程序';
      } else if (value === 2) {
        return '乐龄唱响';
      } else {
        return '健康答题小程序';
      }
    },
    formatStatus(value) {
      if (value === 0) {
        return '待付款';
      } else if (value === 1) {
        return '待发货';
      } else if (value === 2) {
        return '已发货';
      } else if (value === 3) {
        return '已完成';
      } else if (value === 4) {
        return '已关闭';
      } else if (value === 5) {
        return '无效订单';
      } else if (value === 6) {
        return '退款';
      } else if (value === 7) {
        return '退款完成';
      } else if (value === 8) {
        return '购买未领取';
      } else if (value === 9) {
        return '已领取';
      } else {
        return '待付款';
      }
    },
  },
  methods: {
    handleExport() {
      this.export();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleViewOrder(index, row) {
      utility.addtagview(this, "订单".concat(row.order_sn), "orderDetail", row.id);
    },
    handleCloseOrder(index, row) {
      this.closeOrder.dialogVisible = true;
      this.closeOrder.orderIds = [row.id];
      this.closeOrder.exc_keys = [String(row.exc_key)];
    },
    handleDeliveryOrder(index, row) {
      // this.$router.push({ path: '/oms/deliverOrderList', query: { list: [row.id] } })
      utility.addtagview(this, "发货".concat(row.order_sn), "deliverOrderList", row.id);

    },
    handleViewLogistics(index, row) {
      this.kuaidi = [];
      let that = this
      oms.queryKuaidi(row.id).then(res => {
          if(null !== res && 'null' !== res){
            that.kuaidi = res
          }
          
          that.logisticsDialogVisible = true;
        });
      this.logisticsDialogVisible = true;
    },
    handleDeleteOrder(index, row) {
      let ids = [];
      ids.push(String(row.id));
      let exc_keys = [];
      exc_keys.push(String(row.exc_key));
      let listOrderNo = [];
      listOrderNo.push(String(row.order_sn));
      this.deleteOrder(ids, exc_keys, listOrderNo);
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的订单',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量发货
        let list = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          if (this.multipleSelection[i].status === 1) {
            list.push(this.multipleSelection[i].id);
          }
        }
        if (list.length === 0) {
          this.$message({
            message: '选中订单中没有可以发货的订单',
            type: 'warning',
            duration: 1000
          });
          return;
        }
        // this.$router.push({ path: '/oms/deliverOrderList', query: { list: list } })；
        utility.addtagview(this, "批量发货", "deliverOrderList", list.join(","));

      } else if (this.operateType === 2) {
        //关闭订单
        this.closeOrder.orderIds = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.closeOrder.orderIds.push(String(this.multipleSelection[i].id));
          this.closeOrder.exc_keys.push(String(this.multipleSelection[i].exc_key));
        }
        this.closeOrder.dialogVisible = true;
      } else if (this.operateType === 3) {
        //删除订单
        let ids = [];
        let exc_keys = [];
        let listOrderNo = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(String(this.multipleSelection[i].id));
          exc_keys.push(String(this.multipleSelection[i].exc_key));
          listOrderNo.push(String(this.multipleSelection[i].order_sn));
        }
        this.deleteOrder(ids, exc_keys, listOrderNo);
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleCloseOrderConfirm() {
      if (this.closeOrder.content == null || this.closeOrder.content === '') {
        this.$message({
          message: '操作备注不能为空',
          type: 'warning',
          duration: 1000
        });
        return;
      }

      oms.doCloseOrder({
        ids: this.closeOrder.orderIds,
        exc_keys: this.closeOrder.exc_keys,
        opRemark: this.closeOrder.content
      }).then(response => {
        this.closeOrder.orderIds = [];
        this.closeOrder.exc_keys = [];
        this.closeOrder.dialogVisible = false;
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    export() {
      oms.export(this.listQuery);
    },
    getList() {
      this.listLoading = true;
      oms.getOrderList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    deleteOrder(ids, exc_keys, listOrderNo) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.doDeleteOrderFull({
          ids: ids,
          exc_keys: exc_keys,
          listOrderNo: listOrderNo
        }).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      })
    },
    covertOrder(order) {
      let address = order.receiver_province + order.receiver_city + order.receiver_region + order.receiver_detail_address;
      let listItem = {
        orderId: order.id,
        orderSn: order.order_sn,
        receiverName: order.receiver_name,
        receiverPhone: order.receiver_phone,
        receiverPostCode: order.receiver_post_code,
        address: address,
        deliveryCompany: null,
        deliverySn: null
      };
      return listItem;
    },
    handlePrintOrder(index, row) {
      utility.printselect(this, "oms.order", row.id);
    },
    handlePayBack(index, row) {
      console.log(row)
      this.$confirm('此操作会将开始微信退款, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.savePayPackOrder(row.id).then(res => {
          row.status = 7
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
        })

      }).catch(() => {

      });
    },
    sourceTypeChange(code){
      console.log(code)
      if(3 === code){
        this.orderTypeDefult = this.orderTypeByJkdt
      } else {
        this.orderTypeDefult = this.orderTypeOptions
      }
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


