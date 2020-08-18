<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <!-- <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button> -->
            <!-- <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button> -->
            <!-- <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button> -->
            <el-button @click="showProcess()" size="mini" type="primary" v-show="btnpower('btnprocess')">处理</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <el-button @click="showIncomeDetail()" size="mini" type="primary">查看收益记录</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showProcess" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" style="width:650px" v-model="winvisible">
      <div class="page-controlstyle">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="提现信息" name="base">
            <cinput :disabled="true" title="会员姓名" v-model="mm.member_name"></cinput>
            <cinput :disabled="true" title="提现金额" v-model="mm.draw_total"></cinput>
            <cdate :disabled="true" title="提现时间" v-model="mm.draw_time"></cdate>
            <cselect :disabled="true" pk="drawType" title="提现方式" v-model="mm.draw_type"></cselect>
            <cinput :disabled="true" title="银行卡号" v-model="mm.bank_account" v-show="mm.draw_type == 0"></cinput>
            <cinput :disabled="true" title="开户行" v-model="mm.bank_name" v-show="mm.draw_type == 0"></cinput>
            <cinput :disabled="true" :length="2" title="开户行地址" v-model="mm.bank_address" v-show="mm.draw_type == 0"></cinput>
            <cinput :disabled="true" title="提现姓名" v-model="mm.apply_username"></cinput>
            <cinput :disabled="true" title="会员手机号" v-model="mm.apply_mobile"></cinput>
            <cinput :disabled="true" title="支付宝帐号" v-model="mm.ali_account" v-show="mm.draw_type == 1"></cinput>
            <cinput :disabled="true" title="微信帐号" v-model="mm.wx_account" v-show="mm.draw_type == 2"></cinput>
            <cselect :disabled="true" pk="drawApplyStatus" title="状态" v-model="mm.status"></cselect>

            <!-- 打款信息 -->
            <div class="order_line">
              <span class="controlspan" style="margin-top:5px;">处理状态</span>
              <span class="controlspans">
                <el-radio-group :disabled="mm.status == 1" size="mini" v-model="processStatus">
                  <el-radio border label="1">审核通过并打款</el-radio>
                  <el-radio border label="3">审核不通过</el-radio>
                  <!-- <el-radio border disabled label="2">打款失败</el-radio> -->
                </el-radio-group>
              </span>
            </div>
            <ctextarea :disabled="mm.status == 1" :length="2" title="失败原因" v-model="mm.reason" v-show="processStatus == 2"></ctextarea>
            <ctextarea :disabled="mm.status == 1" :length="2" title="审核不通过原因" v-model="mm.reason" v-show="processStatus == 3"></ctextarea>
            <!-- <cinput :disabled="mm.status == 1" title="打款人" v-model="mm.pay_username" v-show="processStatus == 1"></cinput>
            <cinput :disabled="mm.status == 1" title="打款公司" v-model="mm.pay_company" v-show="processStatus == 1"></cinput>
            <cinput :disabled="mm.status == 1" title="打款帐号" v-model="mm.pay_account" v-show="processStatus == 1"></cinput>-->
            <cnumber :disabled="true" title="打款金额" v-model="mm.draw_total" v-show="processStatus == 1"></cnumber>
          </el-tab-pane>
          <!-- <el-tab-pane label="打款信息" name="second">
            <div class="order_line">
              <span class="controlspan" style="margin-top:5px;">处理状态</span>
              <span class="controlspans">
                <el-radio-group :disabled="mm.status == 1" size="mini" v-model="processStatus">
                  <el-radio border label="1">审核通过并打款</el-radio>
                  <el-radio border label="3">审核不通过</el-radio>
                  <el-radio border disabled label="2">打款失败</el-radio>
                </el-radio-group>
              </span>
            </div>
            <ctextarea :disabled="mm.status == 1" :length="2" title="失败原因" v-model="mm.reason" v-show="processStatus == 2"></ctextarea>
            <ctextarea :disabled="mm.status == 1" :length="2" title="审核不通过原因" v-model="mm.reason" v-show="processStatus == 3"></ctextarea>
            <cinput :disabled="mm.status == 1" title="打款人" v-model="mm.pay_username" v-show="processStatus == 1"></cinput>
            <cinput :disabled="mm.status == 1" title="打款公司" v-model="mm.pay_company" v-show="processStatus == 1"></cinput>
            <cinput :disabled="mm.status == 1" title="打款帐号" v-model="mm.pay_account" v-show="processStatus == 1"></cinput>
            <cnumber :disabled="true" title="打款金额" v-model="mm.draw_total" v-show="processStatus == 1"></cnumber>
          </el-tab-pane>-->
        </el-tabs>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doCompanyApplyPass" size="mini" type="primary" v-if="mm.status !== '1'">执行</el-button>
        <!--<el-button @click="doCompanyNotApplyPass" size="mini" type="primary" v-if="mm.status === '0'">审核不通过</el-button>-->
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import member from "../../../api/member";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      processStatus: "1",
      inType: "base",
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      queryvisible: false,    //查询弹出窗
      querylist: []           //查询条件模板
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log('111111111111111111')
      console.log(querylist)
      if (querylist === undefined) {
        this.querylist = [];
        u.addwherelike(this, "member_name", this.queryvalue);
        this.dataLoad(1);
      } else {
        this.querylist = querylist
      }


      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    doExport() {
      u.queryExport(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    showProcess(row) {
      let that = this;
      this.inType = "base";
      u.openeditmodel(this, member.getMemberDrawApply, row).then(
        res => {
          console.log(res)
          that.processStatus = res.status
        }
      );
    },
    doSave() {
      this.$confirm('此操作将打款给客户, 是否继续?', '提示', {
        confirmButtonText: '打款',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //保存
        this.mm.status = this.processStatus;
        u.doSave(this, member.saveMemberDrawApply);

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    doCompanyApplyPass() {
      let that = this
      if (this.processStatus === '1') {
        this.$confirm('此操作将打款给客户, 是否继续?', '提示', {
          confirmButtonText: '打款',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //保存
          this.mm.status = this.processStatus;
          u.doSave(this, member.saveCompanyApplyPass);

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      } else if (this.processStatus === '3') {
        // this.$prompt('请输入不通过原因', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消'
        // }).then(({ value }) => {
        //   that.mm.status = '3'
        //   that.mm.reason = value
        //   u.doSave(this, member.saveCompanyApplyNotPass).then(res => {

        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '取消输入'
        //   });
        // });
        if (this.mm.reason === '' || null === this.mm.reason) {
          this.$message.error('请填写审核不通过原因！');
        } else {
          that.mm.status = '3'
          u.doSave(this, member.saveCompanyApplyNotPass).then(res => {
          });
        }
      } else {

        this.$message.error('请选择处理状态！');
      }


    },
    doCompanyNotApplyPass() {
      let that = this

      this.$prompt('请输入不通过原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        that.mm.status = '3'
        that.mm.reason = value
        u.doSave(this, member.saveCompanyApplyNotPass).then(res => {

        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    showIncomeDetail(row) {
      console.log('12222111111')
      console.log(this.selectrows)
      let pk = this.selectrows[0].pk;
      member.getMemberDrawApply(pk).then(res => {
        u.addtagview(this, "会员收益详情", "memberIncomeDetail", res.member_id);
      });

    }
  }
}
</script>
<style></style>


