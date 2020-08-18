<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button @click="searchBrandList()" size="small" style="float: right" type="primary">查询结果</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="输入搜索：">
            <el-input placeholder="品牌名称/关键字" style="width: 203px" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="addBrand()" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" @selection-change="handleSelectionChange" border ref="brandTable" style="width: 100%" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="品牌名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="品牌首字母" width="100">
          <template slot-scope="scope">{{scope.row.first_letter}}</template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column align="center" label="品牌制造商" width="100">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" @change="handleFactoryStatusChange(scope.$index, scope.row)" v-model="scope.row.factory_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否显示" width="100">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" @change="handleShowStatusChange(scope.$index, scope.row)" v-model="scope.row.show_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="相关" width="220">
          <template slot-scope="scope">
            <span>商品：</span>
            <el-button @click="getProductList(scope.$index, scope.row)" size="mini" type="text">{{scope.row.product_count}}</el-button>
            <span>评价：</span>
            <el-button @click="getProductCommentList(scope.$index, scope.row)" size="mini" type="text">{{scope.row.product_comment_count}}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select placeholder="批量操作" size="small" v-model="operateType">
        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in operates"></el-option>
      </el-select>
      <el-button @click="handleBatchOperate()" class="search-button" size="small" style="margin-left: 20px" type="primary">确定</el-button>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
  </div>
</template>
<script>
import pms from "@/api/pms"
import utility from '@/utils/utility';
export default {
  data() {
    return {
      operates: [
        {
          label: "显示品牌",
          value: "showBrand"
        },
        {
          label: "隐藏品牌",
          value: "hideBrand"
        }
      ],
      operateType: null,
      listQuery: {
        keyword: null,
        pageNum: 1,
        pageSize: 10
      },
      list: null,
      total: null,
      listLoading: true,
      multipleSelection: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      pms.getBrandList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
        this.totalPage = res.maxPage;
        this.pageSize = res.pageSize;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpdate(index, row) {
      // this.$router.push({ path: '/pms/updateBrand', query: { id: row.id } })
      utility.addtagview(this, row.name + "-修改", "updateBrand", row.id);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pms.deleteBrand({ pk: row.id }).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      });
    },
    getProductList(index, row) {
      console.log(index, row);
    },
    getProductCommentList(index, row) {
      console.log(index, row);
    },
    updateFactoryStatus(ids, excKeys, status) {
      pms.updateBrandFactoryStatus({
        id: ids.join(","),
        exc_key: excKeys.join(","),
        factory_status: status
      }).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
        this.getList();
      }).catch(error => {
        this.getList();
      });
    },
    handleFactoryStatusChange(index, row) {
      var ids = [];
      ids.push(row.id);
      var excKeys = [];
      excKeys.push(row.exc_key);
      this.updateFactoryStatus(ids, excKeys, row.factory_status);
    },
    updateShowStatus(ids, excKeys, status) {
      pms.updateBrandShowStatus({
        id: ids.join(","),
        exc_key: excKeys.join(","),
        show_status: status
      }).then(response => {
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
        this.getList();
      }).catch(error => {
        this.getList();
      });
    },
    handleShowStatusChange(index, row) {
      var ids = [];
      ids.push(row.id);
      var excKeys = [];
      excKeys.push(row.exc_key);
      this.updateShowStatus(ids, excKeys, row.show_status);
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
    searchBrandList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleBatchOperate() {
      console.log(this.multipleSelection);
      if (this.multipleSelection < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let showStatus = 0;
      if (this.operateType === 'showBrand') {
        showStatus = 1;
      } else if (this.operateType === 'hideBrand') {
        showStatus = 0;
      } else {
        this.$message({
          message: '请选择批量操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }

      let ids = [];
      let excKeys = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
        excKeys.push(this.multipleSelection[i].exc_key);
      }
      this.updateShowStatus(ids, excKeys, showStatus);
    },
    addBrand() {
      // this.$router.push({ path: '/pms/addBrand' })
      utility.addtagview(this, "添加品牌", "addBrand");
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


