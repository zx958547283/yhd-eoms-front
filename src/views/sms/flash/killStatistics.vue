<template>
  <div class="pagecontent">
    <el-button-group>
      <el-button @click="btnqueryshow()" size="mini" type="primary">查询</el-button>
      <el-button @click="btntoexcel()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <cqueryfix :pk="params[0]" @query="btnquery"></cqueryfix>
    <ctable :data="tabledata" :loading="loading" :pagenum="pagenum" :selection="false" @pagechange="btndataload" @row-dblclick="btnedit"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="true" @query="btnquery" v-model="queryvisible"></cquery>
  </div>
</template>

<script>
import u from "../../../utils/utility";
import e from "../../../utils/excel";
export default {
  data() {
    return {
      params: [],
      tabledata: {},
      loading: false,
      pagenum: 1,
      querylist: [],
      queryvisible: false
    };
  },
  mounted: function () {
    this.params = u.getpageparmas(this);
  },
  methods: {
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    btnqueryshow: function () {
      this.queryvisible = !this.queryvisible;
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
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
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
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
