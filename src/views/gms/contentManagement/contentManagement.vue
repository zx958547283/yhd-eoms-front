<template>
  <div class="app-container">
    <el-container>
      <el-container>
        <el-header style="height:30px;"></el-header>
        <el-main>
          <div class="menuList">
            <div :key="item.id" class="menuItem" v-for="(item, index) in menuList">
              <el-button @click="gotoMenu(index)" plain type="primary">{{item.name + ' >'}}</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import u from "../../../utils/utility";
import e from "../../../utils/excel";
import gms from "@/api/gms";
export default {
  data() {
    return {
      menuList: [],
      query: {
        menuName: "contentManagement"
      }
    };
  },
  mounted() {
    this.params = u.getpageparmas(this);
    //初始化查询，默认第一页
    this.doQuery();
  },
  filters: {},
  methods: {
    doQuery() {
      let that = this;
      gms.getBaseManageMenu(this.query).then(res => {
        that.menuList = res;
      });
    },
    dataLoad(num) {},
    gotoMenu(index) {
      console.log("点击的是" + index + "个");
      console.log(this.menuList[index].uri);
      let names = this.menuList[index].uri.split("/");
      u.addtagview(
        this,
        this.menuList[index].name,
        names[names.length - 1],
        this.menuList[index].parameter
      );
    }
  }
};
</script>
<style>
.menuList {
  width: 100%;
  text-align: center;
}
.menuItem {
  width: 10%;
  float: left;
  margin-top: 20px;
}
</style>


