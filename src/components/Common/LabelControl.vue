<template>
  <div class="order_line">
    <span class="controlspan" style="width:auto" v-if="title">{{title}}</span>
    <span class="controlspan">{{currentvalue}}</span>
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
    value: [String, Number],
    title: [String],
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
  },
  methods: {
    valuechange: function (val) {
      // console.log(val)
      // this.$emit('input', val)
      //  this.$emit('change', [val, this.userdata])
    }
  }
};
</script>
