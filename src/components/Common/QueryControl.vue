<template>
  <div id="querycontrol">
    <cwindow :length="3" title="查询" v-model="queryvisible">
      <el-container>
        <el-aside width="500px">
          <el-table :data="tabledata.filter(c => c.Parm === 'N' && c.Fix === 'N')" height="350px" highlight-current-row stripe>
            <el-table-column label="逻辑" width="80px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.Logic">
                  <el-option label="并且" value="and"></el-option>
                  <el-option label="或者" value="or"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="(" width="50px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.LeftParenthesis">
                  <el-option label="  " value=" "></el-option>
                  <el-option label="(" value="("></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="字段">
              <template slot-scope="scope1">
                <el-select @change="fieldselect(scope1.row)" v-model="scope1.row.Field">
                  <el-option :key="item.Field" :label="item.Name" :value="item.Field" v-for="item in fieldlists"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="条件">
              <template slot-scope="scope">
                <el-select v-model="scope.row.Condition">
                  <el-option label="等于" value="="></el-option>
                  <el-option label="大于等于" value=">="></el-option>
                  <el-option label="小于等于" value="<="></el-option>
                  <el-option label="不等于" value="<>"></el-option>
                  <el-option label="包含" value="like"></el-option>
                  <el-option label="不包含" value="not like"></el-option>
                  <el-option label="以开始" value="begin"></el-option>
                  <el-option label="以结束" value="end"></el-option>
                  <el-option label="为空" value="is null"></el-option>
                  <el-option label="非空" value="is not null"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="值" width="120px">
              <template slot-scope="scope">
                <el-input v-if="scope.row.Consult==='49c51c9b-7e5f-42fa-a9ef-3e137dacfca2'" v-model="scope.row.Value"></el-input>
                <el-date-picker format="yyyy-MM" type="month" v-else-if="scope.row.Consult==='4858805a-48f1-4e68-963d-95cb6deca249'" v-model="scope.row.Value" value-format="yyyy-MM"></el-date-picker>
                <el-date-picker format="yyyy-MM-dd" type="date" v-else-if="scope.row.Consult==='e70ce4ca-0fae-4ef8-a4a7-e07ee23dd3ed'" v-model="scope.row.Value" value-format="yyyy-MM-dd"></el-date-picker>
                <el-select v-else-if="scope.row.Consult==='201d9f4e-4a25-490b-a8fb-d14233ce7d38'" v-model="scope.row.Value">
                  <el-option label="请选择" value></el-option>
                  <el-option label="制单" value="0"></el-option>
                  <el-option label="审批" value="1"></el-option>
                </el-select>
                <el-select v-else-if="scope.row.Consult==='40aad160-e86e-4f7c-b26d-6358d70f5815'" v-model="scope.row.Value">
                  <el-option label="请选择" value></el-option>
                  <el-option label="Y" value="Y"></el-option>
                  <el-option label="N" value="N"></el-option>
                </el-select>
                <el-select v-else-if="scope.row.Consult==='fbaad7db-a8f3-4c48-ae96-853f8d220e84'" v-model="scope.row.Value">
                  <el-option label="请选择" value></el-option>
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>
                </el-select>
                <el-select v-else v-model="scope.row.Value">
                  <el-option label="请选择" value></el-option>
                  <el-option :key="item.value" :label="item.Text" :value="item.value" v-for="item in scope.row.ConsultList"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label=")" width="50px">
              <template slot-scope="scope">
                <el-select v-model="scope.row.RightParenthesis">
                  <el-option label="  " value=" "></el-option>
                  <el-option label=")" value=")"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-aside>
        <el-container>
          <el-main>
            <div class="headertitle">
              <span class="iconfont yt-icon-shujuwajue" style="color:#666;">快捷查询</span>
              <el-checkbox style="color:#666;" v-model="fstj" v-show="fixlists.length!==0">(附上条件)</el-checkbox>
            </div>
            <div>
              <el-button :key="item.pk_QueryList" @click="btnqueryfix(item)" type="text" v-for="item in fixlists">{{item.Name}}</el-button>
            </div>
          </el-main>
          <el-footer style="height:30px;">
            <el-button-group>
              <el-button @click="btnaddline()" size="mini" type="info" v-show="showadd">增行</el-button>
              <el-button @click="loadtabledata()" size="mini" type="info">清除</el-button>
              <el-button @click="btnexcel()" size="mini" type="info" v-show="exp">导出</el-button>
              <el-button @click="btnquerylist()" size="mini" type="primary">查询</el-button>
            </el-button-group>
          </el-footer>
        </el-container>
      </el-container>
    </cwindow>
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
      queryvisible: this.value,
      results: [],
      datalists: [],
      datalistlength: -1,
      querylist: [],
      consultlists: [],
      fixlists: [],
      tabledata: [],
      fieldlists: [],
      showadd: true,
      fstj: false,
      cqueryrow: "height:10px;"
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
    },
    value(val, oldValue) {
      if (this.datalistlength === 0) {
        this.btnquerylist();
        this.queryvisible = false;
      } else {
        if (val === this.queryvisible) {
          return;
        }
        this.queryvisible = val;
      }
    },
    queryvisible(val, oldValue) {
      this.$emit("input", val);
    }
  },
  methods: {
    btnaddline: function () {
      let that = this;
      if (this.tabledata.length >= 10) {
        u.messagenotify(that, "查询条件最多允许10行");
        return;
      } else {
        let rows = that.datalists.filter(c => c.Parm === "N" && c.Fix === "N");
        if (rows.length === 0) {
          u.messagenotify(that, "没有适合增加的条件行");
          return;
        } else {
          let row = rows[0];
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
        that.queryvisible = false;
      }
    },
    btnqueryfix(row) {
      let that = this;
      that.querylist = [];
      if (this.fstj) {
        that.tabledata.forEach(function (v) {
          u.addwheres(
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
        });
      }
      u.addwheres(
        this,
        row.Logic,
        row.Left_Parenthesis,
        row.Field,
        row.Condition,
        row.Value,
        row.Right_Parenthesis,
        row.Fix,
        row.Parm,
        row.Need
      );
      that.$emit("query", that.querylist);
      that.queryvisible = false;
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
              } else if (that.datalists.length >= 10) {
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
      for (
        let i = 0;
        i < (that.datalists.length > 10 ? 10 : that.datalists.length);
        i++
      ) {
        let row = that.datalists[i];
        let list = that.consultlists.filter(c => c.Consult === row.Consult);
        if (list.length > 0) {
          row.ConsultList = list[0].ConsultList;
          // console.log(row.Consult)
        } else {
          row.ConsultList = [];
        }
        that.tabledata.push(JSON.parse(JSON.stringify(row)));
      }
    },
    fieldselect: function (row) {
      // console.log(this.tabledata)
      // debugger
      row.Value = "";
      let ql = this.datalists.filter(c => c.Field === row.Field)[0];
      row.Consult = ql.Consult;
      row.Need = ql.Need;
      row.Parm = ql.Parm;
      row.Fix = ql.Fix;
      let list = this.consultlists.filter(c => c.Consult === row.Consult);
      if (list.length > 0) {
        row.ConsultList = list[0].ConsultList;
      } else {
        row.ConsultList = [];
      }
      // console.log(this.tabledata)
    },
    btnexcel: function () {
      let that = this;
      that.querylist = [];
      that.tabledata.forEach(function (v) {
        u.addwheres(
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
      });
      that.queryvisible = false;
      u.querywhere(that, that.pk, that.querylist, 0, 0).then(function (r) {
        if (r.ok) {
          e.exportxlsx(r.data.rows);
        } else {
          u.message(that, r.message);
        }
      });
    }
  }
};
</script>
<style scope>
/* 去掉列表两头pading */
#querycontrol .el-table td,
.el-table th {
  padding: 0 0;
}
/* 列表里文字框样式 */
#querycontrol .el-input__inner {
  padding: 0px;
  font-size: 13px;
  height: 20px !important;
  line-height: 20px !important;
}
/* 下拉控件箭头样式 */
#querycontrol .el-input__suffix {
  right: -4px;
  top: 10px;
}
/* 表体行高度 */
#querycontrol .el-table__row {
  height: 28px;
}
/* 日历图标位置 */
#querycontrol .el-input__prefix {
  left: 75px;
  top: -7px;
  width: 25px;
}
/*快捷查询主题窗口*/
#querycontrol .el-main {
  border: 1px solid #ebeef5;
}
#querycontrol .el-footer {
  padding: 0 0;
  text-align: right;
  padding-top: 5px;
}
/*多条件窗口*/
#querycontrol .el-aside {
  border: 1px solid #ebeef5;
}
</style>


