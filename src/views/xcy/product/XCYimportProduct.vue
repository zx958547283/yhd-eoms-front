<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <span>导入数据模板：</span>
        <el-select placeholder="请选择模板" v-model="value" size='small'>
          <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
        </el-select>
      </div>
      <div style="margin-top: 20px;">
        <span style="float:left;">导入数据文件：</span>
        <el-upload :action="uploadUrl" :before-remove="beforeRemove" :file-list="fileList" :limit="1" :on-exceed="handleExceed" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleAvatarSuccess" class="upload-demo" style="width:400px; float:left;" v-model="uploadUrl">
          <el-button size="small" type="primary">点击上传</el-button>
          <div class="el-upload__tip" slot="tip">上传excel文件</div>
        </el-upload>
        <el-button @click="handleShow()" class="btn-add" size="medium" style="margin-left: 20px; width:130px;" type="primary">加载</el-button>
        <el-button @click="handleAdd()" class="btn-add" size="medium" style="margin-left: 20px; width:130px;" type="primary">导入</el-button>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="产品名称" width="200">
          <template slot-scope="scope">{{scope.row.product_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="产品类别" width="200">
          <template slot-scope="scope">{{scope.row.product_type}}</template>
        </el-table-column>
        <el-table-column align="center" label="型号规格" width="200">
          <template slot-scope="scope">{{scope.row.product_attr}}</template>
        </el-table-column>
        <el-table-column align="center" label="生产企业名称" width="200">
          <template slot-scope="scope">{{scope.row.enterprise_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="受检企业名称" width="200">
          <template slot-scope="scope">{{scope.row.qc_org_name}}</template>
        </el-table-column>
        <el-table-column align="center" label="许可证号" width="150">
          <template slot-scope="scope">{{scope.row.permit}}</template>
        </el-table-column>
        <el-table-column align="center" label="批次号" width="150">
          <template slot-scope="scope">{{scope.row.batch_no}}</template>
        </el-table-column>
        <el-table-column align="center" label="备注">
          <template slot-scope="scope">{{scope.row.comment}}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import xcy from "@/api/xcy";
import { validateNumber } from "@/utils/validate";
import SingleUpload from "@/components/Upload/singleUpload";
const defaultListQuery = {
  pageNum: 0,
  pageSize: 10,
  filePath: '',
  fileName: ''
};
const defaultGroupActivity = {
  id: null,
  group_no: "0000",
  group_title: null,
  group_logo: null,
  begin_time: "",
  end_time: "",
  needs_min_num: null,
  max_num: null,
  limit_numbers: null,
  group_type: null,
  group_price: null,
  group_status: 1,
  timeRange: []
};
export default {
  components: { SingleUpload },
  data() {
    return {
      fileList: [],
      fileName: '',
      uploadUrl: process.env.JAVA_UPLOAD_ACTION,
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: false,
      list: [
        {
          id: "1",
          group_title: "普通拼团活动",
          group_logo:
            "http://cdn2.image.apk.gfan.com/asdf/PImages/2014/9/9/323659_2675220fe-8ab1-4c03-afac-802e09258748.png",
          begin_time: "2018-04-05 08:00:00",
          end_time: "2020-04-05 08:00:00",
          needs_min_num: "2",
          max_num: "10",
          limit_numbers: "1",
          group_type: "0",
          group_price: "",
          group_status: 1
        }
      ],
      total: 2,
      groupActivity: Object.assign({}, defaultGroupActivity),
      options: [{
        value: '0',
        label: '产品信息表'
      }],
      value: '0'
    };
  },
  created() {
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
    handleShow() {
      this.listLoading = true;
      xcy.showExcelFile(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    handleAdd() {
      xcy.saveExcelFile(this.listQuery).then(res => {
        this.$notify({
          title: '成功',
          message: '数据导入成功!',
          type: 'success'
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.handleShow();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.handleShow();
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.handleShow();
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
      this.groupActivity = Object.assign({}, row);
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
      this.$confirm('是否要删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteGroupActivity({ pk: row.id }).then(response => {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.list = [];
      this.total = '';
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(this.uploadUrl)
      this.listQuery.fileName = res.data.name;
      this.listQuery.filePath = res.data.fullPath;
    }
  }
};
</script>
<style>
</style>


