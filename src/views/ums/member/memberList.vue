<template>
  <div class="app-container">
    <cqueryview :pk="params[0]" @query="doQuery" :querydivhegiht='105'></cqueryview>
    <el-container>
      <el-aside v-show="false" width="200px">
        <el-tree :data="companyTree" :props="{label:'name',children:'listChild'}" @node-click="doQuery" class="menulist" default-expand-all highlight-current node-key="id" ref="refCompany"></el-tree>
      </el-aside>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <!-- <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button> -->
            <!-- <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button> -->
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <!-- <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button> -->
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
            <el-button @click="showHealth()" size="mini" type="primary" >档案数据</el-button>
            <el-button @click="showCarePlan()" size="mini" type="primary" >调理方案</el-button>
            <el-button @click="showDeposit()" size="mini" type="primary" >客户充值</el-button>
          </el-button-group>
          <!-- <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery> -->
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" v-model="winvisible">
      <div class="page-controlstyle">
        <cinput :required="true" title="姓名" v-model="mm.real_name"></cinput>
        <cinput :required="true" title="手机" v-model="mm.phone"></cinput>
        <cdept :required="true" title="归属门店" v-model="mm.depart_id"></cdept>
        <cselect  pk="deptEmployee" title="维护专员" :refDeptId ="mm.depart_id" v-model="mm.create_user"></cselect>
        <cselect  pk="professionList" title="健康专员" :refDeptId ="mm.depart_id" v-model="mm.from_employee"></cselect>
        <cselect :multi="true" pk="professionList" title="服务专员" :refDeptId ="mm.depart_id" v-model="mm.service_admin_id"></cselect>
        <cinput title="身份证号码" v-model="mm.id_card"></cinput>
        <cinput title="邮箱" v-model="mm.email"></cinput>
        <cinput  title="详细地址" v-model="mm.address" :length="2"></cinput>
        <cselect pk="Sex" title="性别" v-model="mm.gender"></cselect>
        <cdate title="生日" v-model="mm.birthday"></cdate>
        <cinput title="剩余次数" v-model="mm.surplus_times"></cinput>
        <cinput  title="备注" v-model="mm.comment" :length="2"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>

    <cwindow title="档案信息" v-model="healthShow" style="height: 900px;top:0;overflow: auto;">
      <div class="page-controlstyle" style="overflow: auto;">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="档案信息" name="base">
            <cinput :required="true" title="姓名" v-model="health.memberInfo.real_name"></cinput>
            <cinput :required="true" title="手机" v-model="health.memberInfo.phone"></cinput>
            <cinput :required="true" title="身份证号码" v-model="health.memberInfo.id_card"></cinput>
            <cinput :required="true" title="邮箱" v-model="health.memberInfo.email"></cinput>
            <cinput :required="true" title="详细地址" v-model="health.memberInfo.address" :length="2"></cinput>
            <cinput :required="true" title="用户标签" v-model="health.targs" :length="2"></cinput>
            <div style="width:95%;height:1px;margin-top:15px;magrin-left:50px;background-color:#efe8e8;float: left;margin-bottom: 15px;"></div>
            <cinput :required="true" title="身高(cm)" v-model="health.memberInfo.height"></cinput>
            <cinput :required="true" title="体重(kg)" v-model="health.memberInfo.weight"></cinput>
            <cinput :required="true" title="左眼" v-model="health.memberInfo.left_eye"></cinput>
            <cinput :required="true" title="右眼" v-model="health.memberInfo.right_eye"></cinput>
            <div style="width:95%;height:1px;margin-top:15px;magrin-left:50px;background-color:#efe8e8;float: left;margin-bottom: 15px;"></div>
            <cinput :required="true" title="过敏史" v-model="health.healthHistory.irritability" :length="2" v-if="health.healthHistory"></cinput>
            <cinput :required="true" title="既往病史" v-model="health.healthHistory.illName" :length="2" v-if="health.healthHistory"></cinput>
            <cinput :required="true" title="其他疾病" v-model="health.healthHistory.other_ill" :length="2" v-if="health.healthHistory"></cinput>
            <cinput :required="true" title="手术史" v-model="health.healthHistory.operation" :length="2" v-if="health.healthHistory"></cinput>
            <cinput :required="true" title="家族史" v-model="health.healthHistory.family" :length="2" v-if="health.healthHistory"></cinput>
            <cinput :required="true" title="备注" v-model="health.healthHistory.comment" :length="2" v-if="health.healthHistory"></cinput>
          </el-tab-pane>
          <el-tab-pane label="血压" name="second">
            <div v-for="(item, index)  in monitor.xueyaList" :key="item.id" style="margin-top:10px;">
              <span>{{item.monitoring_time}}</span>
              <span style="margin-left:20px;">{{item.content}}mmHg</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="血氧" name="third">
            <div v-for="(item, index)  in monitor.xueyangList" :key="item.id" style="margin-top:10px;">
              <span>{{item.monitoring_time}}</span>
              <span style="margin-left:20px;">{{item.content}}%</span>
            </div>
          </el-tab-pane>
          <el-tab-pane label="血糖" name="force">
            <div v-for="(item, index)  in monitor.xuetangList" :key="item.id" style="margin-top:10px;">
              <span>{{item.monitoring_time}}</span>
              <span style="margin-left:20px;">{{item.content}}mmol/L</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dialog-footer">
        <el-button @click="healthShow=false" size="mini">关闭</el-button>
      </div>
    </cwindow>

    <cwindow title="用户充值" v-model="depositShow">
      <div class="page-controlstyle">
        <cnumber :required="true" title="充值金额" v-model="deposit.amount" :length="2"></cnumber>
        <cnumber :required="true" title="充值次数" v-model="deposit.mady_times" :length="2"></cnumber>
      </div>
      <div class="dialog-footer">
        <el-button @click="depositShow=false" size="mini">取消</el-button>
        <el-button @click="doSaveDeposit" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import member from "../../../api/member";
import ums from "../../../api/ums";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      parentId: 1,                       //树形选择的对象
      refCityId: 'cityId',                //区域联动城市属性
      refProvinceId: 'provinceId,',       //城市联动省份属性
      parentOrgId: '',        //当前树形选中的节点
      wintitle: "机构编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      queryvisible: false,    //查询弹出窗
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],          //查询条件模板
      companyTree: [],         //公司树形
      address: [],
      employee:[],
      healthShow: false,
      health: {
        healthHistory: {},
        historyIll: {},
        memberInfo:{},
        targs:''
      },
      inType: 'base',
      monitor: {
        xuetangList:[],
        xueyangList:[],
        xueyaList:[]
      },
      depositShow: false,
      deposit:{}
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
	console.log(this.querylist)
    this.doQuery([]);
  },
  filters: {
    formatTag(value) {
      console.log('tag  ===============   ' + value)
      return value;
    }
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          u.messagenotify(this, "请输入查询内容");
          return;
        } else {
          this.querylist = [];
          if (u.isnum(this.queryvalue)) {
          }
          else {
            u.addwheres(this, "and", "(", "ums_member.nickname", "like", this.queryvalue, "");
            u.addwheres(this, "or", "", "ums_member.province", "like", this.queryvalue, "");
            // u.addwheres(this, "or", "", "ums_member.company_id", "like", this.queryvalue, "");
            u.addwheres(this, "or", "", "ums_member.area", "like", this.queryvalue, "");
            u.addwheres(this, "or", "", "ums_member.city", "like", this.queryvalue, ")");
          }
        }
      } else {
        this.querylist = querylist;
      }
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {};
      this.mm.gender = "1";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;

      u.openeditmodel(this, member.getMember, row).then(res => {
        this.address = [res.province, res.city, res.area];
        let tags = res.member_tag.replace("tag1&&","").replace("tag2&&","").replace("tag3&&","")
        this.mm.member_tag = tags
      });
    },
    doDelete() {
      let that = this;
      u.deleteoperate(this, member.deleteMember).then(res => {
        u.getCompanyTree(that, "companyTree");
      });
    },
    doExport() {
      // u.queryAll(this.params[0], this.querylist).then(res => {
      //   e.exportxlsx(res);
      // });
	  if(this.selectrows.length!=0){
	  		  this.selectrows.forEach(e=>{
	  			  delete e.pk
	  		  })
	  		   e.exportxlsx(this.selectrows)
	  }else{
	  		  u.queryAll(this.params[0], this.querylist).then(res => {
	  		    res.forEach(e=>{
	  		      delete e.pk;
	  		    })
	  		    e.exportxlsx(res);
	  		  });
	  }
    },
    tableSelect(rows) {
      this.selectrows = rows;
    },
    doSave() {
      this.mm.province = this.address[0];
      this.mm.city = this.address[1];
      this.mm.area = this.address[2];
      this.mm.nickname = this.mm.real_name;
      this.mm.organization_id = "1";

      u.doSave(this, member.saveMember).then(res => {
        //加载公司树形
        u.getCompanyTree(this, "companyTree");
      });
    },
    showHealth() {
      if(this.selectrows.length == 0) {
        this.$message.error('请先勾选一个用户');
        return;
      }
      if(this.selectrows.length > 1) {
        this.$message.error('只能同时选择一个用户来查看');
        return;
      }
      member.getHealthData(this.selectrows[0].pk).then(res => {
        console.log(res)
        let illTxt = ''
        if(res.healthHistory){
          let ill = res.healthHistory.ill
          let allIll = res.historyIll
          for(let i = 0; i < allIll.length; i++){
            if(ill.indexOf(allIll[i].def_list_id) != -1){
              illTxt = illTxt + allIll[i].name + " "
            }
          }
          this.health.healthHistory.illName = illTxt
        }

        this.health = res
		// this.health.targs = ...res.targs
		if(res.targs.length!=0){
			let [a,b,c] = res.targs

			if(a==null){
				a = ' '
			}
			if(b==null){
				b = ' '
			}
			if(c==null){
				c = ' '
				console.log(c,'c nulllllllll')
			}
			this.health.targs = a+','+b+','+c
		}else{
			this.health.targs = ''
		}
        this.healthShow = true
      });

      member.getMonitoringData(this.selectrows[0].pk).then(res => {
        this.monitor = res
      });

    },
    showCarePlan() {
      if(this.selectrows.length == 0) {
        this.$message.error('请先勾选一个用户');
        return;
      }
      if(this.selectrows.length > 1) {
        this.$message.error('只能同时选择一个用户来查看');
        return;
      }
      u.addtagview(this, this.selectrows[0].姓名, "memberCarePlan", '72aaeb92-69d9-410f-b404-e354695e1e10' + ',' + this.selectrows[0].pk);
    },
    showDeposit() {
      if(this.selectrows.length == 0) {
        this.$message.error('请先勾选一个用户');
        return;
      }
      if(this.selectrows.length > 1) {
        this.$message.error('只能同时选择一个用户来查看');
        return;
      }
      console.log('22222222222222')
      this.depositShow = true
    },
    doSaveDeposit() {
      if(this.deposit.amount == null || this.deposit.amount == 0){
         this.$message.error('请填写充值金额');
         return;
      }
      if(this.deposit.mady_times == null || this.deposit.mady_times == 0){
         this.$message.error('请填写充值次数');
         return;
      }
      let parm = {
        amount: this.deposit.amount,
        mady_times: this.deposit.mady_times,
        member_id: this.selectrows[0].pk
      }
      member.saveMemberDeposit(parm).then(res => {
        this.$message({
          message: '充值成功',
          type: 'success'
        });
        this.deposit = {}
        this.dataLoad()
        this.depositShow = false
      });
    }

  }
}
</script>
<style></style>


