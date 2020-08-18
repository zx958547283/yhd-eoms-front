<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">
      <span v-show="required" style="color:red;">*</span> {{title}}
    </span>
    <el-input :disabled="disabled" :placeholder="placeholder" :readonly="true" :size="size" @focus="btnshow" @keyup.enter.native="btnreturn(textshow)" class="mydefinewidth" v-model="textshow">
      <i @click="btnshow" class="el-icon-search el-input__icon" slot="suffix"></i>
    </el-input>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="winvisible" height="200px" title="公司选择" width="800px">
      <el-container>
        <el-aside width="150px">
          <el-tree :data="menudata" node-key="id" :props="{label:'name',children:'listChild'}" highlight-current @node-click="btnquery"></el-tree>
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

<script>
import u from "../../utils/utility";
import ums from "../../api/ums";

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
    },
    required: {
      type: Boolean,
      default: false
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
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
      this.btnload(this.currentvalue);
    }
  },
  created: function() {
    u.getCompanyTree(this, "menudata");
    this.btnload(
      u.isnullorwhitespace(this.currentvalue) ? "" : this.currentvalue
    );
  },
  mounted: function () {
    this.querylist = [];
    u.setcontrolwidth(this, "mydefinewidth");
  },
  methods: {
    btnload: function (pk) {
      if (u.isnullorwhitespace(pk)) {
        this.btnmodelf("");
      } else {
        u.getmodelcachef(ums.getOraganization, pk, this.btnmodelf);
      }
    },
    btnreturn(pk) {
      u.getmodelcachef(ums.getOraganization, pk, this.btnmodelreturn);
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
      console.log("input emit:" + this.currentvalue);
      console.log(data);
      
      this.$emit("input", this.currentvalue);
    },
    btnmodelreturn: function (data) {
      this.btnmodelf(data);
      this.$emit("change", [this.mm, this.userdata]);
    },
    btnselect: function (row) {
      this.btnreturn(row.pk);
    },
    btntextshow() {
      if (u.isnullorwhitespace(this.showfield)) {
        this.textshow = this.mm.name;
      } else {
        let s = this.showfield.split(",");
        let t = "";
        s.forEach(function (value, index) {
          t = t + (u.isnullorwhitespace(this.mm[value]) ? "" : this.mm[value]);
        });
        this.textshow = t;
      }
    },
    btnshow() {
      if (this.disabled) {
        return;
      }
      this.winvisible = true;
    },
    btndataload: function (num) {
      this.pagenum = num;
      u.querywhere(
        this,
        "84508034-c836-49e7-b404-61b507e18f39",
        this.querylist,
        this.pagesize,
        this.pagenum,
        "tabledata"
      );
    },
    btnquery: function (data) {
      this.querylist = [];
      if (u.isnullorwhitespace(data)) {
        u.addwherelike(this, "ums_organization.name", this.queryvalue);
      } else {
        u.addwheres(this, "and", "(", "ums_organization.parent_id", "=", data.id, "");
        u.addwheres(this, "or", "", "ums_organization.id", "=", data.id, ")");
      }
      this.btndataload(this.pagenum);
    }
  }
};
</script>
