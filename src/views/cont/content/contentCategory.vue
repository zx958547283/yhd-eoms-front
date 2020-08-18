<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="contentCatTree" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="pk" ref="refContentCatTree"></el-tree>
      </el-aside>
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
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="编码" v-model="mm.code"></cinput>
        <cinput :required="true" title="名称" v-model="mm.name"></cinput>
        <cinput :required="true" title="排序" v-model="mm.sort"></cinput>
        <cselect :required="true" pk="parentLevel" title="层级" v-model="mm.level"></cselect>
        <csupload :length="2" title="图标" v-model="mm.icon"></csupload>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import SingleUpload from '@/components/Upload/singleUpload'
import u from "../../../utils/utility";
import cont from "../../../api/cont";
import e from "../../../utils/excel";

export default {
  components: { SingleUpload },
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      contentCatTree: [],
      parentId: "",
      parentNode: {}
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    let that = this;
    u.getContentCatTree(this, "contentCatTree").then(res => {
      // 默认选择树形和默认加载列表
      if (res && res.length > 0) {
        that.$refs.refContentCatTree.setCurrentKey(res[0].pk, true, false);
        this.doQuery(res[0]);
        this.parentNode = res[0];
      }
    });
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.pk;
        this.parentNode = treeNode;
      }
      u.addwheres(this, "and", "(", "cont_content_category.parent_id", "=", this.parentId, "");
      u.addwheres(this, "or", "", "cont_content_category.id", "=", this.parentId, ")");
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
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, cont.getContentCategory, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteContentCategory).then(res => {
        u.getContentCatTree(this, "contentCatTree").then(resTree => {
          // 默认选择树形和默认加载列表
          if (resTree && resTree.length > 0) {
            that.$refs.refContentCatTree.setCurrentKey(resTree[0].pk, true, false);
            that.doQuery(resTree[0]);
            that.parentNode = resTree[0];
          }
        });
      });
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
      if (!this.parentNode.pk) {
        this.mm.parent_id = "1";
        this.mm.parent_name = "1";
        // this.mm.level = 0;
      } else {
        this.mm.parent_id = this.parentNode.pk;
        this.mm.parent_name = this.parentNode.label;
        if (this.mm.level !== '0') {
          this.mm.level = Number(this.parentNode.level) + 1;
        } else {
          this.mm.parent_id = '0'
          this.mm.parent_name = this.mm.name
        }
      }

      let that = this;
      u.doSave(this, cont.saveContentCategory).then(res => {
        u.getContentCatTree(this, "contentCatTree").then(resTree => {
          // 默认选择树形和默认加载列表
          if (resTree && resTree.length > 0) {
            that.$refs.refContentCatTree.setCurrentKey(resTree[0].pk, true, false);
            that.doQuery(resTree[0]);
            that.parentNode = resTree[0];
          }
        });
      });
    }
  }
}
</script>
<style></style>


