<template>
  <div class="order_line" style="overflow: inherit">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-image  :src="item.file_path"  class="images_size"  v-for="(item,key) in images" v-bind:key="key"></el-image>
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
    required: {
      type: Boolean,
      default: false
    },
    images: {
      default: []
    },
    srcList: {
      default: []
    }
  },
  data() {
    return {
      currentvalue: this.value,
      itemlists: []
    };
  },
  watch: {
    currentvalue() {
      //        原生的type='password' element没有这个属性，只能通过原生input去添加
      if (this.password === true) {
        let parent = this.$el.getElementsByClassName("el-input")[0];
        let child = parent.getElementsByTagName("input")[0];
        child.setAttribute("type", "password");
      }
    },
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  created: function () { },
  mounted() {
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
  },
  methods: {
    valuechange: function (val) {
      // console.log(val)
      this.$emit("input", val);
      this.$emit("change", [val, this.userdata]);
    },
    focusInput(val) {
      this.$emit("focus");
    }
  },
  beforeDestroy: function () {
    // console.log("destroy" + this.title);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.images_size {
  width:200px;
  height:200px;
  margin-left:10px;
  float: left;
}
</style>
