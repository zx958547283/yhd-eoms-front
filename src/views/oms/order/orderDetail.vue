<template>
  <div class="detail-container">
    <div>
      <el-steps :active="formatStepStatus(order.status)" align-center finish-status="success">
        <el-step :description="formatTime(order.create_time)" title="提交订单"></el-step>
        <el-step :description="formatTime(order.payment_time)" title="支付订单"></el-step>
        <el-step :description="formatTime(order.delivery_time)" title="平台发货"></el-step>
        <el-step :description="formatTime(order.receive_time)" title="确认收货"></el-step>
        <!-- <el-step :description="formatTime(order.comment_time)" title="完成评价"></el-step> -->
        <el-step :description="formatTime(order.edit_time)" title="退款"></el-step>
      </el-steps>
    </div>
    <el-card shadow="never" style="margin-top: 15px">
      <div class="operate-container">
        <i class="el-icon-warning color-danger" style="margin-left: 20px"></i>
        <span class="color-danger">当前订单状态：{{order.status | formatStatus}}</span>
        <div class="operate-button-container" v-show="order.status==='0'">
          <el-button @click="showUpdateReceiverDialog" size="mini">修改收货人信息</el-button>
          <el-button size="mini">修改商品信息</el-button>
          <el-button @click="showUpdateMoneyDialog" size="mini">修改费用信息</el-button>
          <el-button @click="showMessageDialog" size="mini">发送站内信</el-button>
          <el-button @click="showCloseOrderDialog" size="mini">关闭订单</el-button>
          <el-button @click="showCancleDialog" size="mini">取消订单</el-button>
          <el-button @click="showMarkOrderDialog" size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status==='1'">
          <el-button @click="showUpdateReceiverDialog" size="mini">修改收货人信息</el-button>
          <el-button @click="showMessageDialog" size="mini">发送站内信</el-button>
          <el-button @click="showCancleDialog" size="mini">取消订单</el-button>
          <el-button @click="showMarkOrderDialog" size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status==='2'||order.status==='3'">
          <el-button @click="showLogisticsDialog" size="mini">订单跟踪</el-button>
          <el-button @click="showMessageDialog" size="mini">发送站内信</el-button>
          <el-button @click="showMarkOrderDialog" size="mini">备注订单</el-button>
        </div>
        <div class="operate-button-container" v-show="order.status==='4'">
          <el-button @click="handleDeleteOrder" size="mini">删除订单</el-button>
          <el-button @click="showMarkOrderDialog" size="mini">备注订单</el-button>
        </div>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">基本信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="4" class="table-cell-title">订单编号</el-col>
          <el-col :span="4" class="table-cell-title">发货单流水号</el-col>
          <el-col :span="4" class="table-cell-title">用户账号</el-col>
          <el-col :span="4" class="table-cell-title">支付方式</el-col>
          <el-col :span="4" class="table-cell-title">订单来源</el-col>
          <el-col :span="4" class="table-cell-title">订单类型</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.order_sn}}</el-col>
          <el-col :span="4" class="table-cell">暂无</el-col>
          <el-col :span="4" class="table-cell">{{order.receiver_name}}</el-col>
          <el-col :span="4" class="table-cell">{{order.pay_type | formatPayType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.source_type | formatSourceType}}</el-col>
          <el-col :span="4" class="table-cell">{{order.order_type | formatOrderType}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell-title">配送方式</el-col>
          <el-col :span="4" class="table-cell-title">物流单号 <a style="text-decoration:underline;color:#00F;font-size:15px;" @click="openSn(order.delivery_sn)">完整单号查看</a></el-col>
          <el-col :span="4" class="table-cell-title">自动确认收货时间</el-col>
          <el-col :span="4" class="table-cell-title">订单可得优币</el-col>
          <el-col :span="4" class="table-cell-title">订单可得成长值</el-col>
          <el-col :span="4" class="table-cell-title">活动信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="4" class="table-cell">{{order.delivery_company | formatNull}}</el-col>
          <el-col :span="4" class="table-cell" style="word-wrap:break-word;">{{order.delivery_sn | formatNull}}</el-col>
          <el-col :span="4" class="table-cell">{{order.auto_confirm_day}}天</el-col>
          <el-col :span="4" class="table-cell">{{order.integration}}</el-col>
          <el-col :span="4" class="table-cell">{{order.growth}}</el-col>
          <el-col :span="4" class="table-cell">
            <el-popover :content="order.promotion_info" placement="top-start" title="活动信息" trigger="hover" width="200">
              <span slot="reference">{{order.promotion_info | formatLongText}}</span>
            </el-popover>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">收货人信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">收货人</el-col>
          <el-col :span="6" class="table-cell-title">手机号码</el-col>
          <el-col :span="6" class="table-cell-title">邮政编码</el-col>
          <el-col :span="6" class="table-cell-title">收货地址</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">{{order.receiver_name}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiver_phone}}</el-col>
          <el-col :span="6" class="table-cell">{{order.receiver_post_code}}</el-col>
          <el-col :span="6" class="table-cell">{{order | formatAddress}}</el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">商品信息</span>
      </div>
      <el-table :data="listOrderItem" border ref="orderItemTable" style="width: 100%;margin-top: 20px">
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.product_pic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <p>{{scope.row.product_name}}</p>
            <p>品牌：{{scope.row.product_brand}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格/货号" width="120">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.product_price}}</p>
            <p>货号：{{scope.row.product_sn}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="属性" width="120">
          <template slot-scope="scope">{{scope.row.product_attr}}</template>
        </el-table-column>
        <el-table-column align="center" label="数量" width="120">
          <template slot-scope="scope">{{scope.row.product_quantity}}</template>
        </el-table-column>
        <el-table-column align="center" label="小计" width="120">
          <template slot-scope="scope">￥{{scope.row.product_price * scope.row.product_quantity}}</template>
        </el-table-column>
      </el-table>
      <div style="float: right;margin: 20px">
        合计：
        <span class="color-danger">￥{{order.total_amount}}</span>
      </div>
      <div style="margin-top: 60px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">费用信息</span>
      </div>
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.total_amount}}</el-col>
          <el-col :span="6" class="table-cell">￥{{order.freight_amount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.coupon_amount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integration_amount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotion_amount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.discount_amount}}</el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.total_amount + order.freight_amount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.pay_amount + order.freight_amount - order.discount_amount}}</span>
          </el-col>
        </el-row>
      </div>
      <div style="margin-top: 20px">
        <svg-icon icon-class="marker" style="color: #606266"></svg-icon>
        <span class="font-small">操作信息</span>
      </div>
      <el-table :data="historyList" border ref="orderHistoryTable" style="margin-top: 20px;width: 100%">
        <el-table-column align="center" label="操作者" width="120">
          <template slot-scope="scope">{{scope.row.operate_man}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作时间" width="160">
          <template slot-scope="scope">{{formatTime(scope.row.create_time)}}</template>
        </el-table-column>
        <el-table-column align="center" label="订单状态" width="120">
          <template slot-scope="scope">{{scope.row.order_status | formatStatus}}</template>
        </el-table-column>
        <el-table-column align="center" label="付款状态" width="120">
          <template slot-scope="scope">{{scope.row.order_status | formatPayStatus}}</template>
        </el-table-column>
        <!-- <el-table-column align="center" label="发货状态" width="120">
          <template slot-scope="scope">{{scope.row.order_status | formatDeliverStatus}}</template>
        </el-table-column> -->
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">{{scope.row.note}}</template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="receiverDialogVisible" title="修改收货人信息" width="40%">
      <el-form :model="receiverInfo" label-width="150px" ref="receiverInfoForm">
        <el-form-item label="收货人姓名：">
          <el-input style="width: 200px" v-model="receiverInfo.receiverName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input style="width: 200px" v-model="receiverInfo.receiverPhone"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：">
          <el-input style="width: 200px" v-model="receiverInfo.receiverPostCode"></el-input>
        </el-form-item>
        <el-form-item label="所在区域：">
          <v-distpicker :area="receiverInfo.receiverRegion" :city="receiverInfo.receiverCity" :province="receiverInfo.receiverProvince" @selected="onSelectRegion"></v-distpicker>
        </el-form-item>
        <el-form-item label="详细地址：">
          <el-input rows="3" type="textarea" v-model="receiverInfo.receiverDetailAddress"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="receiverDialogVisible = false">取 消</el-button>
        <el-button @click="handleUpdateReceiverInfo" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="moneyDialogVisible" title="修改费用信息" width="40%">
      <div class="table-layout">
        <el-row>
          <el-col :span="6" class="table-cell-title">商品合计</el-col>
          <el-col :span="6" class="table-cell-title">运费</el-col>
          <el-col :span="6" class="table-cell-title">优惠券</el-col>
          <el-col :span="6" class="table-cell-title">积分抵扣</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">￥{{order.total_amount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input size="mini" v-model.number="moneyInfo.freightAmount">
              <template slot="prepend">￥</template>
            </el-input>
          </el-col>
          <el-col :span="6" class="table-cell">-￥{{order.coupon_amount}}</el-col>
          <el-col :span="6" class="table-cell">-￥{{order.integration_amount}}</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell-title">活动优惠</el-col>
          <el-col :span="6" class="table-cell-title">折扣金额</el-col>
          <el-col :span="6" class="table-cell-title">订单总金额</el-col>
          <el-col :span="6" class="table-cell-title">应付款金额</el-col>
        </el-row>
        <el-row>
          <el-col :span="6" class="table-cell">-￥{{order.promotion_amount}}</el-col>
          <el-col :span="6" class="table-cell">
            <el-input size="mini" v-model.number="moneyInfo.discountAmount">
              <template slot="prepend">-￥</template>
            </el-input>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.total_amount + moneyInfo.freightAmount}}</span>
          </el-col>
          <el-col :span="6" class="table-cell">
            <span class="color-danger">￥{{order.pay_amount + order.discount_amount + moneyInfo.freightAmount - moneyInfo.discountAmount}}</span>
          </el-col>
        </el-row>
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="moneyDialogVisible = false">取 消</el-button>
        <el-button @click="handleUpdateMoneyInfo" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="messageDialogVisible" title="发送站内信" width="40%">
      <el-form :model="message" label-width="150px" ref="receiverInfoForm">
        <el-form-item label="标题：">
          <el-input style="width: 200px" v-model="message.title"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input rows="3" type="textarea" v-model="message.content"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="messageDialogVisible = false">取 消</el-button>
        <el-button @click="handleSendMessage" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="closeDialogVisible" title="关闭订单" width="40%">
      <el-form :model="closeInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input rows="3" type="textarea" v-model="closeInfo.note"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="closeDialogVisible = false">取 消</el-button>
        <el-button @click="handleCloseOrder" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="markOrderDialogVisible" title="备注订单" width="40%">
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="操作备注：">
          <el-input rows="3" type="textarea" v-model="markInfo.note"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="markOrderDialogVisible = false">取 消</el-button>
        <el-button @click="handleMarkOrder" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="cancleOrderDialogVisible" title="取消订单" width="40%">
      <el-form :model="markInfo" label-width="150px">
        <el-form-item label="取消备注：">
          <el-input rows="3" type="textarea" v-model="cancleInfo.note"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="cancleOrderDialogVisible = false">取 消</el-button>
        <el-button @click="handleCancleOrder" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <!-- <el-dialog :visible.sync="logisticsDialogVisible" title="快递跟踪" width="40%">
      <el-steps direction="vertical" :active="1">
        <el-step :description="item.time"  :title="item.context" :key="item.context" v-for="item in kuaidi"></el-step>
      </el-steps>
    </el-dialog> -->

    <logistics-dialog v-model="logisticsDialogVisible" :logisticsDetail=kuaidi></logistics-dialog>
  </div>
</template>
<script>
import LogisticsDialog from '@/views/oms/order/components/logisticsDialog';
import { formatDate } from '@/utils/date';
import VDistpicker from 'v-distpicker';
import oms from '@/api/oms'
import utility from '../../../utils/utility';

const defaultReceiverInfo = {
  orderId: null,
  receiverName: null,
  receiverPhone: null,
  receiverPostCode: null,
  receiverDetailAddress: null,
  receiverProvince: null,
  receiverCity: null,
  receiverRegion: null,
  status: null
};
export default {
  components: { VDistpicker, LogisticsDialog },
  data() {
    return {
      id: null,
      order: {},
      historyList: [],
      listOrderItem: [],
      receiverDialogVisible: false,
      receiverInfo: Object.assign({}, defaultReceiverInfo),
      moneyDialogVisible: false,
      moneyInfo: { orderId: null, freightAmount: 0, discountAmount: 0, status: null },
      messageDialogVisible: false,
      message: { title: null, content: null },
      closeDialogVisible: false,
      closeInfo: { note: null, id: null },
      markOrderDialogVisible: false,
      markInfo: { note: null },
      cancleOrderDialogVisible: false,
      cancleInfo: { note: null, id: null },
      logisticsDialogVisible: false,
      kuaidi: []
    }
  },
  created() {

  },
  mounted() {
    this.id = utility.getpageparmas(this);
    this.getOrderDetail(this.id[0]);
  },
  filters: {
    formatNull(value) {
      if (value === undefined || value === null || value === '') {
        return '暂无';
      } else {
        return value;
      }
    },
    formatLongText(value) {
      if (value === undefined || value === null || value === '') {
        return '暂无';
      } else if (value.length > 8) {
        return value.substr(0, 8) + '...';
      } else {
        return value;
      }
    },
    formatPayType(value) {
      console.log('=== pay type :' + value)
      if (value === '1') {
        return '支付宝';
      } else if (value === '2') {
        return '微信';
      } else {
        return '未支付';
      }
    },
    formatSourceType(value) {
      if (value === 1) {
        return 'APP订单';
      } else {
        return 'PC订单';
      }
    },
    formatOrderType(value) {
      if (value === 1) {
        return '秒杀订单';
      } else {
        return '正常订单';
      }
    },
    formatAddress(order) {
      let str = order.receiver_province;
      if (order.receiver_city != null) {
        str += "  " + order.receiver_city;
      }
      str += "  " + order.receiver_region;
      str += "  " + order.receiver_detail_address;
      return str;
    },
    formatStatus(value) {
      value = Number(value);
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
        return '退款中';
      } else if (value === 7) {
        return '退款完成';
      } else {
        return '待付款';
      }
    },
    formatPayStatus(value) {
      value = Number(value);
      if (value === 0) {
        return '未支付';
      } else if (value === 4) {
        return '已退款';
      } else {
        return '已支付';
      }
    },
    formatDeliverStatus(value) {
      value = Number(value);
      if (value === 0 || value === 1) {
        return '未发货';
      } else {
        return '已发货';
      }
    },
    formatProductAttr(value) {
      if (value == null) {
        return '';
      } else {
        let attr = JSON.parse(value);
        // let attr = eval('(' + value + ')')
        let result = '';
        for (let i = 0; i < attr.length; i++) {
          result += attr[i].key;
          result += ":";
          result += attr[i].value;
          result += ";";
        }
        return result;
      }
    }
  },
  methods: {
    getOrderDetail(orderId) {
      oms.getOrderDetail({ id: orderId }).then(res => {
        this.order = res.order;
        console.log(res.order)
        //转换金额为数字
        this.order.total_amount = Number(this.order.total_amount);
        this.order.pay_amount = Number(this.order.pay_amount);
        this.order.real_pay_amount = Number(this.order.real_pay_amount);
        this.order.freight_amount = Number(this.order.freight_amount);
        this.order.promotion_amount = Number(this.order.promotion_amount);
        this.order.integration_amount = Number(this.order.integration_amount);
        this.order.coupon_amount = Number(this.order.coupon_amount);
        this.order.discount_amount = Number(this.order.discount_amount);
        //订单商品项
        this.listOrderItem = res.listOrderItem;
        //操作记录
        this.historyList = res.historyList;
      });
    },
    onSelectRegion(data) {
      this.receiverInfo.receiverProvince = data.province.value;
      this.receiverInfo.receiverCity = data.city.value;
      this.receiverInfo.receiverRegion = data.area.value;
    },
    formatTime(time) {
      if (time == null || time === '') {
        return '';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStepStatus(value) {
      let tempVal = Number(value);
      if (tempVal === 0) {
        //待付款
        return 1;
      } else if (tempVal === 1) {
        //待发货
        return 2;
      } else if (tempVal === 2) {
        //已发货
        return 3;
      } else if (tempVal === 3) {
        //已完成
        return 4;
      } else if (tempVal === 4) {
        //已完成
        return 1;
      } else if (tempVal === 5) {
        //已完成
        return 1;
      } else if (tempVal === 6) {
        //已完成
        return 4;
      } else if (tempVal === 7) {
        //已完成
        return 5;
      } else {
        //待付款、已关闭、无限订单
        return 1;
      }
    },
    showUpdateReceiverDialog() {
      this.receiverDialogVisible = true;
      this.receiverInfo = {
        orderId: this.order.id,
        receiverName: this.order.receiver_name,
        receiverPhone: this.order.receiver_phone,
        receiverPostCode: this.order.receiver_post_code,
        receiverDetailAddress: this.order.receiver_detail_address,
        receiverProvince: this.order.receiver_province,
        receiverCity: this.order.receiver_city,
        receiverRegion: this.order.receiver_region,
        status: this.order.status,
        exc_key: this.order.exc_key
      }
    },
    handleUpdateReceiverInfo() {
      this.$confirm('是否要修改收货信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.updateOrderReceiverInfo(this.receiverInfo).then(res => {
          this.receiverDialogVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getOrderDetail(this.id);
        });
      });
    },
    showUpdateMoneyDialog() {
      this.moneyDialogVisible = true;
      this.moneyInfo.orderId = this.order.id;
      this.moneyInfo.freightAmount = this.order.freight_amount;
      this.moneyInfo.discountAmount = this.order.discount_amount;
      this.moneyInfo.status = this.order.status;
      this.moneyInfo.exc_key = this.order.exc_key;
    },
    handleUpdateMoneyInfo() {
      this.$confirm('是否要修改费用信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.updateOrderMoneyInfo(this.moneyInfo).then(response => {
          this.moneyDialogVisible = false;
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getOrderDetail(this.id);
        });
      });
    },
    showMessageDialog() {
      this.messageDialogVisible = true;
      this.message.title = null;
      this.message.content = null;
      this.message.member_id = this.order.member_id;
      this.message.member_username = this.order.member_username;
    },
    handleSendMessage() {
      this.$confirm('是否要发送站内信?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.messageDialogVisible = false;
        oms.sendOrderMessage(this.message).then(res => {
          this.$message({
            type: 'success',
            message: '发送成功!'
          });
        });
      });
    },
    showCloseOrderDialog() {
      this.closeDialogVisible = true;
      this.closeInfo.note = this.order.note;
      this.closeInfo.id = this.id;
      this.closeInfo.exc_key = this.order.exc_key;
    },
    handleCloseOrder() {
      this.$confirm('是否要关闭?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.doCloseOrder({
          ids: [this.closeInfo.id],
          exc_keys: [this.closeInfo.exc_key],
          opRemark: this.closeInfo.note
        }).then(response => {
          this.closeDialogVisible = false;
          this.$message({
            type: 'success',
            message: '订单关闭成功!'
          });
          this.getOrderDetail(this.id);
        });
      });
    },
    showMarkOrderDialog() {
      this.markOrderDialogVisible = true;
      this.markInfo.id = this.id;
      this.markInfo.note = this.order.note;
    },
    handleMarkOrder() {
      this.$confirm('是否要备注订单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.updateOrderNote({
          orderId: this.markInfo.id,
          status: this.order.status,
          exc_key: this.order.exc_key,
          note: this.markInfo.note
        }).then(response => {
          this.markOrderDialogVisible = false;
          this.$message({
            type: 'success',
            message: '订单备注成功!'
          });
          this.getOrderDetail(this.id);
        });
      });
    },
    handleDeleteOrder() {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.doDeleteOrderFull({
          ids: [this.id],
          exc_keys: [this.order.exc_key],
          listOrderNo: [this.order.order_sn]
        }).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.$router.back();
        });
      })
    },
    showLogisticsDialog() {
      // 获取订单信息
      let that = this
      oms.queryKuaidi(this.order.id).then(res => {
          if(null !== res && 'null' !== res){
            that.kuaidi = res
          }
          that.logisticsDialogVisible = true;
        });
      
    },
    showCancleDialog() {
      this.cancleOrderDialogVisible = true;
      this.cancleInfo.id = this.id;
      this.cancleInfo.note = this.order.note;
    },
    handleCancleOrder() {
      this.$confirm('是否要进行该取消操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.doCancleOrder({
          orderId: this.cancleInfo.id,
          note: this.cancleInfo.note,
          exc_key: this.order.exc_key,
          status: this.order.status,
          order_sn: this.order.order_sn
        }).then(response => {
          this.cancleOrderDialogVisible = false;
          this.$message({
            message: '订单取消成功！',
            type: 'success',
            duration: 1000
          });
          this.getOrderDetail(this.id);
        });
      })
    },
    openSn(sn) {
      this.$alert(sn, '快递单号', {
          confirmButtonText: '确定',
          callback: action => {
            
          }
        });
    }
  }
}
</script>
<style scoped>
.detail-container {
  width: 80%;
  padding: 20px 20px 20px 20px;
  margin: 20px auto;
}

.operate-container {
  background: #f2f6fc;
  height: 80px;
  margin: -20px -20px 0;
  line-height: 80px;
}

.operate-button-container {
  float: right;
  margin-right: 20px;
}

.table-layout {
  margin-top: 20px;
  border-left: 1px solid #dcdfe6;
  border-top: 1px solid #dcdfe6;
}

.table-cell {
  height: 60px;
  line-height: 40px;
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  font-size: 14px;
  color: #606266;
  text-align: center;
  overflow: hidden;
}

.table-cell-title {
  border-right: 1px solid #dcdfe6;
  border-bottom: 1px solid #dcdfe6;
  padding: 10px;
  background: #f2f6fc;
  text-align: center;
  font-size: 14px;
  color: #303133;
}
</style>


