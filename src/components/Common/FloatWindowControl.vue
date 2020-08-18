<template>
  <transition name="fade">
    <div :style="'width:'+ (300 * length + 34) +'px;'" class="floatwindow" v-drag.cursor="'#dragable'" v-show="currentvalue">
      <div id="dragable">
        <span class="floatwindowspan">{{title}}</span>
        <span @click="valuechange" class="el-icon-close"></span>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      currentvalue: this.value
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    value: {
      type: Boolean,
      default: false
    },
    length: {
      default: 2
    }
  },
  watch: {
    value(val) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  mounted() {
  },
  methods: {
    valuechange: function (val) {
      this.currentvalue = false;
      this.$emit("input", this.currentvalue);
    }
  }
};
</script>
<style>
#dragable {
  width: 100%;
  height: 30px;
}

.floatwindow {
  box-shadow: 0px 0px 16px #409eff;
  position: fixed !important;
  left: 30%;
  background: #fff;
  top: 25%;
  border-radius: 2px;
  border: 1px solid #d1dbe5;
  padding: 15px 20px 40px 20px;
  z-index: 200;
  font-size: 12px;
  min-height: 100px;
}

.floatwindowspan {
  font-size: 14px;
  letter-spacing: 2px;
  font-weight: inherit;
  color: #666;
}

#dragable .el-icon-close {
  font-size: 16px;
  cursor: pointer;
  float: right;
}
#dragable .el-icon-close:hover {
  color: red;
}
</style>
