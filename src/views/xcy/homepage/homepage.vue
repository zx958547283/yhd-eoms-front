<template>
  <div class="app-container">
    <div class="homepage_wrap">
      <div class="header">
        <div class="left_part">地址：南京</div>
        <div class="right_part">2019年9月30日 10:00 星期一</div>
      </div>
      <!-- 五个模块 -->
      <div class="part_tips">
        <div class="single_part">
          <div class="single_part_left"></div>
          <div class="single_part_right">
            <p class="single_xxx">10000</p>
            <p class="single_title">今日订单总数</p>
          </div>
        </div>
        <div class="single_part">
          <div class="single_part_left"></div>
          <div class="single_part_right">
            <p class="single_xxx">10000</p>
            <p class="single_title">今日订单总数</p>
          </div>
        </div>
        <div class="single_part">
          <div class="single_part_left"></div>
          <div class="single_part_right">
            <p class="single_xxx">10000</p>
            <p class="single_title">今日订单总数</p>
          </div>
        </div>
        <div class="single_part">
          <div class="single_part_left"></div>
          <div class="single_part_right">
            <p class="single_xxx">10000</p>
            <p class="single_title">今日订单总数</p>
          </div>
        </div>
        <div class="single_part">
          <div class="single_part_left"></div>
          <div class="single_part_right">
            <p class="single_xxx">10000</p>
            <p class="single_title">今日订单总数</p>
          </div>
        </div>
      </div>
      <!-- 三个列表 -->
      <div class="list">
        <div class="single_list">
          <div class="list_header">
            <span>待处理</span>
            <span>60个</span>
          </div>
          <div class="list_content">
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
          </div>
        </div>
        <div class="single_list">
          <div class="list_header">
            <span>待处理</span>
            <span>60个</span>
          </div>
          <div class="list_content">
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
          </div>
        </div>
        <div class="single_list">
          <div class="list_header">
            <span>待处理</span>
            <span>60个</span>
          </div>
          <div class="list_content">
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
            <div class="single_line">
              <span>入驻申请</span>
              <span>10个</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部表格 -->
      <div class="bottom_table">
        <div class="table_header">
          <span>系统信息</span>
          <span></span>
        </div>
        <div class="table_content">
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">上传上限：<span class="emphasize">2M</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell">网站名称：<span>前贝家园</span></div>
          <div class="single_cell"><span class="quit">退出登录</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import e from "../../../utils/excel";
import xcy from "../../../api/xcy";
// import province from '../../../utils/province'
// import city from '../../../utils/city'
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  publishStatus: null,
  verifyStatus: null,
  productSn: null,
  productCategoryId: null,
  category: null,
  enterprise_abbr_name:null,
  province:null,
  city:null,
  contact:null,
  phone:null,
  status:null,
};
export default {
  name: "organizationList",
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "新增企业信息",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {},                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryValue: '',         //查询条件值
      querylist: [],           //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      address: []
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {
  },
  methods: {
    doQuery() {
      this.querylist = [];
      u.addwheres(this, "and", "(", "xcy_enterprise.enterprise_code", "like", this.queryValue, "");
      u.addwheres(this, "or", "", "xcy_enterprise.enterprise_abbr_name", "like", this.queryValue, "");
      u.addwheres(this, "or", "", "xcy_enterprise.enterprise_name", "like", this.queryValue, ")");
      //查询条件
      this.dataLoad(1);
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      if(!this.queryValue) {
        this.querylist = [];
      }
      u.querypage(this, this.params[0]);
    },
    showAdd() {
      this.mm = {};
      this.mm.status = "N";
      this.winvisible = true;
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, xcy.getEnterprise, row).then(res => {
        console.log(res)
        that.address = [res.province[0], res.city[0], res.region];
      });
    },
    doDelete() {
      u.deleteoperate(this, xcy.deleteEnterprise);
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
      this.mm.region = this.address[2];
      if(this.mm.exc_key) {
        u.doSave(this, xcy.saveEnterprise);//更新
      } else {
        u.doSave(this, xcy.saveEnterpriseInfo);//新增
      }
    },
    getParam(){
      let that = this;
      xcy.getEnterpriseList(this.listQuery).then(res=>{
        that.tabledata.rows = res.rows;
        that.tabledata.total = res.total;
      });
    },
    exportExcel(){
      xcy.exportEnterpriseList(this.listQuery).then(res => {
        e.exportxlsx(res)
      })
    }
  }
}
</script>
<style scoped>
.app-container {
    /* padding: 85px 0px 5px 0px !important; */
}
.homepage_wrap{

}
.header{
  width:100%;
  height:40px;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding:0 20px;
  box-shadow: 10px 0 10px #ccc;
}
.left_part{}
.right_part{}
/* 五个模块 */
.part_tips{
  width:95%;
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  border:1px solid #ccc;
  margin:30px auto;
  border-radius: 5px;
  padding:10px;
}
.single_part{
  width:20%;
  box-sizing: border-box;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:10px 55px;
  border-right: 1px solid #ccc;
}
.single_part:nth-last-of-type(1){
  border-right: none;
}
.single_part_left{
  width:40px;
  height:40px;
  background: url("../../../../static/images/cart.png")no-repeat;
  background-size: 100%;
}
.single_part_right{
  text-align: center;
  line-height: 5px;
  font-size: 15px;
}
.single_xxx{
  white-space: nowrap;
  color: orange;
}
.single_title{
  white-space: nowrap;
}
/* 三个列表 */
.list{
  width:95%;
  margin:30px auto;
  display: flex;
  justify-content: space-between;
}
.single_list{
  width:30%;
  border-radius: 5px;
  min-height:350px;
  /* background-color: aqua; */
  overflow: hidden;
  border:1px solid #ccc;
}
.list_header{
  height:50px;
  line-height: 50px;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  padding:0 10px;
  border-bottom:1px solid #ccc;
}
.list_header>span:nth-of-type(1){
  padding-left:15px;
  position: relative;
}
.list_header>span:nth-of-type(1)::before{
  content: "";
  width:4px;
  height:20px;
  background-color: orangered;
  position: absolute;
  top:50%;
  left:0;
  transform: translateY(-50%);
  border-radius: 5px;
}
.list_header>span:nth-of-type(2){
  color:orangered;
}
.list_content{

}
.single_line{
  display: flex;
  justify-content: space-between;
  padding:0 10px;
  height:35px;
  line-height: 35px;
}
/* 底部表格 */
.bottom_table{
  width:95%;
  min-height: 200px;
  margin:0px auto;
  border:1px solid #ccc;
  border-radius: 5px;
}
.table_header{
  height:50px;
  line-height: 50px;
  background-color: #ececec;
  display: flex;
  justify-content: space-between;
  padding:0 10px;
  border-bottom:1px solid #ccc;
}
.table_header>span:nth-of-type(1){
  padding-left:15px;
  position: relative;
}
.table_header>span:nth-of-type(1)::before{
  content: "";
  width:4px;
  height:20px;
  background-color: orangered;
  position: absolute;
  top:50%;
  left:0;
  transform: translateY(-50%);
  border-radius: 5px;
}
.table_content{
  display:flex;
  flex-wrap: wrap;
}
.single_cell{
  width:33.33%;
  height:50px;
  line-height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding: 0 10px;

}
.single_cell:nth-child(3n){
  border-right: none;
}
.emphasize{
  color: tomato;
}
.quit{
  color:#00c4ff;
}
</style>


