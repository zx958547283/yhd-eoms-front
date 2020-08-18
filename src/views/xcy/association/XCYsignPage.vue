<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="标题" width="140">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>

        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="添加" width="60%">
      <el-form :model="signPage" label-width="150px" ref="signPageForm" size="small">
        <el-form-item label="标题：">
          <el-input style="width: 250px" v-model="signPage.title"></el-input>
          <tinymce :height="300" :toolbar="toolbar" :width="825" style="margin-top:10px;" v-model="signPage.content"></tinymce>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm('signPageForm')" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
// import xcy from "@/api/xcy";
import xcy from "../../../api/xcy";
import Tinymce from '@/components/Tinymce'
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
const defaultSignPage = {
  id: null,
  title: "",
  content: null,
  exc_key: '',
  deflist_id: '3033c223-303d-4314-80a1-d00c5aac5aa2'
};
export default {
  components: { Tinymce },
  data() {
    return {
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: false,
      list: [
        {
          id: "1",
          title: "普通拼团活动"
        }
      ],
      total: 2,
      signPage: Object.assign({}, defaultSignPage),
      dialogVisible: false,
      isEdit: false,
      groupType: [
        {
          value: "0",
          label: "普通拼团"
        },
        {
          value: "1",
          label: "统一拼团价"
        }
      ],
      groupTypeValue: "",

      timeRange: [],
      groupPriceShow: false,
      value1: "",
      value2: ""
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatActiveStatus(row) {
      let nowTime = new Date().getTime();
      if (nowTime >= row.begin_time && nowTime <= row.end_time) {
        return "活动进行中";
      } else if (nowTime > row.endDate) {
        return "活动已结束";
      } else {
        return "活动未开始";
      }
    },
    formatDate(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  },
  methods: {
    getList() {
      this.listLoading = true;
      xcy.getSingPages(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleStatusChange(index, row) {
      this.$confirm("是否要修改该状态?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pms
            .updateGroupStatus({
              id: row.id,
              exc_key: row.exc_key,
              status: row.group_status
            })
            .then(response => {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
            });
          this.getList();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消修改"
          });
          this.getList();
        });
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.signPage = Object.assign({}, defaultSignPage);
    },
    handleDialogConfirm(formName) {
      let that = this;
      that
        .$confirm("是否要确认?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          if (that.isEdit) {
            xcy.saveSingPage(that.signPage).then(response => {
              this.$message({
                message: "修改成功！",
                type: "success"
              });
              this.dialogVisible = false;
              this.getList();
            });
          } else {
            xcy.saveSingPage(that.signPage).then(response => {
              this.$message({
                message: "添加成功！",
                type: "success"
              });
              this.dialogVisible = false;
              this.getList();
            });
          }
        });
    },
    changeTimeRange() {
      console.log(this.timeRange);
    },
    groupTypeSelect(val) {
      console.log(val);
      if ("1" === val) {
        this.groupPriceShow = true;
      } else {
        this.groupPriceShow = false;
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      row.group_type = row.group_type + "";
      this.setDefaultValue(row);
      console.log(row);
      this.signPage = Object.assign({}, row);
    },
    setDefaultValue(row) {
      if ("" === row.title) {
        this.signPage.title = null;
      }
      if ("" === row.content) {
        this.signPage.content = null;
      }
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        xcy.deleteSingPage(row.id).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleSelectSession(index, row) {
      this.$router.push({ path: '/sms/groupProductList', query: { groupId: row.id, groupType: row.group_type } })
    }
  }
};
</script>
<style>
</style>


