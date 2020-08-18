<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">{{title}}</span>
    <el-input :disabled="disabled" :placeholder="placeholder" :readonly="false" :size="size" @focus="btnshow" class="mydefinewidth" v-model="textshow">
      <i @click="btnshow" class="el-icon-search el-input__icon" slot="suffix"></i>
    </el-input>
    <el-dialog :close-on-click-modal="false" :modal-append-to-body="false" :visible.sync="winvisible" title="微信公众号素材选择" top="10vh" width="800px">
      <el-row style="height:400px;overflow:auto">
        <el-col :key="item.mediaId" :offset="index % 3 ? 1 : 0" :span="7" style="padding-bottom:10px;" v-for="(item, index) in listMaterial">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.listContent[0].thumbUrl" class="image">
            <div style="padding: 10px;">
              <span>{{item.listContent[0].title}}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.updateTime }}</time>
                <el-button @click="doChoice(item)" class="button" type="text">选择</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-pagination :current-page="pagenum" :page-size="pagesize" :total="pagetotal" @current-change="btnpagechange" v-if="pagenum!==0"></el-pagination>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import u from "../../utils/utility";
import wxapi from "../../api/wxapi";
export default {
  props: {
    appid: {
      type: String,
      default: ""
    },
    materialType: {
      type: String,
      default: "0"
    },
    length: {
      type: Number,
      default: 1
    },
    value: [String],
    title: [String],
    size: {
      type: String,
      default: "small"
    },
    placeholder: String,
    disabled: Boolean

  },
  data() {
    return {
      pagetotal: 0,
      winvisible: false,
      listMaterial: [],
      textshow: "",
      pagenum: 1,
      pagesize: 6//u.querypagesize()
    };
  },
  watch: {
    value(val, oldVal) {
      if (!val) {
        this.textshow = "";
      } else {
        this.getMaterialText();
      }
    },
    appid(val, oldVal) {
      if (val) {
        this.appid = val
        this.loadData();
      }
    }
  },
  created: function () { },
  mounted() {
    u.setcontrolwidth(this, "mydefinewidth");
    if (this.appid) {
      this.loadData();
    }
  },
  methods: {
    btnpagechange(num) {
      this.pagenum = num;
      this.loadData();
    },
    getMaterialText() {
      console.log("素材类型", this.materialType);
      if (this.value && this.materialType == "1") {
        wxapi.getWXMPMaterialNewsById({ appid: this.appid, materialId: this.value }).then(res => {
          if (res) {
            this.textshow = res.articles[0].title;
          }
        }).catch(err => { });
      }
    },
    loadData() {
      wxapi.searchWXMPMaterialList({
        appid: this.appid,
        pagenum: this.pagenum,
        pagesize: this.pagesize
      }).then(res => {
        this.listMaterial = res.rows;
        this.pagetotal = res.total;
      }).catch(err => {

      });
    },
    btnshow() {
      if (this.disabled) {
        return;
      }
      this.winvisible = true;
    },
    doChoice(item) {
      this.winvisible = false;
      this.$emit("input", item.mediaId);
      this.textshow = item.listContent[0].title;
    }
  }
};
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  margin-bottom: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
}
.button {
  padding: 0;
  margin-right: 10px;
  float: right;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
