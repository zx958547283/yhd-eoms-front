<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button @click="handleSearchList()" size="small" style="float:right" type="primary">查询搜索</el-button>
        <el-button @click="handleResetSearch()" size="small" style="float:right;margin-right: 15px">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="输入搜索：">
            <el-input class="input-width" placeholder="服务单号" v-model="listQuery.id"></el-input>
          </el-form-item>
          <el-form-item label="处理状态：">
            <el-select class="input-width" clearable placeholder="全部" v-model="listQuery.status">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in statusOptions"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间：">
            <el-date-picker class="input-width" placeholder="请选择时间" type="date" v-model="listQuery.createTime" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="操作人员：">
            <el-input class="input-width" placeholder="全部" v-model="listQuery.handleMan"></el-input>
          </el-form-item>
          <el-form-item label="处理时间：">
            <el-date-picker class="input-width" placeholder="请选择时间" type="date" v-model="listQuery.handleTime" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" @selection-change="handleSelectionChange" border ref="returnApplyTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="服务单号" width="180">
          <template slot-scope="scope">{{scope.row.service_no}}</template>
        </el-table-column>
        <el-table-column align="center" label="申请时间" width="180">
          <template slot-scope="scope">{{scope.row.create_time | formatTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="用户账号">
          <template slot-scope="scope">{{scope.row.member_username}}</template>
        </el-table-column>
        <el-table-column align="center" label="退款金额" width="180">
          <template slot-scope="scope">￥{{scope.row | formatReturnAmount}}</template>
        </el-table-column>
        <el-table-column align="center" label="申请状态" width="180">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column align="center" label="处理时间" width="180">
          <template slot-scope="scope">{{scope.row.handle_time | formatTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleViewDetail(scope.$index, scope.row)" size="mini">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select placeholder="批量操作" size="small" v-model="operateType">
        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in operateOptions"></el-option>
      </el-select>
      <el-button @click="handleBatchOperate()" class="search-button" size="small" style="margin-left: 20px" type="primary">确定</el-button>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
import oms from '@/api/oms'
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  id: null,
  receiverKeyword: null,
  status: null,
  createTime: null,
  handleMan: null,
  handleTime: null
};
const defaultStatusOptions = [
  {
    label: '待处理',
    value: 0
  },
  {
    label: '退货中',
    value: 1
  },
  {
    label: '已完成',
    value: 2
  },
  {
    label: '已拒绝',
    value: 3
  }
];
export default {
  name: 'returnApplyList',
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      statusOptions: Object.assign({}, defaultStatusOptions),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: [],
      operateType: 1,
      operateOptions: [
        {
          label: "批量删除",
          value: 1
        }
      ],
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    formatStatus(status) {
      for (let i = 0; i < defaultStatusOptions.length; i++) {
        if (status === defaultStatusOptions[i].value) {
          return defaultStatusOptions[i].label;
        }
      }
    },
    formatReturnAmount(row) {
      // return row.product_real_price * row.product_count;
      return row.return_amount;
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleViewDetail(index, row) {
      // this.$router.push({ path: '/oms/applyDetail', query: { id: row.id } })
      utility.addtagview(this, "退货详情", "applyDetail", row.id);
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的申请',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        //批量删除
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          for (let i = 0; i < this.multipleSelection.length; i++) {
            ids.push(this.multipleSelection[i].id);
          }
          oms.deleteOrderReturnApply({
            pk: ids.join(",")
          }).then(response => {
            this.getList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          });
        })
      }
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    getList() {
      this.listLoading = true;
      oms.getOrderReturnApplyList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    }
  }
}
</script>
<style scoped>
.input-width {
  width: 203px;
}
</style>


