<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <!-- <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>-->
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <el-button @click="doApply()" size="mini" type="primary" v-show="btnpower('btndelete')">审核</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="doApply" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :disabled="true" title="银行卡号" v-model="mm.card_num"></cinput>
        <cinput :disabled="true" title="银行名称" v-model="mm.bank_name"></cinput>
        <cinput :disabled="true" title="姓名" v-model="mm.user_name"></cinput>
        <cinput :disabled="true" title="手机号码" v-model="mm.phone"></cinput>
      </div>
      <div style="margin-top:20px;">
        <span style="font-size: 13px;color: #48576a;">身份证正面：</span>
        <img :src="mm.idcard_img_front" style="width: 200px; height: 200px">
        <span style="font-size: 13px;color: #48576a;">身份证反面：</span>
        <img :src="mm.idcard_img_back" style="width: 200px; height: 200px">
      </div>
      <div class="dialog-footer">
        <el-button @click="doSave(1)" size="mini" type="primary" v-if="mm.status === '' || mm.status === '0'">审核通过</el-button>
        <el-button @click="doSave(2)" size="mini" type="danger" v-if="mm.status === '' || mm.status === '0'">审核不通过</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import ums from "../../../api/ums";

export default {
 data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
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
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {};
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, member.getMemberFavorites, row);
    },
    doDelete() {
      u.deleteoperate(this, member.deleteMemberFavorites);
    },
    doExport() {
      u.queryExport(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave(status) {
      //保存
      this.mm.status = status
      u.doSave(this, ums.saveMemberBankCard);
    },
    doApply(row) {
      this.winvisible = true
      let that = this
      u.openeditmodel(this, ums.getMemberBankCard, row).then(res => {
        console.log(that.mm)
      })

    }
  }
}
</script>
<style></style>


