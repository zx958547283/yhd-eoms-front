<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini">添加</el-button>
      <!-- <el-button
        @click="goFlashList()"
        class="btn-add"
        size="mini"
        style="margin-right:20px;"
      >返回秒杀列表</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        border
        ref="flashSessionTable"
        style="width: 100%;"
        v-loading="listLoading"
      >
        <!-- <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column> -->
        <el-table-column type="index" align="center" width="100" label="编号"></el-table-column>  
        <el-table-column align="center" label="秒杀时间段名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="每日开始时间">
          <template slot-scope="scope">{{scope.row.start_time}}</template>
        </el-table-column>
        <el-table-column align="center" label="每日结束时间">
          <template slot-scope="scope">{{scope.row.end_time}}</template>
        </el-table-column>
        <el-table-column align="center" label="启用">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.$index, scope.row)"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="添加时间段" width="40%">
      <el-form :model="flashSession" label-width="150px" ref="flashSessionForm" size="small">
        <el-form-item label="秒杀时间段名称：">
          <el-input style="width: 250px" v-model="flashSession.name"></el-input>
        </el-form-item>
        <el-form-item label="每日开始时间：">
          <el-time-picker
            placeholder="请选择时间"
            v-model="flashSession.start_time"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="每日结束时间：">
          <el-time-picker
            placeholder="请选择时间"
            v-model="flashSession.end_time"
            value-format="HH:mm:ss"
          ></el-time-picker>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="flashSession.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">不启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { formatDate } from '@/utils/date';
import sms from "@/api/sms";
const defaultFlashSession = {
  name: null,
  start_time: null,
  end_time: null,
  status: 0
};
export default {
  data() {
    return {
      list: null,
      listLoading: false,
      dialogVisible: false,
      isEdit: false,
      flashSession: Object.assign({}, defaultFlashSession)
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      console.log(time);
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'hh:mm:ss')
    }
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.flashSession = Object.assign({}, defaultFlashSession);
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.updateFlashSessionStatus({ id: row.id, exc_key: row.exc_key, status: row.status }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
        this.getList();
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.flashSession = Object.assign({}, row);
      this.flashSession.startTime = new Date(row.startTime);
      this.flashSession.endTime = new Date(row.endTime);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该时间段?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteFlashPromotionSession({ pk: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          sms.saveFlashPromotionSession(this.flashSession).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          sms.saveFlashPromotionSession(this.flashSession).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    getList() {
      this.listLoading = true;
      sms.getFlashSessionListAll().then(res => {
        this.listLoading = false;
        this.list = res;
      });
    },
    goFlashList() {
      this.$router.push({ path: '/sms/flashPromotion' })
    }
  }
}
</script>
<style scoped>
.operate-container {
  margin-top: 0;
}
</style>


