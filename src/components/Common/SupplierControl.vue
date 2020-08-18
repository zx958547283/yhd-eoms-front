<template>
  <div class="order_line">
    <span v-if="title" class="controlspan">{{title}}</span>
    <el-input :size="size" class="mydefinewidth" :disabled="disabled" :readonly="!editable" @blur="btntextshow(true)" :placeholder="placeholder" @focus="btnshow" v-model="textshow" @keyup.enter.native="btnreturn(textshow)">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="btnshow"></i>
    </el-input>
    <el-dialog title="客商选择" :visible.sync="winvisible" :close-on-click-modal="false" :modal-append-to-body="false" top="10vh" center class="compoent_dialog">
      <el-button-group>
        <el-button size="mini" type="primary" @click="btnquery()">查询</el-button>
        <el-button size="mini" type="primary" @click="btnmodelf('')">清除</el-button>
      </el-button-group>
      <cinputquery v-model="queryvalue" @query="btnquery()" placeholder="名称"></cinputquery>
      <ctable :data="tabledata" :selection="false" @row-dblclick="btnselect" @pagechange="btndataload" :pagenum="pagenum" :pagesize="pagesize" :issmall="true"></ctable>
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
      textshow: "",
      queryed: false
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
    that.btnload(
      u.isnullorwhitespace(this.currentvalue) ? "" : that.currentvalue
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
        that.queryed = true;
        u.getmodelf(that, "Customer", pk, that.btnmodelf, false);
      }
    },
    btnreturn(pk) {
      let that = this;
      that.queryed = true;
      u.getmodelf(that, "Customer", pk, that.btnmodelreturn, false);
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
        this.currentvalue = data.pk_Customer;
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
    btntextshow(blur) {
      // this.textshow = u.isnullorwhitespace(this.showfield) ? this.mm.Name : this.mm[this.showfield]
      let that = this;
      if (blur === true) {
        if (that.queryed === false) {
          that.textshow = that.text;
          return;
        }
      }
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
        "4e3b90ad-8fcd-45b3-b13a-a78b01094f63",
        that.querylist,
        this.pagesize,
        that.pagenum,
        "tabledata"
      );
    },
    btnquery: function(data) {
      this.querylist = [];
      if (u.isnullorwhitespace(this.queryvalue)) {
        if (u.ischs(this.queryvalue)) {
          u.addwherelike(this, "Customer.Name", this.queryvalue);
        } else {
          u.addwheres(
            this,
            "and",
            "(",
            "Customer.Tel",
            "like",
            this.queryvalue,
            ""
          );
          u.addwheres(
            this,
            "or",
            "",
            "Customer.Mobile",
            "like",
            this.queryvalue,
            ""
          );
          u.addwheres(
            this,
            "or",
            "",
            "Customer.OtherTel",
            "like",
            this.queryvalue,
            ""
          );
          u.addwheres(
            this,
            "or",
            "",
            "Customer.CardNo",
            "=",
            this.queryvalue,
            ")"
          );
        }
      }
      this.btndataload(this.pagenum);
    }
  }
};
</script>
