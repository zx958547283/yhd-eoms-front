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

    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cnumber title="排序" v-model="mm.sort"></cnumber>
        <cradio :itemlists="statusList" :required="true" title="是否有效" v-model="mm.status"></cradio>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
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
        <el-table-column align="center" label="排序" width="160">
          <template slot-scope="scope">
            <el-input placeholder="请输入排序" v-model="scope.row.sort"></el-input>
          </template>
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
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import cont from "../../../api/cont";
import e from "../../../utils/excel";
import request from "../../../utils/request";
import course from "../../../api/course";
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
      statusList: [
        {
          label: '0',
          txt: '无效'
        },
        {
          label: '1',
          txt: '有效'
        }
      ],
      selectDialogVisible: false,
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
      this.addSourse()
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, cont.getRecommend, row).then(res => {
        console.log(res)
        that.timeValue = [res.start_time, res.end_time]
      });;
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteRecommend);
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
      u.doSave(this, cont.saveRecommend);
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
    },
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    addSourse() {
      this.selectDialogVisible = true;
      this.allOfflineCourse.listQuery.pageNum = 1
      this.allOfflineCourse.listQuery.keyword = ''
      this.getDialogList();
    },
    getDialogList() {
      let that = this
      course.getRecommentNewCourse(this.allOfflineCourse.listQuery).then(res => {
        that.allOfflineCourse.list = res.rows;
        that.allOfflineCourse.total = res.total;
      })
    },
    handleDialogSelectionChange(val) {
      this.allOfflineCourse.multipleSelection = val;
    },
    closeProductGet() {
      this.selectDialogVisible = false

    },
    handleSelectDialogConfirm() {
      console.log(this.allOfflineCourse.multipleSelection)
      if (this.allOfflineCourse.multipleSelection.length < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let selected = []
      for (let i = 0; i < this.allOfflineCourse.multipleSelection.length; i++) {
        let sort = '0'
        if (undefined === this.allOfflineCourse.multipleSelection[i].sort || null === this.allOfflineCourse.multipleSelection[i].sort || '' === this.allOfflineCourse.multipleSelection[i].sort) {

        } else {
          sort = this.allOfflineCourse.multipleSelection[i].sort
        }
        let select = {
          'type': '1',
          'union_id': this.allOfflineCourse.multipleSelection[i].id,
          'sort': sort,
          'status': '1'
        }
        selected.push(select)
      }
      let that = this
      course.saveRecommentCourseList({ 'list': selected }).then(res => {
        that.dataLoad()
        that.selectDialogVisible = false
      })

    },
    handleDialogCurrentChange(val) {
      this.allOfflineCourse.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleDialogSizeChange(val) {
      this.allOfflineCourse.listQuery.pageNum = 1;
      this.allOfflineCourse.listQuery.pageSize = val;
      this.getDialogList();
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


