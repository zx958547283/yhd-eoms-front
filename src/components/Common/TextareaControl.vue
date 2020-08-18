<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-input :disabled="disabled" :placeholder="placeholder" :readonly="readonly" :rows="rows" @change="valuechange" class="mydefinewidth" type="textarea" v-model="currentvalue"></el-input>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    value: [String, Number],
    title: [String],
    length: {
      type: Number,
      default: 1
    },
    rows: {
      type: Number,
      default: 4
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    userdata: String,
    disabled: Boolean,
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
      // console.log(val)
      this.$emit("input", val);
      this.$emit("change", [val, this.userdata]);
    }
  }
};
</script>
