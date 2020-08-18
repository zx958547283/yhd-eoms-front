<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleSelectProduct()" class="btn-add" size="mini" style="margin-left: 20px">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="productRelationTable" style="width: 100%;" v-loading="listLoading">
        <!-- <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column> -->
        <el-table-column type="index" align="center" width="100" label="编号"></el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="货号" width="140">
          <template slot-scope="scope">NO.{{scope.row.product_sn}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品价格" width="100">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>
        <el-table-column align="center" label="剩余数量" width="100">
          <template slot-scope="scope">{{scope.row.stock}}</template>
        </el-table-column>
        <el-table-column align="center" label="秒杀价格" width="100">
          <template slot-scope="scope">
            <p>￥{{scope.row.flash_promotion_price}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="秒杀数量" width="100">
          <template slot-scope="scope">{{scope.row.flash_promotion_count}}</template>
        </el-table-column>
        <el-table-column align="center" label="限购数量" width="100">
          <template slot-scope="scope">{{scope.row.flash_promotion_limit}}</template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="selectDialogVisible" title="选择商品" width="50%">
      <el-input placeholder="商品名称搜索" size="small" style="width: 250px;margin-bottom: 20px" v-model="dialogData.listQuery.keyword">
        <el-button @click="handleSelectSearch()" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <el-table :data="dialogData.list" @selection-change="handleDialogSelectionChange" border>
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="货号" width="160">
          <template slot-scope="scope">NO.{{scope.row.product_sn}}</template>
        </el-table-column>
        <el-table-column align="center" label="价格" width="120">
          <template slot-scope="scope">￥{{scope.row.price}}</template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination :current-page.sync="dialogData.listQuery.pageNum" :page-size="dialogData.listQuery.pageSize" :page-sizes="[5,10,15]" :total="dialogData.total" @current-change="handleDialogCurrentChange" @size-change="handleDialogSizeChange" background layout="prev, pager, next"></el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button @click="selectDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleSelectDialogConfirm()" size="small" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="editDialogVisible" title="编辑秒杀商品信息" width="40%">
      <el-form :model="flashProductRelation" :rules="rules" label-width="150px" ref="flashProductRelationForm" size="small">
        <el-form-item label="商品名称：">
          <span>{{flashProductRelation.name}}</span>
        </el-form-item>
        <el-form-item label="货号：">
          <span>NO.{{flashProductRelation.product_sn}}</span>
        </el-form-item>
        <el-form-item label="商品价格：">
          <span>￥{{flashProductRelation.price}}</span>
        </el-form-item>
        <el-form-item label="秒杀价格：" prop="flash_promotion_price">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_price">
            <template slot="prepend">￥</template>
          </el-input>
        </el-form-item>
        <el-form-item label="剩余数量：">
          <span>{{flashProductRelation.stock}}</span>
        </el-form-item>
        <el-form-item label="秒杀总量：" prop="flash_promotion_count">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_count"></el-input>
        </el-form-item>
        <el-form-item label="已购数量：" prop="purchased_quantity">
          <el-input class="input-width" v-model="flashProductRelation.purchased_quantity" disabled></el-input>
        </el-form-item>
        <el-form-item label="限购数量：" prop="flash_promotion_limit">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_limit"></el-input>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input class="input-width" v-model="flashProductRelation.sort"></el-input>
        </el-form-item>
        <el-form-item label="已购基数：" prop="purchased">
          <el-input class="input-width" v-model="flashProductRelation.purchased" placeholder="默认0"></el-input>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleEditDialogConfirm()" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import sms from "@/api/sms";
import pms from "@/api/pms";
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  flashPromotionId: null,
  flashPromotionSessionId: null
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      selectDialogVisible: false,
      dialogData: {
        list: null,
        total: null,
        multipleSelection: [],
        listQuery: {
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
      },
      editDialogVisible: false,
      flashProductRelation: {
        product: {}
      },
      rules: {
        flash_promotion_price: [
          { required: true, message: '请输入秒杀价格', trigger: 'blur' },
          { pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/, message: '请输入正确的价格', trigger: 'blur' }
        ],
        flash_promotion_count: [
          { required: true, message: '请输入秒杀数量', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入正确的秒杀数量', trigger: 'blur' }
        ],
        flash_promotion_limit: [
          { required: true, message: '请输入限购数量', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入正确的限购数量', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '请输入正确的排序', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.listQuery.flashPromotionId = utility.getpageparmas(this)[0];
    this.listQuery.flashPromotionSessionId = utility.getpageparmas(this)[1];
    this.getList();
  },
  methods: {
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectProduct() {
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    handleUpdate(index, row) {
      this.editDialogVisible = true;
      this.flashProductRelation = Object.assign({}, row);
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteFlashPromotionProductRelation({ pk: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleSelectSearch() {
      this.getDialogList();
    },
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getDialogList();
    },
    handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleDialogSelectionChange(val) {
      this.dialogData.multipleSelection = val;
    },
    handleSelectDialogConfirm() {
      if (this.dialogData.multipleSelection < 1) {
        this.$message({
          message: '请选择一条记录',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      let selectProducts = [];
      for (let i = 0; i < this.dialogData.multipleSelection.length; i++) {
        selectProducts.push({
          productId: this.dialogData.multipleSelection[i].id,
          flashPromotionId: this.listQuery.flashPromotionId,
          flashPromotionSessionId: this.listQuery.flashPromotionSessionId
        });
      }
      this.$confirm('使用要进行添加操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.addFlashProductRelationBatch({ selectProducts: selectProducts }).then(response => {
          this.selectDialogVisible = false;
          this.dialogData.multipleSelection = [];
          this.getList();
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        });
      });
    },
    handleEditDialogConfirm() {
      this.$refs['flashProductRelationForm'].validate((valid) => {
        if (valid) {
          this.$confirm('是否要确认?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            sms.saveFlashPromotionProductRelation(this.flashProductRelation).then(response => {
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.editDialogVisible = false;
              this.getList();
            })
          });
        }

      })
    },
    getList() {
      this.listLoading = true;
      sms.getFlashProductRelationList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
        console.log(this.list);
        console.log(res);
      });
    },
    getDialogList() {
      pms.getProductList(this.dialogData.listQuery).then(res => {
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      })
    }
  }
}
</script>
<style scoped>
.operate-container {
  margin-top: 0;
}
.input-width {
  width: 200px;
}
</style>


