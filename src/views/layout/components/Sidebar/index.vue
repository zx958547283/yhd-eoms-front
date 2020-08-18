<template>
  <scroll-bar>
    <el-menu :collapse="isCollapse" :key="index" v-for="(nodeitem,index) in webPowers">
      <el-submenu :index="nodeitem.path">
        <template slot="title">
          <svg-icon :icon-class="nodeitem.meta.icon" v-if="nodeitem.meta.icon"></svg-icon>
          <span slot="title">{{nodeitem.meta.title}}</span>
        </template>
        <el-menu-item :index="child.path+child.meta.tpParams" :key="child.path+child.meta.tpParams" @click="addTags(child)" v-for="child in nodeitem.children.filter(c=>!c.hidden)">
          <svg-icon :icon-class="child.meta.icon"></svg-icon>
          <span slot="title">{{child.name}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <div style="height:70px;"></div>
  </scroll-bar>
</template>

<script>
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { ScrollBar },
  data() {
    return {
    }
  },
  computed: {
    isCollapse() {
      return !this.$store.state.app.sidebar.opened
    },
    webPowers() {
      return this.$store.state.user.au.webPowers;
    }
  },
  methods: {
    addTags(item) {
      this.$store.dispatch('tagsView/addView', item)
    }
  }
}
</script>
