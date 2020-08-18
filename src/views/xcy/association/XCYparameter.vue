<template>
  <div class="paramSetting">
    <h4>报告编号：</h4>
    <el-form ref="form" :model="mm" label-width="80px">
      <el-form-item label="编码方式">
        <el-select v-model="mm.type" placeholder="请选择编码方式">
          <el-option label="自行输入" value="0"></el-option>
          <el-option label="固定位数+日期+流水号" value="1"></el-option>
          <el-option label="日期+流水号" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="总位数">
        <el-col :span="6">
          <el-input v-model="mm.total_number"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="固定位">
        <el-col :span="6">
          <el-input v-model="mm.fixed_string"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="6">
          <el-button @click="doSave()" type="primary">保存</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import xcy from "../../../api/xcy";
import u from "../../../utils/utility";
export default {
  data() {
    return {
      params: [], //页面参数
      mm: {
        total_number: "",
        fixed_string: "",
        type: ""
      }
    };
  },
  computed: {},
  mounted() {
    let that = this
    xcy.getMySysParm().then(res => {
      that.mm = res
    });
  },
  methods: {
    doSave () {
      let that = this
      xcy.saveSysParm(this.mm).then(res => {
        xcy.getMySysParm().then(res => {
          that.mm = res
          u.message(that, "保存成功");
        });
      })
    }
  }
};
</script>
<style>
.paramSetting {
  padding: 30px 50px;
}
</style>


