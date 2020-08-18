<template>
  <div class="order_line">
    <span v-if="title" class="controlspan">{{title}}</span>
    <el-input :size="size" :disabled="disabled" :readonly="true" class="mydefinewidth" :placeholder="placeholder" @focus="btnshow" v-model="textshow" @keyup.enter.native="btnreturn(textshow)">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="btnshow"></i>
    </el-input>
    <el-dialog title="员工选择" :visible.sync="winvisible" :close-on-click-modal="false" top="10vh" :modal-append-to-body="false">
      <el-container>
        <el-aside width="150px">
          <el-tree :data="menudata" node-key="pk" highlight-current @node-click="btnquery"></el-tree>
        </el-aside>
        <el-container>
          <el-header style="height:30px;">
            <el-button-group>
              <el-button size="mini" type="primary" @click="btnquery()">查询</el-button>
              <el-button size="mini" type="primary" @click="btnmodelf('')">清除</el-button>
            </el-button-group>
            <cinput v-model="queryvalue" class="inline" @keyup.enter.native="btnquery()" placeholder="名称"></cinput>
          </el-header>
          <el-main>
            <ctable :data="tabledata" :selection="false" @row-dblclick="btnselect" @pagechange="btndataload" :pagenum="pagenum" :pagesize="pagesize" :issmall="true"></ctable>
          </el-main>
        </el-container>
      </el-container>
    </el-dialog>
  </div>
</template>

<script>
import u from "../js/utility";
export default {
  props: {
    length: {
      type: Number,
      default: 1
    },
    value: [String],
    title: [String],
    size: {
      type: String,
      default: "small"
    },
    placeholder: String,
    disabled: Boolean,
    userdata: String,
    editable: false,
    showfield: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      currentvalue: this.value,
      tabledata: [],
      menudata: [],
      winvisible: false,
      wintitle: "",
      pagenum: 1,
      pagesize: 10,
      queryvalue: "",
      querylist: [],
      mm: [],
      textshow: ""
    };
  },
  watch: {
    value: function(val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
      this.btnload(this.currentvalue);
    }
  },
  created: function() {
    let that = this;
    u.querydatacache(that, "Dept/TreeList", null, "menudata");
    that.btnload(
      u.isnullorwhitespace(that.currentvalue) ? "" : that.currentvalue
    );
  },
  mounted: function() {
    let that = this;
    that.querylist = [];
    u.setcontrolwidth(that, "mydefinewidth");
  },
  methods: {
    btnload: function(pk) {
      if (u.isnullorwhitespace(pk)) {
        this.btnmodelf("");
      } else {
        let that = this;
        u.getmodelcachef(that, "Employee", pk, that.btnmodelf, false);
      }
    },
    btnreturn(pk) {
      let that = this;
      u.getmodelcachef(that, "Employee", pk, that.btnmodelreturn, false);
    },
    btnmodelf: function(data) {
      this.winvisible = false;
      if (u.isnullorwhitespace(data)) {
        if (data === null) {
          if (this.editable) {
            this.winvisible = true;
            this.queryvalue = this.textshow;
            this.btnquery();
          }
        } else {
          this.currentvalue = "";
        }
        this.mm = [];
        this.textshow = "";
      } else {
        this.mm = data;
        this.currentvalue = data.pk_Employee;
        this.btntextshow();
      }
      this.$emit("input", this.currentvalue);
    },
    btnmodelreturn: function(data) {
      this.btnmodelf(data);
      this.$emit("change", [this.mm, this.userdata]);
    },
    btnselect: function(row) {
      this.btnreturn(row.pk);
    },
    btntextshow() {
      // this.textshow = u.isnullorwhitespace(this.showfield) ? this.mm.Name : this.mm[this.showfield]
      let that = this;
      if (u.isnullorwhitespace(that.showfield)) {
        that.textshow = that.mm.Name;
      } else {
        let s = that.showfield.split(",");
        let t = "";
        s.forEach(function(value, index) {
          t = t + (u.isnullorwhitespace(that.mm[value]) ? "" : that.mm[value]);
        });
        that.textshow = t;
      }
    },
    btnshow() {
      if (this.disabled) {
        return;
      }
      this.winvisible = true;
    },
    btndataload: function(num) {
      let that = this;
      this.pagenum = num;
      u.querywhere(
        that,
        "a62ff25a-3672-471c-a4fc-a78b01714d91",
        that.querylist,
        this.pagesize,
        that.pagenum,
        "tabledata"
      );
    },
    btnquery: function(data) {
      let that = this;
      that.querylist = [];
      if (u.isnullorwhitespace(data)) {
        u.addwherelike(this, "Employee.Name", this.queryvalue);
      } else {
        u.addwheres(this, "and", "", "Employee.pk_Dept", "=", data.pk, "");
      }
      that.btndataload(this.pagenum);
    }
  }
};
</script>
