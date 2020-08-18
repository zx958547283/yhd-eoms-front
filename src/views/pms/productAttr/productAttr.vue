<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets" style="margin-top: 5px"></i>
      <span style="margin-top: 5px">数据列表</span>
      <el-button @click="addProductAttrCate()" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        border
        ref="productAttrCateTable"
        style="width: 100%"
        v-loading="listLoading"
      >
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="类型名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="属性数量" width="200">
          <template slot-scope="scope">{{scope.row.attribute_count ? scope.row.attribute_count : 0}}</template>
        </el-table-column>
        <el-table-column align="center" label="参数数量" width="200">
          <template slot-scope="scope">{{scope.row.param_count ? scope.row.param_count : 0}}</template>
        </el-table-column>
        <el-table-column align="center" label="设置" width="200">
          <template slot-scope="scope">
            <el-button @click="getAttrList(scope.$index, scope.row)" size="mini">属性列表</el-button>
            <el-button @click="getParamList(scope.$index, scope.row)" size="mini">参数列表</el-button>
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
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="30%">
      <el-form :model="productAttrCate" :rules="rules" label-width="120px" ref="productAttrCatForm">
        <el-form-item label="类型名称" prop="name">
          <el-input auto-complete="off" v-model="productAttrCate.name"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="handleConfirm('productAttrCatForm')" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import pms from "@/api/pms";
import utility from '@/utils/utility';
export default {
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        pageNum: 1,
        pageSize: 5
      },
      dialogVisible: false,
      dialogTitle: '',
      productAttrCate: {
        name: '',
        id: null
      },
      rules: {
        name: [
          { required: true, message: '请输入类型名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.listLoading = true;
      pms.getAttributeCategoryList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
        console.log(res);
      });
    },
    addProductAttrCate() {
      this.dialogVisible = true;
      this.dialogTitle = "添加类型";
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
    handleDelete(index, row) {
      this.$confirm('是否要删除该品牌', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pms.deleteAttributetCategory({ pk: row.id }).then(response => {
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 1000
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.dialogTitle = "编辑类型";
      this.productAttrCate.name = row.name;
      this.productAttrCate.id = row.id;
      this.productAttrCate.exc_key = row.exc_key;
      this.productAttrCate.attribute_count = row.attribute_count;
      this.productAttrCate.param_count = row.param_count;
    },
    getAttrList(index, row) {
      // this.$router.push({ path: '/pms/productAttrList', query: { cid: row.id, cname: row.name, type: 0 } })
      // utility.addtagview(this, "属性列表-" + row.name, "productAttrList", row.id + ',' + row.name + ',' + 0);
      console.log('-------------')
      console.log(row)
      utility.addtagview(this, "属性列表-" + row.name, "productAttrList", `${row.id},${row.name},0`);
    },
    getParamList(index, row) {
      // this.$router.push({ path: '/pms/productAttrList', query: { cid: row.id, cname: row.name, type: 1 } })
      utility.addtagview(this, "参数列表-" + row.name, "productAttrList", `${row.id},${row.name},1`);
    },
    handleConfirm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.productAttrCate.attribute_count = 0;
          this.productAttrCate.param_count = 0;

          if (this.dialogTitle === "添加品牌") {
            pms.updateAttributetCategory(this.productAttrCate).then(response => {
              this.$message({
                message: '添加成功',
                type: 'success',
                duration: 1000
              });
              this.dialogVisible = false;
              this.getList();
            });
          } else {
            pms.updateAttributetCategory(this.productAttrCate).then(response => {
              this.$message({
                message: '修改成功',
                type: 'success',
                duration: 1000
              });
              this.dialogVisible = false;
              this.getList();
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
</style>


