<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button @click="handleSearchList()" size="small" style="float:right" type="primary">查询搜索</el-button>
        <el-button
          @click="handleResetSearch()"
          size="small"
          style="float:right;margin-right: 15px"
        >重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="优惠券名称：">
            <el-input class="input-width" placeholder="优惠券名称" v-model="listQuery.name"></el-input>
          </el-form-item>
          <el-form-item label="优惠券类型：">
            <el-select class="input-width" clearable placeholder="全部" v-model="listQuery.type">
              <el-option
                :key="item.value"
                :label="item.label"
                :value="item.value"
                v-for="item in typeOptions"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        @selection-change="handleSelectionChange"
        border
        ref="couponTable"
        style="width: 100%;"
        v-loading="listLoading"
      >
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="优惠劵名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="优惠券类型" width="100">
          <template slot-scope="scope">{{scope.row.type | formatType}}</template>
        </el-table-column>
        <el-table-column align="center" label="可使用商品" width="100">
          <template slot-scope="scope">{{scope.row.use_type | formatUseType}}</template>
        </el-table-column>
        <el-table-column align="center" label="使用门槛" width="140">
          <template slot-scope="scope">满{{scope.row.min_point}}元可用</template>
        </el-table-column>
        <el-table-column align="center" label="面值" width="100">
          <template slot-scope="scope">{{scope.row.amount}}元</template>
        </el-table-column>
        <el-table-column align="center" label="适用平台" width="100">
          <template slot-scope="scope">{{scope.row.platform | formatPlatform}}</template>
        </el-table-column>
        <el-table-column align="center" label="有效期" width="180">
          <template
            slot-scope="scope"
          >{{scope.row.start_time | formatDate}}至{{scope.row.end_time | formatDate}}</template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="100">
          <template slot-scope="scope">{{scope.row.end_time | formatStatus}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="handleView(scope.$index, scope.row)" size="mini" type="text">查看</el-button>
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>
<script>
import sms from '@/api/sms';
import { formatDate } from '@/utils/date';
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  name: null,
  type: null
};
const defaultTypeOptions = [
  {
    label: '全场赠券',
    value: 0
  },
  {
    label: '会员赠券',
    value: 1
  },
  {
    label: '购物赠券',
    value: 2
  },
  {
    label: '注册赠券',
    value: 3
  }
];
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      typeOptions: Object.assign({}, defaultTypeOptions),
      list: null,
      total: null,
      listLoading: false,
      multipleSelection: []
    }
  },
  created() {
    this.getList();
  },
  filters: {
    formatType(type) {
      for (let i = 0; i < defaultTypeOptions.length; i++) {
        if (type === defaultTypeOptions[i].value) {
          return defaultTypeOptions[i].label;
        }
      }
      return '';
    },
    formatUseType(useType) {
      if (useType === 0) {
        return '全场通用';
      } else if (useType === 1) {
        return '指定分类';
      } else {
        return '指定商品';
      }
    },
    formatPlatform(platform) {
      if (platform === 1) {
        return '移动平台';
      } else if (platform === 2) {
        return 'PC平台';
      } else {
        return '全平台';
      }
    },
    formatDate(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    },
    formatStatus(endTime) {
      let now = new Date().getTime();
      if (new Date(Date.parse(endTime)).getTime() > now) {
        return '未过期'
      } else {
        return '已过期';
      }
    }
  },
  methods: {
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
    handleAdd() {
      // this.$router.push({ path: '/sms/addCoupon' })
      utility.addtagview(this, "优惠券-添加", "addCoupon");
    },
    handleView(index, row) {
      // this.$router.push({ path: '/sms/couponHistory', query: { id: row.id } })
      utility.addtagview(this, row.name, "updateCoupon", row.id);
    },
    handleUpdate(index, row) {
      // this.$router.push({ path: '/sms/updateCoupon', query: { id: row.id } })
      utility.addtagview(this, row.name + '编辑', "updateCoupon", row.id);
    },
    handleDelete(index, row) {
      this.$confirm('是否进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteCoupon({ pk: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      })
    },
    getList() {
      this.listLoading = true;
      sms.getCouponList(this.listQuery).then(res => {
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


