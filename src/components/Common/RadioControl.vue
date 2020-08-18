<template>
  <div class="order_line" style="overflow: inherit; ">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <el-radio-group @change="radioChanged" class="mydefinewidth" v-model="currentvalue">
      <el-radio :key="item.label" :label="item.label" @change="valuechange" v-for="item in itemlists">{{item.txt}}</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    value: {
      type: String,
      default: "1"
    },
    title: [String],
    length: {
      default: 1
    },
    inType: {
      type: String,
      default: "text"
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
    disabled: Boolean,
    required: {
      type: Boolean,
      default: false
    },
    itemlists: {
      type: Array
    }
  },
  data() {
    return {
      currentvalue: this.value
    };
  },
  watch: {
    value: function (val, oldValue) {
      this.currentvalue = val;
      console.log('===============' + this.currentvalue)
    }
  },
  created: function () {
    console.log('---------- create ------' + this.value)
  },
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
    },
    radioChanged(val) {
      this.$emit("radioChange", val);
    }
  },
  beforeDestroy: function () {
    // console.log("destroy" + this.title);
  }

};
</script>
