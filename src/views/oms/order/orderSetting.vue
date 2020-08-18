<template>
  <el-card class="form-container" shadow="never">
    <el-form :model="orderSetting" :rules="rules" label-width="150px" ref="orderSettingForm">
      <el-form-item label="秒杀订单超过：" prop="flash_order_overtime">
        <el-input class="input-width" v-model="orderSetting.flash_order_overtime">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="正常订单超过：" prop="normal_order_overtime">
        <el-input class="input-width" v-model="orderSetting.normal_order_overtime">
          <template slot="append">分</template>
        </el-input>
        <span class="note-margin">未付款，订单自动关闭</span>
      </el-form-item>
      <el-form-item label="发货超过：" prop="confirm_overtime">
        <el-input class="input-width" v-model="orderSetting.confirm_overtime">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">未收货，订单自动完成</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="finish_overtime">
        <el-input class="input-width" v-model="orderSetting.finish_overtime">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动结束交易，不能申请售后</span>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="comment_overtime">
        <el-input class="input-width" v-model="orderSetting.comment_overtime">
          <template slot="append">天</template>
        </el-input>
        <span class="note-margin">自动五星好评</span>
      </el-form-item>
      <el-form-item>
        <el-button @click="confirm('orderSettingForm')" type="primary">提交</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import oms from '@/api/oms'
const defaultOrderSetting = {
  id: null,
  flash_order_overtime: 0,
  normal_order_overtime: 0,
  confirm_overtime: 0,
  finish_overtime: 0,
  comment_overtime: 0
};
const checkTime = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('时间不能为空'));
  }
  let intValue = parseInt(value);
  if (!Number.isInteger(intValue)) {
    return callback(new Error('请输入数字值'));
  }
  callback();
};
export default {
  data() {
    return {
      orderSetting: Object.assign({}, defaultOrderSetting),
      rules: {
        flash_order_overtime: { validator: checkTime, trigger: 'blur' },
        normal_order_overtime: { validator: checkTime, trigger: 'blur' },
        confirm_overtime: { validator: checkTime, trigger: 'blur' },
        finish_overtime: { validator: checkTime, trigger: 'blur' },
        comment_overtime: { validator: checkTime, trigger: 'blur' }
      }
    }
  },
  created() {
    this.getDetail();
  },
  methods: {
    confirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('是否要提交修改?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            oms.saveOrderSetting(this.orderSetting).then(response => {
              this.$message({
                type: 'success',
                message: '提交成功!',
                duration: 1000
              });
              this.getDetail();
            })
          });
        } else {
          this.$message({
            message: '提交参数不合法',
            type: 'warning'
          });
          return false;
        }
      });
    },
    getDetail() {
      oms.rowWithOrderSetting().then(res => {
        this.orderSetting = res;
      })
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 50%;
}

.note-margin {
  margin-left: 15px;
}
</style>


