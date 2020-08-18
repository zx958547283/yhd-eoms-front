<template>
  <div style="display:inline-block">
    <el-button icon="el-icon-refresh" @click="btndataload()" circle></el-button>
    <span>{{title}}</span>
    <div :id="myid" v-bind:style="{ width:  width + 'px' , height: height + 'px' }"></div>
  </div>
</template>

<script>
import u from "../js/utility";
var echarts = require("echarts/lib/echarts");
export default {
  props: {
    chartid: {
      type: String,
      default: "chartid"
    },
    title: [String],
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    second: {
      type: Number,
      default: 0
    },
    pk: String,
    type: {
      type: String,
      default: "bar"
    },
    stack: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tabledata: [],
      loading: false,
      timer: null,
      myid: this.chartid + u.newid()
    };
  },
  // watch: {
  //   pk(val, oldValue) {
  //     console.log("watchDestroy");
  //     this.btndataload();
  //   }
  // },
  created: function() {},
  beforeDestroy: function() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    // console.log("beforeDestroy");
  },
  destroyed: function() {
    // console.log("destroyed");
  },
  mounted() {
    // console.log("mountedbtndataload");
    this.btndataload();
    this.addtimer();
  },
  methods: {
    addtimer: function() {
      if (this.second > 0) {
        this.timer = setInterval(this.btndataload, this.second * 1000);
      }
    },
    btndataload: function() {
      if (this.timer) {
        let myid = document.getElementById(this.myid);
        // console.log(myid, this.timer);
        if (myid === null) {
          clearInterval(this.timer);
          return;
        }
      }
      u.querychart(
        this,
        this.pk,
        null,
        u.isnullorwhitespace(this.type) ? "bar" : this.type,
        document,
        echarts,
        this.myid,
        this.stack ? "汇总" : "",
        "",
        false
      );
    }
  }
};
</script>
