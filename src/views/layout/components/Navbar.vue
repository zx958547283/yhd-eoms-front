<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :isActive="sidebar.opened" :toggleClick="toggleSideBar" class="hamburger-container"></hamburger>
    <span class="headertitle">元化点运维管理平台</span>
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <img :onerror="default_head" :src="avatar?avatar:default_head" class="user-avatar" />
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="showModifyPass()" style="display:block;">修改密码</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="showCompany()" style="display:block;">切换公司</span>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="btnclear()" style="display:block;">清除缓存</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="avatar-container" style="margin-right:80px;line-height:50px;">
      <i class="el-icon-user" style="color:blue"></i>
      用户：{{userAu.username}}({{companyName}})
    </div>
    <el-dialog :visible.sync="companyShow" title="公司选择" :modal-append-to-body="false">
      <div>双击选择公司</div>
      <el-table :data="listCompany" @row-dblclick="selectCompany" border max-height="250">
        <el-table-column label="编码" property="编码" width="150"></el-table-column>
        <el-table-column label="公司名称" property="名称" width="200"></el-table-column>
        <el-table-column label="负责人" property="负责人"></el-table-column>
      </el-table>
    </el-dialog>
    <cwindow :title="'修改密码'" v-model="dialogModifyPass">
      <div class="page-controlstyle">
        <cinput :length="2" :required="true" inType="password" title="旧密码" v-model="modifyPassMM.oldPass"></cinput>
        <cinput :length="2" :required="true" inType="password" title="新密码" v-model="modifyPassMM.newPass"></cinput>
        <cinput :length="2" :required="true" inType="password" title="确认密码" v-model="modifyPassMM.newPassReplay"></cinput>
      </div>
      <div class="dialog-footer">
        <el-button @click="dialogModifyPass=false" size="mini">取消</el-button>
        <el-button @click="updatePass()" size="mini" type="primary">提交</el-button>
      </div>
    </cwindow>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger/hamburger'

import u from "@/utils/utility";
import ums from "@/api/ums";

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  created() {
    // console.log(this.userAu)
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      "companyName",
      'userAu'
    ])
  },
  data() {
    return {
      modifyPassMM: {
        oldPass: "",
        newPass: "",
        newPassReplay: "",
        id: this.$store.getters.userId,
        exc_key: this.$store.getters.exc_key
      },
      listCompany: [],
      querylist: [],
      companyShow: false,
      dialogModifyPass: false,
      default_head: "static/images/default_head.jpg"
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    showModifyPass() {
      this.dialogModifyPass = true;
    },
    updatePass() {
      let that = this;
      ums.updateAdminPass(this.modifyPassMM).then(res => {
        this.$alert("密码修改成功，请重新登录", "修改密码", {
          confirmButtonTex: "确定",
          callback: action => {
            that.logout();
          }
        })
      }).catch(err => {

      });
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        let end = location.href.indexOf("?");
        if (location.href.indexOf("?") >= 0) {
          location.href = location.href.substring(0, end);
		 
        } else {
		window.localStorage.clear()
          location.reload();
        }
      })
    },
    showCompany() {
      u.queryAll("c25c35f6-55ac-4a3b-928c-d1d0f598c8bc", this.querylist).then(res => {
        this.listCompany = res;
      });
      this.companyShow = true;
    },
    selectCompany(row) {
      this.$store.dispatch('ChangeCompany', row.pk).then(() => {
        this.loading = false;
        this.companyShow = false;
        window.localStorage.clear();
        this.$router.push({ path: '/' });
      }).catch(() => {
        this.loading = false;
      })
    },
    btnclear() {
      this.$confirm("是否清除缓存?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          for (let i = 0; i < window.localStorage.length; i++) {
            if (window.localStorage.key(i) !== "user") {
              console.log("清除缓存" + localStorage.key(i));
              window.localStorage.removeItem(localStorage.key(i));
            }
          }
        })
        .catch(e => { });
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.headertitle {
  // display: inline-block;
  font-size: 22px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
.navbar {
  height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>

