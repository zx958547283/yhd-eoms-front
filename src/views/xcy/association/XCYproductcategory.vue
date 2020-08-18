<template>
  <div class="app-container">
    <!-- <el-container>
      <el-container>
        <el-header style="height:50px;">
          <el-button @click="showAdd()" size="medium" type="primary" v-show="btnpower('btnedit')">新增</el-button>
          <el-button
            @click="showEdit()"
            size="medium"
            type="primary"
            v-show="btnpower('btnedit')"
          >编辑</el-button>
        </el-header>
        <el-main>
          <el-table :data="tabledata.rows" style="width: 100%" @row-dblclick="showEdit" @selection-change="tableSelect">
            <el-table-column type="selection"></el-table-column>
            <el-table-column :index="indexCaclu" align="center" label="序号" type="index" width="50"></el-table-column>
            <el-table-column prop="code" label="产品类别编号" align="center"></el-table-column>
            <el-table-column prop="name" label="产品类别名称" align="center"></el-table-column>
            <el-table-column prop="status" label="封存" align="center">
              <template slot-scope="scope">
                <el-checkbox :value="scope.row.status=='1'" @change="sealupInTable(scope.row, $event)"></el-checkbox>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination-container">
            <el-pagination
              :current-page.sync="listQuery.pageNum"
              :page-size="listQuery.pageSize"
              :page-sizes="[5,10,15]"
              :total="tabledata.total"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              background
              layout="total, sizes,prev, pager, next,jumper"
            ></el-pagination>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle" style="line-height:20px;">
        <cinput :length="2" title="产品类别编号：" v-model="mm.code" :disabled="disabled"></cinput>
        <cinput :length="2" title="产品类别名称：" v-model="mm.name"></cinput>
        <div class="order_line" style="overflow: inherit">
          <span class="controlspan">封存：</span>
          <el-checkbox v-model="mm.status" true-label="1" false-label="0"></el-checkbox>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="doSave" size="mini" type="primary">确定</el-button>
        <el-button @click="winvisible=false" size="mini">取消</el-button>
      </div>
    </cwindow>-->
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10
};
export default {
  data() {
    return {
      selectrows: [], //表格选中的对象
      wintitle: "监管机构新增", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      mm: {}, //编辑对象
      tabledata: {}, //表格数据
      params: [], //页面参数
      pagenum: 1, //当前页
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      sealup: true,
      listQuery: Object.assign({}, defaultListQuery),
      productCategory: [],
      selectProductCateValue: null,
      createtime: "",
      productOptions: [],
      productStatusOptions: [],
      disabled: false,
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
    this.dataLoad();
  },
  filters: {},
  methods: {
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0], this.listQuery.pageSize);
    },
    showAdd() {
      this.mm = {};
      this.mm.fix = "N";
      this.mm.def_id = this.fpk;
      this.winvisible = true;
      this.disabled = false;
    },
    showEdit(row) {
      this.disabled = true;
      u.openeditmodel(this, sys.getDefList, row);
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      if (this.mm.status == null) {
        this.mm.status = 0;
      }
      this.mm.def_id = 'bcbbecad-7de6-11e9-aa5a-00155d60c816';
      this.mm.value = this.mm.code;
      u.doSave(this, sys.saveDefList);
    },
    doSaveFromTable(row) {
      this.mm = row;
      this.mm.def_id = 'bcbbecad-7de6-11e9-aa5a-00155d60c816';
      // this.mm.name = this.mm.value;
      u.doSave(this, sys.saveDefList);
    },
    indexCaclu(index) {
      return (this.pagenum - 1) * u.querypagesize() + index + 1;
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.dataLoad(val);
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.dataLoad(1);
    },
    sealupInTable(row, event) {
      let that = this;
      row.status = event ? 1 : 0;
      this.doSaveFromTable(row);
    },
  }
};
</script>
<style></style>


