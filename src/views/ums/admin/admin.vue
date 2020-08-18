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
            <el-button @click="showRoleAuth()" size="mini" type="primary" v-show="btnpower('btnAuthRole')">角色授权</el-button>
            <!-- <el-button @click="showDataAuth()" size="mini" type="primary" v-show="btnpower('btnAuthData')">数据授权</el-button> -->
            <el-button @click="doDelock()" size="mini" type="primary" v-show="btnpower('btntoexcel')">启用</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="名称、呢称、邮箱" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="编码" v-model="mm.code"></cinput>
        <cinput :required="true" title="真实姓名" v-model="mm.username"></cinput>
        <cselect querypk="9f69cadd-d7af-493f-a058-c28594c9f5b2" title="部门" v-model="mm.depart_id"></cselect>
        <cinput title="邮箱" v-model="mm.email"></cinput>
        <cinput title="呢称" v-model="mm.nick_name"></cinput>
        <cinput title="手机号码" v-model="mm.mobile"></cinput>
        <cselect pk="YN" title="管理员" v-model="mm.isadmin"></cselect>
        <cinput inType="password" title="密码" v-model="mm.password"></cinput>
        <cselect pk="can" title="理疗师" v-model="mm.isdoctor"></cselect>
        <cselect pk="can" title="经销商" v-model="mm.is_dealer"></cselect>
        <cselect pk="can"  title="健康专员" v-model="mm.is_healther"></cselect>
        <cselect pk="can" title="服务专员" v-model="mm.is_server"></cselect>
        <cinput :length="2" title="备注" v-model="mm.note"></cinput>
      </div>
      <div class="page-controlstyle">
        <label>说明：密码可以为空，新建用户默认密码为当天日期，如20191128</label>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>

    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="dialogRoleAuthShow" title="角色授权">
      <el-container>
        <el-col :key="index" :span="6" v-for="(role, index) in roleList">
          <el-checkbox-group v-model="role.roleSelected">
            <el-checkbox :key="role.id" :label="role.name" @change="doChangeRole(role)">{{role.name}}</el-checkbox>
          </el-checkbox-group>
        </el-col>
      </el-container>
    </el-dialog>

    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="dialogDataAuthShow" title="数据授权">
      <el-container>
        <el-col :key="index" :span="6" v-for="(dataAuth, index) in listDataAuth">
          <el-radio :label="dataAuth.value" @change="updateDataAuth(dataAuth)" v-model="mm.data_auth">{{dataAuth.text}}</el-radio>
        </el-col>
      </el-container>
    </el-dialog>
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
      wintitle: "员工编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      companyTree: [],         //公司树形
      dialogRoleAuthShow: false,
      dialogDataAuthShow: false,
      roleList: [],
      listDataAuth: [
        {
          text: '本人',
          value: '0'
        },
        {
          text: '本部门',
          value: '1'
        },
        {
          text: '部门及以下',
          value: '2'
        },
        {
          text: '本公司',
          value: '3'
        },
        {
          text: '全部',
          value: '4'
        }
      ]
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    let that = this;
    //初始化查询，默认第一页
    u.getDepartTree(this, "companyTree").then(res => {
      // 默认选择树形和默认加载列表
      if (res && res.length > 0) {
        that.$refs.refCompany.setCurrentKey(res[0].id, true, false);
        that.doQuery({ id: res[0].id });
      }
    });
    this.doQuery();
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.id;
        console.log(this.parentId);
        u.addwheres(this, "and", "(", "ums_admin.organization_id", "like", this.parentId, "");
        u.addwheres(this, "or", "", "ums_admin.company_id", "like", this.parentId, "");
        u.addwheres(this, "or", "", "ums_admin.depart_id", "like", this.parentId, ")");
      }
      else {
        u.addwheres(this, "and", "(", "ums_admin.username", "like", this.queryvalue, "");
        u.addwheres(this, "or", "", "ums_admin.nick_name", "like", this.queryvalue, "");
        u.addwheres(this, "or", "", "ums_admin.email", "like", this.queryvalue, ")");
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
      this.mm.isadmin = "N"; ``
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, ums.getAdmin, row);
    },
    doDelete() {
      u.deleteoperate(this, ums.delAdmin);
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
      // this.mm.isadmin = "N";
      u.doSave(this, ums.saveAdmin);
    },
    showRoleAuth() {
      let row = u.dtselectvalue(this);
      if (!u.isnullorwhitespace(row)) {
        this.roleList = [];
        ums.searchAdminRoleByUserId({ admin_id: row.pk }).then(res => {
          this.roleList = res;
        }).catch(err => {

        });
        this.dialogRoleAuthShow = true;
      }
    },
    showDataAuth() {
      let row = u.dtselectvalue(this);
      if (!u.isnullorwhitespace(row)) {
        ums.getAdmin(row.pk).then(res => {
          this.mm = res;
          this.dialogDataAuthShow = true;
        })
      }
    },
    doChangeRole(node) {
      console.log(node);
      let selectVal = false;
      let adminIds = [];
      for (var i = 0; i < this.selectrows.length; i++) {
        adminIds.push(this.selectrows[i].pk);
      }
      if (node.roleSelected.length == 1) {
        selectVal = true;
      }
      ums.doAuthRole({
        adminIds: adminIds,
        roleId: node.def_list_id,
        selectVal: selectVal
      }).then(res => {
        if (selectVal) {
          this.$message.success("角色授权成功！");
        } else {
          this.$message.success("角色取消成功！");
        }
      }).catch(err => {
        this.$message.error("授权失败，请稍候重试！");
      });
    },
    doDelock() {
      let sucrows = [];
      let exc_keys = [];
      if (this.selectrows.length <= 0) {
        this.$message.error("请至少选择一行数据！");
        return;
      }
      this.selectrows.forEach(function (row) {
        sucrows.push(row.pk);
        exc_keys.push(String(row.exc_key));
      });
      ums.doDelockAdmin({
        ids: sucrows,
        exc_keys: exc_keys
      }).then(res => {
        this.$message.success("启用成功！");
        this.doQuery();
      }).catch(err => {
      })
    },
    updateDataAuth(dataAuth) {
      console.log(this.mm);
      ums.updateAuthData({
        ids: [this.mm.id],
        exc_keys: [String(this.mm.exc_key)],
        data_auth: dataAuth.value
      }).then(res => {
        this.$message.success("数据授权成功，下次登录时生效！");
        this.dialogDataAuthShow = false;
      }).catch(err => {
      });
      console.log(dataAuth);
    }
  }
}
</script>
<style></style>


