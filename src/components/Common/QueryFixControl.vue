<template>
  <div style="display:inline-block;float: right;" v-if="show">
    <span class="controlspan" v-if="title">{{title}}</span>
    <span class="controlspans">
      <el-select :disabled="disabled" :placeholder="placeholder" :size="size" @change="valuechange" class="mydefinewidth" v-model="currentvalue">
        <el-option :key="item.Value" :label="item.Text" :value="item.Value" v-for="item in itemlists.rows"></el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    value: [String, Number],
    title: {
      type: String,
      default: "快捷查询"
    },
    size: {
      type: String,
      default: "small"
    },
    length: {
      type: Number,
      default: 1.5
    },
    placeholder: String,
    userdata: String,
    disabled: Boolean,
    pk: String
  },
  data() {
    return {
      currentvalue: this.value,
      querylist: [],
      itemlists: [],
      show: true
    };
  },
  watch: {
    pk(val, oldValue) {
      // console.log(this.pk);
      this.loaditems();
    },
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    }
  },
  created: function () {
    this.loaditems();
  },
  mounted() {
    let that = this;
    u.setcontrolwidth(this, "mydefinewidth");
  },
  methods: {
    valuechange: function (val) {
      // console.log(val);
      this.$emit("input", val);
      this.querylist = [];
      u.addwherefix(this, val, "querylist");
      this.$emit("query", this.querylist);
    },
    loaditems: function () {
      if (!u.isnullorwhitespace(this.pk)) {
        u.queryurldatacachef(this,
          "QueryQuery/Query",
          {
            pk: "d2dfa74a-e666-4c20-908f-a97301641efd",
            lists: [{ Field: "pk_QueryQuery", Parm: "Y", Value: this.pk }]
          },
          this.loadfun
        );
      }
    },
    loadfun: function (data) {
      this.itemlists = data;
      if (this.itemlists.rows.length === 0) {
        this.show = false;
      }
    }
  }
};
</script>
