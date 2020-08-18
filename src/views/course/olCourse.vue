<template>
  <div class="app-container">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-button-group>
      <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
      <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
      <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
      <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
      <el-button @click="setCourseClass()" size="mini" type="primary">设置课程对应课时</el-button>
      <el-button @click="setTopCourse()" size="mini" type="primary">设置首页置顶</el-button>
    </el-button-group>

    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>

    <cwindow :length="3" :title="wintitle" style="height:500px; overflow: auto;" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="基础信息" name="base">
            <cinput :length="1.5" :required="true" title="课程名称" v-model="mm.name"></cinput>
            <cinput :length="1.5" title="课程老师" v-model="mm.teacher_name"></cinput>
            <cselect :required="true" title="排序方式" :custOptions="sort_types" v-model="mm.sort_type"></cselect>
            <cselect title="视频分类" v-model="mm.course_classify" pk="504b0e79-09fc-424d-b7e9-96bb6df7bce2"></cselect>
            <cinput :length="3" :required="true" title="课程简介" v-model="mm.introduce"></cinput>
            <csuploadWithPath :dataObj="updatePath" :length="3" :required="true" title="封面图片" v-model="mm.cover_path"></csuploadWithPath>
            <csuploadWithPath :dataObj="updatePath" :length="3" title="分享展示图" v-model="mm.share_img_path"></csuploadWithPath>
            <cradio :itemlists="pay_type" :length="3" :required="true" title="收费类型" v-model="mm.course_type" v-on:radioChange="radioChange"></cradio>
            <cnumber :length="1.5" title="非会员价格" v-model="mm.course_total_amount"></cnumber>
            <cselect :required="true" title="课程来源" :custOptions="source" v-model="mm.source"></cselect>
          </el-tab-pane>
          <el-tab-pane label="内容" name="second">
            <tinymce :height="300" :toolbar="toolbar" :width="825" v-model="mm.content"></tinymce>
          </el-tab-pane>
          <!-- <el-tab-pane label="课时详细" name="third"></el-tab-pane> -->
        </el-tabs>
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
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
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
      inType: 'base',
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
      pay_type: [
        {
          label: '0',
          txt: '免费'
        },
        {
          label: '1',
          txt: '收费'
        },
        {
          label: '2',
          txt: '会员课程'
        }
      ],
      source: [
        {text: "前贝", value :"0"},
        {text: "网络", value :"1"}
      ],
      sort_types: [
        {text: "正序", value :"0"},
        {text: "降序", value :"1"}
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
      this.winvisible = true;
      this.timeValue = [];
      this.mm.course_type = '-1'
    },
    showEdit(row) {
      this.mm.content = ''
      let that = this;
      u.openeditmodel(this, course.getOlCourse, row).then(res => {
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, course.deleteOlCourse);
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
      if (this.mm.name === undefined || null === this.mm.name) {
        this.$message.error("请填写课程名称！");
        return;
      }
      if (this.mm.introduce === undefined || null === this.mm.introduce) {
        this.$message.error("请填写课程简介！");
        return;
      }
      console.log(this.mm)
      u.doSave(this, course.saveOlCourse);
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
    },
    setCourseClass() {
      u.addtagview(this, this.selectrows[0].课程名称, "olCourseClass", '55826479-6193-49db-bb2a-fe7ac5fbcc30' + ',' + this.selectrows[0].pk);
    },
    radioChange(val) {
      console.log('22222222222222222222222=======' + this.mm.course_type)
    },
    setTopCourse() {
      let courseId = this.selectrows[0].pk
      let that = this
      course.saveHomeTopCourse(courseId).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success'
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


