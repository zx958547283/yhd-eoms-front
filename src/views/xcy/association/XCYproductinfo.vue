<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('showAdd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('showEdit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('doDelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doImport()" size="mini" type="primary">批量导入</el-button>
            <el-button @click="doExport()" size="mini" type="primary">导出全部</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>

    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :disabled="!report_code_canEdit" :length="2" title="报告编号" v-model="mm.report_code"></cinput>
        <cinput :length="2" title="产品名称" v-model="mm.product_name"></cinput>
        <cinput title="型号规格" v-model="mm.product_attr"></cinput>
        <cselect pk="e96bbb63-dfab-4adc-b796-2c690f29ec55" title="产品类别" v-model="mm.product_type"></cselect>
        <div class="order_line" style="overflow: inherit">
          <span class="controlspan">生产单位</span>
          <el-input @focus="handleSelectProduct('enter')" size="small" style="width: 190px" suffix-icon="el-icon-search" v-model="mm.enterprise_abbr_name"></el-input>
        </div>
        <div class="order_line" style="overflow: inherit">
          <span class="controlspan">受检单位</span>
          <el-input @focus="handleSelectProduct('org')" size="small" style="width: 190px" suffix-icon="el-icon-search" v-model="mm.org_name"></el-input>
        </div>
        <cinput title="许可证号" v-model="mm.permit"></cinput>
        <cinput title="批次号" v-model="mm.batch_no"></cinput>
        <cmupload title="产品图片" v-model="imgUrls"></cmupload>
        <cinput :length="2" :rows="2" title="备注" type="textarea" v-model="mm.comment"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="doCancel" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
    <el-dialog :title="dialogData.queryTitle" :visible.sync="selectDialogVisible" width="50%">
      <el-row :gutter="10">
        <el-col :span="2">
          <div>简称</div>
        </el-col>
        <el-col :span="10">
          <el-select placeholder="请选择" size="mini" v-model="dialogData.listQuery.contain">
            <el-option key="1" label="包含" value="Y"></el-option>
            <el-option key="2" label="不包含" value="N"></el-option>
          </el-select>
        </el-col>
        <el-col :span="12" style="line-height: 0;">
          <el-input size="mini" style="margin-bottom: 20px; top: 0;" v-model="dialogData.listQuery.keyword">
            <el-button @click="handleDialogSelectSearch()" icon="el-icon-search" slot="append"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="dialogData.list" @current-change="handleDialogChange" @row-dblclick="handleSelectDialogConfirm" border highlight-current-row>
        <el-table-column align="center" label="编号">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column align="center" label="简称" width="160">
          <template slot-scope="scope">
            <div>{{scope.row.enterprise_name}}</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination :current-page.sync="dialogData.listQuery.pageNum" :page-size="dialogData.listQuery.pageSize" :page-sizes="[5,10,15]" :total="dialogData.total" @current-change="handleDialogCurrentChange" @size-change="handleDialogSizeChange" background layout="prev, pager, next"></el-pagination>
      </div>
      <div style="clear: both;"></div>
      <div slot="footer">
        <el-button @click="handleSelectDialogCancel()" size="small">取 消</el-button>
        <el-button @click="handleSelectDialogConfirm()" size="small" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import xcy from "../../../api/xcy";
import excel from "../../../utils/excel";
const defaultListQuery = {
  name: null,
  product_type: null,
  status: null,
  enterpriseName: null,
  report_code: null,
  timeRange: ['', ''],
  edit_time_start: null,
  edit_time_end: null,
  pageNum: 1,
  pageSize: 5
};
export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "新增企业信息",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],           //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      exportExcel: {},
      selectDialogVisible: false, // 生产企业受检机构可见
      dialogData: { // 生产企业受检机构查询条件
        list: null,
        total: null,
        queryTitle: "",
        currentRow: null,
        listQuery: {
          contain: 'Y',
          keyword: null,
          pageNum: 1,
          pageSize: 5
        }
      },
      imgUrls: '',
      queryKey: "", // 生产单位受检单位查询键
      report_code_canEdit: false,
      productTypeList: [], // 获取所有可选择的产品类别
      productLevelList: [] // 获取所有等级列表
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {},
  methods: {
    // doQuery(treeNode) {
    //   this.querylist = [];
    //   u.addwheres(this, "and", "(", "xcy_xcy_product.report_code", "like", this.queryvalue, "");
    //   u.addwheres(this, "or", "", "xcy_xcy_product.product_name", "like", this.queryvalue, ")");
    //   //查询条件
    //   this.dataLoad(1);
    // },
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          if (u.isnum(this.queryvalue)) {
            // u.addWheres(this, "and", "(", "Customer.Mobile", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Tel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.OtherTel", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.CardNo", "like", this.queryvalue, ")");
          }
          else {
            // u.addWheres(this, "and", "(", "Customer.Name", "like", this.queryvalue, "");
            // u.addWheres(this, "or", "", "Customer.Address", "like", this.queryvalue, ")");
          }
        }
      } else {
        console.log("ddddddddddd")
        this.querylist = querylist;
        console.log(querylist)
      }
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      // if (!this.queryvalue) {
      //   this.querylist = [];
      // }
      u.querypage(this, this.params[0]);
    },

    getList() {
      let that = this;
      this.listLoading = true;
      // 针对时间选择器是否有值做一些适配
      if (this.listQuery.timeRange) {
        [this.listQuery.edit_time_start, this.listQuery.edit_time_end] = this.listQuery.timeRange
      } else {
        [this.listQuery.edit_time_start, this.listQuery.edit_time_end] = ['', '']
      }
      xcy.getProductList(this.listQuery).then(res => {
        that.exportExcel = res
        that.listLoading = false;
        that.list = res.rows;
        that.listQuery.total = res.total;
      });
    },
    getProductTypeList() {
      let that = this;
      xcy.getProductType().then(res => {
        this.productTypeList = res;
      });
    },
    getProductLevelList() {
      let that = this;
      xcy.getProductLevel().then(res => {
        this.productLevelList = res;
      });
    },
    showAdd() {
      this.mm = {};
      this.winvisible = true;
      this["wintitle"] = "新增产品信息";
      xcy.getImgs({ product_id: "", type: 0 }).then(res => {
        if (res.reportType == 0) {
          this.report_code_canEdit = true;
        } else {
          this.report_code_canEdit = false;
        }
      });
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, xcy.getXcyProduct, row).then(res => {
        console.log(res)

        xcy.getImgs({ product_id: res.id, type: 0 }).then(res2 => {
          if (res2.reportType == 0) {
            this.report_code_canEdit = true;
          } else {
            this.report_code_canEdit = false;
          }
          that.imgUrls = ''
          if (res2.imgList && res2.imgList.length > 0) {
            that.imgUrls = res2.imgList[0].attachment_path
            for (let i = 1, length = res2.imgList.length; i < length; i++) {
              that.imgUrls += "," + res2.imgList[i].attachment_path;
            }
          } else {
            that.imgUrls = "";
          }
        });
        xcy.getXcyProductInfo({ pk: row.pk }).then(res3 => {
          let temp_mm = Object.assign({}, that.mm)
          temp_mm.enterprise_abbr_name = res3.enterprise_abbr_name
          temp_mm.org_name = res3.org_name
          that.mm = temp_mm
        });
      });
    },
    doDelete() {
      u.deleteoperate(this, xcy.deleteXcyProduct);
    },
    doImport() {
      this.$router.push({ path: '/other/importProduct' })
    },
    doExport() {
      xcy.exportProductList(this.listQuery).then(res => {
        excel.exportxlsx(res)
      })
    },
    doCancel() {
      this.mm = {};
      this.imgUrls = ''
      this.winvisible = false;
    },
    doSave() {
      this.mm.imgType = 0
      this.mm.imgUrls = this.imgUrls
      u.doSave(this, xcy.saveXcyProductInfo);
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    handleDialogSelectSearch() {
      this.getDialogList();
    },
    handleDialogChange(val) {
      this.dialogData.currentRow = val;
    },
    handleDialogCurrentChange(val) {
      this.dialogData.listQuery.pageNum = val;
      this.getDialogList();
    },
    handleSelectProduct(val) {
      this.queryKey = val;
      // 按照查询条件不同修改弹出框的title
      if (val === "enter") {
        this.dialogData.queryTitle = "选择生产单位";
      } else {
        this.dialogData.queryTitle = "选择受检单位";
      }
      this.selectDialogVisible = true;
      this.getDialogList();
    },
    handleDialogSizeChange(val) {
      this.dialogData.listQuery.pageNum = 1;
      this.dialogData.listQuery.pageSize = val;
      this.getDialogList();
    },
    getDialogList() {
      xcy.getOrgList(this.dialogData.listQuery).then(res => {
        this.dialogData.list = res.rows;
        this.dialogData.total = res.total;
      });
    },
    handleSelectDialogCancel() {
      this.selectDialogVisible = false;
      this.dialogData.listQuery.keyword = "";
    },
    handleSelectDialogConfirm() {
      let that = this;
      if (this.dialogData.currentRow == null) {
        this.$message({
          message: "请选择一条记录",
          type: "warning",
          duration: 1000
        });
        return;
      }
      if (that.queryKey === "enter") {
        that.mm.enterprise_id = that.dialogData.currentRow.id;
        that.mm.enterprise_abbr_name =
          that.dialogData.currentRow.enterprise_abbr_name;
      } else {
        that.mm.qc_org_id = that.dialogData.currentRow.id;
        that.mm.org_name = that.dialogData.currentRow.enterprise_abbr_name;
      }
      that.selectDialogVisible = false;
      that.dialogData.multipleSelection = [];
      that.$message({
        type: "success",
        message: "添加成功!"
      });
    },
  }
};
</script>
<style>
.el-upload-list--picture-card .el-upload-list__item {
  width: 110px;
  height: 110px;
}

/*无法预览大图*/
.el-icon-zoom-in {
  display: none;
}
.el-upload-list--picture-card .el-upload-list__item-actions span + span {
  margin-left: 0;
}
/*无法预览大图*/

.el-upload--picture-card {
  width: 110px;
  height: 110px;
  line-height: 116px;
}
</style>


