<template>
  <div class="pagecontent">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-button-group>
      <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
      <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
      <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
      <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
      <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
    </el-button-group>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>

    <cwindow :length="3" :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :length="1" :required="true" title="课程名称" v-model="mm.name"></cinput>
        <cinput :length="1" title="授课老师" v-model="mm.teacher_name"></cinput>
        <cselect :length="1" :required="true" pk="4fec5b8d-14f7-4bf0-af8b-ecaa4791b45d" title="课程分类" v-model="mm.category"></cselect>
        <cinput :length="3" title="课程简介" v-model="mm.introduce"></cinput>
        <csuploadWithPath :dataObj="updatePath" :length="3" :required="true" title="封面图片" v-model="mm.cover_path"></csuploadWithPath>
        <cnumber :required="true" title="课时" v-model="mm.class_hour"></cnumber>
        <cnumber title="课程价格" v-model="mm.course_amount"></cnumber>
        <cnumber title="排序" v-model="mm.sort"></cnumber>
        <cdate :required="true" show_format="yyyy-MM-dd HH:mm:ss" title="开始时间" type="datetime" v-model="mm.start_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
        <cdate show_format="yyyy-MM-dd HH:mm:ss" title="结束时间" type="datetime" v-model="mm.end_time" value_format="yyyy-MM-dd HH:mm:ss"></cdate>
        <cradio :itemlists="unionProduct" :length="3" :required="true" title="是否关联商品" v-model="isUnion" v-on:radioChange="radioChange"></cradio>
        <el-table :data="selectedProduct" border>
          <el-table-column align="center" label="商品名称">
            <template slot-scope="scope">{{scope.row.name}}</template>
          </el-table-column>
          <el-table-column align="center" label="货号" width="160">
            <template slot-scope="scope">NO.{{scope.row.product_sn}}</template>
          </el-table-column>
          <el-table-column align="center" label="价格" width="120">
            <template slot-scope="scope">￥{{scope.row.price}}</template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="50">
            <template slot-scope="scope">
              <el-button @click="handleDelClick(scope.row)" size="small" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      <el-table :data="dialogData.list" @selection-change="handleDialogSelectionChange" border>
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
        <el-button @click="closeProductGet" size="small">取 消</el-button>
        <el-button @click="handleSelectDialogConfirm()" size="small" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../utils/utility";
import sys from "../../api/sys";
import course from "../../api/course";
import e from "../../utils/excel";
import request from "../../utils/request";
import pms from '@/api/pms';
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
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      },
      unionProduct: [
        {
          label: '0',
          txt: '不关联'
        },
        {
          label: '1',
          txt: '关联'
        }
      ],
      isUnion: '0',
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
      selectedProduct: []
    }
  },
  watch: {
    selectDialogVisible: function (val) {
      console.log(val)
      if (val) {
        this.isUnion = '1'
      }
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    this.btndataload(1);
    this.getFieldLists();
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
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
      this.selectedProduct = []
    },
    showEdit(row) {
      let that = this;
      this.selectedProduct = []
      u.openeditmodel(this, course.getOfflineCourse, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
        that.selectedProduct.push(res.product)
        if (undefined !== res.product && null !== res.product) {
          that.isUnion = "1"
        }
      });;
    },
    doDelete() {
      u.deleteoperate(this, course.deleteOfflineCourse);
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
      if (undefined !== this.selectedProduct && null != this.selectedProduct && 0 !== this.selectedProduct.length) {
        this.mm.need_tools = this.selectedProduct[0].name
        this.mm.product_id = this.selectedProduct[0].id
      }

      u.doSave(this, course.saveOfflineCourse);
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
    },
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    getFieldLists(data) {
      let that = this;
      request.post("sys/QueryLists", {
        pk: this.params[0]
      }).then(resquery => {
        resquery.forEach(function (val) {
          that.fieldlists.push({
            Field: val.Field,
            Name: val.Name,
            Consult: val.Consult,
            Value: ''
          });
        });
      })
    },
    radioChange(val) {
      console.log(val)
      this.isUnion = val
      if ('1' === val) {
        this.handleSelectProduct();
      } else {
        this.selectedProduct = []
      }
    },
    handleDelClick() {
      this.selectedProduct = []
    },
    handleSelectProduct() {
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    getDialogList() {
      pms.getProductList(this.dialogData.listQuery).then(res => {
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      })
    },
    closeProductGet() {
      this.selectDialogVisible = false

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
    handleSelectDialogConfirm() {
      if (this.dialogData.multipleSelection.length < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.selectedProduct.push(this.dialogData.multipleSelection[0])
      console.log(this.selectedProduct)
      this.selectDialogVisible = false;
      this.$message({
        type: 'success',
        message: '添加成功!'
      });
      // let selectProducts = [];
      // for (let i = 0; i < this.dialogData.multipleSelection.length; i++) {
      //   selectProducts.push({
      //     productId: this.dialogData.multipleSelection[i].id,
      //     productName: this.dialogData.multipleSelection[i].name
      //   });
      // }

    },
    handleDialogSelectionChange(val) {
      this.dialogData.multipleSelection = val;
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


