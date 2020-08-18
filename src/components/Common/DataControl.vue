<template>
  <div style="display:inline-block">
    <el-button icon="el-icon-refresh" @click="btndataload()" circle></el-button>
    <span>{{title}}</span>
    <div :id="dataid" v-bind:style="{ width:  width + 'px' , height: height + 'px' }">
      <ctable :data="tabledata" :height="height" :selection=false :pagenum="0" :loading="loading"></ctable>
    </div>
  </div>
</template>

<script>
import u from "../js/utility";
export default {
  props: {
    dataid: {
      type: String,
      default: "dataid"
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
    pk: String
  },
  data() {
    return {
      tabledata: {},
      loading: false,
      timer: null
    };
  },
  // watch: {
  //   pk(val, oldValue) {
  //     console.log("watchbtndataload");
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
        let myid = document.getElementById(this.dataid);
        // console.log(myid, this.timer);
        if (myid === null) {
          clearInterval(this.timer);
          return;
        }
      }
      u.querywhere(this, this.pk, null, 0, 0, "tabledata", false);
    }
  }
};
</script>
