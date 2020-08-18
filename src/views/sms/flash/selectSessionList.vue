<template>
  <div class="app-container">
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
    </el-card>
    <div class="table-container">
      <el-table :data="list" border ref="selectSessionTable" style="width: 100%;" v-loading="listLoading">
        <el-table-column align="center" type="index" width="100" label="编号"></el-table-column>
        <!-- <el-table-column align="center" label="编号" width="100">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column> -->
        <el-table-column align="center" label="秒杀时间段名称">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column align="center" label="每日开始时间">
          <template slot-scope="scope">{{scope.row.start_time}}</template>
        </el-table-column>
        <el-table-column align="center" label="每日结束时间">
          <template slot-scope="scope">{{scope.row.end_time}}</template>
        </el-table-column>
        <el-table-column align="center" label="商品数量">
          <template slot-scope="scope">{{scope.row.product_count}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleShowRelation(scope.$index, scope.row)" size="mini" type="text">商品列表</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/utils/date";
import sms from "@/api/sms";
import utility from '@/utils/utility';
export default {
  data() {
    return {
      list: null,
      listLoading: false
    };
  },
  created() {
    this.getList();
  },
  filters: {
    formatTime(time) {
      if (time == null || time === "") {
        return "N/A";
      }
      let date = new Date(time);
      return formatDate(date, "hh:mm:ss");
    }
  },
  methods: {
    handleShowRelation(index, row) {
      // this.$router.push({
      //   path: "/sms/productRelationList",
      //   query: {
      //     flashPromotionId: this.$route.query.flashPromotionId,
      //     flashPromotionSessionId: row.id
      //   }
      // });
      utility.addtagview(this, row.name, "productRelationList", utility.getpageparmas(this)[0] + ',' + row.id);
    },
    getList() {
      this.listLoading = true;
      sms
        .getFlashSelectSessionList({
          flashId: utility.getpageparmas(this)[0]
        })
        .then(res => {
          this.listLoading = false;
          this.list = res;
        });
    }
  }
};
</script>
<style scoped>
.operate-container {
  margin-top: 0;
}
</style>


