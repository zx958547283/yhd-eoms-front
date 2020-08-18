<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="资源标题" v-model="queryvalue"></cinputquery>
        </el-header>
        <!-- <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery> -->
        <el-main>
          <ctable :actions="actions" @updateStats="updateStats" :data="tabledata" :pagenum="pagenum"
                  @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" style="top:80px;left:370px" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="基础信息" name="base">
            <cinput :required="true" title="资源标题" placeholder="请输入资源标题" v-model="mm.title"></cinput>
            <cselect :required="true" querypk="c7385ac5-5a25-45b2-bae6-717cf94994fb" title="资源类别"
                     v-model="mm.fk_defList"></cselect>
            <!-- <cselect :required="true" pk="YN" title="是否官方" v-model="mm.is_official"></cselect> -->
            <cselect :required="true" pk="YN" title="首页显示" v-model="mm.is_show_home"></cselect>
            <cselect :required="true" pk="can" title="是否发布" v-model="mm.is_publish"></cselect>
            <!-- <ccontentCat title="分类" v-model="mm.category_id"></ccontentCat> -->
            <!-- <cnumber :required="true" title="排序" v-model="mm.sort_pos"></cnumber> -->
            <cselect pk="mediaType" title="媒体类型" v-model="mm.media_type"></cselect>

            <cnumber title="排列顺序" placeholder="越小越靠前" v-model="mm.sort_pos"></cnumber>


            <ctags title="内容标签" style="width: 500px" v-model="mm.tags" placeholder="请输入标签" :length="0.8"
                   @tags="setTags"></ctags>
            <ctextarea :required="true" title="内容简介" v-model="mm.content_desc" placeholder="请输入内容简介"
                       :length="2"></ctextarea>

            <csupload :length="3" fileType="media" title="影音文件" v-model="mm.media_path"
                      v-show="mm.media_type == '1' || mm.media_type == '2'"></csupload>
            <csupload :length="2" title="影音封面" v-model="mm.media_cover_path" v-show="mm.media_type == '2'"></csupload>
            <csupload :length="2" title="列表封面" v-model="mm.cover_path"></csupload>
          </el-tab-pane>
          <el-tab-pane label="内容" name="second">

            <cselect pk="can" title="是否是链接" v-model="mm.is_link"></cselect>

            <cinput v-if="mm.is_link === '1'"  :required="true" title="链接地址" :length = "2" placeholder="请输入链接地址" v-model="mm.url"></cinput>


            <div style="padding-top: 50px">
              <tinymce v-if="mm.is_link === '0'" :height="300" :toolbar="toolbar" :width="825" v-model="mm.content"></tinymce>

            </div>


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
  import u from "../../../utils/utility";
  import cont from "../../../api/cont";
  import e from "../../../utils/excel";
  import Tinymce from '@/components/Tinymce'
  import gms from "../../../api/gms";

  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
          `fullscreen insertdatetime media table forecolor backcolor`
        ],
        detailHtml: '',
        selectrows: [], //表格选中的对象
        wintitle: "编辑", //编辑窗口标题
        winvisible: false, //编辑窗口是否显示
        queryvisible: false, //查询弹出窗
        mm: {}, //编辑对象
        tabledata: {}, //表格数据
        params: [], //页面参数
        pagenum: 1, //当前页
        queryvalue: "", //查询条件值
        querylist: [], //查询条件模板
        inType: 'base',
        actions: [
          {
            action: "updateStats",
            name: "发布"
          }
        ],
      }
    },
    mounted() {
      this.params = u.getpageparmas(this);
      //初始化查询，默认第一页
      this.dataLoad(1);

    },
    filters: {},
    methods: {
      btnqueryShow: function () {
        this.queryvisible = !this.queryvisible;
      },
      doQuery(querylist) {

        this.querylist = [];

        u.addwherelike(this, "cc.title", this.queryvalue);

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

        if (this.verifyContent()) {
          //保存
          u.doSave(this, cont.saveContent);
        }

      },
      verifyContent() {
        if (u.isnullorwhitespace(this.mm.title)) {
          this.$message.error("请输入资源标题");
          return false;
        } else if (u.isnullorwhitespace(this.mm.fk_defList)) {
          this.$message.error("请选择资源类别");
          return false;
        } else {
          return true;
        }
      },
      setTags(newTags) {
        this.mm.tags = newTags.toString()
      },
      updateStats(row) {
        if (row.exc_key === "1") {
          this.$message.error("内容已发布！");
        } else {

          if (row.pk) {
            cont.publishContent(row.pk).then(res => {
              if (res) {
                this.$message.success("发布成功！");
                this.dataLoad(this.pagenum);
              } else {
                this.$message.error("发布失败，请联系管理员！");
              }

            })
          }

        }

      },
    }
  }
</script>

<style></style>
