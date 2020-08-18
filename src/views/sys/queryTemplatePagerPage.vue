<template>
  <div class="pagecontent">
    <cqueryview :pk="params[0]" @query="btnquery"></cqueryview>
    <el-container>
      <el-header style="height:30px;margin-top:20px;">
        <el-button-group>
          <!-- <el-button @click="btnqueryshow()" size="mini" type="primary">查询</el-button> -->
          <el-button @click="btntoexcel()" size="mini" type="primary" v-show="btnpower('btntoexcel')">导出</el-button>
        </el-button-group>
      </el-header>
      <el-main>

        <ctable :data="tabledata" :height="tableheight" :loading="loading" :pagenum="pagenum" :selection="false" @pagechange="btndataload" @row-dblclick="btnedit" @selection-change="tableSelect"></ctable>

      </el-main>
    </el-container>
    <cquery :exp="btnpower('btntoexcel')" :pk="params[0]" :show="false" @query="btnquery" ref="mychild" v-model="queryvisible"></cquery>
  </div>
</template>

<script>
import u from "../../utils/utility";
import e from "../../utils/excel";
import request from "../../utils/request";
const defaultListQuery = {
  pageNum: 1,
  pageSize: 10,
  order_sn: null,
  receiverKeyword: null,
  status: null,
  order_type: null,
  source_type: null,
  create_time: null,
};
export default {
  data() {
    return {
      listQuery: Object.assign({}, defaultListQuery),
      params: [],
      tabledata: {},
      loading: false,
      pagenum: 1,
      querylist: [],
      queryvisible: false,
      order_create_time: null,
      fieldlists: [],
      tableheight: 700,
	  selectrows: [] //表格选中对象
    };
  },

  mounted: function () {
		console.log('导出')
    this.params = u.getpageparmas(this);
    this.btndataload(1);
    this.getFieldLists();
  },
  methods: {
    btndataload: function (num) {
      this.pagenum = num;
      u.querypage(this, this.params[0]);
    },
    btnqueryshow: function () {
      this.queryvisible = !this.queryvisible;
    },
    btnquery: function (querylist) {
      this.querylist = querylist;
      this.btndataload(1);
    },
    btnedit: function (row) {
      // if (!this.btnshow("btnedit")) {
      //   return;
      // }
      // if (this.params.length === 3) {
      //   row = u.dtSelectValue(this, row);
      //   if (!u.isNullOrWhiteSpace(row)) {
      //     u.addNewTab(this, this.params[1], row.pk);
      //   }
      // }
    },
    btntoexcel: function () {
      // exportxlsx
      // e.exportxlsx(this.tabledata.rows);
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
    btnprint: function () { },
    getFieldLists(data) {
      let that = this;
      request.post("sys/QueryLists", {
        pk: this.params[0]
      }).then(resquery => {
        resquery.forEach(function (val) {
          that.fieldlists.push({
            Field: val.Field,
            Name: val.Name,
            Consult: val.Consult,
            Value: ''
          });
        });
      })
    },
    handleSearchList(params) {
      this.$refs.mychild.btnquerylist(this.fieldlists);
    },
    handleResetSearch() {
      this.fieldlists.forEach((v) => {
        v.Value = ''
      })
      this.$refs.mychild.btnquerylist(this.fieldlists);
    },
	tableSelect(rows){
		this.selectrows = rows
		console.log(rows)
	}
  }
};
</script>
