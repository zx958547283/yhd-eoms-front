<template>
  <div class="order_line">
    <span v-if="title" class="controlspan">
       <span style="color:red;" v-if="required === true">*</span>
      {{title}}</span>

    <el-input :size="size" :disabled="disabled" class="mydefinewidth" :readonly="false" :placeholder="placeholder" @focus="btnshow" v-model="textshow" @keyup.enter.native="btnreturn(textshow)">
      <i class="el-icon-search el-input__icon" slot="suffix" @click="btnshow"></i>
    </el-input>
    <el-dialog title="部门选择" width="800px" :visible.sync="winvisible" :close-on-click-modal="false" :modal-append-to-body="false" top="10vh">
      <el-container>
        <el-aside width="150px">
          <el-tree :data="menudata" node-key="id" :props="{label:'name',children:'listChild'}" highlight-current @node-click="btnquery"></el-tree>
        </el-aside>
        <el-container>
          <el-header style="height:30px;">
            <el-button-group>
              <el-button size="mini" type="primary" @click="btnquery()">查询</el-button>
              <el-button size="mini" type="primary" @click="btnmodelf('')">清除</el-button>
            </el-button-group>
            <cinputquery v-model="queryvalue" @query="btnquery()" placeholder="名称"></cinputquery>
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
    value: function(val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
      this.btnload(this.currentvalue);
    }
  },
  created: function() {
    u.getDepartTree(this, "menudata");
    this.btnload(
      u.isnullorwhitespace(this.currentvalue) ? "" : this.currentvalue
    );
  },
  mounted: function() {
    this.querylist = [];
    u.setcontrolwidth(this, "mydefinewidth");
  },
  methods: {
    btnload: function(pk) {
      if (u.isnullorwhitespace(pk)) {
        this.btnmodelf("");
      } else {
        u.getmodelcachef(ums.getOraganization, pk, this.btnmodelf);
      }
    },
    btnreturn(pk) {
      u.getmodelcachef(ums.getOraganization, pk, this.btnmodelreturn);
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
        this.currentvalue = data.id;
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
      if (u.isnullorwhitespace(this.showfield)) {
        this.textshow = this.mm.name;
      } else {
        let s = this.showfield.split(",");
        let t = "";
        s.forEach(function(value, index) {
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
    btndataload: function(num) {
      this.pagenum = num;
      u.querywhere(
        this,
        "3128b50e-0180-4392-927f-49be4dff6de1",
        this.querylist,
        this.pagesize,
        this.pagenum,
        "tabledata"
      );
    },
    btnquery: function(data) {
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
