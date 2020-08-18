<template>
  <div class="order_line" style="overflow: inherit">
    <span class="controlspan" v-if="title">{{title}}</span>
    <el-cascader :disabled="disabled" :options="menudata" :props="addressprops" :size="size" @change="valuechange" class="mydefinewidth" clearable filterable v-model="currentvalue"></el-cascader>
  </div>
</template>

<script>
import u from "../../utils/utility";
import common from "../../api/common";

export default {
  props: {
    disabled: Boolean,
    value: {
      Type: Array,
      default: []
    },
    title: [String],
    size: {
      type: String,
      default: "small"
    },
    length: {
      type: Number,
      default: 2
    },
    //显示层级 1:只显示省  2:显示省市  3:显示省市区  
    showLevel: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      currentvalue: this.value,
      menudata: [],
      cityarray: [],
      addressprops: {
        value: "label"
      },
      flag: true
    };
  },
  mounted() {
    let that = this;
    u.setcontrolwidth(that, "mydefinewidth");
    common.getAllCity({ showLevel: this.showLevel }).then(res => {
      that.menudata = res;
    });
  },
  watch: {
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  methods: {
    valuechange: function (val) {
      this.$emit("input", val);
    },
    handleItemChange(val) {
      //        console.log(val)
    },
    handleChange(value) {
      //        console.log(value)
    }
  }
};
</script>
