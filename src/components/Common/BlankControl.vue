<template>
  <div class="order_line">
    <span class="controlspan">{{title}}</span>
    <!-- 宽度不管用只能用padding -->
    <span class="mydefinewidth" style="padding:0px 140px 0 0;">{{value}}</span>
  </div>
</template>

<script>
import u from "../js/utility";
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
      // this.$emit('input', val)
      //  this.$emit('change', [val, this.userdata])
    }
  }
};
</script>
