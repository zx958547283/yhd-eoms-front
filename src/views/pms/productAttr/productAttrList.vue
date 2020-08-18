<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">商品{{titleType}}【{{title}}】列表</span>
      <el-button @click="addProductAttr()" class="btn-add" size="mini">添加</el-button>
      <!-- <el-button @click="backList()" class="btn-add" size="mini" style="margin-right:10px;">返回【{{title}}】{{titleType}}列表</el-button> -->
    </el-card>
    <div class="table-container">
      <el-table :data="list" @selection-change="handleSelectionChange" border ref="productAttrTable" style="width: 100%" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="属性名称" width="140">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品类型" width="140">
          <template slot-scope="scope">{{$route.query.cname}}</template>
        </el-table-column>
        <el-table-column align="center" label="属性是否可选" width="120">
          <template slot-scope="scope">{{scope.row.select_type | selectTypeFilter}}</template>
        </el-table-column>
        <el-table-column align="center" label="属性值的录入方式" width="150">
          <template slot-scope="scope">{{scope.row.input_type | inputTypeFilter}}</template>
        </el-table-column>
        <el-table-column align="center" label="可选值列表">
          <template slot-scope="scope">{{scope.row.input_list}}</template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort}}</template>
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
import pms from "@/api/pms";
import utility from "@/utils/utility";
export default {
  data() {
    return {
      title: utility.getpageparmas(this)[1],
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5,
        type: utility.getpageparmas(this)[2],
        product_attribute_category_id: utility.getpageparmas(this)[0]
      },
      operateType: null,
      multipleSelection: [],
      operates: [
        {
          label: "删除",
          value: "deleteProductAttr"
        }
      ]
    };
  },
  computed: {
    titleType() {
      if (utility.getpageparmas(this)[2] == 0) {
        return "规格";
      } else {
        return "参数";
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    backList() {
      this.$router.push({
        path: "/pms/productAttr"
      });
    },
    getList() {
      this.listLoading = true;
      pms.getAttributeListByCategory(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    addProductAttr() {
      // this.$router.push({
      //   path: '/pms/addProductAttr',
      //   query: {
      //     cid: utility.getpageparmas(this).cid,
      //     type: utility.getpageparmas(this).type,
      //     cname: utility.getpageparmas(this).cname
      //   }
      // });
      utility.addtagview(this, "添加商品属性", "addProductAttr", `${utility.getpageparmas(this)[0]},${utility.getpageparmas(this)[1]},${utility.getpageparmas(this)[2]}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleBatchOperate() {
      if (this.multipleSelection < 1) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (this.operateType !== "deleteProductAttr") {
        this.$message({
          message: "请选择批量操作类型",
          type: "warning",
          duration: 1000
        });
        return;
      }
      let ids = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        ids.push(this.multipleSelection[i].id);
      }
      this.handleDeleteProductAttr(ids);
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
    handleUpdate(index, row) {
      // this.$router.push({
      //   path: "/pms/updateProductAttr",
      //   query: {
      //     id: row.id,
      //     cid: utility.getpageparmas(this)[0],
      //     cname: utility.getpageparmas(this)[1],
      //     type: utility.getpageparmas(this)[2]
      //   }
      // });
      utility.addtagview(this, row.name + "-编辑", "updateProductAttr", `${utility.getpageparmas(this)[0]},${utility.getpageparmas(this)[1]},${utility.getpageparmas(this)[2]},${row.id}`);
    },
    handleDeleteProductAttr(ids) {
      console.log(ids);
      this.$confirm("是否要删除该属性", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        pms.deleteProductAttribute({ pk: ids.join(",") }).then(response => {
          this.$message({
            message: "删除成功",
            type: "success",
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleDelete(index, row) {
      let ids = [];
      ids.push(row.id);
      this.handleDeleteProductAttr(ids);
    }
  },
  filters: {
    inputTypeFilter(value) {
      if (value === 1) {
        return "从列表中选取";
      } else {
        return "手工录入";
      }
    },
    selectTypeFilter(value) {
      if (value === 1) {
        return "单选";
      } else if (value === 2) {
        return "多选";
      } else {
        return "唯一";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>


