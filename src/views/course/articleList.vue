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
    <cwindow :length="3" :title="wintitle" style="top:80px;left:370px" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="基础信息" name="base">
            <cinput :required="true" title="标题" v-model="mm.title"></cinput>
            <cselect :required="true" querypk="ea1fcaea-94fc-4d22-8451-3d9cbc40a414" title="课程类型" v-model="mm.category_id"></cselect>
            <!-- <cselect :required="true" pk="YN" title="是否官方" v-model="mm.is_official"></cselect>
            <cselect :required="true" pk="YN" title="首页显示" v-model="mm.is_show_home"></cselect>-->
            <!-- <ccontentCat title="分类" v-model="mm.category_id"></ccontentCat> -->
            <!-- <cnumber :required="true" title="排序" v-model="mm.sort_pos"></cnumber> -->
            <!-- <cselect pk="mediaType" title="媒体类型" v-model="mm.media_type"></cselect> -->
            <!-- <csupload :length="2" fileType="media" title="媒体文件" v-model="mm.media_path" v-show="mm.media_type == '1' || mm.media_type == '2'"></csupload> -->
            <csupload :length="2" title="媒体封面" v-model="mm.cover_path"></csupload>
          </el-tab-pane>
          <el-tab-pane label="内容" name="second">
            <tinymce :height="300" :toolbar="toolbar" :width="825" v-model="mm.content"></tinymce>
          </el-tab-pane>
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
import cont from "../../api/cont";
import e from "../../utils/excel";
import Tinymce from '@/components/Tinymce'

export default {
  components: { Tinymce },
  data() {
    return {
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
      detailHtml: '',
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      inType: 'base'
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          if (u.isnum(this.queryvalue)) {
            // u.addWheres(this, "and", "(", "Customer.Mobile", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Tel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.OtherTel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.CardNo", "like", this.queryvalue, ")");
          }
          else {
            // u.addWheres(this, "and", "(", "Customer.Name", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Address", "like", this.queryvalue, ")");
          }
        }
      } else {
        // console.log("ddddddddddd")
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
      this.mm = {
        is_official: 'N',
        is_show_home: 'N',
        media_type: '0',
        content: ''
      };
      this.inType = "base";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      this.inType = "base";
      u.openeditmodel(this, cont.getContent, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteContent);
    },
    doExport() {
      u.queryExport(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      //保存
      u.doSave(this, cont.saveContent);
    }
  }
}
</script>
<style></style>


