<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button
              @click="showEdit()"
              size="mini"
              type="primary"
              v-show="btnpower('btnedit')"
            >编辑</el-button>
            <el-button
              @click="doDelete()"
              size="mini"
              type="primary"
              v-show="btnpower('btndelete')"
            >删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button
              @click="doExport()"
              size="mini"
              type="primary"
              v-show="btnpower('btntoexcel')"
            >导出</el-button>
            <el-button
              @click="reviewShow = true;"
              size="mini"
              type="primary"
              v-show="btnpower('btntoexcel')"
            >审核</el-button>
            <csuploadWithPath
              :dataObj="updatePath"
              :action="action"
              fileType="excel"
              :length="2"
              style="float:left;"
            ></csuploadWithPath>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btnedit')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable
            :data="tabledata"
            :pagenum="pagenum"
            @pagechange="dataLoad"
            @row-dblclick="showEdit"
            @selection-change="tableSelect"
          ></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cselect title="一级类型" :custOptions="oneSelect" v-model="mm.firstCode"></cselect>
        <cselect title="二级类型" :custOptions="twoSelect" v-model="mm.secondCode"></cselect>
        <cinput title="问题内容" v-model="mm.questionContent"></cinput>
        <cselect title="正确答案" :custOptions="answer_selects" v-model="default_value"></cselect>
        <div v-for="(answer, index) of mm.answers" v-bind:key="index">
          <cinput :title="'答案' +　(index + 1)" :length="2" v-model="answer.answer_content  "></cinput>
        </div>
        <cselect title="难度" :custOptions="difficultSelect" v-model="mm.difficult"></cselect>
        <cinput title="类型" value="单选" :readonly="true"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">确定</el-button>
      </div>
    </cwindow>

    <cwindow :title="reviewTitle" v-model="reviewShow">
      <el-button @click="updateStatus(0)" size="mini">驳回</el-button>
      <el-button @click="updateStatus(1)" size="mini" type="primary">通过</el-button>
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
      reviewTitle: "审核",
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
      answer_selects: [],
      default_value: "",
      oneSelect: [],
      twoSelect: [],
      difficultSelect: [
        { text: "简单", value: "0" },
        { text: "难", value: "1" },
        { text: "最难", value: "2" }
      ],
      reviewShow: false,
      updatePath: {
        path: process.env.QUESTION_UPLOAD_PATH
      },
      action: process.env.EXCEL_UPLOAD_ACTION
    };
  },
  watch: {
    answerNew: function(newV) {
      let temp_answer_selects = [];
      newV
        .filter(item => item.answer_content)
        .forEach(item => {
          temp_answer_selects.push({
            value: item.question_answer_code,
            text: item.answer_content
          });
        });
      this.answer_selects = temp_answer_selects;
      this.default_value = this.mm.answers.filter(
        x => x.right_is === "1"
      )[0].answer_content;
    }
  },
  computed: {
    answerNew: function() {
      if (this.mm.answers) {
        let temp_arr = [...this.mm.answers];
        for (let i = 0; i < 5; i++) {
          if (!temp_arr[i]) {
            temp_arr[i] = {};
          }
        }
        this.mm.answers = temp_arr;
      }
      return this.mm.answers;
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
  },
  filters: {},
  methods: {
    btnqueryShow: function() {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist);
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
        }
      } else {
        this.querylist = querylist;
        console.log(querylist);
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
      this.listQuestionType();
      this.default_value = "";
      this.mm.answers = [
        { right_is: "0" },
        { right_is: "0" },
        { right_is: "0" },
        { right_is: "0" },
        { right_is: "0" }
      ];
      this.mm.firstCode = this.oneSelect;
      this.mm.secondCode = this.twoSelect;
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      this.listQuestionType();
      u.openeditmodel(this, gms.getQuestion, row);
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
      this.mm.answers = this.mm.answers.filter(x => x.answer_content);
      this.mm.answers
        .map(x => {
          x.right_is = "0";
          return x;
        })
        .forEach(x => {
          if (x.question_answer_code == this.default_value) {
            x.right_is = "1";
          }
        });
      this.wintitle == "编辑"
        ? gms.updateQuestion(this.mm)
        : gms.saveQuestion(this.mm);
    },
    listQuestionType() {
      gms.listQuestionType().then(res => {
        this.oneSelect = res
          .filter(x => x.level_num === "0")
          .map(x => {
            return {
              text: x.question_type_name,
              value: x.question_type_code
            };
          });
        this.twoSelect = res
          .filter(x => x.level_num === "1")
          .map(x => {
            return {
              text: x.question_type_name,
              value: x.question_type_code
            };
          });
      });
    },
    updateStatus(status) {
      const row = this.selectrows[0];
      gms.updateStatus({ id: row.pk, status: status });
      this.reviewShow = false;
      this.dataLoad();
    }
  }
};
</script>
<style></style>


