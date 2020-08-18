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
          <el-button @click="exportExcel()" size="mini" type="primary">导出全部</el-button>
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
        <cinput :disabled="true" title="企业编号" v-model="mm.enterprise_code"></cinput>
        <cinput title="企业简称" v-model="mm.enterprise_abbr_name"></cinput>
        <cinput title="企业全称" v-model="mm.enterprise_name"></cinput>
        <ccity :length="1" title="地址" v-model="address"></ccity>
        <cinput title="官网地址" v-model="mm.website"></cinput>
        <cinput title="网上商城" v-model="mm.eshop_address"></cinput>
        <cinput title="公众号" v-model="mm.wx_gz_address"></cinput>
        <cinput title="联系人" v-model="mm.contact"></cinput>
        <cinput title="联系电话" v-model="mm.phone"></cinput>
        <cinput title="法人" v-model="mm.corporation"></cinput>
        <cinput title="营业执照" v-model="mm.business_license_num"></cinput>
        <cselect :required="true" pk="YN" title="封存" v-model="mm.status"></cselect>
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
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
// import province from '../../../utils/province'
// import city from '../../../utils/city'
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  category: null,
  enterprise_abbr_name: null,
  province: null,
  city: null,
  contact: null,
  phone: null,
  status: null,
};
export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "新增企业信息",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [],           //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      address: []
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
        console.log("ddddddddddd")
        this.querylist = querylist;
        console.log(querylist)
      }
      //查询条件
      this.dataLoad(1);
    },
    // doQuery() {
    //   this.querylist = [];
    //   u.addwheres(this, "and", "(", "xcy_enterprise.enterprise_code", "like", this.queryvalue, "");
    //   u.addwheres(this, "or", "", "xcy_enterprise.enterprise_abbr_name", "like", this.queryvalue, "");
    //   u.addwheres(this, "or", "", "xcy_enterprise.enterprise_name", "like", this.queryvalue, ")");
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
      u.openeditmodel(this, xcy.getEnterprise, row).then(res => {
        console.log(res)
        that.address = [res.province[0], res.city[0], res.region];
      });
    },
    doDelete() {
      u.deleteoperate(this, xcy.deleteEnterprise);
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
      this.mm.province = this.address[0];
      this.mm.city = this.address[1];
      this.mm.region = this.address[2];
      if (this.mm.exc_key) {
        u.doSave(this, xcy.saveEnterprise);//更新
      } else {
        u.doSave(this, xcy.saveEnterpriseInfo);//新增
      }
    },
    getParam() {
      let that = this;
      xcy.getEnterpriseList(this.listQuery).then(res => {
        that.tabledata.rows = res.rows;
        that.tabledata.total = res.total;
      });
    },
    exportExcel() {
      xcy.exportEnterpriseList(this.listQuery).then(res => {
        e.exportxlsx(res)
      })
    }
  }
}
</script>
<style>
</style>


