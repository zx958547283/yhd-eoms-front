<template>
  <div class="app-container">
    <div class="address-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border"></div>
        </el-col>
        <el-col :span="12">
          <div class="out-border"></div>
        </el-col>
      </el-row>
    </div>
    <div class="total-layout">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="total-frame">
            <svg-icon class="total-icon" icon-class="order"></svg-icon>
            <div class="total-title">客户总数</div>
            <div class="total-value">{{todayOrderCnt}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <svg-icon class="total-icon" icon-class="order"></svg-icon>
            <div class="total-title">今日新增客户</div>
            <div class="total-value">{{todaySellAmount}}</div>
          </div>
        </el-col>
        <!-- <el-col :span="6">
          <div class="total-frame">
            <svg-icon class="total-icon" icon-class="total-yesterday"></svg-icon>
            <div class="total-title">昨日新增客户</div>
            <div class="total-value">￥{{yestodaySellAmount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <svg-icon class="total-icon" icon-class="total-week"></svg-icon>
            <div class="total-title">近7天销售总额</div>
            <div class="total-value">￥{{sellAmountBy7Day}}</div>
          </div>
        </el-col> -->
      </el-row>
    </div>
    <!-- <div class="un-handle-layout">
      <div class="layout-title">待处理事务</div>
      <div class="un-handle-content">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待付款订单</span>
              <span class="color-danger" style="float: right">({{waitPayOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已完成订单</span>
              <span class="color-danger" style="float: right">({{finishOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待确认收货订单</span>
              <span class="color-danger" style="float: right">({{waitConfirmOrder}})</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待发货订单</span>
              <span class="color-danger" style="float: right">({{waitSendOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">新缺货登记</span>
              <span class="color-danger" style="float: right">({{outOfStockOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已超时过期订单</span>
              <span class="color-danger" style="float: right">({{overTimeOrder}})</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已发货订单</span>
              <span class="color-danger" style="float: right">({{alreadySendOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">已收货订单</span>
              <span class="color-danger" style="float: right">({{alreadyDeliveryOrder}})</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="un-handle-item">
              <span class="font-medium">待处理退货订单</span>
              <span class="color-danger" style="float: right">({{waitReturnOrder}})</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商品总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{noPublishProduct}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{puclishedProduct}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{verifyedProduct}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{totalProduct}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">已下架</el-col>
                <el-col :span="6" class="overview-item-title">已上架</el-col>
                <el-col :span="6" class="overview-item-title">审核通过</el-col>
                <el-col :span="6" class="overview-item-title">全部商品</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{todayJoinMember}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{yestodayJoinMember}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{joinMemberByMonth}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{totalMember}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div> -->
    <div class="statistics-layout">
      <div class="layout-title">客户统计</div>
      <el-row>
        <el-col :span="4">
          <div style="padding: 20px">
            <div>
              <div style="color: #909399;font-size: 14px">本月新增客户</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderCntByMonth}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="markByMonth === '+'">{{markByMonth}}{{rateByMonth}}%</span>
                <span class="color-danger" style="font-size: 14px" v-else>{{markByMonth}}{{rateByMonth}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周新增客户</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{orderCntByWeek}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="markByWeek === '+'">{{markByWeek}}{{rateByWeek}}%</span>
                <span class="color-danger" style="font-size: 14px" v-else>{{markByWeek}}{{rateByWeek}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本月充值总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{sellAmountByMonth}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="markAmountByMonth === '+'">{{markAmountByMonth}}{{rateAmountByMonth}}%</span>
                <span class="color-danger" style="font-size: 14px" v-else>{{markAmountByMonth}}{{rateAmountByMonth}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px;">
              <div style="color: #909399;font-size: 14px">本周充值总额</div>
              <div style="color: #606266;font-size: 24px;padding: 10px 0">{{sellAmountByWeek}}</div>
              <div>
                <span class="color-success" style="font-size: 14px" v-if="markAmountByWeek === '+'">{{markAmountByWeek}}{{rateAmountByWeek}}%</span>
                <span class="color-danger" style="font-size: 14px" v-else>{{markAmountByWeek}}{{rateAmountByWeek}}%</span>
                <span style="color: #C0C4CC;font-size: 14px">同比上周</span>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="20">
          <div style="padding: 10px;border-left:1px solid #DCDFE6">
            <el-date-picker :picker-options="pickerOptions" @change="handleDateChange" align="right" end-placeholder="结束日期" range-separator="至" size="small" start-placeholder="开始日期" style="float: right;z-index: 1" type="daterange" unlink-panels v-model="orderCountDate"></el-date-picker>
            <div>
              <ve-line :data="chartData" :data-empty="dataEmpty" :legend-visible="false" :loading="loading" :settings="chartSettings"></ve-line>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { str2Date } from '@/utils/date';
import oms from "@/api/oms";
const DATA_FROM_BACKEND = {
  columns: ['date', 'orderCount', 'orderAmount'],
  rows: [
    { date: '2018-11-01', orderCount: 10, orderAmount: 1093 },
    { date: '2018-11-02', orderCount: 20, orderAmount: 2230 },
    { date: '2018-11-03', orderCount: 33, orderAmount: 3623 },
    { date: '2018-11-04', orderCount: 50, orderAmount: 6423 },
    { date: '2018-11-05', orderCount: 80, orderAmount: 8492 },
    { date: '2018-11-06', orderCount: 60, orderAmount: 6293 },
    { date: '2018-11-07', orderCount: 20, orderAmount: 2293 },
    { date: '2018-11-08', orderCount: 60, orderAmount: 6293 },
    { date: '2018-11-09', orderCount: 50, orderAmount: 5293 },
    { date: '2018-11-10', orderCount: 30, orderAmount: 3293 },
    { date: '2018-11-11', orderCount: 20, orderAmount: 2293 },
    { date: '2018-11-12', orderCount: 80, orderAmount: 8293 },
    { date: '2018-11-13', orderCount: 100, orderAmount: 10293 },
    { date: '2018-11-14', orderCount: 10, orderAmount: 1293 },
    { date: '2018-11-15', orderCount: 40, orderAmount: 4293 }
  ]
};
export default {
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            var year = start.getFullYear();
            var month = start.getMonth();
            var strDate = start.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            start.setFullYear(year);
            start.setMonth(month);
            start.setDate(strDate);
            end.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [end, start]);
          }
        }, {
          text: '最近一月',
          onClick(picker) {
            const end = new Date();
            let start = new Date();
            var year = start.getFullYear();
            var month = start.getMonth() - 1;
            var strDate = start.getDate();
            if (month >= 1 && month <= 9) {
              month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
            }
            start.setFullYear(year);
            start.setMonth(month);
            start.setDate(strDate);
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 31);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      orderCountDate: '',
      chartSettings: {
        xAxisType: 'time',
        area: true,
        axisSite: { right: ['orderAmount'] },
        labelMap: { 'orderCount': '订单数量', 'orderAmount': '订单金额' }      },
      chartData: {
        columns: [],
        rows: []
      },
      year: '2019',
      loading: false,
      dataEmpty: false,
      todayOrderCnt: '200',
      todaySellAmount: '5000',
      yestodaySellAmount: '5000',
      sellAmountBy7Day: '50000',
      waitPayOrder: '10',
      waitSendOrder: '10',
      alreadySendOrder: '10',
      finishOrder: '10',
      outOfStockOrder: '10',
      waitReturnOrder: '10',
      waitConfirmOrder: '10',
      overTimeOrder: '10',
      alreadyDeliveryOrder: '10',
      noPublishProduct: '10',
      puclishedProduct: '100',
      verifyedProduct: '100',
      totalProduct: '400',
      todayJoinMember: '40',
      yestodayJoinMember: '20',
      joinMemberByMonth: '60',
      totalMember: '500',
      orderCntByMonth: '1000',
      rateByMonth: '%10',
      markByMonth: '+',
      orderCntByWeek: '100',
      rateByWeek: '10%',
      markByWeek: '-',
      sellAmountByMonth: '500000',
      rateAmountByMonth: '10%',
      markAmountByMonth: '+',
      sellAmountByWeek: '50000',
      rateAmountByWeek: '10%',
      markAmountByWeek: '-'
    }
  },
  created() {
    this.initOrderCountDate();
    this.getData();
  },
  methods: {
    handleDateChange() {
      console.log(this.orderCountDate[0].getTime())

      this.getData();
    },
    initOrderCountDate() {
      let start = new Date();
      var year = start.getFullYear();
      var month = start.getMonth();
      var strDate = start.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      start.setFullYear(year);
      start.setMonth(month);
      start.setDate(strDate);
      const end = new Date();
      end.setTime(start.getTime() - 1000 * 60 * 60 * 24 * 7);
      this.orderCountDate = [end, start];
      console.log(this.orderCountDate)
    },
    getData() {
      setTimeout(() => {
        this.chartData = {
          columns: ['date', 'orderCount', 'orderAmount'],
          rows: []
        };
        // 获取数据
        let start = this.orderCountDate[0].getTime()
        let end = this.orderCountDate[1].getTime()
        let parm = {
          'start': start,
          'end': end
        }

        oms.getHomePageInfo(parm).then(res => {
          console.log(res)
          this.todayOrderCnt = res.todayOrderCnt
          this.todaySellAmount = res.todaySellAmount
          this.yestodaySellAmount = res.yestodaySellAmount
          this.sellAmountBy7Day = res.sellAmountBy7Day
          this.waitPayOrder = res.waitPayOrder
          this.waitSendOrder = res.waitSendOrder
          this.alreadySendOrder = res.alreadySendOrder
          this.finishOrder = res.finishOrder
          this.outOfStockOrder = res.outOfStockOrder
          this.waitReturnOrder = res.waitReturnOrder
          this.waitConfirmOrder = res.waitConfirmOrder
          this.overTimeOrder = res.overTimeOrder
          this.alreadyDeliveryOrder = res.alreadyDeliveryOrder
          this.noPublishProduct = res.noPublishProduct
          this.puclishedProduct = res.puclishedProduct
          this.verifyedProduct = res.verifyedProduct
          this.totalProduct = res.totalProduct
          this.todayJoinMember = res.todayJoinMember
          this.yestodayJoinMember = res.yestodayJoinMember
          this.joinMemberByMonth = res.joinMemberByMonth
          this.totalMember = res.totalMember
          this.orderCntByMonth = res.orderCntByMonth
          this.rateByMonth = res.rateByMonth
          this.markByMonth = res.markByMonth
          this.orderCntByWeek = res.orderCntByWeek
          this.rateByWeek = res.rateByWeek
          this.markByWeek = res.markByWeek
          this.sellAmountByMonth = res.sellAmountByMonth
          this.rateAmountByMonth = res.rateAmountByMonth
          this.markAmountByMonth = res.markAmountByMonth
          this.sellAmountByWeek = res.sellAmountByWeek
          this.rateAmountByWeek = res.rateAmountByWeek
          this.markAmountByWeek = res.markAmountByWeek
          DATA_FROM_BACKEND.rows = res.orders
          for (let i = 0; i < DATA_FROM_BACKEND.rows.length; i++) {
            let item = DATA_FROM_BACKEND.rows[i];
            let currDate = str2Date(item.date);
            let start = this.orderCountDate[0];
            let end = this.orderCountDate[1];
            if (currDate.getTime() >= start.getTime() && currDate.getTime() <= end.getTime()) {
              this.chartData.rows.push(item);
            }
          }
          this.dataEmpty = false;
          this.loading = false
        });




      }, 1000)
    }
  }
}
</script>

<style scoped>
.app-container {
  margin-top: 40px;
  margin-left: 120px;
  margin-right: 120px;
}

.address-layout {
}

.total-layout {
  margin-top: 20px;
}

.total-frame {
  border: 1px solid #dcdfe6;
  padding: 20px;
  height: 100px;
}

.total-icon {
  color: #409eff;
  width: 60px !important;
  height: 60px !important;
}

.total-title {
  position: relative;
  font-size: 16px;
  color: #909399;
  left: 70px;
  top: -50px;
}

.total-value {
  position: relative;
  font-size: 18px;
  color: #606266;
  left: 70px;
  top: -40px;
}

.un-handle-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}

.layout-title {
  color: #606266;
  padding: 15px 20px;
  background: #f2f6fc;
  font-weight: bold;
}

.un-handle-content {
  padding: 20px 40px;
}

.un-handle-item {
  border-bottom: 1px solid #ebeef5;
  padding: 10px;
}

.overview-layout {
  margin-top: 20px;
}

.overview-item-value {
  font-size: 24px;
  text-align: center;
}

.overview-item-title {
  margin-top: 10px;
  text-align: center;
}

.out-border {
  border: 1px solid #dcdfe6;
}

.statistics-layout {
  margin-top: 20px;
  border: 1px solid #dcdfe6;
}
</style>
