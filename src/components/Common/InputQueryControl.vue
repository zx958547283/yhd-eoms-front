<template>
<div style="float:right;">
  <div class="order_line" style="float:left;">
    <div style="float:left;" v-if="title" class="controlspan">{{title}}</div>
    <div style="float:left;">
      <el-input  v-model="currentvalue"
                  class="mydefinewidth"
                  :size="size"
                  :readonly="readonly"
                  :disabled="disabled"
                  :placeholder="placeholder"
                  @change="valuechange"
                  @keyup.enter.native="btnquery()">
      </el-input>
    </div>
    <div style="float:left;margin-top:10px;" class="tablesearch" @click="btnquery()"><i class="el-icon-search"></i></div>
  </div>
</div>
  
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    value: [String, Number],
    title: [String],
    length: {
      default: 1
    },
    password: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: "small"
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    userdata: String,
    disabled: Boolean
  },
  data() {
    return {
      currentvalue: this.value,
      itemlists: []
    };
  },
  watch: {
    value: function(val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  created: function() {},
  mounted() {
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
  },
  methods: {
    valuechange: function(val) {
      // console.log(val)
      this.$emit("input", val);
      this.$emit("change", [val, this.userdata]);
    },
    btnquery: function() {
      this.$emit("query");
    }
  }
};
</script>
