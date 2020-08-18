<template>
  <div class="app-container">
    <el-button-group>
      <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('showAdd')">新增</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">编辑</el-button>
      <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button>
      <el-button @click="doQuery(pagenum)" size="mini" type="primary">刷新</el-button>
      <el-button @click="doAuthwindow()" size="mini" type="primary" v-show="params[0]==='577b9ef2-4304-4f1f-9bfb-719212cafd93'">授权</el-button>
      <el-button @click="showDataAuthwindow()" size="mini" type="primary" v-show="params[0]==='577b9ef2-4304-4f1f-9bfb-719212cafd93'">数据权限授权</el-button>
    </el-button-group>
    <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="doQuery" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput title="编码" v-model="mm.code"></cinput>
        <cinput title="名称" v-model="mm.name"></cinput>
        <ctextarea :length="2" title="值" v-model="mm.value"></ctextarea>
        <!-- <cselect pk="YN" title="封存" v-model="mm.seal"></cselect> -->
        <!-- <ccorp title="组织" v-model="mm.company_id"></ccorp> -->
        <cinput :length="2" title="备注" v-model="mm.memo"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="authwinvisible" title="角色授权" width="76%">
      <el-container>
        <el-aside width="200px">
          <el-tree :data="powermenudata" @node-click="doqueryPower" class="menulistmodal" highlight-current node-key="pk"></el-tree>
        </el-aside>
        <el-main>
          <el-table :data="powertabledata" :stripe="true" border max-height="568">
            <!-- <el-table-column prop="nodename" label="分类" width="200"></el-table-column> -->
            <el-table-column label="权限" width="200">
              <template slot-scope="scope">
                <el-checkbox-group v-model="scope.row.selected">
                  <el-checkbox :key="scope.row.pk" :label="scope.row.pk" @change="doChangePower(scope.row)">{{scope.row.powername}}</el-checkbox>
                </el-checkbox-group>
              </template>
            </el-table-column>
            <el-table-column label="按钮，打勾即表示按钮受控，将不显示" minWidth="500">
              <template slot-scope="scope">
                <el-checkbox :disabled="scope.row.selected.length == 0" :key="btn.pk" :label="btn.pk" @change="doChangeButtonPower(scope.row, btn)" v-for="btn in scope.row.btns" v-model="btn.btnsselected">{{btn.name}}</el-checkbox>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-dialog>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="diloadDataAuth" title="数据权限授权">
      <el-main>
        <el-table :data="listDataPermission" :stripe="true" border>
          <el-table-column label="表名" prop="table_name" width="200"></el-table-column>
          <el-table-column label="数据权限" minWidth="400">
            <template slot-scope="scope">
              <el-radio :key="dataPermission.name" :label="dataPermission.id" @change="doChangeDataPermission(scope.row, dataPermission)" v-for="dataPermission in scope.row.listDataPermission" v-model="scope.row.permissionId">{{dataPermission.name}}</el-radio>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import { mapGetters } from 'vuex';
import ums from "../../../api/ums";
export default {
  data() {
    return {
      tabledata: {},
      loading: false,
      selectrows: [],
      pagenum: 1,
      queryvalue: "",
      params: [],             //页面参数
      querylist: [],
      mm: [],
      winvisible: false,
      wintitle: "",
      powermenudata: [],
      authwinvisible: false,
      diloadDataAuth: false,
      powertabledata: [],
      listDataPermission: []
    };
  },
  created: function () { },
  mounted: function () {
    console.log("deflistvalue")
    this.params = u.getpageparmas(this);
    this.doQuery();
  },
  // watch: {
  //   tpParams() {
  //     this.doQuery();
  //   }
  // },
  // computed: {
  //   ...mapGetters([
  //     'tpParams'
  //   ])  },
  methods: {
    tableSelect: function (rows) {
      this.selectrows = rows;
    },
    dataLoad: function (num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, "2ebc1f8c-9bc5-459a-8ce8-706b1249195b");
    },
    doQuery: function () {
      this.querylist = [];
      console.log(this.params[0])
      u.addwhere(this, "sys_def_list.def_id", this.params[0]);
      u.addwheres(this, "and", "", "sys_def_list.name", "like", this.queryvalue, "");
      this.dataLoad(1);
    },
    showAdd: function () {
      u.openaddmodel(this);
      this.mm.def_id = this.params[0];
      this.mm.seal = "N";
      this.mm.fix = "N";
    },
    showEdit: function (row) {
      u.openeditmodel(this, sys.getDefList, row);
    },
    doSave: function (row) {
      u.doSave(this, sys.saveDefList);
    },
    doDelete: function () {
      u.deleteoperate(this, sys.deleteDefList);
    },
    doAuthwindow: function () {
      let row = u.dtselectvalue(this);
      if (!u.isnullorwhitespace(row)) {
        this.authwinvisible = true;
        sys.getDefListTree("ac89b801-5148-4318-8796-3aac029aa9d8").then(res => {
          this.powermenudata = res;
          this.powertabledata = [];
          // this.doQuery();
        });
      }
    },
    doqueryPower(treeNode) {
      let row = u.dtselectvalue(this);;
      let that = this;
      if (!u.isnullorwhitespace(row.pk)) {
        ums.getPowerlist(treeNode.pk, row.pk).then(
          res => {
            this.powertabledata = res;

          });
      } else {
        u.message(that, "请先选择角色列表");
      }
    },
    doChangePower(node) {
      let selectVal = false;
      let roles = [];
      for (var i = 0; i < this.selectrows.length; i++) {
        roles.push(this.selectrows[i].pk);
      }
      if (node.selected.length == 1) {
        selectVal = true;
      }
      ums.saveRolePermission({
        roles: roles,
        perssionId: node.pk,
        selectVal: selectVal
      }).then(res => {
        if (selectVal) {
          this.$message.success("授权成功！");
        } else {
          this.$message.success("权限取消成功！");
        }
      }).catch(err => {
        this.$message.error("授权失败，请稍候重试！");
      });
    },
    doChangeButtonPower(permission, btn) {
      let roles = [];
      for (var i = 0; i < this.selectrows.length; i++) {
        roles.push(this.selectrows[i].pk);
      }

      ums.doAuthRoleButtonRelation({
        roles: roles,
        button_permission_id: btn.pk,
        selectVal: btn.btnsselected
      }).then(res => {
        if (btn.btnsselected) {
          this.$message.success("按钮权限禁用成功！");
        } else {
          this.$message.success("按钮权限开放成功！");
        }
      }).catch(err => {
        this.$message.error("按钮权限授权失败，请稍候重试！");
      });
    },
    showDataAuthwindow() {
      let row = u.dtselectvalue(this);
      if (!u.isnullorwhitespace(row)) {
        this.diloadDataAuth = true;
        this.listDataPermission = [];
        ums.searchDataPermissionGroup({ role_id: row.pk }).then(res => {
          this.listDataPermission = res;
        }).catch(err => {

        });
      }
    },
    doChangeDataPermission(dataRow, dataPermission) {
      let row = u.dtselectvalue(this);
      if (!u.isnullorwhitespace(row)) {
        ums.doChangeDataPermission({
          listRoleId: [row.pk],
          data_permission_id: dataPermission.id,
          sourcePermissionId: dataRow.sourcePermissionId
        }).then(res => {
          this.diloadDataAuth = false;
          this.$message.success("数据权限授权成功！");
        }).catch(err => {
        });
      }
    }
  }
};
</script>
