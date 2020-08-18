<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="handleSelectProduct()" size="mini" type="primary" v-show="btnpower('btnadd')">添加商品</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :actions="actions" :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @selection-change="tableSelect" @updateStats="updateStats"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cselect :required="true" pk="grounding" title="上下架" v-model="mm.status"></cselect>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
    <el-dialog :visible.sync="selectDialogVisible" title="选择商品" width="50%">
      <el-input placeholder="商品名称搜索" size="small" style="width: 250px;margin-bottom: 20px" v-model="dialogData.listQuery.keyword">
        <el-button @click="handleSelectSearch()" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <cselect :required="true" querypk="804c6597-c9f3-479b-9ea8-21681cb45e04" title="所属游戏" v-model="saveEntity.game_tag"></cselect>
      <el-table :data="dialogData.list" @selection-change="handleDialogSelectionChange" border style="margin-top:20px;">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="货号" width="160">
          <template slot-scope="scope">NO.{{scope.row.product_sn}}</template>
        </el-table-column>
        <el-table-column align="center" label="价格" width="120">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination :current-page.sync="dialogData.listQuery.pageNum" :page-size="dialogData.listQuery.pageSize" :page-sizes="[5,10,15]" :total="dialogData.total" @current-change="handleDialogCurrentChange" @size-change="handleDialogSizeChange" background layout="prev, pager, next"></el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button @click="selectDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleSelectDialogConfirm()" size="small" type="primary">确 定</el-button>
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
        path: process.env.GAME_TOOL_PATH
      },
      actions: [
        {
          action: "updateStats",
          name: "上下架"
        }
      ],
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
      },
      saveEntity: {
        game_tag: '',
        goods: []
      }
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    console.log('444444444444')
    console.log(this.tabledata)
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
          u.addwheres(this, "and", "(", "pms_product.name", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "pms_product.code", "like", this.queryvalue, ")");
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
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, gms.getGameTool, row);
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteGameTool);
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
      u.doSave(this, gms.saveGameGoods);
    },
    updateStats(row) {
      let that = this;
      u.openeditmodel(this, gms.getGameGoods, row);
    },
    handleSelectProduct() {
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    getDialogList() {
      gms.getProductList(this.dialogData.listQuery).then(res => {
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      })
    },
    handleSelectSearch() {
      this.getDialogList();
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
    },
    handleSelectDialogConfirm() {

      if (this.saveEntity.game_tag === '' || this.saveEntity.game_tag === null || this.saveEntity.game_tag === undefined) {
        this.$message({
          message: '请选择所属游戏',
          type: 'warning',
          duration: 1000
        });
        return;
      }

      if (this.dialogData.multipleSelection < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.saveEntity.goods = [];
      for (let i = 0; i < this.dialogData.multipleSelection.length; i++) {
        this.saveEntity.goods.push({
          product_id: this.dialogData.multipleSelection[i].id
        });
      }
      let that = this
      this.$confirm('使用要进行添加操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        gms.saveMutiGameGoods(that.saveEntity).then(response => {
          this.selectDialogVisible = false;
          this.dialogData.multipleSelection = [];
          this.dataLoad(1);
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        });
      });
    }
  }
}
</script>
<style></style>


