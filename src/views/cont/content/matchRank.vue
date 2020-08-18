<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;">
          <el-button-group>
            <el-button @click="btnqueryShow()" size="mini" type="primary">查询</el-button>
            <el-button @click="showAdd()" size="mini" type="primary" v-show="btnpower('btnadd')">新增</el-button>
            <el-button @click="showEdit()" size="mini" type="primary" v-show="btnpower('btnedit')">编辑</el-button>
            <el-button @click="doDelete()" size="mini" type="primary" v-show="btnpower('btndelete')">删除</el-button>
            <el-button @click="dataLoad()" size="mini" type="primary">刷新</el-button>
            <el-button @click="doExport()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
          </el-button-group>
          <cinputquery @query="doQuery()" placeholder="编码、名称" v-model="queryvalue"></cinputquery>
        </el-header>
        <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" @query="doQuery" v-model="queryvisible"></cquery>
        <el-main>
          <ctable :data="tabledata" :pagenum="pagenum" @pagechange="dataLoad" @row-dblclick="showEdit" @selection-change="tableSelect"></ctable>
        </el-main>
      </el-container>
    </el-container>
    <cwindow :title="wintitle" style="height:850px; overflow: auto;top:5%; width:1000px;" v-model="winvisible">
      <div class="page-controlstyle">
        <div class="title_item">
          <cinput :length="3" :required="true" title="标题" v-model="mm.title"></cinput>
          <cselect :required="true" pk="692466b9-8df6-4b5d-a51d-5b280198ef75" title="比赛类型" v-model="mm.match_type"></cselect>
        </div>
        <div class="add_detail_item">
          <div class="add_item">
            <cnumber :required="true" title="排名" v-model="matchDetail.rank"></cnumber>
            <cselectForLabel :required="true" @change="change" pk="019bebfb-5939-473b-962d-f94c6a6195ba" title="团队名称" v-model="matchDetail.team_id"></cselectForLabel>
            <cinput title="得分" v-model="matchDetail.score"></cinput>
          </div>
          <csuploadWithPath :dataObj="updatePath" :length="2" title="插图" v-model="matchDetail.match_icon"></csuploadWithPath>
          <div style="width: 100%;overflow:hidden;clear:both;"></div>
          <el-button @click="addToList" size="mini" style="margin-top:10px;" type="primary">添加</el-button>
        </div>
        <div class="detail_item">
          <el-table :data="mm.detail" border style="width: 100%">
            <el-table-column fixed label="名次" prop="rank" width="100"></el-table-column>
            <el-table-column label="团队" prop="team_name" width="400"></el-table-column>
            <el-table-column label="得分" prop="score" width="250"></el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button @click="delItem(scope.$index)" size="small" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button @click="winvisible=false" size="mini">取消</el-button>
        <el-button @click="doSave" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import sys from "../../../api/sys";
import cont from "../../../api/cont";
import e from "../../../utils/excel";

export default {
  data() {
    return {
      selectrows: [],                    //表格选中的对象
      wintitle: "编辑",    //编辑窗口标题
      winvisible: false,      //编辑窗口是否显示
      mm: {
        title: '',
        match_type: '',
        detail: []
      },                 //编辑对象
      tabledata: {},          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: '',         //查询条件值
      querylist: [], //查询条件模板
      queryvisible: false,    //查询弹出窗
      updatePath: {
        path: process.env.NORMAL_UPLOAD_PATH
      },
      matchDetail: {
        rank: '',
        team_id: '',
        team_name: '',
        match_icon: '',
        score: ''
      },
      selectedLabel: ''
    }
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
  },
  filters: {
  },
  methods: {
    btnqueryShow: function () {
      this.queryvisible = !this.queryvisible;
    },
    doQuery(querylist) {
      console.log(querylist)
      if (querylist === undefined) {
        if (u.isnullorwhitespace(this.queryvalue)) {
          this.querylist = [];
        } else {
          this.querylist = [];
          u.addwheres(this, "and", "(", "cont_match_rank.title", "like", this.queryvalue, "");
          u.addwheres(this, "or", "", "cont_match_rank.match_type", "like", this.queryvalue, ")");
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
      this.mm = {
        title: '',
        match_type: '',
        detail: []
      };
      this.mm.fix = "N";
      this.winvisible = true;
      this.timeValue = [];
      this.selectedLabel = ''
      this.matchDetail = {}
    },
    showEdit(row) {
      let that = this;
      u.openeditmodel(this, cont.getMatchRankDetail, row).then(res => {
        console.log(res)
        that.mm = res;
      });;
    },
    doDelete() {
      u.deleteoperate(this, cont.deleteByType);
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
      u.doSave(this, cont.saveDetails);
    },
    delItem(val) {
      console.log(val);
      this.mm.detail.splice(val, 1)
    },
    change(val) {
      console.log(val)
      this.selectedLabel = val[1]
    },
    addToList() {
      if (this.mm.title === null || this.mm.title === undefined || this.mm.title === '') {
        this.$message.error('请填写标题！');
        return;
      }
      if (this.mm.match_type === null || this.mm.match_type === undefined || this.mm.match_type === '') {
        this.$message.error('请选择类型！');
        return;
      }
      if (this.matchDetail.rank === null || this.matchDetail.rank === undefined || this.matchDetail.rank === '') {
        this.$message.error('请填写排名！');
        return;
      }
      if (this.matchDetail.team_id === null || this.matchDetail.team_id === undefined || this.matchDetail.team_id === '') {
        this.$message.error('请选择团队！');
        return;
      }

      if (this.mm.detail !== null) {
        for (let i = 0; i < this.mm.detail.length; i++) {
          if (this.mm.detail[i].team_id === this.matchDetail.team_id) {
            this.$message.error('不能重复选择团队！');
            return;
          }
        }

      }
      this.matchDetail.team_name = this.selectedLabel
      this.mm.detail.push(this.matchDetail)
      this.matchDetail = {}
      this.selectedLabel = ''
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.datepick {
  float: left;
  margin-top: 20px;
  .datepick_txt {
    font-size: 13px;
    display: inline-block;
    color: #48576a;
    width: 75px;
    height: 28px;
    line-height: 28px;
  }
}
.line {
  height: 1px;
  background-color: #ccd3dc;
  width: 530px;
}
.title_item {
  height: 85px;
  border: 1px solid #ccd3dc;
  background-color: #fbfbfb;
}
.add_item {
  height: 60px;
  margin-top: 10px;
}
.detail_item {
  height: 420px;
  overflow: auto;
  background-color: #ccd3dc;
  margin-top: 30px;
}
.add_detail_item {
  margin-top: 5px;
  background-color: #fbfbfb;
}
</style>


