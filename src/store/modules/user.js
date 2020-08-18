import { login, logout, getInfo } from "@/api/login";
import auth from "@/api/auth";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { MessageBox } from 'element-ui'

const user = {
  state: {
    token: getToken(),
    userId: "",
    exc_key: "",
    name: "",
    avatar: "",
    companyName: "",
    roles: [],
    au: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERID: (state, id) => {
      state.userId = id;
    },
    SET_EXC_KEY: (state, exc_key) => {
      state.exc_key = exc_key;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_COMPANY: (state, companyName) => {
      state.companyName = companyName;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_AU: (state, au) => {
      state.au = au;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password)
          .then(response => {
            const tokenStr = response.token;
            setToken(tokenStr);
            commit("SET_TOKEN", tokenStr);
            commit("SET_USERID", response.id);
            commit("SET_EXC_KEY", response.exc_key);
            commit("SET_AVATAR", response.icon);
            commit("SET_AU", response);
            commit("SET_COMPANY", response.companyName);
            resolve();
          })
          .catch((error) => {
            if (error.code && error.code == "405") {
              MessageBox.confirm('用户已经登录,是否强制登录？', '强制登录', {
                confirmButtonText: '登录',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                login(username, userInfo.password, "force")
                  .then(response => {
                    const tokenStr = response.token;
                    setToken(tokenStr);
                    commit("SET_TOKEN", tokenStr);
                    commit("SET_USERID", response.id);
                    commit("SET_EXC_KEY", response.exc_key);
                    commit("SET_AVATAR", response.icon);
                    commit("SET_AU", response);
                    commit("SET_COMPANY", response.companyName);
                    resolve();
                  }).catch(err => {
                    reject(err);
                  })
              }).catch(() => {
                reject(error.message);
              })
            } else {
              reject(error);
            }
          });
      });
    },
    //天脉云登录
    TMCloundLogin({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        auth.tmCloundLogin({
          redirect_uri: userInfo.redirect_uri,
          code: userInfo.code,
          state: userInfo.state
        }).then(response => {
          const tokenStr = response.token;
          setToken(tokenStr);
          commit("SET_TOKEN", tokenStr);
          commit("SET_USERID", response.id);
          commit("SET_EXC_KEY", response.exc_key);
          commit("SET_AVATAR", response.icon);
          commit("SET_AU", response);
          commit("SET_COMPANY", response.companyName);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    ChangeCompany({ commit }, companyId) {
      return new Promise((resolve, reject) => {
        auth.changeCompany({
          companyId: companyId
        }).then(response => {
          const tokenStr = response.token;
          setToken(tokenStr);
          commit("SET_TOKEN", tokenStr);
          commit("SET_USERID", response.id);
          commit("SET_EXC_KEY", response.exc_key);
          commit("SET_AVATAR", response.icon);
          commit("SET_AU", response);
          commit("SET_COMPANY", response.companyName);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const data = response.data;
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit("SET_ROLES", data.roles);
            } else {
              reject("getInfo: roles must be a non-null array !");
            }
            commit("SET_USERID", data.id);
            commit("SET_EXC_KEY", data.exc_key);
            commit("SET_NAME", data.username);
            commit("SET_AVATAR", data.icon);
            commit("SET_USERID", data.id);

            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_USERID", "");
            commit("SET_AVATAR", "");
            commit("SET_EXC_KEY", "");

            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_USERID", "");
        commit("SET_EXC_KEY", "");
        commit("SET_AVATAR", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
