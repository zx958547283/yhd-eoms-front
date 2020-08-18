<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="赛季名称" v-model="mm.qualifying_name"></cinput>
        <cinput title="赛季说明" v-model="mm.qualifying_desc"></cinput>
        <cnumber title="大奖赛奖金数额" v-model="mm.reward"></cnumber>
        <cnumber title="单次获胜奖励" v-model="mm.rewardOnce"></cnumber>
        <cnumber title="可游戏次数" v-model="mm.maxGameTime"></cnumber>
        <cnumber title="可参与人数" v-model="mm.maxJoinPlayer"></cnumber>
        <cinput title="赛季题目类型" v-model="mm.questionTypes"></cinput>
        <div class="datepick">
          <span style="color: red;">*</span>
          <span class="datepick_txt">赛季日期</span>
          <el-date-picker end-placeholder="结束日期" format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="开始日期" type="datetimerange" v-model="timeValue" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </div>
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
      selectrows: [],                    //表格选中的对象
      wintitle: "自定义项编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      timeValue: []
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist)
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          u.addwheres(this, "and", "(", "gms_qualifying_reward.qualifying_name", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "gms_qualifying_reward.qualifying_desc", "like", this.queryvalue, ")");
        }
      } else {
        this.querylist = querylist;
        console.log(querylist)
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
      this.timeValue = [];
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, gms.getQualifyingReward, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteQualifyingReward);
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
      console.log(this.timeValue)
      if (this.mm.qualifying_name === undefined || this.mm.qualifying_name === null || this.mm.qualifying_name === '') {
        this.$message.error('赛季名称不能为空！');
        return;
      }
      if (this.timeValue === null || this.timeValue.length === 0) {
        this.$message.error('请设置赛季时间段！');
        return;
      }
      this.mm.start_time = this.timeValue[0];
      this.mm.end_time = this.timeValue[1];
      u.doSave(this, gms.saveQualifyingReward);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.datepick {
  float: left;
  margin-top: 5px;
  .datepick_txt {
    font-size: 13px;
    display: inline-block;
    color: #48576a;
    width: 75px;
    height: 28px;
    line-height: 28px;
  }
}
</style>


