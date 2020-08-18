<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <!--<el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>-->
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">审核</el-button>
            <!--<el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>-->
            <!--<el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>-->
            <!--<el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>-->
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryValue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :length="3" title="审核" style="top:80px;left:370px" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :disabled="true" title="姓名" v-model="mm.member_name"></cinput>
        <cinput :disabled="true" title="openID" v-model="mm.open_id"></cinput>
        <cinput :disabled="true" title="活动名称" v-model="mm.act_name"></cinput>
        <cinput :disabled="true" title="祝福语" v-model="mm.wishing"></cinput>
        <cinput :disabled="true" title="备注" v-model="mm.remark"></cinput>
        <cnumber :disabled="true" title="金额" v-model="mm.total_amount"></cnumber>
        <cselect :disabled="true" pk="scene_id" title="场景" v-model="mm.gender"></cselect>
        <cinput title="不通过原因" v-if="mm.status === '0'" v-model="mm.reason"></cinput>
        <cinput title="失败原因" v-if="mm.status === '2'" v-model="mm.reason"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doApply" size="mini" type="primary" v-if="mm.status !== '1'">审核通过并打款</el-button>
        <el-button @click="doNotApply" size="mini" type="danger" v-if="mm.status === '0'">审核不通过</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sms from "../../../api/sms";
import e from "../../../utils/excel";
import Tinymce from '@/components/Tinymce'

export default {
  name: "feightTemplateList",
  components: { Tinymce },
  data() {
    return {
      toolbar: [`bold italic underline strikethrough alignleft aligncenter
  alignright outdent indent  blockquote undo redo removeformat hr bullist numlist link image charmap	 preview anchor pagebreak`,
        `fullscreen insertdatetime media table forecolor backcolor`],
      detailHtml: '',
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryValue: '',         //查询条件值
      querylist: [],           //查询条件模板
      inType: 'base'
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
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          if (u.isNum(this.queryvalue)) {
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
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {
        is_official: 'N',
        is_show_home: 'N',
        media_type: '0',
        content: ''
      };
      this.inType = "base";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      this.inType = "base";
      u.openeditmodel(this, sms.getMemberCouponApply, row).then(res => {
        console.log(res)
      });
    },
    doExport() {
      u.queryExport(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      //保存
      u.doSave(this, cont.saveContent);
    },
    doNotApply() {
      let that = this

      this.$prompt('请输入不通过原因', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        that.mm.status = '3'
        that.mm.reason = value
        u.doSave(this, sms.saveApplyNotPass).then(res => {

        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    doApply() {
      //保存
      this.$confirm('此操作将打款给客户, 是否继续?', '提示', {
        confirmButtonText: '打款',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        u.doSave(this, sms.saveApplyPass).then(res => {

        });

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    }
  }
}
</script>
<style></style>


