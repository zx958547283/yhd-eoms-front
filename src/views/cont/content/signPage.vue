<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="defTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" highlight-current node-key="id" ref="refDef"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('showAdd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('doExport')">导出</el-button>
          </el-button-group>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput title="标题" v-model="mm.title"></cinput>
        <!-- <cinput title="名称" v-model="mm.name"></cinput> -->
        <!-- <cselect pk="YN" title="封存" v-model="mm.seal"></cselect> -->
        <!-- <cselect pk="YN" title="固定" v-model="mm.fix"></cselect>
        <ctextarea :length="2" title="值" v-model="mm.value"></ctextarea>
        <cinput :length="2" title="备注" v-model="mm.memo"></cinput>-->
        <!-- <ccorp title="组织" v-model="mm.company_id"></ccorp> -->
        <!-- <cinput :readonly="true" title="主键" v-model="mm.def_list_id"></cinput> -->
        <tinymce :height="300" :toolbar="toolbar" :width="825" style="margin-top:50px;" v-model="mm.content"></tinymce>
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
import xcy from "../../../api/xcy";
import e from "../../../utils/excel";
import Tinymce from '@/components/Tinymce'
export default {
  components: { Tinymce },
  data() {
    return {
      defTree: [],
      selectrows: [],                    //表格选中的对象
      wintitle: "内容编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      fpk: "",
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    console.log(this.params[0]);
    //初始化查询，默认第一页
    this.doQuery();
    let that = this;
    cont.getSignPageType().then(res => {
      that.defTree = res;
      that.doQuery();
    });
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      console.log(treeNode)
      this.querylist = [];
      if (treeNode) {
        this.fpk = treeNode.id;
        this.winvisible = false; // 切换树节点关闭弹出窗口，防止误操作
        this.mm.deflist_id = treeNode.id
        u.addwhere(this, "cont_single_page.deflist_id", treeNode.id, "querylist");
      }
      else {
        // u.addwheres(this, "and", "cont_single_page.title", "like", this.queryvalue);
        // u.addwheres(this, "or", "", "sys_def_list.name", "like", this.queryvalue, "");
        // u.addwheres(this, "or", "", "sys_def_list.value", "like", this.queryvalue, ")");
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
      this.mm.deflist_id = this.fpk;
      this.winvisible = true;
    },
    showEdit(row) {
      u.openeditmodel(this, cont.getSinglePage, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteSinglePage);
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
      console.log(this.mm)
      if (this.mm.deflist_id === null || this.mm.deflist_id === '' || this.mm.deflist_id === undefined) {
        this.$message.error('请在左侧树中选择节点！');
        return;
      }
      u.doSave(this, cont.saveSinglePage);
    }
  }
}
</script>
<style></style>


