<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button @click="goBackParent()" class="btn-add" size="mini" style="margin-left:20px;" v-if="parentId != 0">返回上级</el-button>
      <el-button @click="handleAddProductCate()" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="productCateTable" style="width: 100%" v-loading="listLoading">
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column align="center" label="分类名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="级别" width="100">
          <template slot-scope="scope">{{scope.row.level | levelFilter}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品数量" width="100">
          <template slot-scope="scope">{{scope.row.product_count }}</template>
        </el-table-column>
        <el-table-column align="center" label="数量单位" width="100">
          <template slot-scope="scope">{{scope.row.product_unit }}</template>
        </el-table-column>
        <el-table-column align="center" label="导航栏" width="100">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" @change="handleNavStatusChange(scope.$index, scope.row)" v-model="scope.row.nav_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否显示" width="100">
          <template slot-scope="scope">
            <el-switch :active-value="1" :inactive-value="0" @change="handleShowStatusChange(scope.$index, scope.row)" v-model="scope.row.show_status"></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort }}</template>
        </el-table-column>
        <el-table-column align="center" label="设置" width="200">
          <template slot-scope="scope">
            <el-button :disabled="scope.row.level | disableNextLevel" @click="handleShowNextLevel(scope.$index, scope.row)" size="mini">查看下级</el-button>
            <el-button @click="handleTransferProduct(scope.$index, scope.row)" size="mini">转移商品</el-button>
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
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
  </div>
</template>

<script>
import pms from "@/api/pms";
import utility from "@/utils/utility";
export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        parent_id: 0
      },
      parentId: 0
    };
  },
  mounted() {
    this.resetParentId();
    this.getList();
  },
  watch: {
    $route(route) {
      this.resetParentId();
      this.getList();
    }
  },
  methods: {
    goBackParent() {
      this.parentId = 0;
      this.listQuery.parent_id = 0;
      this.$router.push({ path: "/pms/productCate", query: { parentId: 0 } });
    },
    resetParentId() {
      let id = utility.getpageparmas(this)[0];
      if (id != null) {
        this.parentId = id;
        this.listQuery.parent_id = this.parentId;
        this.listQuery.pageNum = 1;
      } else {
        this.parentId = 0;
        this.listQuery.parent_id = 0;
      }
    },
    handleAddProductCate() {
      // this.$router.push("/pms/productCateAdd");
      utility.addtagview(this, "添加商品分类", "productCateAdd");
    },
    getList() {
      this.listLoading = true;
      pms.searchProductCategory(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
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
    handleNavStatusChange(index, row) {
      pms
        .updateProductCatNavStatus({
          id: row.id,
          exc_key: row.exc_key,
          nav_status: row.nav_status
        })
        .then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        })
        .catch(err => {
          this.getList();
        });
    },
    handleShowStatusChange(index, row) {
      pms
        .updateProductCatShowStatus({
          id: row.id,
          exc_key: row.exc_key,
          show_status: row.show_status
        })
        .then(response => {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        })
        .catch(err => {
          this.getList();
        });
    },
    handleShowNextLevel(index, row) {
      // this.$router.push({ path: '/pms/productCate', query: { parentId: row.id } })
      utility.addtagview(this, row.name, "productCateList", row.id);
    },
    handleTransferProduct(index, row) {
      console.log("handleAddProductCate");
    },
    handleUpdate(index, row) {
      // this.$router.push({path: "/pms/productCateUpdate",query: { id: row.id }});
      utility.addtagview(this, "编辑-" + row.name, "productCateUpdate", row.id);
    },
    handleDelete(index, row) {
      this.$confirm("是否要删除该品牌", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          pms.deleteProductCategory({ pk: row.id }).then(response => {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 1000
            });
            this.getList();
          });
        })
        .catch(err => {
          this.getList();
        });
    }
  },
  filters: {
    levelFilter(value) {
      if (value === 0) {
        return "一级";
      } else if (value === 1) {
        return "二级";
      }
    },
    disableNextLevel(value) {
      if (value === 0) {
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>

<style scoped>
</style>
