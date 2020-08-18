<template>
  <div class="app-container" id="saleContainer">
    <el-tabs type="border-card" v-model="inType">
      <el-tab-pane label="制度" name="base">
        <div class="table-container">
          <div class="el-table el-table--fit el-table--border el-table--enable-row-hover" style="width: 1000px;">
            <div class="el-table__header-wrapper">
              <table border="0" cellpadding="0" cellspacing="0" class="el-table__header" style="width: 1000px;">
                <colgroup>
                  <col name="el-table_1_column_1" width="25%" />
                  <col name="el-table_1_column_2" width="25%" />
                  <col name="el-table_1_column_3" width="25%" />
                  <col name="el-table_1_column_4" width="25%" />
                  <col name="gutter" width="0" />
                </colgroup>
                <thead class="has-gutter">
                  <tr class>
                    <th class="el-table_1_column_1 is-center is-leaf" colspan="1" rowspan="1">
                      <div class="cell">名称</div>
                    </th>
                    <th class="el-table_1_column_2 is-center is-leaf" colspan="1" rowspan="1">
                      <div class="cell">V1</div>
                    </th>
                    <th class="el-table_1_column_3 is-center is-leaf" colspan="1" rowspan="1">
                      <div class="cell">V2</div>
                    </th>
                    <th class="el-table_1_column_4 is-center is-leaf" colspan="1" rowspan="1">
                      <div class="cell">V3</div>
                    </th>
                    <th class="gutter" style="width: 0px; display: none;"></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="el-table__body-wrapper is-scrolling-none">
              <table border="0" cellpadding="0" cellspacing="0" class="el-table__body" style="width: 1000px;">
                <colgroup>
                  <col name="el-table_1_column_1" width="25%" />
                  <col name="el-table_1_column_2" width="25%" />
                  <col name="el-table_1_column_3" width="25%" />
                  <col name="el-table_1_column_4" width="25%" />
                </colgroup>
                <tbody>
                  <tr class="el-table__row">
                    <td class="tdCell">消费返利</td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v1Sale"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v2Sale"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v3Sale"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="tdCell">分享大礼包：一级</td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v1GiftL1"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v2GiftL1"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v3GiftL1"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="tdCell">分享大礼包：二级</td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v1GiftL2"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v2GiftL2"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入比例" v-model="v3GiftL2"></el-input>
                        <div class="inputText">&nbsp;%</div>
                      </div>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="tdCell">团队管理奖励</td>
                    <td class="tdCell">
                      <el-select placeholder="请选择" v-model="v1HasTeam">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                      </el-select>
                    </td>
                    <td class="tdCell">
                      <el-select placeholder="请选择" v-model="v2HasTeam">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                      </el-select>
                    </td>
                    <td class="tdCell">
                      <el-select placeholder="请选择" v-model="v3HasTeam">
                        <el-option :key="item.value" :label="item.label" :value="item.value" v-for="item in options"></el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr class="el-table__row">
                    <td class="tdCell">推荐会员成功奖励金</td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入金额" v-model="v1ShareSuccess"></el-input>
                        <div class="inputText">&nbsp;元</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入金额" v-model="v2ShareSuccess"></el-input>
                        <div class="inputText">&nbsp;元</div>
                      </div>
                    </td>
                    <td class="tdCell">
                      <div style="margin-left:60px;">
                        <el-input class="myinput" placeholder="请输入金额" v-model="v3ShareSuccess"></el-input>
                        <div class="inputText">&nbsp;元</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="btn">
                <el-button @click="saveSaleReward" style="margin-top:30px; " type="primary">保存修改</el-button>
              </div>
              <!---->
            </div>
            <div class="el-table__column-resize-proxy" style="display: none;"></div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="团队管理奖励" name="second">
        <div class="table-container">
          <el-table :data="teamParmList" border ref="flashTable" style="width: 50%;" v-loading="listLoading">
            <el-table-column align="center" width="60"></el-table-column>
            <el-table-column align="center" label="月团队销售额" width="200">
              <template slot-scope="scope">{{scope.row.memo}}</template>
            </el-table-column>
            <el-table-column align="center" label="奖励比例">
              <div slot-scope="scope" style="margin-left:60px;">
                <el-input class="myinput" placeholder="请输入比例" v-model="scope.row.value"></el-input>
                <div class="inputText">&nbsp;%</div>
              </div>
            </el-table-column>
          </el-table>
          <div class="btn">
            <el-button @click="saveTeamReward" style="margin-top:30px; " type="primary">保存修改</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { formatDate } from "@/utils/date";
import sys from "@/api/sys";

export default {
  data() {
    return {
      inType: 'base',
      v1Sale: '',
      v2Sale: '',
      v3Sale: '',
      v1GiftL1: '',
      v2GiftL1: '',
      v3GiftL1: '',
      v1GiftL2: '',
      v2GiftL2: '',
      v3GiftL2: '',
      options: [{
        value: '0',
        label: '无'
      }, {
        value: '1',
        label: '有'
      }
      ],
      v1HasTeam: '',
      v2HasTeam: '',
      v3HasTeam: '',
      v1ShareSuccess: '',
      v2ShareSuccess: '',
      v3ShareSuccess: '',
      teamParmList: [
        {          name: '',
          code: '',
          value: ''        }
      ],
      listLoading: false,

    };
  },
  created() {
    this.getParm()
  },

  methods: {
    getParm() {

      sys.getSaleRewardParm({}).then(res => {
        this.v1Sale = res.v1Sale;
        this.v2Sale = res.v2Sale;
        this.v3Sale = res.v3Sale;
        this.v1GiftL1 = res.v1GiftL1;
        this.v2GiftL1 = res.v2GiftL1;
        this.v3GiftL1 = res.v3GiftL1;
        this.v1GiftL2 = res.v1GiftL2;
        this.v2GiftL2 = res.v2GiftL2;
        this.v3GiftL2 = res.v3GiftL2;
        this.v1HasTeam = res.v1HasTeam;
        this.v2HasTeam = res.v2HasTeam;
        this.v3HasTeam = res.v3HasTeam;
        this.teamParmList = res.teamParmList;
        this.v1ShareSuccess = res.v1ShareSuccess;
        this.v2ShareSuccess = res.v2ShareSuccess;
        this.v3ShareSuccess = res.v3ShareSuccess;
      });
    },
    saveSaleReward() {
      let self = this
      let parm = {
        'v1Sale': this.v1Sale,
        'v2Sale': this.v2Sale,
        'v3Sale': this.v3Sale,
        'v1GiftL1': this.v1GiftL1,
        'v2GiftL1': this.v2GiftL1,
        'v3GiftL1': this.v3GiftL1,
        'v1GiftL2': this.v1GiftL2,
        'v2GiftL2': this.v2GiftL2,
        'v3GiftL2': this.v3GiftL2,
        'v1HasTeam': this.v1HasTeam,
        'v2HasTeam': this.v2HasTeam,
        'v3HasTeam': this.v3HasTeam,
        'v1ShareSuccess': this.v1ShareSuccess,
        'v2ShareSuccess': this.v2ShareSuccess,
        'v3ShareSuccess': this.v3ShareSuccess,
      }
      sys.saveSaleReward(parm).then(res => {
        self.$message({
          message: '保存成功',
          type: 'success'
        });
      });
    },
    saveTeamReward() {
      let self = this
      let teamList = JSON.stringify(this.teamParmList)
      sys.saveTeamReward({ 'teamList': teamList }).then(res => {
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
#saleContainer .tdCell {
  text-align: center;
}
myinput {
  float: left;
  width: 110px;
}
#saleContainer .inputText {
  float: left;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
}
</style>


