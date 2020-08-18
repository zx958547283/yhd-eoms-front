<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button
              @click="showEdit()"
              size="mini"
              type="primary"
              v-show="btnpower('btnedit')"
            >编辑</el-button>
            <el-button
              @click="doDelete()"
              size="mini"
              type="primary"
              v-show="btnpower('btndelete')"
            >删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button
              @click="doExport()"
              size="mini"
              type="primary"
              v-show="btnpower('btntoexcel')"
            >导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery
          :exp="btnpower('btntoexcel')"
          :pk="params[0]"
          @query="doQuery"
          v-model="queryvisible"
        ></cquery>
        <el-main>
          <ctable
            :data="tabledata"
            :pagenum="pagenum"
            @pagechange="dataLoad"
            @row-dblclick="showEdit"
            @selection-change="tableSelect"
          ></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cselect title="赠送日期" :custOptions="giftDate" v-model="mm.gift_day_num"></cselect>
        <cselect title="赠送道具" :custOptions="gameTools" v-model="mm.tool_guid"></cselect>
        <cinput :length="2" title="赠送数量" v-model="mm.tool_num"></cinput>
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
import gms from "../../../api/gms";
import e from "../../../utils/excel";

export default {
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
      giftDate: [
        { text: "星期一", value: "1" },
        { text: "星期二", value: "2" },
        { text: "星期三", value: "3" },
        { text: "星期四", value: "4" },
        { text: "星期五", value: "5" },
        { text: "星期六", value: "6" },
        { text: "星期日", value: "7" }
      ],
      gameTools: []
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    gms.listAllGameTool().then(res => {
      this.gameTools = res.map(x => {
        return { text: x.tool_name, value: x.id };
      });
    });
    //初始化查询，默认第一页
  },
  filters: {},
  methods: {
    btnqueryShow: function() {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist);
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
        }
      } else {
        this.querylist = querylist;
        console.log(querylist);
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
      this.mm = {};
      this.mm.fix = "N";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, gms.getDayGift, row);
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteDayGift);
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
      u.doSave(this, gms.saveDayGift);
    }
  }
};
</script>
<style></style>


