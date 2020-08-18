<template>
  <div class="pagecontent">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-button-group>
      <!-- <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑门店课程</el-button> -->
      <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
    </el-button-group>
    <ctable :data="tabledata" :pagenum="pagenum" @pagechange="btndataload" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" v-model="queryvisible"></cquery>

    <cwindow :length="3" title="已添加的课程" v-model="winvisible">
      <el-table :data="selectedCourse.list" border>
        <el-table-column align="center" label="课程名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="老师名">
          <template slot-scope="scope">NO.{{scope.row.teacher_name}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="50">
          <template slot-scope="scope">
            <el-button @click="handleDelClick(scope.$index, scope.row)" size="small" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page.sync="selectedCourse.listQuery.pageNum"
          :page-size="selectedCourse.listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="selectedCourse.total"
          @current-change="handleSelectedCurrentChange"
          @size-change="handleSelectedSizeChange"
          background
          layout="prev, pager, next"
        ></el-pagination>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="addSourse" size="mini" type="success">添加课程</el-button>
      </div>
    </cwindow>
    <el-dialog :visible.sync="selectDialogVisible" title="选择课程" width="50%">
      <el-input placeholder="名称搜索" size="small" style="width: 250px;margin-bottom: 20px" v-model="allOfflineCourse.listQuery.keyword">
        <el-button @click="handleSelectSearch()" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <el-table :data="allOfflineCourse.list" @selection-change="handleDialogSelectionChange" border>
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="课程名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="课程老师" width="160">
          <template slot-scope="scope">{{scope.row.teacher_name}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          :current-page.sync="allOfflineCourse.listQuery.pageNum"
          :page-size="allOfflineCourse.listQuery.pageSize"
          :page-sizes="[5,10,15]"
          :total="allOfflineCourse.total"
          @current-change="handleDialogCurrentChange"
          @size-change="handleDialogSizeChange"
          background
          layout="prev, pager, next"
        ></el-pagination>
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
      selectedCourse: {
        list: null,
        total: null,
        multipleSelection: [],
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5,
          storeId: ''
        }
      },
      allOfflineCourse: {
        list: null,
        total: null,
        multipleSelection: [],
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5,
          storeId: ''
        }
      },
      selectedCourseList: []
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
      this.selectedCourse.listQuery.pageNum = 1;
      this.addOffLineCourse(row)
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
      this.mm.need_tools = this.selectedProduct[0].name
      this.mm.product_id = this.selectedProduct[0].id
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
    handleDelClick(index, row) {
      let that = this
      let id = row.id
      this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        course.deleteOfflineCourseStore(id).then(res => {
          that.selectedCourse.list.splice(index, 1)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    addSourse() {
      this.selectDialogVisible = true;
      this.allOfflineCourse.listQuery.pageNum = 1
      this.allOfflineCourse.listQuery.keyword = ''
      this.allOfflineCourse.listQuery.storeId = this.selectedCourse.listQuery.storeId
      this.getDialogList();
    },
    getDialogList() {
      let that = this
      course.getAllOffLineList(this.allOfflineCourse.listQuery).then(res => {
        that.allOfflineCourse.list = res.rows;
        that.allOfflineCourse.total = res.total;
      })
    },
    closeProductGet() {
      this.selectDialogVisible = false

    },
    handleSelectSearch() {
      this.getDialogList();
    },
    handleDialogSizeChange(val) {
      this.allOfflineCourse.listQuery.pageNum = 1;
      this.allOfflineCourse.listQuery.pageSize = val;
      this.getDialogList();
    },
    handleDialogCurrentChange(val) {
      this.allOfflineCourse.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleSelectDialogConfirm() {
      let that = this
      console.log(this.allOfflineCourse.multipleSelection)
      if (this.allOfflineCourse.multipleSelection.length < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let selectedList = [];
      for (let i = 0; i < this.allOfflineCourse.multipleSelection.length; i++) {
        let selected = {
          offline_course_id: this.allOfflineCourse.multipleSelection[i].id,
          store_id: this.allOfflineCourse.listQuery.storeId
        }
        selectedList.push(selected)
      }
      course.saveAllCourseStore({ selected: selectedList }).then(res => {
        course.getOffLineList(this.selectedCourse.listQuery).then(res => {
          that.selectedCourse.list = res.rows;
          that.selectedCourse.total = res.total;
          that.selectDialogVisible = false
        })
      })

      // this.selectedProduct.push(this.allOfflineCourse.multipleSelection[0])
      // console.log(this.selectedProduct)
      // this.selectDialogVisible = false;
      // this.$message({
      //   type: 'success',
      //   message: '添加成功!'
      // });
      // let selectProducts = [];
      // for (let i = 0; i < this.dialogData.multipleSelection.length; i++) {
      //   selectProducts.push({
      //     productId: this.dialogData.multipleSelection[i].id,
      //     productName: this.dialogData.multipleSelection[i].name
      //   });
      // }

    },
    handleDialogSelectionChange(val) {
      this.allOfflineCourse.multipleSelection = val;
    },
    addOffLineCourse(row) {
      let that = this
      console.log(row)
      this.selectedCourse.listQuery.storeId = row.pk
      course.getOffLineList(this.selectedCourse.listQuery).then(res => {
        that.selectedCourse.list = res.rows;
        that.selectedCourse.total = res.total;
        that.winvisible = true
      })
    },
    handleSelectedSizeChange(val) {
      this.selectedCourse.listQuery.pageNum = 1;
      this.selectedCourse.listQuery.pageSize = val;
      let that = this
      course.getOffLineList(this.selectedCourse.listQuery).then(res => {
        that.selectedCourse.list = res.rows;
        that.selectedCourse.total = res.total;
        that.winvisible = true
      })
    },
    handleSelectedCurrentChange(val) {
      this.selectedCourse.listQuery.pageNum = val;
      let that = this
      course.getOffLineList(this.selectedCourse.listQuery).then(res => {
        that.selectedCourse.list = res.rows;
        that.selectedCourse.total = res.total;
        that.winvisible = true
      })
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
.selected_course {
  color: #f80254;
  font-size: 20px;
  width: 200px;
  margin-top: 10px;
}
</style>


