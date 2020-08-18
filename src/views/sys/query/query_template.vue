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
            <el-button @click="showCopy()" size="mini" type="primary" v-show="btnpower('showCopy')">复增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('doExport')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称、表名" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput title="编码" v-model="mm.code"></cinput>
        <cinput title="名称" v-model="mm.name"></cinput>
        <cselect pk="81e070bf-d0a1-4033-adb2-1204ef9b7b4e" title="分类" v-model="mm.category_id"></cselect>
        <ctextarea :length="3" title="字段" v-model="mm.query_field"></ctextarea>
        <ctextarea :length="3" title="表" v-model="mm.query_table"></ctextarea>
        <ctextarea :length="3" title="条件" v-model="mm.query_where"></ctextarea>
        <cinput title="结束" v-model="mm.query_end"></cinput>
        <cinput title="主键名称" v-model="mm.pk_name"></cinput>
        <cselect pk="YN" title="distinct" v-model="mm.is_distinct"></cselect>
        <cinput title="连接池" v-model="mm.connection"></cinput>
        <cinput title="表交叉" v-model="mm.cross_factor"></cinput>
        <cinput title="详情SQL" v-model="mm.detail_sql"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "查询模板编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      menudata: []
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    sys.getDefListTree("81e070bf-d0a1-4033-adb2-1204ef9b7b4e").then(res => {
      this.menudata = res;
      // this.doQuery();
    });
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        this.fpk = treeNode.pk;
        this.winvisible = false; // 切换树节点关闭弹出窗口，防止误操作
        u.addwhere(this, "sys_query_template.category_id", treeNode.pk, "querylist");
      }
      else {
        u.addwheres(this, "and", "(", "sys_query_template.code", "like", this.queryvalue, "");
        u.addwheres(this, "or", "", "sys_query_template.name", "like", this.queryvalue, "");
        u.addwheres(this, "or", "", "sys_query_template.query_template_id", "=", this.queryvalue, "");
        u.addwheres(this, "or", "", "sys_query_template.query_table", "like", this.queryvalue, ")");
      }
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {
        is_distinct: 'N'
      };
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, sys.getQueryTemplate, row);
    },
    showCopy(row) {
      let that = this;
      if (!that.btnpower("showEdit")) {
        return;
      }
      row = u.dtselectvalue(that, row);
      if (!u.isnullorwhitespace(row)) {
        sys.getQueryTemplate.then(function (r) {
          that["winvisible"] = true;
          that["wintitle"] = "查询模板复增";
          that.mm = r;
          that.mm.query_template_id = "";
          that.mm.create_time = "";
        });
      }
    },
    doDelete() {
      u.deleteoperate(this, sys.deleteQueryTemplate);
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
      console.log(this.mm);
      u.doSave(this, sys.saveQueryTemplate);
    }

  }
}
</script>
<style></style>


