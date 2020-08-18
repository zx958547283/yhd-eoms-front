<template>
  <div class="app-container">
    <el-container>
      <div class="block" style="display:flex;justify-content: center;">
        <span class="demonstration" style="line-height:40px;margin-right:10px;">时间</span>
        <el-date-picker
          v-model="selectTime"
          type="daterange"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button
              @click="doExport()"
              size="mini"
              type="primary"
              v-show="btnpower('btntoexcel')"
            >导出</el-button>
          </el-button-group>
        </el-header>
      </div>
    </el-container>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import gms from "../../../api/gms";
import e from "../../../utils/excel";
import lineChart from "../../../components/Charts/LineChart";

export default {
  components: {
    lineChart
  },
  data() {
    return {
      selectrows: [], //表格选中的对象
      wintitle: "自定义项编辑", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      mm: {}, //编辑对象
      tabledata: {}, //表格数据
      params: [], //页面参数
      pagenum: 1, //当前页
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false, //查询弹出窗
      newUserData: {
        xData: [],
        yData: [],
        title: ""
      },
      allRegister: {
        xData: [],
        yData: [],
        title: ""
      },
      noAnswer: {
        xData: [],
        yData: [],
        title: ""
      },
      selectTime: undefined
    };
  },
  filters: {},
  methods: {
    doExport() {
      const temp = {
        start: this.selectTime ? this.selectTime[0] : "",
        end: this.selectTime ? this.selectTime[1] : ""
      };
      gms.exportAll(temp);
    }
  }
};
</script>
<style></style>


