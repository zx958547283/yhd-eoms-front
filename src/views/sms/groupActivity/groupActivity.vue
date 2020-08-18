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
          <el-form-item label="拼团活动名称：">
            <el-input class="input-width" clearable placeholder="拼团活动名称" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini" style="margin-left: 20px">添加团购活动</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="拼团标题" width="140">
          <template slot-scope="scope">{{scope.row.group_title}}</template>
        </el-table-column>
        <el-table-column align="center" label="拼团开始时间" width="200">
          <template slot-scope="scope">{{scope.row.begin_time | formatDate}}</template>
        </el-table-column>
        <el-table-column align="center" label="拼团结束时间" width="200">
          <template slot-scope="scope">{{scope.row.end_time | formatDate}}</template>
        </el-table-column>
        <el-table-column align="center" label="最小拼团人数" width="100">
          <template slot-scope="scope">{{scope.row.needs_min_num}}</template>
        </el-table-column>
        <el-table-column align="center" label="最大拼团人数" width="100">
          <template slot-scope="scope">{{scope.row.max_num}}</template>
        </el-table-column>
        <el-table-column align="center" label="每人限购数量" width="100">
          <template slot-scope="scope">{{scope.row.limit_numbers}}</template>
        </el-table-column>
        <el-table-column align="center" label="拼团活动类型" width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.group_type === 0">普通拼团</span>
            <span v-else-if="scope.row.group_type === 1">统一价格拼团</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="拼团统一价格" width="100">
          <template slot-scope="scope">{{scope.row.group_price}}</template>
        </el-table-column>
        <el-table-column align="center" label="无效/有效" width="200">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.$index, scope.row)" v-model="scope.row.group_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleSelectSession(scope.$index, scope.row)" size="mini" type="text">设置商品</el-button>
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="添加团购" width="40%">
      <el-form :model="groupActivity" :rules="rules" label-width="150px" ref="groupActivityForm" size="small">
        <el-form-item label="拼团标题：" prop="group_title">
          <el-input style="width: 250px" v-model="groupActivity.group_title"></el-input>
        </el-form-item>
        <!-- <el-form-item label="拼团封面：">
          <single-upload style="width: 300px;display: inline-block;margin-left: 10px" v-model="groupActivity.group_logo"></single-upload>
        </el-form-item>-->
        <el-form-item label="* 拼团活动时间：">
          <el-date-picker placeholder="请选择时间" type="datetime" v-model="groupActivity.begin_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="* 结束时间：">
          <el-date-picker placeholder="请选择时间" type="datetime" v-model="groupActivity.end_time" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
        </el-form-item>
        <el-form-item label="最小拼团人数：" prop="needs_min_num">
          <el-input style="width: 250px" v-model.number="groupActivity.needs_min_num"></el-input>
        </el-form-item>
        <el-form-item label="最大拼团人数：">
          <el-input style="width: 250px" v-model.number="groupActivity.max_num"></el-input>
        </el-form-item>
        <el-form-item label="每人限购数量：">
          <el-input style="width: 250px" v-model.number="groupActivity.limit_numbers"></el-input>
        </el-form-item>
        <el-form-item label="拼团活动类型：" prop="group_type">
          <el-select @change="groupTypeSelect" placeholder="请选择" v-model="groupActivity.group_type">
            <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in groupType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="拼团统一价格：" prop="group_price" v-if="groupPriceShow">
          <el-input style="width: 250px" v-model.number="groupActivity.group_price"></el-input>
        </el-form-item>
        <el-form-item label="状态(有效/无效)">
          <el-radio-group v-model="groupActivity.group_status">
            <el-radio :label="1">有效</el-radio>
            <el-radio :label="0">无效</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm('groupActivityForm')" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import sms from "@/api/sms";
import { validateNumber } from "@/utils/validate";
import SingleUpload from "@/components/Upload/singleUpload";
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
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
        group_title: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        begin_time: [
          {
            type: "date",
            required: true,
            message: "请选择开始时间"
          }
        ],
        end_time: [
          {
            type: "date",
            required: true,
            message: "请选择结束时间"
          }
        ],
        time_range: [
          {
            type: "array",
            required: true,
            message: "请选择时间范围",
            trigger: "blur"
          }
        ],
        needs_min_num: [
          { required: true, message: "请输入最小拼团人数", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" }
        ],
        group_type: [
          { required: true, message: "请选择拼团活动类型", trigger: "change" }
        ],
        max_num: [{ type: "number", message: "请输入数字", trigger: "blur" }],
        limit_numbers: [
          { type: "number", message: "请输入数字", trigger: "blur" }
        ],
        group_price: [
          { type: "number", message: "请输入数字", trigger: "blur" }
        ]
      },
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
      sms.getGroupShopoingList(this.listQuery).then(res => {
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
      this.groupActivity = Object.assign({}, defaultGroupActivity);
    },
    handleDialogConfirm(formName) {
      let that = this;
      console.log(that.groupActivity);
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false;
        } else {
          console.log(that.groupActivity);
          if (
            null == that.groupActivity.begin_time ||
            "" === that.groupActivity.begin_time
          ) {
            that.$alert("开始时间不能为空!", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
            return;
          }
          if (
            null == that.groupActivity.end_time ||
            "" === that.groupActivity.end_time
          ) {
            that.$alert("结束时间不能为空!", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
            return;
          }
          let start = that.groupActivity.begin_time.replace(/-/g, "/");
          let end = that.groupActivity.end_time.replace(/-/g, "/");
          var d1 = new Date(Date.parse(start));
          var d2 = new Date(Date.parse(end));
          if (d2 <= d1) {
            that.$alert("结束时间不能小于开始时间!", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
            return;
          }
          // 数量是否为数字检查
          if (
            null !== that.groupActivity.max_num &&
            "" !== that.groupActivity.max_num &&
            !validateNumber(that.groupActivity.max_num)
          ) {
            that.$alert("最大拼团人数必须为数字!", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
            return;
          }
          if (
            null !== that.groupActivity.limit_numbers &&
            "" !== that.groupActivity.limit_numbers &&
            !validateNumber(that.groupActivity.limit_numbers)
          ) {
            that.$alert("每人限购数量必须为数字!", "提示", {
              confirmButtonText: "确定",
              callback: action => { }
            });
            return;
          }
          // 统一价格的场合 价格不能为空
          if (that.groupActivity.group_type === "1") {
            console.log(that.groupActivity.group_type);
            if (
              null === that.groupActivity.group_price ||
              "" === that.groupActivity.group_price ||
              0 === that.groupActivity.group_price
            ) {
              that.$alert("拼团统一价格不能为空!", "提示", {
                confirmButtonText: "确定",
                callback: action => { }
              });
              return;
            }
          }
          // 格式转换
          that.groupActivity.begin_time = start;
          that.groupActivity.end_time = end;
          that
            .$confirm("是否要确认?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              if (that.isEdit) {
                sms.saveGroupActivity(that.groupActivity).then(response => {
                  this.$message({
                    message: "修改成功！",
                    type: "success"
                  });
                  this.dialogVisible = false;
                  this.getList();
                });
              } else {
                sms.addGroupActivity(that.groupActivity).then(response => {
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
      // this.$router.push({ path: '/sms/groupProductList', query: { groupId: row.id, groupType: row.group_type } })
      utility.addtagview(this, row.group_title, "groupProductList", row.id + ',' + row.group_type);
    }
  }
};
</script>
<style>
</style>


