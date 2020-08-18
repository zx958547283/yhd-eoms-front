const state = {
  visitedViews: [],
  tpParams: "", //当前页面查询模板参数
  activeTagView: {}
}

const mutations = {
  ADD_VISITED_VIEW: (state, view) => {
    // 用path和tpparms共同判断是否是相同页面，用于加载不同页签
    if (state.visitedViews.some(v => v.path === view.path && v.meta.tpParams === view.meta.tpParams)) {
      state.activeTagView = view; //重新激活已点击的页签
      return
    }
    state.activeTagView = view; //赋值已激活tag
    state.tpParams = view.meta.tpParams;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path + v.meta.tpParams === view.path + view.meta.tpParams) {
        state.visitedViews.splice(i, 1);
        if (state.activeTagView.path + state.activeTagView.meta.tpParams === view.path + view.meta.tpParams) {
          state.activeTagView = state.visitedViews[i - 1]; //关闭激活页签则前一个页签自动成为激活项目
        }
        break
      }
    }
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.activeTagView = view;
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || (v.path === view.path || v.path === 'home')
    })
  },

  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    state.activeTagView = [];
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
    state.visitedViews = affixTags
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  UPDATE_ACTIVETAG_VIEW: (state, view) => {
    state.activeTagView = view;
  },
  SET_tpParams: (state, menu) => {
    state.tpParams = menu.meta.tpParams;
    state.permissionId = menu.meta.permissionId;
  }
}

const actions = {
  addView({
    dispatch
  }, view) {
    dispatch('addVisitedView', view)
  },
  addVisitedView({
    commit
  }, view) {
    commit('ADD_VISITED_VIEW', view)
  },
  delView({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delVisitedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
      })
    })
  },
  delVisitedView({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  delOthersVisitedViews({
    commit,
    state
  }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delAllViews({
    dispatch,
    state
  }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view)
      resolve({
        visitedViews: [...state.visitedViews]
      })
    })
  },
  delAllVisitedViews({
    commit,
    state
  }) {
    return new Promise(resolve => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  updateVisitedView({
    commit
  }, view) {
    commit('UPDATE_VISITED_VIEW', view)
  },
  updateActiveTagView({
    commit
  }, view) {
    commit('UPDATE_ACTIVETAG_VIEW', view)
  },
  settpParams({
    commit
  }, menu) {
    commit("SET_tpParams", menu);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
