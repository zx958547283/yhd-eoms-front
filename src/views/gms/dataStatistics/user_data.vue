<template>
  <div class="app-container">
    <div class="block" style="display:flex;justify-content: center;">
      <span class="demonstration" style="line-height:40px;margin-right:10px;">时间</span>
      <el-date-picker
        v-model="selectTime"
        type="daterange"
        value-format="yyyy-MM-dd"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @blur="loadData"
      ></el-date-picker>
    </div>
    <lineChart :xyData="newUserData"></lineChart>
    <lineChart :xyData="allRegister"></lineChart>
    <lineChart :xyData="noAnswer"></lineChart>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import gms from "../../../api/gms";
import e from "../../../utils/excel";
import lineChart from "../../../components/Charts/LineChart";

export default {
  components: {
    lineChart
  },
  data() {
    return {
      selectrows: [], //表格选中的对象
      wintitle: "自定义项编辑", //编辑窗口标题
      winvisible: false, //编辑窗口是否显示
      mm: {}, //编辑对象
      tabledata: {}, //表格数据
      params: [], //页面参数
      pagenum: 1, //当前页
      queryvalue: "", //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false, //查询弹出窗
      newUserData: {
        xData: [],
        yData: [],
        title: ""
      },
      allRegister: {
        xData: [],
        yData: [],
        title: ""
      },
      noAnswer: {
        xData: [],
        yData: [],
        title: ""
      },
      selectTime: undefined
    };
  },
  mounted() {
    this.initData({ start: "", end: "" });
  },
  filters: {},
  methods: {
    loadData() {
      const temp = {
        start: this.selectTime ? this.selectTime[0] : "",
        end: this.selectTime ? this.selectTime[1] : ""
      };
      this.initData(temp);
    },
    initData(selectData) {
      gms.getUserAnaly(selectData).then(res => {
        this.newUserData.xData = res.categories;
        this.newUserData.yData = res.detail;
        this.newUserData.title = res.title;
      });
      gms.getAllRegister(selectData).then(res => {
        this.allRegister.xData = res.categories;
        this.allRegister.yData = res.detail;
        this.allRegister.title = res.title;
      });
      gms.getNoAnswerCnt(selectData).then(res => {
        this.noAnswer.xData = res.categories;
        this.noAnswer.yData = res.detail;
        this.noAnswer.title = res.title;
      });
    },
    btnqueryShow: function() {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          u.addwheres(
            this,
            "and",
            "(",
            "gms_game.game_name",
            "like",
            this.queryvalue,
            ""
          );
          u.addwheres(
            this,
            "or",
            "",
            "gms_game.game_tag",
            "like",
            this.queryvalue,
            ")"
          );
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
      u.openeditmodel(this, gms.getGame, row);
    },
    doDelete() {
      u.deleteoperate(this, gms.deleteGame);
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
      u.doSave(this, gms.saveGame);
    }
  }
};
</script>
<style></style>


