<template>
  <div :class="classObj" class="app-wrapper">

    <div :class="classObj.hideSidebar?'yhd_logo_close':'yhd_logo'"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div :class="['fixed-header',this.sidebar.opened?'':'fixed-header_close']">
        <navbar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - 180px);
  transition: all 0.3s;
}
.fixed-header_close{
  width: calc(100% - 36px);
  transition: all 0.3s;
}

.yhd_logo{
  width: 180px;
  height:50px;
  background-color: #1f2d3d !important;
  background:url("../../../static/images/yhd_logo.svg")no-repeat;
  background-size: 75%;
  background-position-x: 15px;
  position: fixed;
  top:0;
  left:0;
}
.yhd_logo_close{
  width: 36px;
  height:50px;
  background-color: #1f2d3d !important;
  background:url("../../../static/images/yhd.svg")no-repeat scroll 0px 15px;
  background-size: 70%;
  background-position-x: 8px;
  position: fixed;
  top:0;
  left:0;
}
</style>
