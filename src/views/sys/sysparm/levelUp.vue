<template>
  <div class="app-container">
    <div class="table-container">
      <div class="el-table el-table--fit el-table--border el-table--enable-row-hover" style="width: 1300px;">
        <div class="el-table__header-wrapper">
          <table border="0" cellpadding="0" cellspacing="0" class="el-table__header" style="width: 1300px;">
            <colgroup>
              <col name="el-table_1_column_1" width="10%">
              <col name="el-table_1_column_2" width="20%">
              <col name="el-table_1_column_3" width="70%">
              <col name="gutter" width="0">
            </colgroup>
            <thead class="has-gutter">
              <tr class>
                <th class="el-table_1_column_1 is-center is-leaf" colspan="1" rowspan="1">
                  <div class="cell">序号</div>
                </th>
                <th class="el-table_1_column_2 is-center is-leaf" colspan="1" rowspan="1">
                  <div class="cell">等级</div>
                </th>
                <th class="el-table_1_column_3 is-center is-leaf" colspan="1" rowspan="1">
                  <div class="cell">规则</div>
                </th>
                <th class="gutter" style="width: 0px; display: none;"></th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="el-table__body-wrapper is-scrolling-none">
          <table border="0" cellpadding="0" cellspacing="0" class="el-table__body" style="width: 1300px;">
            <colgroup>
              <col name="el-table_1_column_1" width="10%">
              <col name="el-table_1_column_2" width="20%">
              <col name="el-table_1_column_3" width="70%">
            </colgroup>
            <tbody>
              <tr class="el-table__row">
                <td class="tdCell">1</td>
                <td class="tdCell">V1</td>
                <td class="tdCell">
                  <div class="inputText" style="margin-left:50px;">自己购买&nbsp;</div>
                  <el-input class="myinput" placeholder="请输入数量" v-model="v0Up"></el-input>
                  <div class="inputText">&nbsp;个会员大礼包</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td class="tdCell">2</td>
                <td class="tdCell">V2</td>
                <td class="tdCell">
                  <div class="inputText" style="margin-left:50px;">自己分享&nbsp;</div>
                  <el-input class="myinput" placeholder="请输入数量" v-model="v1UpGift"></el-input>
                  <div class="inputText">&nbsp;个会员大礼包，或者，团队销售额（会员礼包+商品）满&nbsp;</div>
                  <el-input class="myinput" placeholder="请输入数量" v-model="v1UpSale"></el-input>
                  <div class="inputText">&nbsp;元</div>
                </td>
              </tr>
              <tr class="el-table__row">
                <td class="tdCell">3</td>
                <td class="tdCell">V3</td>
                <td class="tdCell">
                  <div class="inputText" style="margin-left:50px;">自己分享&nbsp;</div>
                  <el-input class="myinput" placeholder="请输入数量" v-model="v2UpGift"></el-input>
                  <div class="inputText">&nbsp;个会员大礼包，或者，团队销售额（会员礼包+商品）满&nbsp;</div>
                  <el-input class="myinput" placeholder="请输入数量" v-model="v2UpSale"></el-input>
                  <div class="inputText">&nbsp;元</div>
                </td>
              </tr>
            </tbody>
          </table>
          <!---->
        </div>
        <div class="el-table__column-resize-proxy" style="display: none;"></div>
      </div>
      <div class="btn">
        <el-button @click="saveLevelUp" style="margin-top:30px; " type="primary">保存修改</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import sys from "@/api/sys";

export default {
  data() {
    return {
      v0Up: '',
      v1UpGift: '',
      v1UpSale: '',
      v2UpGift: '',
      v2UpSale: ''

    };
  },
  created() {
    this.getLevelUpInfo()
  },

  methods: {
    getLevelUpInfo() {

      sys.getLevelUpInfo({}).then(res => {
        this.v0Up = res.v0Up;
        this.v1UpGift = res.v1UpGift;
        this.v1UpSale = res.v1UpSale;
        this.v2UpGift = res.v2UpGift;
        this.v2UpSale = res.v2UpSale;
      });
    },
    saveLevelUp() {
      let self = this
      sys.saveLevelUpInfo({ 'v0Up': this.v0Up, 'v1UpGift': this.v1UpGift, 'v1UpSale': this.v1UpSale, 'v2UpGift': this.v2UpGift, 'v2UpSale': this.v2UpSale }).then(res => {
        self.$message({
          message: '保存成功',
          type: 'success'
        });
      });
    }
  }
};
</script>
<style>
.btn {
  width: 100%;
  text-align: center;
}
.tdCell {
  text-align: center;
}
.myinput {
  float: left;
  width: 110px;
}
.inputText {
  float: left;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
</style>


