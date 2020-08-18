<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="menudata" @node-click="doQuery" class="menulist" highlight-current node-key="pk"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('showAdd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button>
            <el-button @click="dataLoad(pagenum)" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('doExport')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cselect pk="ac89b801-5148-4318-8796-3aac029aa9d8" title="节点" v-model="mm.node_id"></cselect>
        <ccorp title="组织" v-model="mm.company_id"></ccorp>
        <cinput title="编码" v-model="mm.code"></cinput>
        <cinput title="名称" v-model="mm.name"></cinput>
        <cselect pk="YN" title="菜单" v-model="mm.ismenu"></cselect>
        <cselect pk="YN" title="封存" v-model="mm.seal"></cselect>
        <cinput :length="2" title="路径" v-model="mm.uri"></cinput>
        <cinput title="Icon" v-model="mm.icon"></cinput>
        <cinput :length="2" title="参数" v-model="mm.parameter"></cinput>
        <cinput :length="2" title="备注" v-model="mm.memo"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>

<script>
import u from "../../utils/utility";
import e from "../../utils/excel";
import sys from "../../api/sys";
import ums from "../../api/ums";
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
      mm: {},
      fpk: "",
      winvisible: false,
      wintitle: "",
      menudata: []
    };
  },
  created: function () { },
  mounted: function () {
    this.params = u.getpageparmas(this);
    sys.getDefListTree("ac89b801-5148-4318-8796-3aac029aa9d8").then(res => {
      this.menudata = res;
      // this.doQuery();
    });
  },
  computed: {},
  methods: {
    dataLoad: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        this.fpk = treeNode.pk;
        this.winvisible = false; // 切换树节点关闭弹出窗口，防止误操作
        u.addwhere(this, "ums_permission.node_id", treeNode.pk, "querylist");
      }
      else {
        console.log(this.queryvalue)
        u.addwheres(this, "and", "(", "ums_permission.code", "like", this.queryvalue, "");
        u.addwheres(this, "or", "", "ums_permission.name", "like", this.queryvalue, ")");
      }
      //查询条件
      this.dataLoad(1);
    },
    showAdd: function () {
      u.openaddmodel(this);
      this.mm.node_id = this.fpk;
      this.mm.ismenu = "Y";
      this.mm.seal = "N";
      // this.mm.IsAlarm = "N";
      // this.mm.pk_Corp = u.getuser().pk_Corp;
    },
    showEdit(row) {
      u.openeditmodel(this, ums.getPermission, row);
    },
    doDelete() {
      u.deleteoperate(this, ums.delPermission);
    },
    doExport() {
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      console.log(this.mm)
      u.doSave(this, ums.savePermission);
    }
  }
};
</script>
