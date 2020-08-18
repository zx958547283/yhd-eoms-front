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
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cproduct title="商品" v-model="mm.product_id" v-on:change="productChange"></cproduct>
        <cinput title="会员" v-model="mm.member_id"></cinput>
        <cinput title="会员呢称" v-model="mm.member_nick_name"></cinput>
        <cinput title="商品名称" v-model="mm.product_name"></cinput>
        <cinput title="评价星数" v-model="mm.star"></cinput>
        <cinput title="评价的ip" v-model="mm.member_ip"></cinput>
        <cselect pk="YN" title="显示状态" v-model="mm.show_status"></cselect>
        <cinput title="购买时的商品属性" v-model="mm.product_attribute"></cinput>
        <cinput title="点赞数" v-model="mm.collect_count"></cinput>
        <cinput title="阅读数" v-model="mm.read_count"></cinput>
        <cinput title="评论内容" v-model="mm.content"></cinput>
        <cinput title="评论图片" v-model="mm.pics"></cinput>
        <cinput title="评论用户头像" v-model="mm.member_icon"></cinput>
        <cinput title="回复数量" v-model="mm.replay_count"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import comment from "../../../api/comment";
import e from "../../../utils/excel";


export default {
 data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: []           //查询条件模板
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();



  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      u.addwheres(this, "and", "(", "pms_comment.member_nick_name", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "pms_comment.product_name", "like", this.queryvalue, "");
      u.addwheres(this, "or", "", "pms_comment.content", "like", this.queryvalue, ")");

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
      u.openeditmodel(this, comment.getComment, row);
    },
    doDelete() {
      u.deleteoperate(this, comment.deleteComment);
    },
    doExport() {
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      //保存
      u.doSave(this, comment.saveComment);
    },
    productChange(product) {
      console.log(product);
      this.mm.product_name = product.name;
    }
  }
}
</script>
<style></style>


