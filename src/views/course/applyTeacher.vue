<template>
  <div class="pagecontent">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-button-group>
      <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">审核</el-button>
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
      <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>

    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="会员id" v-model="mm.member_id"></cinput>
        <cinput :required="true" title="姓名" v-model="mm.name"></cinput>
        <cinput title="家庭住址" v-model="mm.address"></cinput>
        <cinput :required="true" title="联系电话" v-model="mm.phone"></cinput>
        <cinput :required="true" title="代课经历" v-model="mm.experience"></cinput>
        <cdate :required="true" title="申请时间" v-model="mm.apply_time"></cdate>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave('1')" size="mini" type="primary" v-if="mm.apply_status === '2'">审核通过</el-button>
        <el-button @click="doSave('2')" size="mini" type="danger" v-if="mm.apply_status === '1'">审核不通过</el-button>
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
      u.openeditmodel(this, course.getApplyTeacher, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, course.deleteApplyTeacher);
    },
    doExport() {
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave(status) {
      let that = this
      if ('1' === status) {
        this.mm.apply_status = '1'
        u.doSave(this, course.saveApplyTeacher);
      } else {
        this.$prompt('请填写审核不通过原因', '填写原因', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[a-zA-Z0-9_\u4e00-\u9fa5]+/,
          inputErrorMessage: '请填写原因'
        }).then(({ value }) => {

          that.mm.apply_status = '2'
          that.mm.reason = value
          u.doSave(that, course.saveApplyTeacher);


        }).catch(() => {

        });
      }
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
    },
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    checkReason(val) {
      console.log('=========================')
      console.log(val)
      if (null === val || '' === val || undefined === val) {
        return false
      } else {
        return true
      }
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


