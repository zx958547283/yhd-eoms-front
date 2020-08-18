<template v-if="showtable">
  <div id="ctable">
    <el-table :data="data.rows" :fit="true" :max-height="maxHeight" @row-dblclick="btndblclick" @selection-change="btnselect" border highlight-current-row>
      <el-table-column type="selection"></el-table-column>
      <el-table-column :index="indexCaclu" align="center" label="序号" type="index" width="50"></el-table-column>

      <!-- <el-table-column
        :align="c.title!==undefined?getcolumnstyle({title:c.title,style:'align'}):getcolumnstyle({title:c,style:'align'})"
        :formatter="formatRow"
        :key="c.key||c"
        :label="c.title||c"
        :prop="c.key || c"
        :sortable="c.title!=='序号'"
        :width="cacleCloumnWidth(c.key || c, rowIndex)"
        v-for="(c, rowIndex) in data.columns"
      ></el-table-column>-->

      <el-table-column :align="c.title!==undefined?getcolumnstyle({title:c.title,style:'align'}):getcolumnstyle({title:c,style:'align'})" :formatter="formatRow" :key="c.key||c" :label="c.title||c" :sortable="c.title!=='序号'" :width="cacleCloumnWidth(c.key || c, rowIndex)" v-for="(c, rowIndex) in data.columns">
        <template slot-scope="scope">
          <div v-if="isImg(scope.row[c])">
            <img :src="scope.row[c]" style="height: 80px" />
          </div>
          <div v-else>{{scope.row[c]}}</div>
        </template>
      </el-table-column>
      <el-table-column :width="actions.length * 50 + 10" label="操作" v-if="actions.length > 0">
        <template slot-scope="scope">
          <el-button :key="objAction.name" @click="actionClick(objAction, scope.row)" size="small" type="text" v-for="objAction in actions">{{objAction.name}}</el-button>
        </template>
      </el-table-column>

      <el-table-column type="expand" v-if="tableexpand">
        <template slot-scope="props">
          <el-form inline label-position="left">
            <el-form-item :key="c.key" :label="c.title" v-for="c in data.expands">
              <span>{{ props.row['expand'+c.key] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column min-width="1px"></el-table-column>
    </el-table>
    <el-pagination :current-page="pagenum" :page-size="pagesize" :total="pagetotal" @current-change="btnpagechange" v-if="pagenum!==0"></el-pagination>
    <div ref="textWarp" style="color:black;line-height:1.2;white-space:nowrap;top:0px;left:0px;position:fixed;display:block;visibility:visible;"></div>
  </div>
</template>
<script>
import u from "../../utils/utility";
export default {
  props: {
    actions: {
      type: Array,
      default: function () {
        return [];
      }
    },
    maxHeight: {
      type: String,
      default: "800"
    },
    data: {},
    selection: {
      type: Boolean,
      default: true
    },
    norowhide: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    pagenum: {
      type: Number,
      default: 1
    },
    pagesize: {
      type: Number,
      default: u.querypagesize()
    },
    issmall: {
      type: Boolean,
      default: false
    },
    divheightname: ""
  },
  data() {
    return {
      pagetotal: 0,
      showtable: true,
      tableexpand: false,
      imglist: ['.png', '.jpg', '.jpeg', '.bmp', '.gif']
    };
  },
  filters: {

  },
  watch: {
    data: function (val, oldValue) {
      if (val === oldValue || u.isnullorwhitespace(val)) {
        return;
      }
      // if (!val.expands) {
      //   this.pagetotal = 1;
      //   return;
      // }
      if (val.expands) {
        this.tableexpand = val.expands.length > 0;
      } else {
        this.tableexpand = false;
      }
      if (!this.norowhide) {
        this.showtable = true;
      } else {
        this.showtable = val.total > 0;
      }
      if (Number(this.pagenum) === 1) {
        this.pagetotal = val.total;
      }
    }
  },
  created: function () { },
  mounted() {
  },
  methods: {
    cacleCloumnWidth(val) {
      if (val == "编码") {
        return "180px";
      } else {
        return "auto";
      }
    },
    formatRow(row, column, cellValue) {
      if (cellValue.indexOf && cellValue.indexOf("http://") >= 0) {
        return cellValue;
      } else {
        return cellValue;
      }
    },
    indexCaclu(index) {
      return (this.pagenum - 1) * this.pagesize + index + 1;
    },
    getcolumnstyle(obj) {
      return u.getcolumnstyle(obj);
    },
    btnselect(rows) {
      this.$emit("selection-change", rows);
    },
    btndblclick(row) {
      this.$emit("row-dblclick", row);
    },
    btnpagechange(num) {
      this.$emit("pagechange", num);
    },
    actionClick(objAction, row) {
      this.$emit(objAction.action, row);
    },
    isImg: function (value) {
      for (let i = 0; i < this.imglist.length; i++) {
        if ((value + '').indexOf(this.imglist[i]) != -1) {
          return true;
        }
      }
      return false;
    }
  }
};
</script>
<style>
</style>
