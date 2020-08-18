<template>
  <div class="app-container">
    <cqueryview :pk="params[0]" @query="doQuery"></cqueryview>
    <el-container>
      <el-aside v-show="false" width="200px">
        <el-tree :data="companyTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="id" ref="refCompany"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <!-- <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button> -->
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="穴位名称" v-model="mm.acupoint_name"></cinput>
        <cinput :required="true" title="穴位说明" v-model="mm.content" :length="2"></cinput>
        <cinput :required="true" title="手法说明" v-model="mm.cure_content" :length="2"></cinput>
        <cnumber :required="true" title="排序" v-model="mm.sort"></cnumber>
        <csuploadWithPath :dataObj="updatePath" :length="2" :required="true" title="图片" v-model="mm.img"></csuploadWithPath>
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
import mady from "../../api/mady";
import ums from "../../api/ums";
import e from "../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      parentId: 1,                       //树形选择的对象
      refCityId: 'cityId',                //区域联动城市属性
      refProvinceId: 'provinceId,',       //城市联动省份属性
      parentOrgId: '',        //当前树形选中的节点
      wintitle: "机构编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],          //查询条件模板
      companyTree: [],         //公司树形
      address: [],
      employee:[],
      malady_id: '',
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      }
      
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {
    formatTag(value) {
      console.log('tag  ===============   ' + value)
      return value;
    }
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      this.querylist = [];
      if (undefined !== this.params[1] && null !== this.params[1] && '' !== this.params[1]) {
        this.malady_id = this.params[1]

        u.addwhere(this, "malady_id", this.params[1]);
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
      this.mm.gender = "1";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      
      u.openeditmodel(this, mady.getMaladyAcupoint, row).then(res => {
        this.address = [res.province, res.city, res.area];
        let tags = res.member_tag.replace("tag1&&","").replace("tag2&&","").replace("tag3&&","")
        this.mm.member_tag = tags
      });
    },
    doDelete() {
      let that = this;
      u.deleteoperate(this, mady.deleteMaladyAcupoint).then(res => {
        u.getCompanyTree(that, "companyTree");
      });
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
      this.mm.malady_id = this.malady_id
      u.doSave(this, mady.saveMaladyAcupoint).then(res => {
        //加载公司树形
        
      });
    }

  }
}
</script>
<style></style>


