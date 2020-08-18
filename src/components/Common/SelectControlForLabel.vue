<template>
  <div class="order_line">
    <span class="controlspan" v-if="title">
      <span style="color:red;" v-if="required === true">*</span>
      {{title}}
    </span>
    <span class="controlspans">
      <el-select :disabled="disabled" :placeholder="placeholder" :size="size" @change="valuechange" class="mydefinewidth" v-model="currentvalue">
        <el-option :key="item.value" :label="item.text" :value="item.value" v-for="item in itemlists"></el-option>
      </el-select>
    </span>
  </div>
</template>

<script>
import u from "../../utils/utility";
export default {
  props: {
    value: [String, Number],
    title: [String],
    size: {
      type: String,
      default: "small"
    },
    length: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    userdata: String,
    disabled: Boolean,
    querypk: String,
    deflistpk: String, // 用于取deflist value值存放sql的返回
    pk: String, // 用于取def_id对应的def_list内容
    custOptions: {
      Type: Array,
      default: function () {
        return [];
      }
    }, //自定议选项
    refSelect: String,
    required: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentvalue: this.value,
      itemlists: [],
      querylist: []
    };
  },
  watch: {
    value: function (val, oldValue) {
      if (val === this.currentvalue) {
        return;
      }
      this.currentvalue = val;
    },
    refSelect: function (val, oldValue) {
      if (!val) {
        this.itemlists = [];
        this.currentvalue = "";
      } else {
        this.refSelect = val;
        this.currentvalue = "";
        this.loaditems();
      }
    },
    querypk: function (val, oldValue) {
      console.log(" 公司下拉框获取 :" + val);
      this.loaditems();
    },
    deflistpk: function (val, oldValue) {
      this.loaditems();
    },
    pk: function (val, oldValue) {
      this.loaditems();
    },
    custOptions: function (val, oldValue) {
      this.loaditems();
    }
  },
  created: function () {
    this.loaditems();
  },
  mounted() {
    u.setcontrolwidth(this, "mydefinewidth");
  },
  methods: {
    valuechange: function (val) {
      let label = this.itemlists.find((item) => {
        return item.value === val;
      });
      this.$emit("input", val);
      this.$emit("change", [val, label.text]);
    },
    loaditems: function () {
      if (!u.isnullorwhitespace(this.querypk)) {
        console.log("部门查询=====" + this.querypk);
        if (this.refSelect) {
          console.log("查询=====" + this.refSelect);
          // 联动查询
          let arraySelect = this.refSelect.split(",");
          var field = arraySelect[0];
          var value = arraySelect[1];
          if (!value) {
            this.itemlists = [];
            return;
          } else {
            console.log(" value ========" + value);
            this.querylist = [];
            u.addwherefix(this, field, value, "querylist");
          }
        }
        let that = this;
        u.querydatacache(
          this,
          {
            pk: this.querypk,
            lists: this.querylist
          },
          "itemlists"
        ).then(res => {
          that.currentvalue = that.value;
        });
      } else if (!u.isnullorwhitespace(this.deflistpk)) {
        // 用于固定传值关键字用法到后端pk == "mCustomerWhereEmployee" || pk == "mDeptWhereEmployee" || pk == "mOrderWhereEmployee"
        // 或者取deflist value值直接定义sql的返回
        u.queryurldatacache(
          this,
          "sys/ConsultItem",
          { pk: this.deflistpk, lists: this.querylist },
          "itemlists"
        );
      } else if (this.custOptions.length > 0) {
        this.itemlists = [];
        for (let index in this.custOptions) {
          this.itemlists.push({
            value: this.custOptions[index].value,
            text: this.custOptions[index].text
          });
        }
      } else {
        if (this.pk === "YN") {
          this.itemlists = [
            { value: "Y", text: "Y" },
            { value: "N", text: "N" }
          ];
        } else if (this.pk === "Sex") {
          this.itemlists = [
            { value: "1", text: "男" },
            { value: "2", text: "女" }
          ];
        } else if (
          this.pk === "State" ||
          this.pk === "7032820b-f8bc-4060-9c3a-99b100b19ec0"
        ) {
          this.itemlists = [
            { value: 0, text: "制单" },
            { value: 1, text: "审批" }
          ];
        } else if (this.pk === "DataPower") {
          this.itemlists = [
            { value: 0, text: "自己" },
            { value: 1, text: "所在公司" },
            { value: 2, text: "部门及下级" },
            { value: 3, text: "所在部门" }
          ];
        } else if (this.pk === "ZXLX") {
          this.itemlists = [
            { value: "0", text: "普通坐席" },
            { value: "1", text: "班长坐席" }
          ];
        } else if (this.pk === "InputType") {
          this.itemlists = [
            { value: "0", text: "不控" },
            { value: "1", text: "新增" },
            { value: "2", text: "编辑" },
            { value: "3", text: "控制" }
          ];
        } else if (this.pk === "Logic") {
          this.itemlists = [
            { value: "and", text: "并且" },
            { value: "or", text: "或者" }
          ];
        } else if (this.pk === "LeftParenthesis") {
          this.itemlists = [
            { value: " ", text: "  " },
            { value: "(", text: "(" }
          ];
        } else if (this.pk === "Condition") {
          this.itemlists = [
            { text: "等于", value: "=" },
            { text: "大于等于", value: ">=" },
            { text: "小于等于", value: "<=" },
            { text: "不等于", value: "<>" },
            { text: "包含", value: "like" },
            { text: "不包含", value: "not like" },
            { text: "以开始", value: "begin" },
            { text: "以结束", value: "end" },
            { text: "为空", value: "is null" },
            { text: "非空", value: "is not null" }
          ];
        } else if (this.pk === "RightParenthesis") {
          this.itemlists = [
            { value: "  ", text: " " },
            { value: ")", text: ")" }
          ];
        } else if (this.pk === "company") {
          this.itemlists = [
            { value: "1", text: "公司" },
            { value: "2", text: "店铺" }
          ];
        } else if (this.pk === "mediaType") {
          this.itemlists = [
            { value: "0", text: "图文" },
            { value: "1", text: "音频" },
            { value: "2", text: "视频" }
          ];
        } else if (this.pk === "drawType") {
          this.itemlists = [
            { value: "0", text: "银行卡" },
            { value: "1", text: "支付宝" },
            { value: "2", text: "微信" }
          ];
        } else if (this.pk === "drawApplyStatus") {
          this.itemlists = [
            { value: "0", text: "申请中" },
            { value: "1", text: "已打款" },
            { value: "2", text: "打款失败" }
          ];
        } else if (this.pk === "wxmenu_level") {
          this.itemlists = [
            { value: "1", text: "一级菜单" },
            { value: "2", text: "二级菜单" }
          ];
        } else if (this.pk === "wxmenu_type") {
          this.itemlists = [
            { value: "click", text: "推事件" },
            { value: "view", text: "网页" },
            { value: "scancode_push", text: "扫一扫" },
            { value: "scancode_waitmsg", text: "扫一扫消息推送" },
            { value: "pic_sysphoto", text: "拍照发图" },
            { value: "pic_photo_or_album", text: "相册或拍照发图" },
            { value: "pic_weixin", text: "相册发图" },
            { value: "location_select", text: "获取位置" },
            { value: "media_id", text: "下发多媒体消息" },
            { value: "view_limited", text: "下发图文消息" },
            { value: "miniprogram", text: "小程序" }
          ];
        } else if (this.pk === "subscribeType") {
          this.itemlists = [
            { value: "0", text: "纯文本" },
            { value: "1", text: "公众号素材" }
          ];
        } else if (this.pk === "parentLevel") {
          this.itemlists = [
            { value: "0", text: "父级" },
            { value: "1", text: "二级" }
          ];
        } else if (this.pk === "scene_id") {
          this.itemlists = [
            { value: "", text: "" },
            { value: "PRODUCT_1", text: "商品促销" },
            { value: "PRODUCT_2", text: "抽奖" },
            { value: "PRODUCT_3", text: "虚拟物品兑奖" },
            { value: "PRODUCT_4", text: "企业内部福利" },
            { value: "PRODUCT_5", text: "渠道分润" },
            { value: "PRODUCT_6", text: "保险回馈" },
            { value: "PRODUCT_7", text: "彩票派奖" },
            { value: "PRODUCT_8", text: "税务刮奖" }
          ];
        } else if (this.pk === "qatype_level") {
          this.itemlists = [
            { value: "0", text: "顶层节点" },
            { value: "1", text: "二级节点" }
          ];
        } else if (this.pk === "grounding") {
          this.itemlists = [
            { value: "0", text: "下架" },
            { value: "1", text: "上架" }
          ];
        } else if (this.pk === "openFlg") {
          this.itemlists = [
            { value: "0", text: "开启" },
            { value: "1", text: "关闭" }
          ];
        } else if (this.pk === "online") {
          this.itemlists = [
            { value: "0", text: "上线" },
            { value: "1", text: "下线" }
          ];
        } else {
          u.querydatacache(
            this,
            {
              pk: "8723c19f-980a-4fa2-a214-81ab3e6bc8dd",
              lists: [
                { field: "def_id", condition: "=", parm: "Y", value: this.pk }
              ]
            },
            "itemlists"
          );
        }
      }
    }
  }
};
</script>
