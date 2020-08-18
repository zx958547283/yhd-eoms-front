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
          <cinputquery @query="btnquery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
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
        <cselect :custOptions="[{text:'按重量', value:'0'},{text:'按件数', value:'1'}]" pk="YN" title="计费类型" v-model="mm.charge_type"></cselect>
        <cinput title="首重" v-model="mm.first_weight"></cinput>
        <cinput title="首费(元)" v-model="mm.first_fee"></cinput>
        <cinput title="续重(kg)" v-model="mm.continue_weight"></cinput>
        <cinput title="续重费用(元/每kg)" v-model="mm.continme_fee"></cinput>
        <ccity :showLevel="2" title="配送区域" v-model="region"></ccity>
        <cinput :length="2" title="模板描述" v-model="mm.desc"></cinput>
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
import feightTemplate from "../../../api/feightTemplate";
import e from "../../../utils/excel";

export default {
 data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "运费模板编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      region: []               //省市
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
      u.addwheres(this, "and", "(", "pms_feight_template.code", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "pms_feight_template.name", "like", this.queryvalue, ")");
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
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, feightTemplate.getFeightTemplate, row);
    },
    doDelete() {
      u.deleteoperate(this, feightTemplate.deleteFeightTemplate);
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
      //区域处理
      this.mm.province = this.region[0];
      this.mm.city = this.region[1];
      //保存
      u.doSave(this, feightTemplate.saveFeightTemplate);
    }
  }
}
</script>
<style></style>


