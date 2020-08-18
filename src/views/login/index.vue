<template>
  <div class="login_wrap">
    <span class="qb_logo"></span>
    <el-card class="login-form-layout">
      <el-form :model="loginForm" :rules="loginRules" auto-complete="on" label-position="left" ref="loginForm">
        <!-- <div style="text-align: center">
          <svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>
        </div> -->
        <h2 class="login-title color-main">元化点运维管理平台</h2>
        <el-form-item prop="username">
          <el-input auto-complete="on" name="username" placeholder="请输入用户名" type="text" v-model="loginForm.username">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input :type="pwdType" @keyup.enter.native="handleLogin" auto-complete="on" name="password" placeholder="请输入密码" v-model="loginForm.password">
            <span @click="showPwd" slot="suffix">
              <svg-icon class="color-main" icon-class="eye" v-if="this.pwdType!==''"></svg-icon>
              <svg-icon class="color-main" icon-class="open-eye" v-else></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin: 60px auto;">
          <el-button :loading="loading" @click.native.prevent="handleLogin" type="primary" :class="(loginForm.username!=''&&loginForm.password!='')?'login_btn':'unlogin_btn'">登录</el-button>
          <!-- <a :href="authURL">天脉云登录</a> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
import login_center_bg from '@/assets/images/login_center_bg.png'
import crypto from "crypto-js";
import auth from "../../api/auth";
import { asyncRoutes, constantRouterMap, resetRouter } from '@/router'
export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能小于3位'))
      } else {
        callback()
      }
    };
    return {
      authURL: "",
      loginForm: {
        username: process.env.username,
        password: process.env.password
      },
      loginRules: {
        // username: [{required: true, trigger: 'blur', validator: validateUsername}],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      login_center_bg
    }
  },
  mounted() {
    console.log(location.href);
    console.log();
    let code = this.getURLParam("code");
    if (code) {
      let state = this.getURLParam("state");
      //取token，登录
      this.tmLogin({
        redirect_uri: 'http://localhost:8091/login',
        code: code,
        state: state
      });

    } else {
      this.generateAuth2URL();
    }
  },
  // watch:{
  //   loginForm:{
  //        handler(val, oldVal){
  //            console.log("b.c: "+val.username, oldVal.password);
  //            console.log("b.c: "+val.username, oldVal.password);
  //        },
  //        deep:true
  //    }
  // },
  methods: {
    generateAuth2URL() {
      const nonce = crypto.lib.WordArray.random(32).toString(crypto.enc.Base64);
      const code_verifier = crypto.lib.WordArray.random(16).toString(crypto.enc.Base64);
      const code_challenge = crypto.SHA256(code_verifier).toString(crypto.enc.Base64);
      const state = crypto.lib.WordArray.random(32).toString(crypto.enc.Base64);
      this.authURL = "https://identity.larghetto.me/oauth2/auth?nonce=" + nonce + "&" +
        'scope=' + 'openid%20offline' + '&' +
        'response_type=' + 'code' + '&' +
        'client_id=' + 'tls-client-larghetto-3' + '&' +
        'client_secret=' + 'tls-client-larghetto-3' + '&' +
        'code_challenge=' + code_challenge + '&' +
        'code_challenge_method=' + 'S256' + '&' +
        'redirect_uri=' + encodeURIComponent('http://localhost:8091/login') + '&' +
        'state=' + state;
    },
    getURLParam(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    },
    tmLogin(loginParam) {
      this.loading = true;
      this.$store.dispatch('TMCloundLogin', loginParam).then(() => {
        this.loading = false;
        this.$router.push({ path: '/' });
        // this.loadMenu();
      }).catch(() => {
        this.loading = false;
        this.generateAuth2URL();
      })
    },
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    loadMenu() {
      let webPowers = this.$store.state.user.au.webPowers;
      let newroute = [];
      for (let nodeitem of webPowers) {
        // 组建子节点
        let listchild = [];
        for (let childitem of nodeitem.children) {
          let child = {
            path: childitem.path,
            name: childitem.name,
            component: resolve =>
              require(["@/views/" + childitem.component], resolve),
            hidden: childitem.hidden,
            meta: {
              title: childitem.meta.title,
              icon: childitem.meta.icon,
              tpParams: childitem.meta.tpParams,
              permissionId: childitem.meta.permissionId
            }
          };
          listchild.push(child);
        }
        // 放入权限菜单节点
        let power = {
          path: nodeitem.path,
          component: Layout,
          // redirect: "/sys/def",
          name: nodeitem.name,
          meta: { title: nodeitem.meta.title, icon: nodeitem.meta.icon },
          children: listchild
        };
        // console.log(power)
        // this.$router.options.routes.push(power);
        newroute.push(power);
      }
      // router.options.routes = []
      // this.$router.addRoutes(this.$router.options.routes);
      // constantRouterMap.concat(newroute);
      // resetRouter();
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            this.$router.push({ path: '/' });
            // this.loadMenu();
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login_wrap{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  background: url("../../../static/images/loginbg.png")no-repeat;
  background-size: 100% 100%;
}
.qb_logo{
  width: 150px;
  height: 50px;
  /* background: url("../../../static/images/qb_logo.png")no-repeat; */
  /* background-size: 100% 100%; */
  position: absolute;
  top:33px;
  left:36px;
}
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 439px;
  height: 377px;
  top:0;
  bottom: 0;
  margin:auto;
}

.login-title {
  text-align: center;
  font-weight: normal;
  font-size: 25px;
  color: #54A1FB;
}
.el-form-item{
  text-align: center;
  width:325px;
  margin: 25px auto;
}
/deep/ .el-input{
  width:325px;
}
/deep/ .el-input__inner{
  border:none;
  border-bottom: 1px solid #DCDFE6;
  padding: 0 5px;
  border-radius: 0;
}
/deep/ .el-form-item__content{
  margin:0 auto;
}
/deep/ .login_btn{
  width: 325px;
}
/deep/ .unlogin_btn{
  width: 325px;
  background-color: #E5E5E5;
  color: #A9AAAA;
  border: 1px solid #E5E5E5;
}
</style>
