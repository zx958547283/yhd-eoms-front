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
          <ctable :actions="actions" :data="tabledata" :pagenum="pagenum" @dowloadQR="dowloadQR" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="标题" v-model="mm.title"></cinput>
        <cnumber :required="true" title="宽度(px)" v-model="mm.width"></cnumber>
        <cinput :length="2" :required="true" title="内容" v-model="mm.qr_content"></cinput>
        <cinput :length="2" title="描述" v-model="mm.qr_desc"></cinput>
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
import u from "../../../utils/utility";
import cont from "../../../api/cont";
import downloadApi from "../../../utils/downloadAPI";
import e from "../../../utils/excel";
export default {
 data() {
    return {
      actions: [
        {
          action: "dowloadQR",
          name: "下载"
        }
      ],
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: []           //查询条件模板
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
      this.mm = {};
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, cont.getQrcode, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteQrcode);
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
      this.mm.scan_count = 0;
      u.doSave(this, cont.saveQrcode);
    },
    dowloadQR(row) {
      downloadApi(row.pk, "qr");
    }
  }
}
</script>
<style></style>


