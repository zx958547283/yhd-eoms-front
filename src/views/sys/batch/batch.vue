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
          <el-form-item label="任务名称：">
            <el-input class="input-width" clearable placeholder="任务名称" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini" style="margin-left: 20px">添加任务</el-button>
      <el-button @click="showRunNowEdit()" class="btn-add" size="mini" style="margin-left: 20px">在线执行器</el-button>
      <el-button @click="stopScheduler()" class="btn-add" size="mini" style="margin-left: 20px" v-if="isStart === '0'">暂停调度器</el-button>
      <el-button @click="startScheduler()" class="btn-add" size="mini" style="margin-left: 20px" v-if="isStart === '1'">启动调度器</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="任务名称" width="140">
          <template slot-scope="scope">{{scope.row.job_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="任务文件" width="400">
          <template slot-scope="scope">{{scope.row.job_class_path}}</template>
        </el-table-column>
        <el-table-column align="center" label="class名称" width="200">
          <template slot-scope="scope">{{scope.row.job_class_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="任务组名称" width="100">
          <template slot-scope="scope">{{scope.row.job_group_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="CRON表达式" width="200">
          <template slot-scope="scope">{{scope.row.CRON_EXPRESSION}}</template>
        </el-table-column>
        <el-table-column align="center" label="下次运行时间" width="140">
          <template slot-scope="scope">{{scope.row.jobRunTime}}</template>
        </el-table-column>
        <el-table-column align="center" label="任务状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.triggerState === 'NORMAL'">正常</span>
            <span v-else-if="scope.row.triggerState === 'PAUSED'">暂停</span>
            <span v-else-if="scope.row.triggerState === 'COMPLETE'">完成</span>
            <span v-else-if="scope.row.triggerState === 'ERROR'">错误</span>
            <span v-else-if="scope.row.triggerState === 'BLOCKED'">阻塞</span>
            <span v-else>启动器停止</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="editJavaFile(scope.$index, scope.row)" size="mini" type="text" v-if="null !== scope.row.job_class_path && undefined !== scope.row.job_class_path && '' !== scope.row.job_class_path">编辑Job文件</el-button>
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑CRON</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
            <el-button @click="pauseJob(scope.$index, scope.row)" size="mini" type="text" v-if="scope.row.triggerState === 'NORMAL'">暂停</el-button>
            <el-button @click="resumejob(scope.$index, scope.row)" size="mini" type="text" v-else>恢复任务</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="添加任务" width="40%">
      <el-form :model="task" :rules="rules" label-width="150px" ref="taskForm" size="small">
        <el-form-item label="任务名称：" prop="job_name">
          <el-input style="width: 250px" v-model="task.job_name"></el-input>
        </el-form-item>
        <el-form-item label="任务文件：" v-if="!isEdit">
          <csupload :action="uploadUrl" :length="1" fileType="java" title="任务文件" v-model="task.job_class_path"></csupload>
        </el-form-item>
        <el-form-item label="任务执行 包+class名" prop="job_class_name">
          <el-input style="width: 250px" v-model="task.job_class_name"></el-input>
        </el-form-item>
        <el-form-item label="任务组名称：" prop="job_group_name">
          <el-input style="width: 250px" v-model="task.job_group_name"></el-input>
        </el-form-item>
        <el-form-item label="CRON表达式：" prop="cron">
          <el-input style="width: 250px" v-model="task.cron"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm('taskForm')" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <cwindow style="top: 0px; width:1000px;" title="文件编辑" v-model="javaShow">
      <div class="page-controlstyle">
        <!-- <csupload :action="uploadUrl" :length="1" :on-success="handleUploadSuccess" fileType="java" title="重新上传任务文件" v-model="task.job_class_path"></csupload> -->

        <el-upload :action="uploadUrl" :file-list="fileList" :on-success="handleUploadSuccess" class="upload-demo" list-type="picture" show-file-list="true" v-model="task.job_class_path">
          <el-button size="small" type="primary">重新上传任务文件</el-button>
        </el-upload>

        <el-input placeholder="请输入内容" rows="30" style="margin-top:20px;" type="textarea" v-model="fileInfo"></el-input>
      </div>

      <div class="dialog-footer">
        <el-button @click="javaShow=false" size="mini">取消</el-button>
        <el-button @click="doCompilerFile" size="mini" type="primary">编译上传的文件</el-button>
        <el-button @click="doSaveFileEdit" size="mini" type="primary">保存修改并编译</el-button>
      </div>
    </cwindow>

    <cwindow style="top: 20px; width:1000px;" title="文件编辑" v-model="showRunNow">
      <div class="page-controlstyle">
        <el-input placeholder="请输入内容" rows="30" style="margin-top:20px;" type="textarea" v-model="runNowSrc"></el-input>
      </div>

      <div class="dialog-footer">
        <el-button @click="showRunNow=false" size="mini">取消</el-button>
        <el-button @click="runNow" size="mini" type="primary">立即执行</el-button>
        <el-button @click="saveRunNowFile" size="mini" type="primary">保存</el-button>
      </div>
    </cwindow>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import sms from "@/api/sms";
import sys from "@/api/sys";
import { validateNumber } from "@/utils/validate";
import SingleUpload from "@/components/Upload/singleUpload";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultTask = {
  id: null,
  job_name: "",
  job_class_name: "",
  job_group_name: "",
  job_class_path: "",
  cron: "",
  file_info: ""
};
export default {
  components: { SingleUpload },
  data() {
    return {
      fileList: [],
      javaShow: false,
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: false,
      list: [

      ],
      total: 2,
      task: Object.assign({}, defaultTask),
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
      rules: {
        job_name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        job_class_name: [
          { required: true, message: "请输入包 + 类名", trigger: "blur" }
        ],
        job_group_name: [
          { required: true, message: "请输入组名", trigger: "blur" }
        ],
        cron: [{
          required: true, message: "请输CRON规则", trigger: "blur"
        }]
      },
      timeRange: [],
      groupPriceShow: false,
      value1: "",
      value2: "",
      uploadUrl: process.env.JAVA_UPLOAD_ACTION,
      fileInfo: "",
      isStart: "0",
      showRunNow: false,
      runNowSrc: ""
    };
  },
  created() {
    console.log("create")
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
      sys.getTaskList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.jobList.rows;
        this.total = res.jobList.total;
        this.isStart = res.isStart
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
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.task = Object.assign({}, defaultTask);
    },
    handleDialogConfirm(formName) {
      let that = this;
      console.log(that.groupActivity);
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {

          that
            .$confirm("是否要确认?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              if (that.isEdit) {
                sys.updateTask({ jobClassName: that.task.job_class_name, jobGroupName: that.task.job_group_name, cronExpression: that.task.cron }).then(response => {
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.getList();
                });
              } else {
                sys.addtask(that.task).then(response => {
                  this.$message({
                    message: "添加成功！",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.getList();
                });
              }
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
      this.task = Object.assign({}, row);
      this.task.cron = row.CRON_EXPRESSION
    },
    setDefaultValue(row) {
      if ("" === row.max_num) {
        this.groupActivity.max_num = null;
      }
      if ("" === row.limit_numbers) {
        this.groupActivity.limit_numbers = null;
      }
      if ("" === row.group_price) {
        this.groupActivity.group_price = null;
      }
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该任务?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sys.deletejob({ job_class_name: row.job_class_name, job_group_name: row.job_group_name }).then(response => {
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
    },
    pauseJob(index, row) {
      sys.pauseJob({ job_class_name: row.job_class_name, job_group_name: row.job_group_name }).then(response => {
        this.$message({
          type: 'success',
          message: '已暂停!'
        });
        this.getList();
      });
    },
    resumejob(index, row) {
      sys.resumejob({ job_class_name: row.job_class_name, job_group_name: row.job_group_name }).then(response => {
        this.$message({
          type: 'success',
          message: '已恢复!'
        });
        this.getList();
      });
    },
    editJavaFile(index, row) {
      this.fileList = []
      this.javaShow = true
      this.task = Object.assign({}, row);
      let that = this
      sys.getJavaFileInfo({ classFilePath: row.job_class_path }).then(res => {
        that.task.file_info = res.fileInfo
        that.fileInfo = res.fileInfo
        let onefile = {
          "name": res.fileName,
          "url": row.job_class_path
        }
        that.fileList = []
        that.fileList.push(onefile)
        console.log(that.task.file_info)
      });
    },
    handleUploadSuccess(res, file) {
      console.log(res)
      let that = this
      // let path = res.data.fileURL;
      let path = res.data.fullAbsultePath;
      // 重新加载文件内容
      sys.getJavaFileInfo({ classFilePath: path }).then(res1 => {
        that.task.file_info = res1.fileInfo
        that.fileInfo = res1.fileInfo
        let onefile = {
          "name": res1.fileName,
          "url": path
        }
        that.fileList = []
        console.log(that.fileList)
        that.fileList.push(onefile)
      });
    },
    doCompilerFile() {
      sys.doCompilerFile({ filePath: this.fileList[0].url }).then(res1 => {
        this.$message({
          type: 'success',
          message: '编译成功!'
        });
      });
    },
    doSaveFileEdit() {
      sys.doSaveFileEdit({ filePath: this.fileList[0].url, content: this.fileInfo }).then(res1 => {
        this.$message({
          type: 'success',
          message: '编译成功!'
        });
      });
    },
    stopScheduler() {
      let that = this
      sys.stopScheduler({}).then(res1 => {
        this.$message({
          type: 'success',
          message: '已停止!'
        });
        that.getList();
      });
    },
    startScheduler() {
      let that = this
      sys.startScheduler({}).then(res1 => {
        this.$message({
          type: 'success',
          message: '已启动!'
        });
        that.getList();
      });
    },
    showRunNowEdit() {
      this.showRunNow = true
      this.runNowSrc = ""
      let that = this
      let path = process.env.SIMPLE_JOB_FILE_PATH;
      // 重新加载文件内容
      sys.getJavaFileInfo({ classFilePath: path }).then(res1 => {
        that.runNowSrc = res1.fileInfo
      });
    },
    runNow() {
      let that = this
      sys.runNow({ content: this.runNowSrc }).then(res => {
        this.$message({
          type: 'success',
          message: '执行成功!'
        });
      });
    }
  }
};
</script>
<style>
</style>


