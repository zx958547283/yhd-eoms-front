<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        border
        ref="returnReasonTable"
        style="width: 100%;"
        v-loading="listLoading"
      >
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="80">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="原因类型">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column align="center" label="是否可用">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.$index,scope.row)"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="添加时间" width="180">
          <template slot-scope="scope">{{scope.row.create_time | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select placeholder="批量操作" size="small" v-model="operateType">
        <el-option
          :key="item.value"
          :label="item.label"
          :value="item.value"
          v-for="item in operateOptions"
        ></el-option>
      </el-select>
      <el-button
        @click="handleBatchOperate"
        class="search-button"
        size="small"
        style="margin-left: 20px"
        type="primary"
      >确定</el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="total, sizes,prev, pager, next,jumper"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="添加退货原因" width="30%">
      <el-form :model="returnReason" label-width="150px" ref="reasonForm">
        <el-form-item label="原因类型：">
          <el-input class="input-width" v-model="returnReason.name"></el-input>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input class="input-width" v-model="returnReason.sort"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-switch :active-value="'1'" :inactive-value="'0'" v-model="returnReason.status"></el-switch>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="handleConfirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
import oms from '@/api/oms'

const defaultListQuery = {
  pageNum: 1,
  pageSize: 5
};
const defaultReturnReason = {
  name: null,
  sort: 0,
  status: 1,
  createTime: null
};
export default {
  name: 'returnReasonList',
  data() {
    return {
      list: null,
      total: null,
      multipleSelection: [],
      listLoading: true,
      listQuery: Object.assign({}, defaultListQuery),
      operateType: null,
      operateOptions: [
        {
          label: "删除",
          value: 1
        }
      ],
      dialogVisible: false,
      returnReason: Object.assign({}, defaultReturnReason),
      operateReasonId: null
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.operateReasonId = null;
      this.returnReason = Object.assign({}, defaultReturnReason);
    },
    handleConfirm() {
      if (this.operateReasonId == null) {
        //添加操作
        oms.saveOrderReturnReason(this.returnReason).then(response => {
          this.dialogVisible = false;
          this.operateReasonId = null;
          this.$message({
            message: '添加成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      } else {
        //编辑操作
        oms.saveOrderReturnReason(this.returnReason).then(response => {
          this.dialogVisible = false;
          this.operateReasonId = null;
          this.$message({
            message: '修改成功！',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.operateReasonId = row.id;
      oms.getOrderReturnReason({ pk: row.id }).then(res => {
        console.log(res);
        this.returnReason = res;
      });
    },
    handleDelete(index, row) {
      let ids = [];
      ids.push(row.id);
      this.deleteReason(ids);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleStatusChange(index, row) {
      let ids = [];
      let exc_keys = [];
      ids.push(row.id);
      exc_keys.push(String(row.exc_key));
      oms.doUpdateReturnReasonStatus({
        ids,
        exc_keys,
        status: String(row.status)
      }).then(response => {
        this.$message({
          message: '状态修改成功',
          type: 'success'
        });
        this.getList();
      });
    },
    handleBatchOperate() {
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的条目',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.operateType === 1) {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        this.deleteReason(ids);
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
      oms.getOrderReturnReasonList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    deleteReason(ids) {
      this.$confirm('是否要进行该删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        oms.deleteOrderReturnReason({
          pk: ids.join(",")
        }).then(response => {
          this.$message({
            message: '删除成功！',
            type: 'success',
            duration: 1000
          });
          this.listQuery.pageNum = 1;
          this.getList();
        });
      })
    },
  }
}
</script>
<style scoped>
.input-width {
  width: 80%;
}
</style>


