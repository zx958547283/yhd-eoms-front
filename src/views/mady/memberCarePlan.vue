<template>
  <div class="app-container">
    <cqueryview :pk="params[0]" @query="doQuery"></cqueryview>
    <el-container>
      <el-header style="height:30px;">
        <el-button-group>
          <!-- <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button> -->
          <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
          <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
          <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
          <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
          <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          <el-button @click="showDetail()" size="mini" type="primary" >查看详情</el-button>
        </el-button-group>
        <!-- <cinputquery @query="doQuery()" placeholder="名称" v-model="queryvalue"></cinputquery> -->
      </el-header>
      <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
      <el-main>
        <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showDetail" @selection-change="tableSelect"></ctable>
      </el-main>
    </el-container>
    <cwindow title="详细" v-model="winvisible" style="height: 900px;top:0;overflow: auto;width:800px;">
      <div class="page-controlstyle" style="overflow: auto;">
        <el-tabs type="border-card" v-model="inType">
          <el-tab-pane label="方案详情" name="base">
            <cinput :required="true" title="理疗项目" v-model="carePlan.memberCarePlan.care_project_name"></cinput>
            <cinput :required="true" title="症状" v-model="carePlan.maladysName" :length="2"></cinput>
            <div style="width:95%;height:1px;margin-top:15px;magrin-left:50px;background-color:#efe8e8;float: left;margin-bottom: 15px;"></div>

            <cinput :required="true" title="通：" v-model="carePlan.memberCarePlan.t_content" :length="2"></cinput>
            <cinput :required="true" title="排：" v-model="carePlan.memberCarePlan.p_content" :length="2"></cinput>
            <cinput :required="true" title="调：" v-model="carePlan.pointsName" :length="2"></cinput>
            <cinput :required="true" title="补：" v-model="carePlan.buName" :length="2"></cinput>
            <cinput :required="true" title="养：" v-model="carePlan.productName" :length="2"></cinput>
          </el-tab-pane>
          <el-tab-pane label="记录" name="force">
            <el-table :data="careRecordList" style="width: 100%">
              <el-table-column width="150" property="record_time" label="日期"></el-table-column>
              <el-table-column width="300" property="comment" label="建议"></el-table-column>
              <el-table-column
                fixed="right"
                label="图片(点击放大)"
                width="120">
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.img_path"
                    :preview-src-list="scope.row.imageList">
                  </el-image>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <!-- <el-button @click="doSave" size="mini" type="primary">提交</el-button> -->
      </div>
    </cwindow>

    <cwindow  v-model="imageShow">
      <div class="page-controlstyle">

      </div>

    </cwindow>


  </div>
</template>
<script>
import u from "../../utils/utility";
import member from "../../api/member";
import ums from "../../api/ums";
import e from "../../utils/excel";

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
        targs:{}
      },
      inType: 'base',
      carePlan: {
        maladys:[],
        memberCarePlan:{},
        points:[],
        products:[],
        selectBuList:[],
        maladysName: '',
        pointsName: '',
        buName: '',
        productName: ''
      },
      careRecordList:[
        {record_time: '2020-06-03 15:30:55', comment: '多喝水啊啊啊啊啊啊啊，请洗澡啊',img_path: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591269396201&di=56067270274e481c29bc07221b00e86c&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853'}
      ],
      imageShow: false,
      imageList: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591269396201&di=56067270274e481c29bc07221b00e86c&imgtype=0&src=http%3A%2F%2Ft8.baidu.com%2Fit%2Fu%3D1484500186%2C1503043093%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D1280%26h%3D853']
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
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
      this.querylist = querylist;
      if (undefined !== this.params[1] && null !== this.params[1] && '' !== this.params[1]) {
        this.courseId = this.params[1]

        u.addwhere(this, "mady_member_care_plan.member_id", this.params[1]);
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
      u.queryAll(this.params[0], this.querylist).then(res => {
        e.exportxlsx(res);
      });
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
    showDetail(row) {
      // if(this.selectrows.length == 0) {
      //   this.$message.error('请先勾选一个用户');
      //   return;
      // }
      // if(this.selectrows.length > 1) {
      //   this.$message.error('只能同时选择一个用户来查看');
      //   return;
      // }
      console.log(row)
      let id = ''
      if(row && row.id != ''){
        id = row.pk
      } else {
        id = this.selectrows[0].pk
      }
      member.getCarePlanDetail(id).then(res => {
        console.log(res)
        this.carePlan = res

        let maladysName = ''
        for (let malady of res.maladys){
          maladysName = maladysName + malady.name + ' '
        }
        this.carePlan.maladysName= maladysName

        let pointsName = ''
        for(let point of res.points){
          pointsName = pointsName + point.acupoint_name + ' '
        }
        this.carePlan.pointsName = pointsName

        let buName = ''

        for (let bu of res.selectBuList){
          buName = buName + bu.name + ' '
        }
        this.carePlan.buName = buName

        let productName =  ''
        for (let product of res.products){
          productName = productName + product.name + ' '
        }

        this.carePlan.productName = productName

        this.winvisible = true
      });

      member.getCareRecordList(id).then(res => {
        console.log("res===",res)

        this.careRecordList = res


        for (let r of res){
          r.imageList = new Array(r.img_path);
        }

      });

    },
    handleClick(row) {

    }

  }
}
</script>
<style></style>


