<template>
  <div class="app-container">
    <div class="table-container">
      <div>
        <!-- <span>总收益：{{totalAmount}} 元</span> -->
        <el-tag style="font-size:18px;">总收益：{{totalAmount}} 元</el-tag>
        <!-- <span>有效收益：{{vaildAmount}} 元</span> -->
        <el-tag style="font-size:18px;" type="success">有效收益：{{vaildAmount}} 元</el-tag>
      </div>
      <el-table :data="tabledata" border style="width: 90%; margin-top:20px;">
        <el-table-column align="center" label="奖励金额(元)" prop="amount" width="180"></el-table-column>
        <el-table-column align="center" label="分享人" prop="member_name" width="280"></el-table-column>
        <el-table-column align="center" label="分享对象" prop="target_name" width="280"></el-table-column>
        <el-table-column align="center" label="分享时间" prop="create_time"></el-table-column>
        <el-table-column align="center" label="是否有效">
          <template slot-scope="scope">
            <p v-if="scope.row.status === '0'">无效</p>
            <p v-else>有效</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination :current-page.sync="listQuery.pageNum" :page-size="listQuery.pageSize" :page-sizes="[5,10,15]" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" background layout="total, sizes,prev, pager, next,jumper"></el-pagination>
    </div>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import member from "../../../api/member";
import e from "../../../utils/excel";
const defaultListQuery = {
  keyword: null,
  pageNum: 1,
  pageSize: 5,
  memberId: ''
};
export default {
  data() {
    return {
      tabledata: [],          //表格数据
      params: [],             //页面参数
      pagenum: 1,             //当前页
      queryvalue: "",         //查询条件值
      querylist: [],          //查询条件模板
      listQuery: Object.assign({}, defaultListQuery),
      total: null,
      totalAmount: '',
      vaildAmount: ''
    }
  },
  created() {
    // const memberId = this.$route.query.memberId;
    // u.addwhere(this, "ums_member_reward.member_id", memberId, "querylist");
    // this.dataLoad(1)
  },
  mounted() {
    const memberId = u.getpageparmas(this);
    this.listQuery.memberId = memberId[0];
    this.getList()
  },
  methods: {
    getList() {
      member.getMemberRewardList(this.listQuery).then(res => {
        console.log(res)
        this.tabledata = res.queryResult.rows;
        this.total = res.queryResult.total;
        this.totalAmount = res.total;
        this.vaildAmount = res.vaild;
      });
    },
    dataLoad(num) {
      if (num) {
        this.pagenum = num;
      }
      u.querypage(this, this.params[0]);
    },
    handleSizeChange(val) {
      this.listQuery.pageNum = 1;
      this.listQuery.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.pageNum = val;
      this.getList();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
}
</script>
<style></style>


