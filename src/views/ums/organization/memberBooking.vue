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
            <!--            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>-->
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
<!--            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>-->
            <!--            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>-->
          </el-button-group>
<!--          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>-->
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit"
                  @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
<!--        <cinput :required="true" title="客户ID" v-model="mm.member_id"></cinput>-->
<!--        <cinput :required="true" title="预约单ID" v-model="mm.booking_id"></cinput>-->
<!--        <cinput title="预约状态：1、待接单；2、已接单；3、完成；4、员工取消；5、客户取消；" v-model="mm.status"></cinput>-->
        <cselect  title= "预约状态" :required="true" pk="bookingStatus" v-model="mm.status"></cselect>
<!--        <cinput title="联系人手机号" v-model="mm.contact_mobile"></cinput>-->
        <ctextarea :length = "2" title="备注" v-model="mm.memo"></ctextarea>
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
import ums from "../../../api/ums";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      companyTree: [],
      parentId: 1,
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      }
    }
  },
  mounted() {
    let that = this;
    //初始化查询，默认第一页
    u.getDepartTree(this, "companyTree").then(res => {
      // 默认选择树形和默认加载列表
      if (res && res.length > 0) {
        that.$refs.refCompany.setCurrentKey(res[0].id, true, false);
        that.doQuery({ id: res[0].id });
      }
    });
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
  },
  filters: {},
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(treeNode) {
      this.querylist = [];
      console.log(treeNode)
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.id;
        console.log(this.parentId);
        u.addwheres(this, "and", "(", "uo.id", "=", this.parentId, ")");

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
      this.mm.fix = "N";
      this.winvisible = true;
      this.timeValue = [];
    },
    showEdit(row) {
     let res =  u.openeditmodel(this, ums.getMemberBooking, row);

     if (res){
       res.then(result => {
         console.log("result === ",result)
         }
       )
     }

    },
    doDelete() {
      u.deleteoperate(this, ums.deleteMemberBooking);
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
      u.doSave(this, ums.saveMemberBooking);
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.datepick {
  float: left;
  margin-top: 20px;

  .datepick_txt {
    font-size: 13px;
    display: inline-block;
    color: #48576a;
    width: 75px;
    height: 28px;
    line-height: 28px;
  }
}
</style>


