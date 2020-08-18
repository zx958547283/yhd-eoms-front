<template>
  <div>
    <el-tabs @tab-click="tabClick">
      <slot></slot>
      <el-tab-pane :label="tab.tabitem" v-for="(tab,index) in tabsdata" :key="index">
        <component v-bind:is="tab.tabname" v-model="currentvalue" v-if="tab.isload"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

  <script>
import u from "../js/utility";
import Vue from "vue";
export default {
  props: {
    pk: {
      type: String,
      default: ""
    },
    fixtabnum: {
      //  引用该控件的固定页签数量
      type: Number,
      default: 0
    },
    cdirectory: {
      type: String,
      default: ""
    },
    value: {}
  },
  data() {
    return {
      currentvalue: this.value,
      tableheight: this.$parent.tableheight,
      tabsdata: []
    };
  },
  mounted: function() {
    let that = this;
    u.getmodelcachef(that, "Deflist", that.pk, that.gettabcontent, false);
  },
  watch: {
    value: function(val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  methods: {
    gettabcontent: function(data) {
      let that = this;
      if (!u.isnullorwhitespace(data)) {
        let tabitem = data.Value.match(/[\u4e00-\u9fa5]+/g);
        let tabname = data.Value.match(/[A-Za-z]+/g);
        for (let i in tabitem) {
          that.tabsdata.push({
            tabitem: tabitem[i],
            tabname: tabname[i],
            isload: false
          });
        }
        for (let i in that.tabsdata) {
          Vue.component(that.tabsdata[i].tabname, function(resolve) {
            if (that.cdirectory === "order") {
              require(["../order/" + that.tabsdata[i].tabname], resolve);
            } else if (that.cdirectory === "customer") {
              require(["../customer/" + that.tabsdata[i].tabname], resolve);
            }
          });
        }
      }
    },
    tabClick(tab, event) {
      // 默认fasle，首次点击页签置为true加载数据,index要减去固定的页签数
      if (!u.isnullorwhitespace(this.tabsdata[tab.index - this.fixtabnum])) {
        this.tabsdata[tab.index - this.fixtabnum].isload = true;
      }
    }
  }
};
</script>
<style>
</style>
