<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button @click="handleSearchList()" size="small" style="float: right" type="primary">查询结果</el-button>
        <el-button @click="handleResetSearch()" size="small" style="float: right;margin-right: 15px">重置</el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" label-width="140px" size="small">
          <el-form-item label="输入搜索：">
            <el-input placeholder="商品名称" style="width: 203px" v-model="listQuery.keyword"></el-input>
          </el-form-item>
          <el-form-item label="商品货号：">
            <el-input placeholder="商品货号" style="width: 203px" v-model="listQuery.productSn"></el-input>
          </el-form-item>
          <el-form-item label="商品分类：">
            <el-cascader :options="productCateOptions" :props="{value:'id', label:'name',children:'childList',checkStrictly: true}" clearable v-model="selectProductCateValue"></el-cascader>
          </el-form-item>
          <el-form-item label="商品品牌：">
            <el-select clearable placeholder="请选择品牌" v-model="listQuery.brandId">
              <el-option :key="item.id" :label="item.name" :value="item.id" v-for="item in brandOptions"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架状态：">
            <el-select clearable placeholder="全部" v-model="listQuery.publishStatus">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in publishStatusOptions"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="审核状态：">
            <el-select clearable placeholder="全部" v-model="listQuery.verifyStatus">
              <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in verifyStatusOptions"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAddProduct()" class="btn-add" size="mini">添加</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" @selection-change="handleSelectionChange" border ref="productTable" style="width: 100%" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.code}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 80px" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称">
          <template slot-scope="scope">
            <p>{{scope.row.name}}</p>
            <p>品牌：{{scope.row.brand_name}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="价格/货号" width="120">
          <template slot-scope="scope">
            <p>价格：￥{{scope.row.price}}</p>
            <p>货号：{{scope.row.product_sn}}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标签" width="140">
          <template slot-scope="scope">
            <!-- <p>
              上架：
              <el-switch :active-value="1" :inactive-value="0" @change="handlePublishStatusChange(scope.$index, scope.row)" v-model="scope.row.publish_status"></el-switch>
            </p>-->
            <p>
              新品：
              <el-switch :active-value="1" :inactive-value="0" @change="handleNewStatusChange(scope.$index, scope.row)" v-model="scope.row.new_status"></el-switch>
            </p>
            <p>
              推荐：
              <el-switch :active-value="1" :inactive-value="0" @change="handleRecommendStatusChange(scope.$index, scope.row)" v-model="scope.row.recommand_status"></el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="排序" width="100">
          <template slot-scope="scope">{{scope.row.sort}}</template>
        </el-table-column>
        <el-table-column align="center" label="SKU库存" width="100">
          <template slot-scope="scope">
            <el-button @click="handleShowSkuEditDialog(scope.$index, scope.row)" circle icon="el-icon-edit" type="primary"></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="销量" width="100">
          <template slot-scope="scope">{{scope.row.sale}}</template>
        </el-table-column>
        <el-table-column align="center" label="审核状态" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.verify_status | verifyStatusFilter}}</p>
            <!-- <p>
              <el-button @click="handleShowVerifyDetail(scope.$index, scope.row)" type="text">审核详情</el-button>
            </p>-->
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="160">
          <template slot-scope="scope">
            <p>
              <el-button @click="handleShowProduct(scope.$index, scope.row)" size="mini">查看</el-button>
              <el-button @click="handleUpdateProduct(scope.$index, scope.row)" size="mini">编辑</el-button>
            </p>
            <p>
              <el-button @click="handleShowLog(scope.$index, scope.row)" size="mini">日志</el-button>
              <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
            </p>
            <p>
              <el-button @click="saveVerifyStatus(scope.$index, scope.row)" size="mini" type="primary" v-if="scope.row.verify_status === 0">审核</el-button>
              <el-button @click="savePublishStatus(scope.row, 1)" size="mini" type="danger" v-if="scope.row.publish_status === 0">上架</el-button>
              <el-button @click="savePublishStatus(scope.row, 0)" size="mini" type="primary" v-if="scope.row.publish_status === 1">下架</el-button>
            </p>
            <p>
              <el-button @click="getFxConfig(scope.$index, scope.row)" size="mini" type="primary" v-if="scope.row.is_allocation === '1'">分销比例设置</el-button>
            </p>
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
    <el-dialog :visible.sync="editSkuInfo.dialogVisible" title="编辑货品信息" width="40%">
      <span>商品货号：</span>
      <span>{{editSkuInfo.productSn}}</span>
      <el-input placeholder="按sku编号搜索" size="small" style="width: 50%;margin-left: 20px" v-model="editSkuInfo.keyword">
        <el-button @click="handleSearchEditSku" icon="el-icon-search" slot="append"></el-button>
      </el-input>
      <el-table :data="editSkuInfo.stockList" border style="width: 100%;margin-top: 20px">
        <el-table-column align="center" label="SKU编号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.sku_code"></el-input>
          </template>
        </el-table-column>
        <el-table-column :key="item.id" :label="item.name" align="center" v-for="(item,index) in editSkuInfo.productAttr">
          <template slot-scope="scope">{{getProductSkuSp(scope.row,index)}}</template>
        </el-table-column>
        <el-table-column align="center" label="销售价格" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品库存" width="80">
          <template slot-scope="scope">
            <el-input v-model="scope.row.stock"></el-input>
          </template>
        </el-table-column>
        <el-table-column align="center" label="库存预警值" width="100">
          <template slot-scope="scope">
            <el-input v-model="scope.row.low_stock"></el-input>
          </template>
        </el-table-column>
      </el-table>
      <span class="dialog-footer" slot="footer">
        <el-button @click="editSkuInfo.dialogVisible = false">取 消</el-button>
        <el-button @click="handleEditSkuConfirm" type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <cwindow :length="3" title="分销价格设置" style="height:500px; overflow: auto;" v-model="winvisible">
      <div class="page-controlstyle">
          <div style="display: table;">
            <p class="fx_title">一级分销购买(经销商购买)</p>
            <cnumber :length="1" title="经销商提成金额" v-model="fxConfig.first_first_amount"></cnumber>
          </div>
          <div style="display: table;">
            <p class="fx_title">二级分销(员工/朋友)</p>
            <cnumber :length="1" title="经销商提成金额" v-model="fxConfig.second_first_amount"></cnumber>
            <cnumber :length="1" title="二级提成金额" v-model="fxConfig.second_second_amount"></cnumber>
          </div>
          <div style="display: table;">
            <p class="fx_title">三级分销(客户)</p>
            <cnumber :length="1" title="经销商提成金额" v-model="fxConfig.third_first_amount"></cnumber>
            <cnumber :length="1" title="二级提成金额" v-model="fxConfig.third_second_amount"></cnumber>
          </div>
          <div style="display: table;">
            <p class="fx_title">四级及以上分销(客户)</p>
            <cnumber :length="1" title="经销商提成金额" v-model="fxConfig.other_first_amount"></cnumber>
            <cnumber :length="1" title="二级提成金额" v-model="fxConfig.other_second_amount"></cnumber>
            <cnumber :length="1" title="三级提成金额" v-model="fxConfig.other_third_amount"></cnumber>
          </div>
            
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="saveFxConfig" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import pms from "@/api/pms";
import utility from '@/utils/utility';

const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  brandId: null
};
export default {
  data() {
    return {
      editSkuInfo: {
        dialogVisible: false,
        productId: null,
        productSn: '',
        productAttributeCategoryId: null,
        stockList: [],
        productAttr: [],
        keyword: null
      },
      operates: [
        {
          label: "商品上架",
          value: "publishOn"
        },
        {
          label: "商品下架",
          value: "publishOff"
        },
        {
          label: "设为推荐",
          value: "recommendOn"
        },
        {
          label: "取消推荐",
          value: "recommendOff"
        },
        {
          label: "设为新品",
          value: "newOn"
        },
        {
          label: "取消新品",
          value: "newOff"
        },
        {
          label: "转移到分类",
          value: "transferCategory"
        },
        {
          label: "移入回收站",
          value: "recycle"
        }
      ],
      operateType: null,
      listQuery: Object.assign({}, defaultListQuery),
      list: null,
      total: null,
      listLoading: true,
      selectProductCateValue: null,
      multipleSelection: [],
      productCateOptions: [],
      brandOptions: [],
      winvisible: false, 
      publishStatusOptions: [{
        value: 1,
        label: '上架'
      }, {
        value: 0,
        label: '下架'
      }],
      verifyStatusOptions: [{
        value: 1,
        label: '审核通过'
      }, {
        value: 0,
        label: '未审核'
      }],
      fxConfig: {}
    }
  },
  created() {
    this.getList();
    this.getBrandList();
    this.getProductCateList();
  },
  watch: {
    selectProductCateValue: function (newValue) {
      if (newValue != null && newValue.length == 2) {
        this.listQuery.productCategoryId = newValue[1];
      } else if (newValue != null && newValue.length == 1) {
        this.listQuery.productCategoryId = newValue[0];
      } else {
        this.listQuery.productCategoryId = null;
      }

    }
  },
  filters: {
    verifyStatusFilter(value) {
      if (value === 1) {
        return '审核通过';
      } else {
        return '未审核';
      }
    }
  },
  methods: {
    getProductSkuSp(row, index) {
      if (index === 0) {
        return row.sp1;
      } else if (index === 1) {
        return row.sp2;
      } else {
        return row.sp3;
      }
    },
    getList() {
      this.listLoading = true;
      pms.getProductList(this.listQuery).then(res => {
        console.log(res.rows)
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    getBrandList() {
      pms.brandWithAll({}).then(res => {
        this.brandOptions = res;
      });
    },
    getProductCateList() {
      pms.productCatWithAll({}).then(res => {
        this.productCateOptions = res;
      });
    },
    handleShowSkuEditDialog(index, row) {
      this.editSkuInfo.dialogVisible = true;
      this.editSkuInfo.productId = row.id;
      this.editSkuInfo.productSn = row.product_sn;
      this.editSkuInfo.productAttributeCategoryId = row.product_attribute_category_id;
      this.editSkuInfo.keyword = null;
      pms.getProductAttributeByCatgory({ type: 0, catgory_id: row.product_attribute_category_id }).then(res => {
        this.editSkuInfo.productAttr = res;
      });
      pms.getSkuByProductId({ product_id: row.id, keyword: this.editSkuInfo.keyword }).then(res => {
        this.editSkuInfo.stockList = res;
      });
    },
    handleSearchEditSku() {
      pms.getSkuByProductId({ product_id: this.editSkuInfo.productId, keyword: this.editSkuInfo.keyword }).then(res => {
        this.editSkuInfo.stockList = res;
      });
    },
    handleEditSkuConfirm() {
      if (this.editSkuInfo.stockList == null || this.editSkuInfo.stockList.length <= 0) {
        this.$message({
          message: '暂无sku信息',
          type: 'warning',
          duration: 1000
        });
        return
      }
      this.$confirm('是否要进行修改', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        pms.updateSkuByProduct({ product_id: this.editSkuInfo.productId, stockList: this.editSkuInfo.stockList }).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success',
            duration: 1000
          });
          this.editSkuInfo.dialogVisible = false;
        });
      });
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
    },
    handleAddProduct() {
      // this.$router.push({ path: '/pms/productAdd' });
      utility.addtagview(this, "添加商品", "productAdd");
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: '请选择操作类型',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: '请选择要操作的商品',
          type: 'warning',
          duration: 1000
        });
        return;
      }
      this.$confirm('是否要进行该批量操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        let excKeys = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
          excKeys.push(this.multipleSelection[i].exc_key);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.updatePublishStatus(1, ids, excKeys);
            break;
          case this.operates[1].value:
            this.updatePublishStatus(0, ids, excKeys);
            break;
          case this.operates[2].value:
            this.updateRecommendStatus(1, ids, excKeys);
            break;
          case this.operates[3].value:
            this.updateRecommendStatus(0, ids, excKeys);
            break;
          case this.operates[4].value:
            this.updateNewStatus(1, ids, excKeys);
            break;
          case this.operates[5].value:
            this.updateNewStatus(0, ids, excKeys);
            break;
          case this.operates[6].value:
            break;
          case this.operates[7].value:
            this.updateDeleteStatus(1, ids, excKeys);
            break;
          default:
            break;
        }
        this.getList();
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handlePublishStatusChange(index, row) {
      let ids = [];
      let excKeys = [];
      ids.push(row.id);
      excKeys.push(row.exc_key);
      this.updatePublishStatus(row.publish_status, ids, excKeys);
    },
    handleNewStatusChange(index, row) {
      let ids = [];
      let excKeys = [];
      ids.push(row.id);
      excKeys.push(row.exc_key);
      this.updateNewStatus(row.new_status, ids, excKeys);
    },
    handleRecommendStatusChange(index, row) {
      let ids = [];
      let excKeys = [];
      ids.push(row.id);
      excKeys.push(row.exc_key);
      this.updateRecommendStatus(row.recommand_status, ids, excKeys);
    },
    handleResetSearch() {
      this.selectProductCateValue = [];
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleDelete(index, row) {
      this.$confirm('是否要进行删除操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.updateDeleteStatus(1, ids);
      });
    },
    handleUpdateProduct(index, row) {
      // this.$router.push({ path: '/pms/productUpdate', query: { id: row.id } });
      utility.addtagview(this, "修改商品", "productUpdate", row.id);
    },
    handleShowProduct(index, row) {
      console.log("handleShowProduct", row);
    },
    handleShowVerifyDetail(index, row) {
      console.log("handleShowVerifyDetail", row);
    },
    handleShowLog(index, row) {
      console.log("handleShowLog", row);
    },
    updatePublishStatus(publishStatus, ids, excKeys) {
      pms.updateProductPublish({ ids: ids, publishStatus: publishStatus, excKeys: excKeys }).then(res => {
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    updateNewStatus(newStatus, ids, excKeys) {
      pms.updateProductNewStatus({ ids: ids, newStatus: newStatus, excKeys: excKeys }).then(response => {
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    updateRecommendStatus(recommendStatus, ids, excKeys) {
      pms.updateProductRecommendStatus({ ids: ids, recommendStatus: recommendStatus, excKeys: excKeys }).then(response => {
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
      });
    },
    updateDeleteStatus(deleteStatus, ids) {
      // let params = new URLSearchParams();
      // params.append('ids', ids);
      // params.append('deleteStatus', deleteStatus);
      pms.deleteProduct({ pk: ids.join(",") }).then(res => {
        this.getList();
        this.$message({
          message: '删除成功',
          type: 'success',
          duration: 1000
        });
      });
      // updateDeleteStatus(params).then(response => {
      //   this.$message({
      //     message: '删除成功',
      //     type: 'success',
      //     duration: 1000
      //   });
      // });

    },
    saveVerifyStatus(index, row) {
      pms.updateVerifyStatus({ id: row.id, excKeys: row.exc_key }).then(res => {
        this.getList();
        this.$message({
          message: '审核通过',
          type: 'success',
          duration: 1000
        });
        this.getList();
      });

    },
    savePublishStatus(row, status) {
      pms.savePublishStatus({ id: row.id, status: status, excKeys: row.exc_key }).then(res => {
        this.getList();
        this.$message({
          message: '修改成功',
          type: 'success',
          duration: 1000
        });
        this.getList();
      });
    },
    getFxConfig(index, row) {
      this.winvisible = true
      pms.getFxConfig({ product_id: row.id }).then(res => {
        console.log(res)
        this.fxConfig =res
      });
    },
    saveFxConfig() {
      pms.saveFxConfig(this.fxConfig).then(res => {
        this.winvisible = false
      });
    }
  }
}
</script>
<style>
.fx_title {
  font-size: 20px;
}
</style>


