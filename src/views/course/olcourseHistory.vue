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
    <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>
        
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
                                                              <cinput :required="true" title="会员id" v-model="mm.member_id"></cinput>
                                                                                                              <cnumber :required="true" title="连续学习天数" v-model="mm.continue_cnt"></cnumber>
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
import course from "../../api/course";
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
      }
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
      this.winvisible = true;
      this.timeValue = [];
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, course.getOlcourseHistory, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, course.deleteOlcourseHistory);
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
            u.doSave(this, course.saveOlcourseHistory);
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


