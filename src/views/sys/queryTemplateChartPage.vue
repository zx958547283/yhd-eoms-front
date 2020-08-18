<template>
  <div class="pagecontent">
    <el-container>
      <el-container style="width:60%">
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryshow()" size="mini" type="primary">查询</el-button>
            <el-button @cilck="btntoexcel()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <cqueryfix :pk="params[0]" @query="btnquery"></cqueryfix>
          </el-button-group>
        </el-header>
        <el-main>
          <div :id="chartid" style="width:100%;height:800px"></div>
        </el-main>
      </el-container>
      <el-aside style="width:35%">
        <ctable :data="tabledata" :loading="loading" :pagenum="0" :selection="false"></ctable>
      </el-aside>
    </el-container>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="true" @query="btnquery" v-model="queryvisible"></cquery>
  </div>
</template>

<script>
import u from "../../utils/utility";
import e from "../../utils/excel";
var echarts = require("echarts/lib/echarts");
export default {
  data() {
    return {
      params: [],
      tabledata: {},
      loading: false,
      pagenum: 0,
      querylist: [],
      queryvisible: false,
      chartid: "chart" + u.newid()
    };
  },
  mounted: function () {
    this.params = u.getpageparmas(this);
  },
  methods: {
    btndataload: function (num) {
      u.querychart(
        this,
        this.params[0],
        this.querylist,
        this.params.length > 2 ? this.params[1] : "bar",
        document,
        echarts,
        this.chartid,
        this.params.length > 3 ? this.params[2] : ""
      );
      u.querywhere(this, this.params[0], this.querylist, 0, 0, "tabledata");
    },
    btnqueryshow: function () {
      this.queryvisible = !this.queryvisible;
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload();
    },
    btntoexcel: function () {
      e.exportXlsx(this.tabledata.rows);
    },
    btnprint: function () { }
  }
};
</script>
<style>
.pagecontent {
  margin-top: 100px !important;
}
</style>