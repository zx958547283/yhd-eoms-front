<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" style="top:80px;left:370px;width:1100px;" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="基础设置" name="base">
            <cinput :length="1.5" :required="true" title="名称" v-model="mm.page_name"></cinput>
            <ccontentCat title="*页面所属" v-model="mm.category_id"></ccontentCat>
            <cinput :length="1.5" :required="true" title="URL" v-model="mm.page_url"></cinput>
          </el-tab-pane>
          <el-tab-pane label="文章选择" name="second">
            <el-button @click="addPageContents()" type="primary">新增</el-button>
            <el-button @click="deletePageContents()" type="danger">删除</el-button>

            <div style="margin-top:20px; font-size:15px; color: red;" v-if="multipleSelectionByContents.length !== 0">
              * 新选择
              <el-table :data="multipleSelectionByContents" border style="margin-top:5px;">
                <el-table-column align="center" type="selection" width="160"></el-table-column>
                <el-table-column align="center" label="名称">
                  <template slot-scope="scope1">{{scope1.row.title}}</template>
                </el-table-column>
                <el-table-column align="center" label="排序" width="200">
                  <el-input placeholder="请输入排序" slot-scope="scope1" v-model="scope1.row.sort_pos"></el-input>
                </el-table-column>
              </el-table>
            </div>
            <el-table :data="pageList" @selection-change="handleDialogSelectionChangeByPage" border style="margin-top:30px;">
              <el-table-column align="center" type="selection" width="160"></el-table-column>
              <el-table-column align="center" label="名称">
                <template slot-scope="scope">{{scope.row.title}}</template>
              </el-table-column>
              <el-table-column align="center" label="排序" width="200">
                <el-input placeholder="请输入排序" slot-scope="scope" v-model="scope.row.sort_pos"></el-input>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>

    <cwindow :length="3" style="top:80px;left:370px;width:1100px;height:800px;" title="选择文章" v-model="winvisibleByPageContents">
      <div class="page-controlstyle">
        <el-input placeholder="名称搜索" size="small" style="width: 250px;margin-bottom: 20px" v-model="dialogDataByPageContent.keyword">
          <el-button @click="searchAllContents()" icon="el-icon-search" slot="append"></el-button>
        </el-input>
        <el-tabs type="border-card" v-model="inType">
          <el-button @click="selectPageContents()" type="primary">选择</el-button>
          <el-table :data="contentList" @selection-change="handleDialogSelectionChangeByPageContents" border style="margin-top:20px;">
            <el-table-column align="center" type="selection" width="160"></el-table-column>
            <el-table-column align="center" label="名称">
              <template slot-scope="scope">{{scope.row.title}}</template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              :current-page.sync="dialogDataByPageContent.pageNum"
              :page-size="dialogDataByPageContent.pageSize"
              :page-sizes="[5,10,15]"
              :total="dialogDataByPageContent.total"
              @current-change="handleDialogCurrentChange"
              @size-change="handleDialogSizeChange"
              background
              layout="prev, pager, next"
            ></el-pagination>
          </div>
        </el-tabs>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import cont from "../../../api/cont";
import e from "../../../utils/excel";
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
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      inType: 'base',
      dialogDataByPage: {
        page: {},
        multipleSelection: []
      },
      pageList: [],
      dialogDataByPageContent: {
        keyword: '',
        pageId: '',
        pageNum: 1,
        pageSize: 5,
        total: null

      },
      multipleSelectionByContents: [],
      winvisibleByPageContents: false,
      contentList: [],

    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];

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

      };
      this.pageList = []
      this.inType = "base";
      this.winvisible = true;
    },
    showEdit(row) {
      this.multipleSelectionByContents = []
      let that = this;
      this.inType = "base";
      console.log(row)
      let id = row.pk;
      // u.openeditmodel(this, cont.getContent, row);

      cont.getContentDetailByPage({ "id": id }).then(res => {
        console.log(res)
        this.mm = res.page
        this.pageList = res.contentList
        this.winvisible = true
        this.dialogDataByPageContent.pageId = res.page.id
      });
    },
    doDelete() {
      // if (this.multipleSelectionByContents.lentgh !== 0) {
      //   this.$message({
      //     message: '请先提交新添加的数据后再做老数据的修改！',
      //     type: 'warning',
      //     duration: 1000
      //   });
      //   return;
      // }
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
      let that = this
      console.log(this.mm.newPageContents)
      this.mm.newPageContents = JSON.stringify(this.multipleSelectionByContents)
      this.mm.pageList = JSON.stringify(this.pageList)
      console.log(this.mm.newPageContents)
      cont.savePageInfo(this.mm).then(res => {
        that.winvisible = false;
        that.doQuery();
      });
    },
    handleDialogSelectionChangeByPage(val) {
      console.log(val)
      this.dialogDataByPage.multipleSelection = val;


    },
    addPageContents() {
      this.multipleSelectionByContents = []
      // 查询所有
      this.winvisibleByPageContents = true;
      cont.getAllContents(this.dialogDataByPageContent).then(res => {
        this.listLoading = false;
        this.contentList = res.rows;
        this.dialogDataByPageContent.total = res.total;
      });
    },
    deletePageContents() {
      let selected = this.dialogDataByPage.multipleSelection
      let ids = ''
      if (this.dialogDataByPage.multipleSelection.length === 0) {
        this.$message({
          message: '请选择记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      for (let i = 0; i < this.dialogDataByPage.multipleSelection.length; i++) {
        ids = ids + this.dialogDataByPage.multipleSelection[i].id + ','
      }
      cont.saveContentDelete({ 'ids': ids }).then(res => {
        cont.getContentDetailByPage({ "id": this.dialogDataByPage.multipleSelection[0].page_id }).then(res => {
          console.log(res)
          this.mm = res.page
          this.pageList = res.contentList
          this.winvisible = true
          this.dialogDataByPageContent.pageId = res.page.id
        });
      });

    },
    handleDialogSelectionChangeByPageContents(val) {
      this.multipleSelectionByContents = val
      console.log(this.multipleSelectionByContents)
    },
    searchAllContents() {
      this.addPageContents();
    },
    handleDialogCurrentChange(val) {
      this.dialogDataByPageContent.pageNum = val;
      this.addPageContents();
    },
    handleDialogSizeChange(val) {
      this.dialogDataByPageContent.pageNum = 1;
      this.dialogDataByPageContent.pageSize = val;
      this.addPageContents();
    },
    selectPageContents() {
      if (this.multipleSelectionByContents < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      // 保存数据
      this.winvisibleByPageContents = false;
    }
  }
}
</script>
<style>
</style>


