<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">{{title}}</span>
    <el-input :disabled="disabled" :placeholder="placeholder" :readonly="!editable" :size="size" @blur="btntextshow(true)" @focus="btnshow" @keyup.enter.native="btnreturn(textshow)" class="mydefinewidth" v-model="textshow">
      <i @click="btnshow" class="el-icon-search el-input__icon" slot="suffix"></i>
    </el-input>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="winvisible" title="产品选择" top="10vh">
      <el-container>
        <el-aside width="150px">
          <el-tree :data="menudata" :props="{label:'name',children:'childList'}" @node-click="btnquery" highlight-current node-key="pk"></el-tree>
        </el-aside>
        <el-container>
          <el-header style="height:30px;">
            <el-button-group>
              <el-button @click="btnquery()" size="mini" type="primary">查询</el-button>
              <el-button @click="btnmodelf('')" size="mini" type="primary">清除</el-button>
            </el-button-group>
            <cinputquery @query="btnquery()" placeholder="名称" v-model="queryvalue"></cinputquery>
          </el-header>
          <el-main>
            <ctable :data="tabledata" :issmall="true" :pagenum="pagenum" :pagesize="pagesize" :selection="false" @pagechange="btndataload" @row-dblclick="btnselect"></ctable>
          </el-main>
        </el-container>
      </el-container>
    </el-dialog>
  </div>
</template>
<style>
.el-dialog {
  width: 800px;
  height: 550px;
}
.el-table--scrollable-x .el-table__body-wrapper {
  overflow-y: auto;
  min-height: 300px;
}
</style>

<script>
import u from "../../utils/utility";
import pms from "../../api/pms";

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
    text: {
      type: String,
      default: ""
    },
    showfield: {
      type: String,
      default: ""
    },
    issaleorder: false,
    deptpk: {
      type: String,
      default: ""
    },
    customerpk: {
      type: String,
      default: ""
    },
    billdate: {
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
      pagesize: 8,
      queryvalue: "",
      querylist: [],
      mm: [],
      textshow: "",
      queryed: false
    };
  },
  watch: {
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
      this.btnload(this.currentvalue);
    }
  },
  created: function () {
    let that = this;
    u.getProductCategoryTree(this, "menudata");
    if (u.isnullorwhitespace(this.text)) {
      that.btnload(
        u.isnullorwhitespace(this.currentvalue) ? "" : that.currentvalue
      );
    } else {
      this.textshow = this.text;
    }
  },
  mounted: function () {
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
    that.querylist = [];
  },
  methods: {
    btnload: function (pk) {
      if (u.isnullorwhitespace(pk)) {
        this.btnmodelf("");
      } else {
        let that = this;
        that.queryed = true;
        u.getmodelcachef(pms.getProduct, pk, this.btnmodelf);
      }
    },
    btnreturn(pk) {
      let that = this;
      that.queryed = true;
      u.getmodelcachef(pms.getProduct, pk, this.btnmodelf);
    },
    btnmodelf: function (data) {
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
        this.currentvalue = data.id;
        this.btntextshow();
      }
      this.$emit("input", this.currentvalue);
      this.$emit("change", data);
    },
    btnmodelreturn: function (data) {
      this.btnmodelf(data);
      this.$emit("change", [this.mm, this.userdata]);
    },
    btnselect: function (row) {
      this.btnreturn(row.pk);
    },
    btntextshow(blur) {
      let that = this;
      if (blur === true) {
        if (that.queryed === false) {
          that.textshow = that.text;
          return;
        }
      }
      if (u.isnullorwhitespace(that.showfield)) {
        that.textshow = that.mm.name;
      } else {
        let s = that.showfield.split(",");
        let t = "";
        s.forEach(function (value, index) {
          t = t + (u.isnullorwhitespace(that.mm[value]) ? "" : that.mm[value]);
        });
        that.textshow = t;
      }
    },
    btnshow() {
      if (this.disabled) {
        return;
      }
      if (
        this.issaleorder &&
        (u.isnullorwhitespace(this.deptpk) ||
          u.isnullorwhitespace(this.customerpk) ||
          u.isnullorwhitespace(this.billdate))
      ) {
        u.messagenotify(this, "请先选择单据日期、部门、客户");
        return;
      }
      this.winvisible = true;
    },
    btndataload: function (num) {
      let that = this;
      this.pagenum = num;
      u.querywhere(
        that,
        "b446e9b0-c01d-4105-92c1-9e3fdc3e1c44",
        that.querylist,
        this.pagesize,
        that.pagenum,
        "tabledata"
      );
    },
    btnquery: function (data) {
      let that = this;
      that.querylist = [];
      if (u.isnullorwhitespace(data)) {
        u.addwheres(
          this,
          "and",
          "(",
          "pms_product.name",
          "like",
          this.queryvalue,
          ""
        );
        u.addwheres(
          this,
          "or",
          "",
          "pms_product.code",
          "like",
          this.queryvalue,
          ")"
        );
      } else {
        u.addwhere(this, "pms_product.product_category_id", data.id);
      }
      that.btndataload(this.pagenum);
    }
  }
};
</script>
