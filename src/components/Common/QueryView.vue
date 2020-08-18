<template>
  <div>
    <el-container>
      <el-header style="height:30px;">
        <el-row>
          <el-col :span="12">
            <i class="el-icon-search"></i>
            <span>条件查询</span>
          </el-col>
          <el-col :span="12">
            <el-button @click="btnqueryreset" size="mini" style="float:right;">重置</el-button>
            <el-button @click="btnquerylist()" size="mini" style="float:right;margin-right: 15px" type="primary">查询</el-button>
            <el-link @click="linkchange" style="float:right;margin-right: 15px" v-show="tabledata.length>6">
              {{ linktext }}
              <i :class="linkclass"></i>
            </el-link>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div :style="{ height: querydivhegiht + 'px' }">
          <el-form :inline="true" label-width="140px" size="small">
            <el-form-item :key="item.Field" :label="item.Name" v-for="item in tabledata.filter(c =>c.Fix === 'N')">
              <el-input style="width: 150px;" v-if="item.Consult==='49c51c9b-7e5f-42fa-a9ef-3e137dacfca2'" v-model="item.Value"></el-input>
              <el-date-picker format="yyyy-MM" style="width: 150px;" type="month" v-else-if="item.Consult==='4858805a-48f1-4e68-963d-95cb6deca249'" v-model="item.Value" value-format="yyyy-MM"></el-date-picker>
              <el-date-picker format="yyyy-MM-dd" style="width: 150px;" type="date" v-else-if="item.Consult==='e70ce4ca-0fae-4ef8-a4a7-e07ee23dd3ed'" v-model="item.Value" value-format="yyyy-MM-dd"></el-date-picker>
              <el-select style="width: 150px;" v-else-if="item.Consult==='201d9f4e-4a25-490b-a8fb-d14233ce7d38'" v-model="item.Value">
                <el-option label="请选择" value></el-option>
                <el-option label="制单" value="0"></el-option>
                <el-option label="审批" value="1"></el-option>
              </el-select>
              <el-select style="width: 150px;" v-else-if="item.Consult==='40aad160-e86e-4f7c-b26d-6358d70f5815'" v-model="item.Value">
                <el-option label="请选择" value></el-option>
                <el-option label="Y" value="Y"></el-option>
                <el-option label="N" value="N"></el-option>
              </el-select>
              <el-select style="width: 150px;" v-else-if="item.Consult==='fbaad7db-a8f3-4c48-ae96-853f8d220e84'" v-model="item.Value">
                <el-option label="请选择" value></el-option>
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
              <el-select style="width: 150px;" v-else v-model="item.Value">
                <el-option label="请选择" value></el-option>
                <el-option :key="item.value" :label="item.Text" :value="item.value" v-for="item in item.ConsultList"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import u from "../../utils/utility";
import e from "../../utils/excel";
import request from "../../utils/request";
export default {
  props: {
    pk: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    show: false,
    exp: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentPk: this.pk,
      results: [],
      datalists: [],
      datalistlength: -1,
      querylist: [],
      consultlists: [],
      fixlists: [],
      tabledata: [],
      querydivhegiht: 35,
      linktext: "展开",
      linkclass: "el-icon-arrow-down el-icon--right"
    };
  },
  created: function () {
    this.loaddata();
  },
  mounted() { },
  watch: {
    pk(val, oldValue) {
      if (val === this.currentPk) return;
      this.currentPk = val;
      this.loaddata();
    }
  },
  methods: {
    linkchange: function () {
      let ishide;
      if (this.querydivhegiht === 140) {
        this.querydivhegiht = 35;
        this.linktext = "展开";
        this.linkclass = "el-icon-arrow-down el-icon--right";
        ishide = false;
      } else {
        this.querydivhegiht = 140;
        this.linktext = "收起";
        this.linkclass = "el-icon-arrow-up el-icon--right";
        ishide = true;
      }
      this.$emit("linkchange", ishide);
    },
    btnqueryreset() {
      this.querylist = [];
      this.tabledata.forEach(v => {
        v.Value = "";
      });
    },
    btnquerylist(params) {
      // console.log("----***-----");
      // console.log(params[0].Value);
      // console.log("----***-----");
      let that = this;
      that.querylist = [];
      let msg = "";
      // that.tabledata.forEach((v,i)=>{
      //   v.Value = params[i].Value;
      // })
      that.tabledata.filter(c => c.Parm === "N" && c.Fix === "N").forEach(function (v) {
        let msgmsg = u.addwheres(
          that,
          v.Logic,
          v.Left_Parenthesis,
          v.Field,
          v.Condition,
          v.Value,
          v.Right_Parenthesis,
          v.Fix,
          v.Parm,
          v.Need
        );
        if (!u.isnullorwhitespace(msgmsg)) {
          msg = msg + msgmsg;
        }
      });
      if (!u.isnullorwhitespace(msg)) {
        u.message(that, msg);
      } else {
        that.$emit("query", that.querylist);
      }
    },
    loaddata: function () {
      let that = this;
      if (u.isnullorwhitespace(that.currentPk)) {
        that.results = [];
      } else {
        request.post("sys/ConsultLists", { pk: that.currentPk }).then(
          res => {
            that.consultlists = res;
            // console.log(rc.data)
            request.post("sys/QueryLists", {
              pk: that.currentPk
            }).then(resquery => {
              console.log(resquery)
              that.datalists = resquery;
              that.datalistlength = that.datalists.length;
              if (that.datalists.length === 0) {
                that.btnquerylist();
                that.queryvisible = false;
                return;
              } else if (that.datalists.length >= 6) {
                that.showadd = false;
              }
              if (that.show) {
                that.queryvisible = true;
              }
              that.fixlists = that.datalists.filter(f => f.isQuick === "Y");
              // console.log(that.fixlists)
              that.fieldlists = [];
              that.datalists.forEach(function (val) {
                that.fieldlists.push({
                  Field: val.Field,
                  Name: val.Name,
                  Consult: val.Consult
                });
              });
              this.$emit("fieldLists", that.fieldlists)
              that.loadtabledata();
            })
          })
      }
    },
    loadtabledata: function () {
      let that = this;
      that.tabledata = [];
      let dl = that.datalists.filter(c => c.Fix === "N");
      for (let i = 0; i < (dl.length > 12 ? 12 : dl.length); i++) {
        let row = dl[i];
        let list = that.consultlists.filter(c => c.Consult === row.Consult);
        if (list.length > 0) {
          row.ConsultList = list[0].ConsultList;
          // console.log(row.Consult)
        } else {
          row.ConsultList = [];
        }
        that.tabledata.push(JSON.parse(JSON.stringify(row)));
      }
    }
  }
};
</script>
<style scoped>
.el-main {
  overflow: hidden !important;
  padding: 0 !important;
}
</style>


