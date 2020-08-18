<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px" v-show="false">
        <el-tree :data="companyTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="id" ref="refCompany"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="queryIncome()" size="mini" type="primary">查看会员收益</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
          </el-button-group>
          <cinputquery @query="btnquery()" placeholder="名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="queryIncome" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="登录名" v-model="mm.username"></cinput>
        <cinput :required="true" title="姓名" v-model="mm.real_name"></cinput>
        <cinput :required="true" title="手机" v-model="mm.phone"></cinput>
        <cselect pk="Sex" title="性别" v-model="mm.gender"></cselect>
        <cdate title="生日" v-model="mm.birthday"></cdate>
        <ccity title="区域" v-model="address"></ccity>
        <cinput title="职业" v-model="mm.job"></cinput>
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
import member from "../../../api/member";
import e from "../../../utils/excel";

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
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],          //查询条件模板
      companyTree: [],         //公司树形
      address: []
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
    //加载公司树形
    let that = this;
    u.getCompanyTree(this, "companyTree").then(res => {
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
    queryIncome(row) {
      if (row === undefined) {
        row = this.selectrows[0];
      }
      this.$router.push({ path: '/customer/memberIncomeDetail', query: { memberId: row.pk } })
      
    },
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.id;
      }
      u.addwherelike(this, "ums_member.username", this.queryvalue);
      u.addwheres(this, "and", "", "ums_member.company_id", "=", this.parentId, "");
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
      u.openeditmodel(this, member.getMember, row).then(res => {
        this.address = [res.province, res.city, res.area];
      });
    },
    doDelete() {
      let that = this;
      u.deleteoperate(this, member.deleteMember).then(res => {
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
      this.mm.province = this.address[0];
      this.mm.city = this.address[1];
      this.mm.area = this.address[2];
      this.mm.nickname = this.mm.real_name;
      this.mm.organization_id = "1";

      u.doSave(this, member.saveMember).then(res => {
        //加载公司树形
        u.getCompanyTree(this, "companyTree");
      });
    },
    vip2Staff() {
      const row = this.selectrows[0];
      let userId = this.$store.getters.userId;
      member.vip2Staff({"pk": row.pk, "userId": userId})
    }

  }
}
</script>
<style></style>


