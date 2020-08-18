<template>
  <div class="app-container">
    <el-container>
      <el-header style="height:30px;">
        <el-button-group>
          <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
          <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
          <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
          <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
          <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
        </el-button-group>
        <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
      </el-header>
      <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
      <el-main>
        <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
      </el-main>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle" style="line-height:20px;">
        <cinput :disabled="disabled" title="机构编号" v-model="mm.org_code"></cinput>
        <cinput title="机构名称" v-model="mm.org_name"></cinput>
        <cinput title="机构官网" v-model="mm.org_website"></cinput>
        <cinput title="联系人" v-model="mm.contact"></cinput>
        <cinput title="联系电话" v-model="mm.phone"></cinput>
        <cselect :required="true" pk="YN" title="封存" v-model="mm.status"></cselect>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">确定</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      tabledata: {}, //表格数据
      pagenum: 1, //当前页

      selectrows: [], //表格选中的对象
      wintitle: "监管机构新增", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {}, //编辑对象
      params: [], //页面参数
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      sealup: true,
      listQuery: Object.assign({}, defaultListQuery),
      productCategory: [],
      selectProductCateValue: null,
      createtime: "",
      productOptions: [],
      productStatusOptions: [],
      disabled: true
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {},
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
        console.log("ddddddddddd")
        this.querylist = querylist;
        console.log(querylist)
      }
      //查询条件
      this.dataLoad(1);
    },
    // 	doQuery() {
    //   this.querylist = [];
    //   u.addwheres(
    //     this,
    //     "and",
    //     "(",
    //     "xcy_qc_org.org_name",
    //     "like",
    //     this.queryvalue,
    //     ""
    //   );
    //   u.addwheres(
    //     this,
    //     "or",
    //     "",
    //     "xcy_qc_org.org_code",
    //     "like",
    //     this.queryvalue,
    //     ")"
    //   );
    //   //查询条件
    //   this.dataLoad(1);
    // },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      // if(!this.queryvalue) {
      //   this.querylist = [];
      // }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {};
      this.mm.status = "N";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, xcy.getQcOrg, row);
    },
    doDelete() {
      u.deleteoperate(this, xcy.deleteQcOrg);
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      if (this.mm.status == null) {
        this.mm.status = 0;
      }
      if (this.mm.exc_key) {
        u.doSave(this, xcy.saveQcOrg); //更新
      } else {
        u.doSave(this, xcy.saveOrg); //添加
      }
    }
  }
};
</script>
<style scoped>
</style>


