<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="companyTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="id" ref="refCompany"></el-tree>
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
          <cinputquery @query="btnquery()" placeholder="名称" v-model="queryvalue"></cinputquery>
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
        <cdept :required="true" title="所属上级" v-model="mm.parent_id"></cdept>
        <!-- <cselect @change="provinceChange" querypk="92a7db06-ee8d-462f-a04e-c977be09a29f" title="省" v-model="mm.province_id"></cselect>
        <cselect :refSelect="refProvinceId" @change="cityChange" querypk="bdf0cac9-0d26-4c42-920b-a562e94247ec" title="市" v-model="mm.city_id"></cselect>
        <cselect :refSelect="refCityId" querypk="60e50ed6-7805-4639-a92c-5c65ec38d8fe" title="区" v-model="mm.district_id"></cselect>-->
        <ccity title="区域" v-model="address"></ccity>
        <cinput :length="2" title="详细地址" v-model="mm.address"></cinput>
        <cinput :required="true" title="负责人姓名" v-model="mm.manager_name"></cinput>
        <cinput title="负责人电话" v-model="mm.manager_tel"></cinput>
        <cinput :required="true" title="负责人手机" v-model="mm.manager_mobile"></cinput>
        <csupload :length="2" title="门店缩略图" v-model="mm.org_image_path"></csupload>
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
import ums from "../../../api/ums";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      parentId: 1,                       //树形选择的对象
      refCityId: 'cityId',                //区域联动城市属性
      refProvinceId: 'provinceId,',       //城市联动省份属性
      parentOrgId: '',        //当前树形选中的节点
      wintitle: "部门编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [],          //查询条件模板
      companyTree: [],         //公司树形
      address: []
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    console.log(this.params);
    //初始化查询，默认第一页
    // this.doQuery();
    //加载公司树形
    let that = this;
    u.getDepartTree(this, "companyTree").then(res => {
      // 默认选择树形和默认加载列表
      if (res && res.length > 0) {
        that.$refs.refCompany.setCurrentKey(res[0].id, true, false);
        that.doQuery({ id: res[0].id });
      }
    });
    //初始化省份，城市，区域下拉
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.id;
      }
      u.addwherelike(this, "ums_organization.name", this.queryvalue);
      u.addwheres(this, "and", "(", "ums_organization.parent_id", "=", this.parentId, "");
      u.addwheres(this, "or", "", "ums_organization.id", "=", this.parentId, ")");
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
      u.openeditmodel(this, ums.getOraganization, row).then(res => {
        // that.provinceChange([res.province_id], true, [res.city_id]);
        that.address = [res.province_id, res.city_id, res.district_id];
      });
    },
    doDelete() {
      let that = this;
      u.deleteoperate(this, ums.delOraganization).then(res => {
        that.dataLoad();
        u.getDepartTree(that, "companyTree");
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
    provinceChange(val, initFlag, cityId) {
      this.refProvinceId = "provinceId," + val[0];
      if (!initFlag) {
        this.mm.city_id = "";
        this.cityChange([""]);
      } else {
        this.cityChange(cityId, true);
      }
    },
    cityChange(val, initFlag) {
      this.refCityId = "cityId," + val[0];
      if (!initFlag) {
        this.mm.district_id = "";
      }
    },
    doSave() {
      if (!this.mm.parent_id){
        this.$message.error("请选择上级！")
        return
      }

      // 部门类型
      this.mm.org_type = 3;
      this.mm.depth = 3;
      this.mm.province_id = this.address[0];
      this.mm.city_id = this.address[1];
      this.mm.district_id = this.address[2];
      u.doSave(this, ums.saveOrganization).then(res => {
        //加载公司树形
        u.getDepartTree(this, "companyTree");
      });
    }

  }
}
</script>
<style></style>


