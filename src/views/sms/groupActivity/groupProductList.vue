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
          <el-form-item label="商品名称：">
            <el-input class="input-width" clearable placeholder="商品名称" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <!-- <span style="color: red; font-size: 12px;">(可点击左侧箭头展开详情)</span> -->
      <el-button @click="handleSelectProduct()" class="btn-add" size="mini" style="margin-left: 20px">添加商品</el-button>
    </el-card>

    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%; margin-top:20px;" v-loading="listLoading">
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-form class="demo-table-expand" inline label-position="left">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>-->
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品图片" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.pic" style="height: 80px">
          </template>
        </el-table-column>
        <el-table-column align="center" label="商品名称" width="300">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="SKU设置有/无" width="300">
          <template slot-scope="scope">
            <span v-if="scope.row.hasSku === '0'">无</span>
            <span v-else>有</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="拼团价格(元)" width="300">
          <template slot-scope="scope">
            <span v-if="scope.row.hasSku === '0'">{{scope.row.group_price}}</span>
            <span v-else>
              <div v-for="item in scope.row.skuList">
                [
                <span v-if="null !== item.sp1 && '' !== item.sp1">{{item.sp1}}</span>
                <span v-if="null !== item.sp2  && '' !== item.sp2">&nbsp;&nbsp; {{item.sp2}}</span>
                <span v-if="null !== item.sp3  && '' !== item.sp3">&nbsp;&nbsp; {{item.sp3}}</span>
                ]
                价格:&nbsp;{{item.group_price}}
              </div>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleUpdate(scope.$index, scope.row)" size="mini" type="text" v-if="groupType === 0">设置价格</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible" :width="dialogWidth" title="设置商品价格">
      <el-form :model="groupProduct" :rules="rules" label-width="150px" ref="groupProductForm" size="small">
        <div v-if="!hasSku">
          <el-form-item label="商品名称：">
            <span>{{groupProduct.name}}</span>
          </el-form-item>
          <el-form-item label="团购价格：">
            <el-input style="width: 250px" v-model="groupProduct.group_price"></el-input>
          </el-form-item>
        </div>
        <div v-else>
          <el-form-item label="商品名称：">
            <span>{{groupProduct.name}}</span>
          </el-form-item>
          <el-table :data="skuList" border ref="flashTable" style="width: 100%; margin-top:20px;" v-loading="listLoading">
            <el-table-column align="center" label="编号" width="100">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column align="center" label="属性1" width="300">
              <template slot-scope="scope">{{scope.row.sp1_name}} : {{scope.row.sp1}}</template>
            </el-table-column>
            <el-table-column align="center" label="属性2" width="300">
              <template slot-scope="scope">
                <span v-if="null !== scope.row.sp2 && '' !== scope.row.sp2">{{scope.row.sp2_name}} : {{scope.row.sp2}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="属性3" width="300">
              <template slot-scope="scope">
                <span v-if="null !== scope.row.sp3 && '' !== scope.row.sp3">{{scope.row.sp3_name}} : {{scope.row.sp3}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="价格">
              <template slot-scope="scope">
                <el-input style="width: 250px" v-model="scope.row.group_price"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm('groupProductForm')" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
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
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import sms from "@/api/sms";
import pms from "@/api/pms";
import { validateNumber } from "@/utils/validate";
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null,
  id: ''
};
const defaultGroupProduct = {
  id: null
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listLoading: false,
      list: [
        {

        }
      ],
      total: 0,
      groupProduct: Object.assign({}, defaultGroupProduct),
      dialogVisible: false,
      isEdit: false,
      hasSku: false,
      rules: {
        needs_min_num: [
          { required: true, message: "请输入最小拼团人数", trigger: "blur" },
          { type: "number", message: "请输入数字", trigger: "blur" }
        ]
      },
      dialogWidth: '40%',
      skuList: [],
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
      groupType: null
    };
  },
  mounted() {
    console.log('--------------------')
    this.listQuery.id = utility.getpageparmas(this)[0];
    this.groupType = utility.getpageparmas(this)[1];
    this.getList();
  },
  filters: {

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
      sms.getProductList(this.listQuery).then(res => {
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

    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.groupActivity = Object.assign({}, defaultGroupActivity);
    },
    handleDialogConfirm(formName) {
      let that = this;
      console.log(this.hasSku)
      if (this.hasSku) {
        console.log('aaaaaaaaaaaaaaaa')
        console.log(this.skuList)
        let update = [];
        for (let i = 0; i < this.skuList.length; i++) {
          let one = this.skuList[i];
          let item = { 'id': one.gpid, 'price': one.group_price }
          update.push(item);
        }

        let parm = { info: JSON.stringify(update) }

        // 更新数据
        sms.updateGroupPrice(parm).then(response => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.dialogVisible = false;
          this.getList();
        });
        console.log(update)
      } else {
        console.log(this.hasSku)
        if (this.groupProduct.group_price === null || this.groupProduct.group_price === '') {
          that.$alert("拼团价格不能为空!", "提示", {
            confirmButtonText: "确定",
            callback: action => { }
          });
          return;
        }
        if (!validateNumber(that.groupProduct.group_price)) {
          that.$alert("金额必须为数字!", "提示", {
            confirmButtonText: "确定",
            callback: action => { }
          });
          that.groupProduct.group_price = '';
          return;
        }
        // 更新数据
        sms.saveGroupProductByOne(that.groupProduct).then(response => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.dialogVisible = false;
          this.getList();
        });
      }
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
      let hasSku = row.hasSku;

      if (hasSku === '0') {
        this.hasSku = false;
        this.dialogWidth = '40%'
      } else {
        this.hasSku = true;
        this.dialogWidth = '80%'
        this.skuList = row.skuList
      }
      row.group_type = row.group_type + "";
      console.log(this.groupProduct)
      this.groupProduct = Object.assign({}, row);

      this.dialogVisible = true;
      this.isEdit = true;

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
      let that = this;
      this.$confirm('是否要删除该商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteGroupProduct({ productId: row.productid, groupId: that.listQuery.id }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleSelectProduct() {
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    handleSelectSearch() {
      console.log(this.dialogData.listQuery)
      this.getDialogList();
    },
    getDialogList() {
      sms.getProductListBySelect(this.dialogData.listQuery).then(res => {
        console.log('dsfddddddsd')
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      })
    },
    handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getDialogList();
    },
    handleDialogSelectionChange(val) {
      this.dialogData.multipleSelection = val;
    },
    handleSelectDialogConfirm() {
      let that = this;
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
          id: this.dialogData.multipleSelection[i].id
        });
      }
      this.$confirm('使用要进行添加操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.saveGroupProductList({ selectProducts: JSON.stringify(selectProducts), groupId: that.listQuery.id }).then(response => {
          this.selectDialogVisible = false;
          this.dialogData.multipleSelection = [];
          this.getList();
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        });
      });
    }
  }
};
</script>
<style>
</style>