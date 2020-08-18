<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="doLogout()" size="mini" type="primary">解除登录</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
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
      wintitle: "自定义项编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: []           //查询条件模板
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      //查询条件
      u.addwheres(this, "and", "(", "ums_admin.username", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "ums_admin.nick_name", "like", this.queryvalue, ")");
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      sys.getActiveUserList({
        pagenum: this.pagenum,
        pagesize: u.querypagesize(),
        keyword: this.queryvalue
      }).then(res => {
        this.tabledata = res;
      }).catch(err => {

      });
    },
    doLogout() {
      if (this.selectrows.length !== 1) {
        this.messagenotify(that, "请选择单行");
        return;
      }

      sys.removeLoginUser({ token: this.selectrows[0].token }).then(res => {
        this.dataLoad();
        this.$message.success("解除成功，该用户即将下线。");
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    }
  }
}
</script>
<style></style>


