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
          <el-form-item label="活动名称：">
            <el-input class="input-width" clearable placeholder="活动名称" v-model="listQuery.keyword"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button @click="handleAdd()" class="btn-add" size="mini" style="margin-left: 20px">添加活动</el-button>
      <el-button @click="handleShowSessionList()" class="btn-add" size="mini">秒杀时间段列表</el-button>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="flashTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="selection" width="60"></el-table-column>
        <el-table-column align="center" type="index" width="100" label="编号"></el-table-column>
        <!-- <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column> -->
        <el-table-column align="center" label="活动标题">
          <template slot-scope="scope">{{scope.row.title}}</template>
        </el-table-column>
        <el-table-column align="center" label="活动状态" width="140">
          <template slot-scope="scope">{{scope.row |formatActiveStatus}}</template>
        </el-table-column>
        <el-table-column align="center" label="开始时间" width="140">
          <template slot-scope="scope">{{scope.row.start_date | formatDate}}</template>
        </el-table-column>
        <el-table-column align="center" label="结束时间" width="140">
          <template slot-scope="scope">{{scope.row.end_date | formatDate}}</template>
        </el-table-column>
        <el-table-column align="center" label="上线/下线" width="200">
          <template slot-scope="scope">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange(scope.$index, scope.row)"
              v-model="scope.row.status"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              @click="handleSelectSession(scope.$index, scope.row)"
              size="mini"
              type="text"
            >设置商品</el-button>
            <el-button @click="handleKillUpdate(scope.$index, scope.row)" size="mini" type="text">编辑</el-button>
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
    <!-- 编辑商品按钮弹窗 -->
    <el-dialog :visible.sync="dialogVisible" title="添加活动" width="40%">
      <el-form :model="flashPromotion" label-width="150px" ref="flashPromotionForm" size="small">
        <el-form-item label="活动标题：">
          <el-input style="width: 250px" v-model="flashPromotion.title"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            placeholder="请选择时间"
            type="date"
            v-model="flashPromotion.start_date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            placeholder="请选择时间"
            type="date"
            v-model="flashPromotion.end_date"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="上线/下线">
          <el-radio-group v-model="flashPromotion.status">
            <el-radio :label="1">上线</el-radio>
            <el-radio :label="0">下线</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span class="dialog-footer-seckill" slot="footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置商品按钮 -->
    <el-dialog :visible.sync="settingGoodDialog" title="设置商品">

      <el-table :data="timeSlot" border @row-click="singleTimeSlot($event)" height="400" style="width:151px;float:left;" highlight-current-row>
        <el-table-column property="date" label="时间段" width="150"></el-table-column>
      </el-table>

      <el-table :data="timeSlotGoods" border height="400" style="width:1001px;" highlight-current-row>
        <el-table-column label="时间段商品" align="right">
          <template slot="header" slot-scope="scope">
            <el-button @click="handleUpdate()" size="mini">新增秒杀商品</el-button>
          </template>
          <el-table-column type="index" align="center" width="50" label="编号"></el-table-column>
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
                <el-button @click="deleteFlashPromotionProductRelation(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
              </template>
            </el-table-column>
        </el-table-column>
      </el-table>
      <!-- <span class="dialog-footer-seckill" slot="footer">
        <el-button @click="settingGoodDialog = false" size="small">取 消</el-button>
        <el-button @click="handleDialogConfirm()" size="small" type="primary">确 定</el-button>
      </span> -->
    </el-dialog>
    <!-- 编辑商品弹窗 -->
    <el-dialog :visible.sync="editDialogVisible" title="编辑秒杀商品信息" width="30%"> 
      <el-form :model="flashProductRelation" :rules="rules" label-width="150px" ref="flashProductRelationForm" size="small">
        <el-form-item label="商品1名称：">
          <span v-if="flashProductRelation.name">{{flashProductRelation.name}}</span>
          <span v-else>
              <el-button @click="handleSelectProduct()" size="mini" type="primary">选择商品</el-button>
          </span>
        </el-form-item>
        <el-form-item label="货号：">
          <span>NO.{{flashProductRelation.product_sn}}</span>
        </el-form-item>
        <el-form-item label="商品价格：">
          <span>￥{{flashProductRelation.price}}</span>
        </el-form-item>
        <el-form-item label="秒杀价格：" prop="flash_promotion_price">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_price">
            <template slot="prepend">￥</template>
          </el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="剩余数量：">
          <span>{{flashProductRelation.stock}}</span>
        </el-form-item>
        <el-form-item label="秒杀总量：" prop="flash_promotion_count">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_count"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="已购数量：" prop="purchased_quantity">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.purchased_quantity" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="限购数量：" prop="flash_promotion_limit">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.flash_promotion_limit"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.sort"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="已购基数：" prop="purchased">
          <el-col :span="12">
          <el-input class="input-width" v-model="flashProductRelation.purchased" placeholder="默认0"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <span class="dialog-footer-seckill" slot="footer">
        <el-button @click="editDialogVisible = false" size="small">取 消</el-button>
        <el-button @click="handleEditDialogConfirm()" size="small" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新增商品弹窗 -->
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
    <!-- 选择商品列表(所有秒杀商品) -->
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
import { formatDate } from '@/utils/date';
import sms from "@/api/sms";
import pms from "@/api/pms";
import utility from '@/utils/utility';
const defaultListQuery = {
  pageNum: 1,
  pageSize: 5,
  keyword: null
};
const defaultListQuerySeckill = {
  pageNum: 1,
  pageSize: 20,
  flashPromotionId: null,
  flashPromotionSessionId: null
};
const defaultFlashPromotion = {
  id: null,
  title: null,
  start_date: null,
  end_date: null,
  status: 0
};
const defaultListQueryProduct = {
  flashPromotionId: null,
  flashPromotionSessionId: null,
  productId: ''
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      listQueryProduct:Object.assign({}, defaultListQueryProduct),
      listQuerySeckill: Object.assign({}, defaultListQuerySeckill),
      list: null,
      total: null,
      listLoading: false,
      dialogVisible: false,
      settingGoodDialog:false,
      flashPromotion: Object.assign({}, defaultFlashPromotion),
      isEdit: false,
      timeSlot:[],
      timeSlotGoods:[],
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
      },
      selectDialogVisible:false,
      selectListVisible: false,
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
    }
  },
  created() {
    this.getList();
    this.getTimeList();
  },
  filters: {
    formatActiveStatus(row) {
      let nowTime = new Date().getTime();
      if (nowTime >= row.startDate && nowTime <= row.endDate) {
        return '活动进行中';
      } else if (nowTime > row.endDate) {
        return '活动已结束';
      } else {
        return '活动未开始';
      }
    },
    formatDate(time) {
      if (time == null || time === '') {
        return 'N/A';
      }
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  methods: {
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getDialogList();
    },
    handleDialogSelectionChange(val) {
      this.dialogData.multipleSelection = val;
    },
    handleSelectProduct() {
      this.selectListVisible = true;
      this.getDialogList();
    },
    handleResetSearch() {
      this.listQuery = Object.assign({}, defaultListQuery);
    },
    handleSearchList() {
      this.listQuery.pageNum = 1;
      this.getList();
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
      this.dialogVisible = true;
      this.isEdit = false;
      this.flashPromotion = Object.assign({}, defaultFlashPromotion);
    },
    handleShowSessionList() {
      // this.$router.push({ path: '/sms/sessionList' })
      utility.addtagview(this, "秒杀时间段列表", "sessionList", '');
    },
    handleStatusChange(index, row) {
      this.$confirm('是否要修改该状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.updateFlashPromotionStatus({ id: row.id, exc_key: row.exc_key, status: row.status }).then(response => {
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
          this.getList();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
        this.getList();
      });
    },
    handleDelete(index, row) {
      this.$confirm('是否要删除该活动?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sms.deleteFlashPromotion({ pk: row.id }).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList();
        });
      });
    },
    handleKillUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.flashPromotion = Object.assign({}, row);
    },
    handleDialogConfirm() {
      this.$confirm('是否要确认?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isEdit) {
          sms.saveFlashPromotion(this.flashPromotion).then(response => {
            this.$message({
              message: '修改成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        } else {
          console.log(typeof (this.flashPromotion.start_date));
          alert(this.flashPromotion.start_date);
          sms.saveFlashPromotion(this.flashPromotion).then(response => {
            this.$message({
              message: '添加成功！',
              type: 'success'
            });
            this.dialogVisible = false;
            this.getList();
          })
        }
      })
    },
    handleSelectSession(index, row) {
      this.listQuerySeckill.flashPromotionId = row.id;
      // this.$router.push({ path: '/sms/selectSessionList', query: { flashPromotionId: row.id } })
      // utility.addtagview(this, row.title, "selectSessionList", row.id);
      this.settingGoodDialog = true;
      // this.isEdit = true;
      // this.flashPromotion = Object.assign({}, row);

    },
    getFlashProductRelationList() {
      this.listLoading = true;
      sms.getFlashProductRelationList(this.listQuerySeckill).then(res => {
        this.listLoading = false;
        // this.list = res.rows;
        this.timeSlotGoods = res.rows;
        this.total = res.total;
        console.log(this.list);
        console.log(res);
      });
    },
    //获取列表数据
    getList() {
      this.listLoading = true;
      sms.getFlashPromotionList(this.listQuery).then(res => {
        this.listLoading = false;
        this.list = res.rows;
        this.total = res.total;
      });
    },
    //获取左侧时间
    getTimeList(){
      sms.getFlashSessionListAll().then(res => {
        res.forEach((v,i)=>{
          this.timeSlot.push({
            "id":v.id,
            "date":`${v.start_time}-${v.end_time}`
          })
        })
      });
    },
    // 拿到点击的时间
    singleTimeSlot(e){
      this.listQuerySeckill.flashPromotionSessionId = e.id;
        sms.getFlashProductRelationList(this.listQuerySeckill).then(res => {
          this.timeSlotGoods = res.rows;
      });
    },
    //编辑商品弹窗
    handleUpdate(index, row) {
      if(this.listQuerySeckill.flashPromotionSessionId==null){
        this.$message({
          message: '请先选择时间段',
          type: 'warning'
        });
        return;
      }
      this.editDialogVisible = true;
      this.flashProductRelation = Object.assign({}, row);
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
    //新增商品弹窗    
    handleSelectProduct() {
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    //获取商品列表
    getDialogList() {
      pms.getProductList(this.dialogData.listQuery).then(res => {
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      })
    },
   handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getDialogList();
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
          flashPromotionId: this.listQuerySeckill.flashPromotionId,
          flashPromotionSessionId: this.listQuerySeckill.flashPromotionSessionId
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
          // this.getFlashProductRelationList();
          sms.getFlashProductRelationList(this.listQuerySeckill).then(res => {
            this.listLoading = false;
            // this.list = res.rows;
            this.flashProductRelation = res.rows[res.rows.length-1];
          });
          this.$message({
            type: 'success',
            message: '添加成功!'
          });
        });
        this.handleUpdate(scope.$index, selectProducts)
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
              this.getFlashProductRelationList();
            })
          });
        }

      })
    },
    deleteFlashPromotionProductRelation(index, row) {
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
          this.getFlashProductRelationList();
        });
      });
    },
  }
}
</script>
<style>
.el-dialog{
  width:65% !important;
}
</style>


