<template>
  <div class="order_linenum">
    <span class="controlspan" v-if="title">{{title}}</span>
    <el-input-number :controls="controls" :disabled="disabled" :max="max" :min="min" :placeholder="placeholder" :precision="precision" :readonly="readonly" :size="size" @change="valuechange" class="numdefinewidth inputnum" controls-position="right" v-model="currentvalue"></el-input-number>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    length: {
      type: Number,
      default: 1
    },
    value: [Number],
    title: [String],
    size: {
      type: String,
      default: "small"
    },
    controls: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 60
    },
    precision: {
      type: Number,
      default: 2
    },
    placeholder: String,
    userdata: String,
    disabled: Boolean,
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    }
  },
  data() {
    return {
      currentvalue: this.value,
      itemlists: []
    };
  },
  watch: {
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  created: function () { },
  mounted() {
    this.$el.getElementsByClassName("numdefinewidth")[0].style.width =
      this.width + "px";
    // this.$el.getElementsByClassName('numdefinewidth')[0].style['padding-left'] = '5px'
  },
  methods: {
    valuechange: function (val) {
      this.$emit("input", val);
      this.$emit("change", [val, this.userdata]);
    }
  }
};
</script>
<style>
.inputnum input {
  text-align: right !important;
  padding: 0 3px !important;
}

.inputnum input:disabled {
  background: #ffffff !important;
  border: none !important;
  color: #606266 !important;
}

.order_linenum {
  overflow: hidden;
  display: inline-block;
  font-size: 13px;
  color: #48576a;
  /* float: left; */
  /* width: 80px; */
  height: 32px;
  /* line-height: 28px; */
  /* margin-left: 10px; */
}

.numdefinewidth {
  margin-left: 0px;
}
</style>
