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
                                                              <cinput :required="true" title="公司外键" v-model="mm.company_id"></cinput>
                                                                              <cinput title="部门外键" v-model="mm.depart_id"></cinput>
                                                                              <cinput title="是否官方圈子，Y:是  N:不是" v-model="mm.is_official"></cinput>
                                                                              <cinput title="是否首页显示，Y:是  N:不是" v-model="mm.is_show_home"></cinput>
                                                                              <cinput title="类型" v-model="mm.category_id"></cinput>
                                                                              <cnumber title="媒体类型，0:图文 1:音频 2:视频  个人圈子内容默认文字" v-model="mm.media_type"></cnumber>
                                                                              <cinput title="标题" v-model="mm.title"></cinput>
                                                                                                              <span class="datepick_txt">日期</span><el-date-picker v-model="mm.content_time" type="date" placeholder="选择日期"></el-date-picker>
                                                                              <cinput title="媒体路径,视频，音频类型时必须上传" v-model="mm.media_path"></cinput>
                                                                              <cinput title="封面图,视频，音频类型时必须上传" v-model="mm.cover_path"></cinput>
                                                                              <cinput title="发布人" v-model="mm.publish_user_id"></cinput>
                                                                              <cinput title="发布人姓名" v-model="mm.publish_user_name"></cinput>
                                                                              <cnumber title="发布人类型，0:职员  1:客户" v-model="mm.publish_type"></cnumber>
                                                                              <span class="datepick_txt">发布时间</span><el-date-picker v-model="mm.publish_time" type="date" placeholder="选择日期"></el-date-picker>
                                                                              <cinput title="位置" v-model="mm.publish_location"></cinput>
                                                                              <cinput title="连接地址" v-model="mm.url"></cinput>
                                                                              <cnumber title="排序" v-model="mm.sort_pos"></cnumber>
                                                                              <cnumber title="阅读量" v-model="mm.read_count"></cnumber>
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
import cont from "../../../api/cont";
import e from "../../../utils/excel";

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
          u.addwheres(this, "and", "(", "gms_qualifying.qualifying_name", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "gms_qualifying.qualifying_desc", "like", this.queryvalue, ")");
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
      u.openeditmodel(this, cont.getContent, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteContent);
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
            u.doSave(this, cont.saveContent);
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


