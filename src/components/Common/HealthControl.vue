<template>
  <div>
    <el-tabs v-model="tabfirst">
      <el-tab-pane :key="tab.Value" :label="tab.Text" :name="tab.Value" v-for="(tab,index) in tabs">
        <el-checkbox-group @change="valuechange" v-model="healths">
          <el-checkbox :key="item.Value" :label="item.Value" v-for="item in tabitems[index]">{{item.Text}}</el-checkbox>
        </el-checkbox-group>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    pk: [String]
  },
  watch: {
    pk: function (val, oldValue) {
      // if (val === oldValue) {
      //   return
      // }
      if (!u.isnullorwhitespace(val)) {
        let that = this;
        u
          .getdata(that, "Health/GetHealthItems", { pk_Owner: val }, false)
          .then(function (r) {
            if (r.ok) {
              console.log(r.data);
              that.healths = r.data;
            } else {
              u.message(that, r.message);
            }
          });
      }
    }
  },
  data() {
    return {
      healths: [],
      tabs: [],
      tabitems: {},
      tabfirst: ""
    };
  },
  created: function () { },
  mounted: function () {
    let that = this;
    u
      .queryquery(this, "64730829-6bc3-4ff5-ba4a-a7d900ef5cfe")
      .then(function (r) {
        if (r.ok) {
          r.data.rows.forEach(function (value, index) {
            u.queryurldatacachef(this,
              "QueryQuery/Query",
              {
                pk: "74651db8-1724-4952-9357-a7ad009db7b9",
                lists: [{ Field: "pk_Def", Parm: "Y", Value: value.Value }]
              },
              function (data) {
                that.tabitems[index] = data.rows;
                if (index === r.data.rows.length - 1) {
                  that.tabs = r.data.rows;
                  that.tabfirst = that.tabs[0].Value;
                }
              }
            );
          });
        } else {
          u.message(that, r.message);
        }
      });
  },
  methods: {
    valuechange: function (val) {
      console.log(val);
      let that = this;
      u
        .getdata(
          that,
          "Health",
          "AddDelete",
          { pk_Owner: that.pk, Items: val },
          false
        )
        .then(function (r) {
          if (r.ok) {
            console.log(r);
          } else {
            u.message(that, r.message);
          }
        });
    }
  }
};
</script>
