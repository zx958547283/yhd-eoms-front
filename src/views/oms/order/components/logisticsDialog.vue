<template>
  <el-dialog :before-close="handleClose" :visible.sync="visible"  title="订单跟踪" width="80%">
    <div style="color:red; font-size:18px;" v-if="logisticsDetail.length === 0">暂无快递记录</div>
    <!-- <el-steps :active="logisticsDetail.length" direction="vertical" finish-status="success" space="50px" style="margin-top:20px;">
      <el-step :description="item.time" :key="item.context" :title="item.context" v-for="item in logisticsDetail"></el-step>
    </el-steps> -->
    <el-tabs type="border-card">
      <el-tab-pane :label="item.sn" :key="item.sn" v-for="item in logisticsDetail">
        <el-steps :active="item.kdDetial.length" direction="vertical" finish-status="success" space="50px" style="margin-top:20px;">
          <el-step :description="item1.time" :key="item1.context" :title="item1.context" v-for="item1 in item.kdDetial"></el-step>
        </el-steps>
      
      </el-tab-pane>
      
    </el-tabs>
  </el-dialog>
</template>
<script>
const defaultLogisticsList = [
  { context: '订单已提交，等待付款', time: '2017-04-01 12:00:00 ' }
];
export default {
  name: 'logisticsDialog',
  props: {
    value: Boolean,
    logistics: {},
    logisticsDetail: {
      default: Array
    }

  },
  computed: {
    visible: {
      get() {
        return this.value;
      },
      set(visible) {
        this.value = visible;
      }
    }
//     ,
//     logisticsList: {
//       get() {
//         console.log('11111111111')
//         console.log(this.logisticsDetail)
//         return this.logisticsDetail;
//       },
//       set(val) {
// console.log('222222222')
//         console.log(val)
//         this.logisticsDetail = val;
//       }
//     }
  },
  data() {
    return {
      // logisticsList: Object.assign({}, defaultLogisticsList)
      // stepSize: 10,
      // logStatus: ['在途', '揽收', '疑难', '签收', '退签', '派件', '退回', '转投']
    }
  },
  methods: {
    emitInput(val) {
      this.$emit('input', val)
    },
    handleClose() {
      this.emitInput(false);
    }
  }
}
</script>
<style></style>


