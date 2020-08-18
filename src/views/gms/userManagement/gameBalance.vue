<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <el-button @click="showDetail()" size="mini" type="primary" v-show="btnpower('btnedit')">查看对战详情</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showDetail" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :visible.sync="selectDialogVisible" title="对战记录详细" width="50%">
      <el-table :data="dialogData.list" @selection-change="handleDialogSelectionChange" border style="margin-top:20px;">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="用户">
          <template slot-scope="scope">{{scope.row.nickname}}</template>
        </el-table-column>
        <el-table-column align="center" label="名次" width="160">
          <template slot-scope="scope">{{scope.row.user_guid_ranking}}</template>
        </el-table-column>
        <el-table-column align="center" label="玩家分数" width="120">
          <template slot-scope="scope">{{scope.row.user_score}}</template>
        </el-table-column>
        <el-table-column align="center" label="奖励粮票" width="120">
          <template slot-scope="scope">{{scope.row.reward_food_coupon}}</template>
        </el-table-column>
        <el-table-column align="center" label="奖励工分" width="120">
          <template slot-scope="scope">{{scope.row.reward_score}}</template>
        </el-table-column>
        <el-table-column align="center" label="实际公分" width="120">
          <template slot-scope="scope">{{scope.row.reward_score_reality}}</template>
        </el-table-column>
        <el-table-column align="center" label="奖励经验值" width="120">
          <template slot-scope="scope">{{scope.row.reward_experience}}</template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination :current-page.sync="dialogData.listQuery.pageNum" :page-size="dialogData.listQuery.pageSize" :page-sizes="[5,10,15]" :total="dialogData.total" @current-change="handleDialogCurrentChange" @size-change="handleDialogSizeChange" background layout="prev, pager, next"></el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button @click="selectDialogVisible = false" size="small">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import gms from "../../../api/gms";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "自定义项编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      updatePath: {
        path: process.env.BGM_UPLOAD_PATH
      },
      selectDialogVisible: false,
      dialogData: {
        list: null,
        total: null,
        multipleSelection: [],
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
      }
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    console.log('---------------------------')
    console.log(this.params)
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
          u.addwheres(this, "and", "(", "ums_member.nickname", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "gms_game_balance.room_no", "like", this.queryvalue, ")");
        }
      } else {
        this.querylist = querylist;
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
    },
    gotoOrder(row) {
      let that = this;
      console.log(row)
      u.addtagview(this, "订单".concat(row.订单号), "orderDetail", row.订单号);
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteRoomServer);
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
      u.doSave(this, gms.saveRoomServer);
    },
    showDetail(row) {
      let that = this;
      this.selectDialogVisible = true;
      gms.getGameBalanceDetail(row.pk).then(res => {
        this.dialogData.list = res;
      })
    },
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getDialogList();
    },
    handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleDialogSelectionChange(val) {
      this.dialogData.multipleSelection = val;
    }
  }
}
</script>
<style></style>


