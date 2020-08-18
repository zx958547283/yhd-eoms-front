<template>
  <div class="app-container">
    <el-container>
      <el-aside width="200px">
        <el-tree :data="companyTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="id" ref="refCompany"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="doQuery()" size="mini" type="primary">查询</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="sendCoupon()" size="mini" type="primary">红包发放申请</el-button>
          </el-button-group>
          <cinputquery @query="btnquery()" placeholder="名称" v-model="queryValue"></cinputquery>
        </el-header>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="登录名" v-model="mm.username"></cinput>
        <cinput :required="true" title="姓名" v-model="mm.real_name"></cinput>
        <cinput :required="true" title="手机" v-model="mm.phone"></cinput>
        <cselect pk="Sex" title="性别" v-model="mm.gender"></cselect>
        <cdate title="生日" v-model="mm.birthday"></cdate>
        <ccity title="区域" v-model="address"></ccity>
        <cinput title="职业" v-model="mm.job"></cinput>
      </div>
    </cwindow>

    <cwindow title="红包发放申请" v-model="showCoupon">
      <div class="page-controlstyle">
        <cinput :disabled="true" title="姓名" v-model="coupon.member_name"></cinput>
        <cinput :disabled="true" title="openID" v-model="coupon.open_id"></cinput>
        <cinput :required="true" title="活动名称" v-model="coupon.act_name"></cinput>
        <cinput :required="true" title="祝福语" v-model="coupon.wishing"></cinput>
        <cinput :required="true" title="备注" v-model="coupon.remark"></cinput>
        <cnumber :required="true" title="金额" v-model="coupon.total_amount"></cnumber>
        <cselect pk="scene_id" title="场景" v-model="coupon.scene_id"></cselect>
      </div>
      <div class="dialog-footer">
        <el-button @click="showCoupon=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import member from "../../../api/member";
import sms from "../../../api/sms";
import e from "../../../utils/excel";

export default {
  name: "organizationList",
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      parentId: 1,                       //树形选择的对象
      refCityId: 'cityId',                //区域联动城市属性
      refProvinceId: 'provinceId,',       //城市联动省份属性
      parentOrgId: '',        //当前树形选中的节点
      wintitle: "机构编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryValue: '',         //查询条件值
      querylist: [],          //查询条件模板
      companyTree: [],         //公司树形
      address: [],
      showCoupon: false,
      coupon: {}
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    // this.doQuery();
    //加载公司树形
    let that = this;
    u.getCompanyTree(this, "companyTree").then(res => {
      // 默认选择树形和默认加载列表
      if (res && res.length > 0) {
        console.log(res)
        that.$refs.refCompany.setCurrentKey(res[0].id, true, false);
        that.doQuery({ id: res[0].id });
      }
    });
    //初始化省份，城市，区域下拉
  },
  filters: {
  },
  methods: {
    doQuery(treeNode) {
      this.querylist = [];
      if (treeNode) {
        //点击树形节点查询
        this.parentId = treeNode.id;
        console.log('============' + this.parentId)
      }
      u.addwherelike(this, "ums_member.username", this.queryValue);
      u.addwheres(this, "and", "", "ums_member.company_id", "=", this.parentId, "");
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, member.getMember, row).then(res => {
        this.address = [res.province, res.city, res.area];
      });
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      if (Number(this.coupon.total_amount) < 1 || Number(this.coupon.total_amount) > 200) {
        if (this.coupon.scene_id === '' || this.coupon.scene_id == null) {
          this.$message.error('红包金额大于200或者小于1元时,必须选择场景');
          return
        }
      }
      this.mm = {}
      this.mm = this.coupon

      u.doSave(this, sms.saveMemberCouponApply).then(res => {
        //加载公司树形
        this.dataLoad(1);
        this.showCoupon = false
      });
    },
    sendCoupon(row) {
      if (this.selectrows.length < 1) {
        this.$message.error('请选择一个会员后再进行此操作');
        return
      }

      let that = this;
      u.openeditmodel(this, member.getMember, row).then(res => {
        console.log(res)
        that.winvisible = false
        that.coupon = {}
        this.coupon.member_name = res.nickname
        this.coupon.open_id = res.wx_openId
        this.coupon.status = '0'
        this.coupon.total_num = '1'
        this.showCoupon = true;
      });

    }

  }
}
</script>
<style></style>


