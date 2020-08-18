<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <el-button @click="showDetail()" size="mini" type="primary" v-show="btnpower('showDetail')">查看团购订单</el-button>
            <el-button @click="showMember()" size="mini" type="primary" v-show="btnpower('showMember')">查看成员</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :actions="actions" :data="tabledata" :pagenum="pagenum" @dowloadQR="dowloadQR" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog :before-close="handleClose" :visible.sync="winvisible" title="团购成员" width="30%">
      <div>
        <span>发起者: {{ members[0] && members[0].nickname }}</span>
      </div>
      <div>
        参与者:
        {{members.slice(1).map(item => item.nickname).join(', ')}}
      </div>
      <span class="dialog-footer" slot="footer">
        <el-button @click="winvisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import cont from "../../../api/cont";
import downloadApi from "../../../utils/downloadAPI";
import e from "../../../utils/excel";
import oms from "@/api/oms";

const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  order_sn: null,
  receiverKeyword: null,
  status: null,
  order_type: null,
  source_type: null,
  create_time: null,
};

export default {
  data() {
    return {
      actions: [
        {
          action: "dowloadQR",
          name: "下载"
        }
      ],
      selectrows: [], //表格选中的对象
      wintitle: "编辑", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      mm: {}, //编辑对象
      tabledata: {}, //表格数据
      params: [], //页面参数
      pagenum: 1, //当前页
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      members: []
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {},
  methods: {
    doQuery(treeNode) {
      this.querylist = [];

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
      this.mm = {};
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, cont.getQrcode, row);
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteQrcode);
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
      this.mm.scan_count = 0;
      u.doSave(this, cont.saveQrcode);
    },
    dowloadQR(row) {
      downloadApi(row.pk, "qr");
    },
    showDetail() {
      // this.$router.push({
      //   path: "/oms/order",
      //   query: { id: this.selectrows[0].pk }
      // });
      u.addtagview(this, "订单列表", "orderList", this.selectrows[0].pk);
    },
    showMember() {
      this.winvisible = true;
      this.listQuery = { "groupFountId": this.selectrows[0].pk }
      oms.listMembersByGroupFountId(this.listQuery).then(response => {
        this.members = response;
        this.members.forEach(member => {

        })
      });
    },
    emitInput(val) {
      this.$emit('input', val)
    },
    handleClose() {
      this.emitInput(false);
    }
  }
};
</script>
<style></style>


