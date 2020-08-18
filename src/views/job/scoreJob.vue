<template>
  <div class="pagecontent">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-button-group>
      <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
      <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
      <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
      <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>

    <cwindow :length="2" :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="任务名称" v-model="mm.job_name"></cinput>
        <cinput title="任务CODE " v-model="mm.job_code"></cinput>
        <csuploadWithPath :dataObj="updatePath" :length="2" :required="true" title="任务图标" v-model="mm.job_icon"></csuploadWithPath>
        <cinput :length="2" title="任务简介" v-model="mm.introduce"></cinput>
        <cnumber :required="true" title="可得积分" v-model="mm.score"></cnumber>
        <cinput :length="2" title="页面地址" v-model="mm.redirect_url"></cinput>
        <cnumber title="每日最大次数" v-model="mm.max_cnt"></cnumber>
        <cnumber title="排序" v-model="mm.sort"></cnumber>
        <cradio :itemlists="statusList" :length="2" :required="true" title="是否有效" v-model="mm.status"></cradio>
        <div class="datepick">
          <span class="datepick_txt">日期选择</span>
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
import u from "../../utils/utility";
import sys from "../../api/sys";
import job from "../../api/job";
import e from "../../utils/excel";
import request from "../../utils/request";
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
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      },
      timeValue: [],
      statusList: [
        {
          label: '0',
          txt: '无效'
        },
        {
          label: '1',
          txt: '有效'
        }
      ]
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    this.btndataload(1);
    this.getFieldLists();
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
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
      this.mm.status = '-1'
      this.winvisible = true;
      this.timeValue = [];
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, job.getScoreJob, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, job.deleteScoreJob);
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
      if (this.timeValue !== null && this.timeValue.length !== 0) {
        this.mm.start_time = this.timeValue[0];
        this.mm.end_time = this.timeValue[1];
      }
      u.doSave(this, job.saveScoreJob);
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
    },
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    getFieldLists(data) {
      let that = this;
      request.post("sys/QueryLists", {
        pk: this.params[0]
      }).then(resquery => {
        resquery.forEach(function (val) {
          that.fieldlists.push({
            Field: val.Field,
            Name: val.Name,
            Consult: val.Consult,
            Value: ''
          });
        });
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.datepick {
  float: left;
  margin-top: 20px;
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


