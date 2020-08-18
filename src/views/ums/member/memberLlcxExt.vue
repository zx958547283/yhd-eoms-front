<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <!-- <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button> -->
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">查看</el-button>
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
    <cwindow :title="wintitle" style="top:10%; height:800px; overflow: auto;" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :length="2" title="合唱团名称" v-model="mm.chorus_name"></cinput>
        <cnumber title="成员数量" v-model="mm.member_cnt"></cnumber>
        <cnumber title="最大年龄" v-model="mm.max_age"></cnumber>
        <cnumber title="最小年龄" v-model="mm.min_age"></cnumber>
        <cnumber title="平均年龄" v-model="mm.eval_age"></cnumber>
        <cinput title="报名人名" v-model="mm.enroll_name"></cinput>
        <cinput title="报名人手机" v-model="mm.enroll_phone"></cinput>
        <cselectForLabel :length="2" :readonly="true" pk="e2fc0387-476c-46a1-9bd3-d304c3835426" title="报名区域" v-model="mm.match_area"></cselectForLabel>
        <ctextarea :length="2" title="组建历史" v-model="mm.team_history"></ctextarea>
        <ctextarea :length="2" title="特长" v-model="mm.strong_point"></ctextarea>
        <ctextarea :length="2" title="荣誉" v-model="mm.honour"></ctextarea>
        <cimage :images="images" :srcList="images" title="报名图片"></cimage>
        <cvideo :src="vedio[0].file_path" title="报名视频" v-if="vedio !== null && vedio.length !== 0"></cvideo>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible = false" size="mini">取消</el-button>
        <!-- <el-button @click="doSave" size="mini" type="primary">提交</el-button> -->
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import ums from "../../../api/ums";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [], //表格选中的对象
      wintitle: "编辑", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      mm: {}, //编辑对象
      tabledata: {}, //表格数据
      params: [], //页面参数
      pagenum: 1, //当前页
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false, //查询弹出窗
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      },
      images: [],
      vedio: []
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
  },
  filters: {},
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist);
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          // u.messagenotify(this, "请输入查询内容");
          // return;
          this.querylist = [];
        } else {
          this.querylist = [];
          u.addwheres(
            this,
            "and",
            "(",
            "chorus_name",
            "like",
            this.queryvalue,
            ""
          );
          u.addwheres(
            this,
            "or",
            "",
            "enroll_name",
            "like",
            this.queryvalue,
            ")"
          );
        }
      } else {
        this.querylist = querylist;
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
      u.openeditmodel(this, ums.getMemberLlcxExtDetail, row).then(res => {
        console.log(res);
        that.mm = res.member;
        that.images = res.images;
        that.vedio = res.redios;
      });
    },
    doDelete() {
      u.deleteoperate(this, ums.deleteMemberLlcxExt);
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
      u.doSave(this, ums.saveMemberLlcxExt);
    }
  }
};
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
