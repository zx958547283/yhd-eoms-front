<template>
  <div ref="uicontent">
    <!-- cicontrol用于动态组件加载的根 -->
  </div>
</template>
<script>
import Vue from "vue";
import u from "../../utils/utility";

export default {
  props: {
    value: {},
    pk: [String],
    uistate: ""
  },
  data() {
    return {
      mm: this.value,
      pagestate: this.uistate,
      destroystate: true,
      pca: []
    };
  },
  watch: {
    value: function(val, oldValue) {
      if (val === this.mm) {
        return;
      }
      this.mm = val;
    },
    pk: function(val, oldValue) {
      if (val === this.oldValue) {
        return;
      } else {
        this.pk = val;
      }
      if (this.pk) {
        u.loadDynamicUI(this, this.pk);
      }
    },
    uistate: function(val, oldValue) {
      if (val === this.pagestate) {
        return;
      }
      this.pagestate = val;
    },
    pca: function(val, oldValue) {
      if (!u.isnullorwhitespace(val[0])) {
        this.mm.Province = val[0];
        this.mm.City = val[1];
        this.mm.Area = val[2];
      }
    },
    pcaobject: function(val, oldValue) {
      if (!u.isnullorwhitespace(val[0])) {
        this.pca = val;
      }
    }
  },
  computed: {
    pcaobject() {
      return [this.mm.Province, this.mm.City, this.mm.Area];
    }
  },
  created: function() {},
  mounted: function() {
    // console.log(this)
    if (this.pk) {
      u.loadDynamicUI(this, this.pk);
    }
  },
  methods: {},
  beforeDestroy: function() {
    this.destroystate = false;
  }
};
</script>