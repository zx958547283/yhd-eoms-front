<template>
  <div class="pagecontent">
    <el-container>
      <el-aside width="280px">
        <el-tree :data="menudata" @node-click="btnquery" class="menulist" highlight-current node-key="pk"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnquery()" size="mini" type="primary">查询</el-button>
            <el-button @click="btnadd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="btnedit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="btndelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad(pagenum)" size="mini" type="primary">刷新</el-button>
            <el-button @click="btntoexcel()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
          <div style="display:inline-block">
            <cselect :length="1" querypk="343f3d8f-eb60-42ea-88df-a9680128fc70" style="display:inline-block;margin-left:50px" title="从这儿" v-model="frompk"></cselect>
            <el-button @click="btncopy()" size="mini" sytle="width:50px;height:30px" type="primary">复制</el-button>
          </div>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="btnedit" @selection-change="btnselect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <!-- <cinput title="查询模板" v-model="mm.pk_QueryQuery"></cinput> -->
        <cnumber title="序号" v-model="mm.row_no"></cnumber>
        <cinput title="名称" v-model="mm.name"></cinput>
        <cinput :length="2" title="字段" v-model="mm.field"></cinput>
        <cinput :length="2" title="默认值" v-model="mm.value"></cinput>
        <cselect pk="Logic" title="逻辑" v-model="mm.logic"></cselect>
        <cselect pk="9d0f6e7d-9579-4b4f-9551-31615d249951" title="参照" v-model="mm.consult"></cselect>
        <cselect pk="Condition" title="条件" v-model="mm.condition"></cselect>
        <cselect pk="YN" title="必输" v-model="mm.Need"></cselect>
        <cselect pk="LeftParenthesis" title="左括号" v-model="mm.left_parenthesis"></cselect>
        <cselect pk="RightParenthesis" title="右括号" v-model="mm.right_parenthesis"></cselect>
        <cselect pk="YN" title="参数" v-model="mm.parm"></cselect>
        <cselect pk="YN" title="固定" v-model="mm.fix"></cselect>
        <cselect pk="YN" title="快捷查询" v-model="mm.isQuick"></cselect>
        <ccorp title="组织" v-model="mm.company_id"></ccorp>
        <!-- <cinput :length="2" title="备注" v-model="mm.memo"></cinput> -->
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="btnsave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>

<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import request from "../../../utils/request";
export default {
  data() {
    return {
      params: [],
      tabledata: {},
      loading: false,
      selectrows: [],
      pagenum: 1,
      queryvalue: "",
      querylist: [],
      mm: [],
      fpk: "",
      winvisible: false,
      wintitle: "",
      menudata: [],
      frompk: ""
    };
  },
  created: function () { },
  mounted: function () {
    this.params = u.getpageparmas(this);
    // this.btnquery();
    // u.querydata(this, "sys/queryTreeList", null, "menudata");
    request.post("sys/queryTreeList").then(res => {
      this.menudata = res;
    });
  },
  computed: {},
  methods: {
    btnselect: function (rows) {
      this.selectrows = rows;
    },
    dataLoad: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    btnquery: function (data) {
      this.querylist = [];
      if (u.isnullorwhitespace(data)) {
        u.addwherelike(this, "sys_query_where.Name", this.queryvalue);
      }
      if (!u.isnullorwhitespace(data)) {
        this.fpk = data.pk;
        this.winvisible = false;
        if (this.fpk === "1") {
          request.post("sys/queryTreeList").then(res => {
            this.menudata = res;
          });
        }
      }
      u.addwhere(this, "sys_query_where.query_template_id", this.fpk);
      this.dataLoad(1);
    },
    btnadd: function () {
      u.openaddmodel(this);
      this.mm.query_template_id = this.fpk;
      this.mm.company_id = "1";
      this.mm.logic = "and";
      this.mm.condition = "=";
      this.mm.consult = "49c51c9b-7e5f-42fa-a9ef-3e137dacfca2";
      this.mm.fix = "N";
      this.mm.fix = "N";
      this.mm.need = "N";
      this.mm.parm = "N";
    },
    btnedit: function (row) {
      u.openeditmodel(this, sys.getQueryWhere, row);
    },
    btnsave: function (row) {
      // u.saveoperate(this, "QueryList");
      u.doSave(this, sys.saveQueryWhere);
    },
    btndelete: function () {
      // u.deleteOperate(this, "QueryList");
      u.deleteoperate(this, sys.deleteQueryWhere);
    },
    btncopy: function () {
      let that = this;
      request.post("sys/copyQueryWhereA2B", {
        frompk: that.frompk,
        topk: that.fpk
      }).then(function (r) {
        u.messageSuccess(that);
        that.dataLoad(1);
      });
    },
    btntoexcel: function () {
      e.exportXlsx(this.tabledata.rows);
    }
  }
};
</script>

<style>
.pagecontent{
  margin-top:100px;
}
</style>
