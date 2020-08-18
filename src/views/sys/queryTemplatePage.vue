<template>
  <div class="pagecontent">
    <el-button-group>
      <el-button @click="btnqueryshow()" size="mini" type="primary">查询</el-button>
      <el-button @click="btntoexcel()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <!-- <cqueryfix :pk="params[0]" @query="btnquery"></cqueryfix> -->
    <ctable :data="tabledata" :loading="loading" :pagenum="0" :selection="false" @row-dblclick="btnedit"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="true" @query="btnquery" v-model="queryvisible"></cquery>
  </div>
</template>

<script>
import u from "../../utils/utility";
import excel from "../../utils/excel";
export default {
  data() {
    return {
      params: [],
      tabledata: {},
      loading: false,
      pagenum: 0,
      querylist: [],
      queryvisible: false
    };
  },
  mounted: function () {
    this.params = u.getpageparmas(this);
  },
  methods: {
    btndataload: function (num) {
      u.querywhere(this, this.params[0], this.querylist, 0, 0, "tabledata");
    },
    btnqueryshow: function () {
      this.queryvisible = !this.queryvisible;
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload();
    },
    btnedit: function (row) {
      // if (!this.btnshow("btnedit")) {
      //   return;
      // }
      // if (this.params.length === 3) {
      //   row = u.dtSelectValue(this, row);
      //   if (!u.isNullOrWhiteSpace(row)) {
      //     u.addNewTab(this, this.params[1], row.pk);
      //   }
      // }
    },
    btntoexcel: function () {
      excel.exportxlsx(this.tabledata.rows);
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