<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
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
        <cinput :required="true" title="道具名称" v-model="mm.tool_name"></cinput>
        <cnumber :required="true" title="道具价格" v-model="mm.tool_price"></cnumber>
        <cselect :required="true" querypk="fb3cebb8-e03b-4874-bd3f-c732db764a09" title="道具类型" v-model="mm.tool_type"></cselect>
        <cnumber :required="true" title="道具数值" v-model="mm.tool_value"></cnumber>
        <cinput :required="true" title="道具code" v-model="mm.tool_code"></cinput>
        <cselect :required="true" querypk="804c6597-c9f3-479b-9ea8-21681cb45e04" title="所属游戏" v-model="mm.game_guid"></cselect>
        <cnumber :required="true" title="排序" v-model="mm.sort_num"></cnumber>
        <cinput :required="true" title="备注" v-model="mm.remarks"></cinput>
        <csuploadWithPath :dataObj="updatePath" :length="2" title="道具图标" v-model="mm.tool_icon"></csuploadWithPath>
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
import sys from "../../../api/sys";
import gms from "../../../api/gms";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "自定义项编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      updatePath: {
        path: process.env.GAME_TOOL_PATH
      }
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    console.log('---------------------------')
    console.log(this.params)
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
          u.addwheres(this, "and", "(", "gms_game_tool.tool_name", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "gms_game_tool.tool_price", "like", this.queryvalue, ")");
        }
      } else {
        this.querylist = querylist;
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
      this.mm = {};
      this.mm.fix = "N";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, gms.getGameTool, row);
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteGameTool);
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
      u.doSave(this, gms.saveGameTool);
    }
  }
}
</script>
<style></style>


