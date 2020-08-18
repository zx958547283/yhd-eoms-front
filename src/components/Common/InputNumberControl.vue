<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-input-number :controls="controls" :disabled="disabled" :max="max" :min="min" :placeholder="placeholder" :precision="precision" :readonly="readonly" :size="size" @change="valuechange" class="mydefinewidth inputnumber" controls-position="right" v-model="currentvalue"></el-input-number>
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
    value: [String],
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
    placeholder: String,
    userdata: String,
    disabled: Boolean,
    precision: {
      type: Number
    },
    max: {
      type: Number,
      default: Infinity
    },
    min: {
      type: Number,
      default: -Infinity
    },
    required: {
      type: Boolean,
      default: false
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
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
  },
  methods: {
    valuechange: function (val) {
      this.$emit("input", String(val));
      this.$emit("change", [String(val), this.userdata]);
    }
  }
};
</script>
<style>
.inputnumber input {
  text-align: right !important;
  padding: 15px 15px !important;
}
</style>
