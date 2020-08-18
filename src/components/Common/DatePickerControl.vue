<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-date-picker :disabled="disabled" :editable="editable" :format="show_format" :placeholder="placeholder" :popperClass="popperClass" :readonly="readonly" :size="size" :type="type" :value-format="value_format" @change="valuechange" class="mydefinewidth" v-model="currentvalue"></el-date-picker>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    show_format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    value_format: {
      type: String,
      default: "yyyy-MM-dd"
    },
    value: [String],
    title: [String],
    type: {
      type: String,
      default: "date"
    },
    length: {
      type: Number,
      default: 1
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
    disabled: Boolean,
    popperClass: String,
    editable: {
      type: Boolean,
      default: true
    },
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentvalue: this.value
    };
  },
  watch: {
    value: function (val, oldValue) {
      console.log(val)
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
      // console.log(val);
      this.$emit("input", val);
      this.$emit("change", [val, this.userdata]);
    }
  }
};
</script>
